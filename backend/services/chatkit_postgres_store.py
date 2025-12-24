import json
from datetime import datetime, timezone
from typing import Any
from pydantic import TypeAdapter
from chatkit.store import Store
from chatkit.types import ThreadMetadata, ThreadItem, Page
from services.db import Database

class PostgresStore(Store[dict]):
    """
    Postgres-backed store for ChatKit.
    Persists threads and items to 'chatkit_threads' and 'chatkit_items' tables.
    """

    def __init__(self):
        self._attachments = {} # Stub memory store for attachments

    async def load_thread(self, thread_id: str, context: dict) -> ThreadMetadata:
        row = await Database.fetchrow("SELECT * FROM chatkit_threads WHERE id = $1", thread_id)

        if row:
            metadata = json.loads(row["metadata"])
            return ThreadMetadata(
                id=row["id"],
                created_at=row["created_at"],
                metadata=metadata,
                title=metadata.get("title")
            )

        # Create new thread if not found
        user_id = context.get("user_id")
        created_at = datetime.now(timezone.utc)
        metadata = {"user_id": user_id}

        await Database.execute(
            """
            INSERT INTO chatkit_threads (id, created_at, metadata, user_id)
            VALUES ($1, $2, $3, $4)
            """,
            thread_id, created_at, json.dumps(metadata), user_id
        )

        return ThreadMetadata(
            id=thread_id,
            created_at=created_at,
            metadata=metadata
        )

    async def save_thread(self, thread: ThreadMetadata, context: dict) -> None:
        # Fetch existing metadata to preserve fields (like user_id) if not provided in update
        existing_row = await Database.fetchrow("SELECT metadata, user_id FROM chatkit_threads WHERE id = $1", thread.id)

        if existing_row:
            existing_metadata = json.loads(existing_row["metadata"])
            # Merge: if user_id is in existing but not in new, keep it
            if "user_id" in existing_metadata and "user_id" not in thread.metadata:
                thread.metadata["user_id"] = existing_metadata["user_id"]
        elif "user_id" not in thread.metadata:
             # Fallback context injection for safety
             thread.metadata["user_id"] = context.get("user_id")

        metadata_json = json.dumps(thread.metadata)
        owner_id = thread.metadata.get("user_id")

        await Database.execute(
            """
            INSERT INTO chatkit_threads (id, created_at, metadata, user_id)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) DO UPDATE
            SET metadata = $3
            """,
            thread.id, thread.created_at, metadata_json, owner_id
        )

    async def load_thread_items(
        self,
        thread_id: str,
        after: str | None,
        limit: int,
        order: str,
        context: dict,
    ) -> Page[ThreadItem]:

        # Query for cutoff if 'after' is provided
        cutoff_date = None
        if after:
             row = await Database.fetchrow("SELECT created_at FROM chatkit_items WHERE id = $1", after)
             if row:
                 cutoff_date = row["created_at"]

        # Build Query
        query = "SELECT * FROM chatkit_items WHERE thread_id = $1"
        params = [thread_id]

        if cutoff_date:
            if order == "desc":
                query += " AND created_at < $2"
            else:
                query += " AND created_at > $2"
            params.append(cutoff_date)

        if order == "desc":
             query += " ORDER BY created_at DESC"
        else:
             query += " ORDER BY created_at ASC"

        limit_param_idx = len(params) + 1
        query += f" LIMIT ${limit_param_idx}"
        params.append(limit + 1)

        rows = await Database.fetch(query, *params)

        items = []
        adapter = TypeAdapter(ThreadItem)
        for r in rows:
            # Load JSON content
            item_dict = json.loads(r["content"])

            # Reconstruct full dictionary for Pydantic validation
            # We must put 'id' and 'type' BACK into the dict for polymorphism to work
            item_dict["id"] = r["id"]
            item_dict["type"] = r["type"]

            # Use TypeAdapter to validate/instantiate the correct subclass
            items.append(adapter.validate_python(item_dict))

        has_more = len(items) > limit
        if has_more:
            items = items[:limit]

        return Page(
            data=items,
            has_more=has_more,
            after=items[-1].id if items else None
        )

    async def add_thread_item(self, thread_id: str, item: ThreadItem, context: dict) -> None:
        # Use model_dump(mode='json') to handle datetimes and other types
        item_dict = item.model_dump(mode='json')

        # Extract fields to specific columns
        item_type = item_dict.pop("type", "message")

        # Remove ID from JSON blob to avoid duplication
        item_dict.pop("id", None)

        await Database.execute(
            """
            INSERT INTO chatkit_items (id, thread_id, type, content, created_at)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO UPDATE
            SET content = $4
            """,
            item.id, thread_id, item.type, json.dumps(item_dict), datetime.now(timezone.utc)
        )

    async def save_item(self, thread_id: str, item: ThreadItem, context: dict) -> None:
         await self.add_thread_item(thread_id, item, context)

    async def load_item(self, thread_id: str, item_id: str, context: dict) -> ThreadItem:
        row = await Database.fetchrow("SELECT * FROM chatkit_items WHERE id = $1 AND thread_id = $2", item_id, thread_id)
        if not row:
             raise ValueError(f"Item {item_id} not found in thread {thread_id}")

        item_dict = json.loads(row["content"])
        item_dict["id"] = row["id"]
        item_dict["type"] = row["type"]

        return TypeAdapter(ThreadItem).validate_python(item_dict)

    async def delete_thread_item(self, thread_id: str, item_id: str, context: dict) -> None:
        await Database.execute("DELETE FROM chatkit_items WHERE id = $1 AND thread_id = $2", item_id, thread_id)

    async def load_threads(self, limit: int, after: str | None, order: str, context: dict) -> Page[ThreadMetadata]:
        user_id = context.get("user_id")

        # STRICT ISOLATION: Anonymous users get NO history list
        if user_id is None:
            return Page(data=[], has_more=False)

        # Logged in users: Show ONLY their threads
        query = "SELECT * FROM chatkit_threads WHERE user_id = $1"
        params = [user_id]

        cutoff_date = None
        if after:
             row = await Database.fetchrow("SELECT created_at FROM chatkit_threads WHERE id = $1", after)
             if row:
                 cutoff_date = row["created_at"]

        if cutoff_date:
            if order == "desc":
                query += " AND created_at < $2"
            else:
                query += " AND created_at > $2"
            params.append(cutoff_date)

        if order == "desc":
             query += " ORDER BY created_at DESC"
        else:
             query += " ORDER BY created_at ASC"

        limit_param_idx = len(params) + 1
        query += f" LIMIT ${limit_param_idx}"
        params.append(limit + 1)

        rows = await Database.fetch(query, *params)

        threads = []
        for r in rows:
            metadata = json.loads(r["metadata"])
            threads.append(ThreadMetadata(
                id=r["id"],
                created_at=r["created_at"],
                metadata=metadata,
                title=metadata.get("title")
            ))

        has_more = len(threads) > limit
        if has_more:
            threads = threads[:limit]

        return Page(
            data=threads,
            has_more=has_more,
            after=threads[-1].id if threads else None
        )

    async def delete_thread(self, thread_id: str, context: dict) -> None:
        await Database.execute("DELETE FROM chatkit_threads WHERE id = $1", thread_id)

    # Attachments - Memory Stub
    async def save_attachment(self, attachment: Any, context: dict) -> None:
        self._attachments[attachment.id] = attachment

    async def load_attachment(self, attachment_id: str, context: dict) -> Any:
        if attachment_id not in self._attachments:
            raise ValueError(f"Attachment {attachment_id} not found")
        return self._attachments[attachment_id]

    async def delete_attachment(self, attachment_id: str, context: dict) -> None:
        self._attachments.pop(attachment_id, None)

    # Note: These MUST be synchronous methods to match Store protocol
    def generate_thread_id(self, context: dict) -> str:
        import uuid
        return f"thread_{uuid.uuid4().hex[:12]}"

    def generate_item_id(self, item_type: str, thread: ThreadMetadata, context: dict) -> str:
        import uuid
        return f"{item_type}_{uuid.uuid4().hex[:12]}"
