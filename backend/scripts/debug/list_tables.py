import asyncio
import os
from dotenv import load_dotenv
import asyncpg

load_dotenv()

DATABASE_URL = os.getenv("NEON_DATABASE_URL")

async def list_tables():
    if not DATABASE_URL:
        print("Error: NEON_DATABASE_URL not set")
        return

    print(f"Connecting to: {DATABASE_URL.split('@')[1]}")
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        # Get all table names in public schema
        rows = await conn.fetch("""
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name;
        """)

        print("\n--- Tables in Database ---")
        if not rows:
            print("No tables found in public schema.")

        for row in rows:
            table_name = row['table_name']
            # Get count for each table
            try:
                count = await conn.fetchval(f'SELECT COUNT(*) FROM public."{table_name}"')
                print(f"- {table_name}: {count} rows")
            except Exception as e:
                print(f"- {table_name}: [Error getting count: {e}]")

    except Exception as e:
        print(f"Error listing tables: {e}")
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(list_tables())
