import asyncio
import os
from dotenv import load_dotenv
import asyncpg

load_dotenv()

DATABASE_URL = os.getenv("NEON_DATABASE_URL")

async def check_data():
    if not DATABASE_URL:
        print("Error: NEON_DATABASE_URL not set")
        return

    print(f"Connecting to: {DATABASE_URL.split('@')[1]}") # Print host only for safety
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        user_count = await conn.fetchval('SELECT COUNT(*) FROM public."user"')
        session_count = await conn.fetchval('SELECT COUNT(*) FROM public."session"')
        profile_count = await conn.fetchval('SELECT COUNT(*) FROM public.user_profiles')

        print(f"\n--- Data Verification ---")
        print(f"Users: {user_count}")
        print(f"Sessions: {session_count}")
        print(f"Profiles: {profile_count}")

        if user_count > 0:
            print("\nLast 5 Users:")
            users = await conn.fetch('SELECT id, email, name, "createdAt" FROM public."user" ORDER BY "createdAt" DESC LIMIT 5')
            for u in users:
                print(f"- {u['name']} ({u['email']}) [ID: {u['id']}]")

        if profile_count > 0:
             print("\nLast 5 Profiles:")
             profiles = await conn.fetch('SELECT id, "updated_at" FROM public.user_profiles ORDER BY "updated_at" DESC LIMIT 5')
             for p in profiles:
                 print(f"- Profile for User ID: {p['id']}")

    except Exception as e:
        print(f"Error checking data: {e}")
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(check_data())
