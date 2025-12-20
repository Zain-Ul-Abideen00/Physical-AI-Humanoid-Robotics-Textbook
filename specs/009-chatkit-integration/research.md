# Research: ChatKit Integration

## 1. Streaming Compatibility
**Question**: How does `ChatKitServer` handle streaming, and is it compatible with our existing `Runner.run_streamed`?

**Findings**:
- `ChatKitServer.process` returns a `StreamingResult` object.
- The template wraps this in a `StreamingResponse` with `media_type="text/event-stream"`.
- `GeminiChatKitServer.respond` yields `ThreadItemAddedEvent`, `ThreadItemDoneEvent`, etc.
- Our existing `Runner.run_streamed` emits events (deltas). We need to bridge these.
- **Decision**: We will implement `respond` in our `RAGChatKitServer` to iterate over `Runner.run_streamed` events and yield corresponding `ChatKit` events (`ThreadItemAddedEvent` for tokens).

## 2. Model Integration
**Question**: Should we use `LitellmModel` (from template) or existing `OpenAIChatCompletionsModel`?

**Findings**:
- Template uses `LitellmModel(model="gemini/gemini-2.5-flash")`.
- This simplifies the connection to Gemini via LiteLLM without manual client setup.
- Our existing code manually creates a `GenerativeModel` client.
- **Decision**: Adopt `LitellmModel` for the ChatKit integration to align with the library's expected patterns and simplify the `Agent` construction within `ChatKitServer`. We can keep the existing `QueryService` for RAG retrieval but pass the context to this new Agent.

## 3. Data Store
**Question**: In-memory vs Postgres for MVP?

**Findings**:
- Template uses a robust `MemoryStore` implementation.
- Constitution allows "Chat history stored in Postgres" as a Phase 1 goal but MVP (this feature) focuses on the "Basic RAG chatbot".
- **Decision**: Use `MemoryStore` for this initial PR to reduce complexity. The `Store` interface allows easy swapping for a `PostgresStore` in a follow-up feature.
