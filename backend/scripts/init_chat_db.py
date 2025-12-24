import asyncio
import os
import sys

# Add backend directory to path so we can import services
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.db import Database

async def init_chat_db():
    print("Initializing ChatKit Database Schema...")

    db = Database()
    await db.connect()

    try:
        # Create Threads Table
        print("Creating chatkit_threads table...")
        await db.execute("""
            CREATE TABLE IF NOT EXISTS chatkit_threads (
                id TEXT PRIMARY KEY,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                metadata JSONB DEFAULT '{}'::jsonb,
                user_id TEXT
            );
        """)

        # Create Items Table
        print("Creating chatkit_items table...")
        await db.execute("""
            CREATE TABLE IF NOT EXISTS chatkit_items (
                id TEXT PRIMARY KEY,
                thread_id TEXT REFERENCES chatkit_threads(id) ON DELETE CASCADE,
                type TEXT NOT NULL,
                content JSONB DEFAULT '{}'::jsonb,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        """)

        # Indexes for performance
        print("Creating indexes...")
        await db.execute("CREATE INDEX IF NOT EXISTS idx_threads_user_id ON chatkit_threads(user_id);")
        await db.execute("CREATE INDEX IF NOT EXISTS idx_items_thread_id ON chatkit_items(thread_id);")
        await db.execute("CREATE INDEX IF NOT EXISTS idx_items_created_at ON chatkit_items(created_at);")

        print("ChatKit Database Schema initialized successfully.")

    except Exception as e:
        print(f"Error initializing database: {e}")
    finally:
        await db.disconnect()

if __name__ == "__main__":
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(init_chat_db())
