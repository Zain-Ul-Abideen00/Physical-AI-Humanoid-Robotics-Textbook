import os
import json
from datetime import datetime, timezone
from typing import Any, AsyncIterator
from fastapi import APIRouter, Request, Depends, BackgroundTasks
from fastapi.responses import StreamingResponse, Response
from agents import Agent, Runner
from agents.extensions.models.litellm_model import LitellmModel

from chatkit.server import ChatKitServer, StreamingResult
from chatkit.types import ThreadMetadata, ThreadItem, AssistantMessageItem, UserMessageItem
from chatkit.agents import AgentContext, ThreadItemConverter, stream_agent_response

# from services.chatkit_store import MemoryStore # Deprecated
from services.chatkit_postgres_store import PostgresStore # New persistent store
from services.query.retrieval import QueryService

router = APIRouter()

# Initialize Store
# PostgresStore relies on the global Database connection initialized in main.py lifespan
store = PostgresStore()

# Initialize Model
gemini_model = LitellmModel(
    model="gemini/gemini-2.5-flash",
    api_key=os.getenv("GEMINI_API_KEY"),
)

from api.deps import get_optional_current_user, UserSession

class RAGChatKitServer(ChatKitServer[dict]):
    def __init__(self, data_store: PostgresStore): # Updated type hint
        super().__init__(data_store)
        self.converter = ThreadItemConverter()

    async def generate_title(self, thread_id: str, user_message: str):
        """Generates a short 3-5 word title for the chat thread."""
        try:
            print(f"Generating title for thread {thread_id}...")

            prompt = (
                f"Generate a very short, summarized title (maximum 5 words) for a conversation "
                f"that starts with this message:\\n\\n{user_message}\\n\\n"
                "Do not use quotes or anything else. Just the title."
            )

            # Create a temporary agent for this one-off task
            title_agent = Agent(
                name="TitleGenerator",
                instructions="You are a helpful assistant.",
                model=gemini_model
            )

            # Run the agent (non-streamed)
            result = await Runner.run(title_agent, input=prompt)

            new_title = ""
            if hasattr(result, "final_output"):
                 new_title = result.final_output
            elif hasattr(result, "text"):
                new_title = result.text
            elif hasattr(result, "content"):
                new_title = result.content
            else:
                 new_title = str(result)

            new_title = new_title.strip()

            # Update thread metadata
            # We need to load fresh thread data to avoid overwrites
            thread = await self.store.load_thread(thread_id, {})
            thread.metadata["title"] = new_title
            thread.title = new_title # Set top-level title for frontend
            await self.store.save_thread(thread, {})
            print(f"Set title for thread {thread_id} to: {new_title}")
            return thread

        except Exception as e:
            print(f"Error generating title for thread {thread_id}: {e}")
            import traceback
            traceback.print_exc()
            return None

    async def respond(self, thread: ThreadMetadata, input: Any, context: dict) -> AsyncIterator:
        """
        Respond to user input by running the RAG agent and streaming events back.
        """
        from chatkit.types import UserMessageItem

        query_service = QueryService()

        # 1. Extract user message
        user_message = ""
        if isinstance(input, str):
            user_message = input
        elif isinstance(input, dict) and "text" in input:
            user_message = input["text"]
        elif hasattr(input, "text"): # ChatKit UserMessageItem
             user_message = input.text

        # Fallback if no input provided directly, try to get last message from thread
        if not user_message:
             # Load last items to find the user's message
             page = await self.store.load_thread_items(thread.id, limit=1, order="desc", after=None, context=context)
             if page.data and isinstance(page.data[0], UserMessageItem):
                 user_text_parts = [p.text for p in page.data[0].content if hasattr(p, 'text')]
                 user_message = " ".join(user_text_parts)

        if not user_message:
            user_message = "Hello"

        # --- Title Generation Logic ---
        # Check if we should generate a title (if none exists or it is the default)
        current_title = thread.metadata.get("title")
        title_task = None
        if (not current_title or current_title == "New Thread"):
             import asyncio
             # Start title generation as a concurrent task
             title_task = asyncio.create_task(self.generate_title(thread.id, user_message))

        # 2. Retrieve Context (RAG)
        # Note: We rely on QueryService to handle its own initialization and embedding
        # ValidationQuery is usually constructed here.
        from services.query.models import ValidationQuery
        search_response = query_service.search(
            ValidationQuery(
                query_text=user_message,
                top_k=5
            )
        )

        context_text = ""
        for i, res in enumerate(search_response.results):
             context_text += f"SOURCE [{i+1}] ({res.page_title}):\\n{res.chunk_text}\\n\\n"

        # 3. Create Agent with Context
        instructions = f"""
        You are an expert tutor for the "Physical AI & Humanoid Robotics" textbook.
        Answer based ONLY on the provided context.

        CONTEXT:
        {context_text}

        If the answer is not in the context, say you don't know.
        """

        agent = Agent(
            name="Gemini Tutor",
            instructions=instructions,
            model=gemini_model
        )

        # 4. Stream Response using ChatKit's helper
        # This handles ThreadItemAdded, ThreadItemUpdated (with correct deltas), and ThreadItemDone

        agent_context = AgentContext(
            thread=thread,
            store=self.store,
            request_context=context,
        )

        # Run the agent stream
        streamed = Runner.run_streamed(agent, input=user_message)

        # ID Mapping: Map implementation-specific IDs (from LiteLLM) to persistent Store IDs
        # This prevents collisions when the LLM returns fixed/reused IDs (common in LiteLLM/Gemini)
        id_map = {}

        async for event in stream_agent_response(agent_context, streamed):
            # Check if this event has an item and if we need to remap its ID
            if hasattr(event, "item") and event.item:
                original_id = event.item.id
                if original_id not in id_map:
                     # Generate a new unique ID for this item using the Store
                     id_map[original_id] = self.store.generate_item_id("message", thread, context)

                # Replace the ID in the event's item
                event.item.id = id_map[original_id]

            # Also remap IDs in 'item_id' fields (for update/done events)
            if hasattr(event, "item_id") and event.item_id in id_map:
                event.item_id = id_map[event.item_id]

            yield event

        # Post-stream: Check if title generation finished or wait for it (optional: wait for a short time?)
        # For immediate UI update, we want to yield the ThreadUpdatedEvent here.
        if title_task:
            try:
                # Wait for title generation to complete
                updated_thread_md = await title_task
                if updated_thread_md:
                     from chatkit.types import ThreadUpdatedEvent, Thread

                     # We must construct a full Thread object (metadata + items)
                     # Fetch the latest items to be safe and compliant with the type
                     items_page = await self.store.load_thread_items(
                         updated_thread_md.id,
                         limit=50,
                         order="desc",
                         after=None,
                         context=context
                     )

                     # Construct the Thread object
                     full_thread = Thread(
                         **updated_thread_md.model_dump(),
                         items=items_page
                     )

                     yield ThreadUpdatedEvent(thread=full_thread)
            except Exception as e:
                print(f"Error awaiting title task: {e}")

# Instantiate Server
server = RAGChatKitServer(store)

@router.post("/chatkit")
async def chatkit_endpoint(
    request: Request,
    background_tasks: BackgroundTasks,
    user: UserSession | None = Depends(get_optional_current_user)
):
    # Parse body
    try:
        body = await request.body()

        context = {
            "background_tasks": background_tasks,
            "user_id": user.id if user else None
        }

        # Pass background_tasks in context so respond() can use it
        result = await server.process(body, context)

        if isinstance(result, StreamingResult):
            return StreamingResponse(result, media_type="text/event-stream")

        return Response(content=result.json, media_type="application/json")
    except Exception as e:
        print(f"Error in chatkit_endpoint: {e}")
        return Response(content=json.dumps({"error": str(e)}), status_code=500, media_type="application/json")
