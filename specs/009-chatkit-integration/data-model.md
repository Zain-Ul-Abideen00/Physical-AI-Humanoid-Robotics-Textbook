# Data Model: ChatKit Integration

## Entities

### `ThreadMetadata` (ChatKit Object)
Represents a conversation session.
- `id`: string (UUID)
- `created_at`: datetime (UTC)
- `metadata`: dict (Key-value pairs for context, e.g., current chapter)

### `ThreadItem` (ChatKit Object)
Represents a unit of content within a thread.
- `id`: string (UUID)
- `type`: string ("message", "activity", etc.)
- `role`: string ("user", "assistant")
- `content`: list (Text parts)
- `created_at`: datetime (UTC)

## Persistence Strategy (MVP)

**Store**: In-Memory Python Dictionary
- Structure: `Dict[str, ThreadState]`
- `ThreadState`:
  ```python
  @dataclass
  class ThreadState:
      thread: ThreadMetadata
      items: list[ThreadItem]
  ```

**Future Migration**:
- Map `ThreadMetadata` to `chat_sessions` table.
- Map `ThreadItem` to `chat_messages` table.
