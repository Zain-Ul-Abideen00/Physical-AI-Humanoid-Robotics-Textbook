import argparse
import asyncio

from dotenv import load_dotenv
load_dotenv()

from services.ingest.manager import IngestionManager


async def main():
    parser = argparse.ArgumentParser(description="Ingest textbook content.")
    parser.add_argument("--url", type=str, required=False, help="Sitemap URL",
                        default="https://zain-ul-abideen00.github.io/Physical-AI-Humanoid-Robotics-Textbook/sitemap.xml")
    parser.add_argument("--force", action="store_true", help="Force re-ingestion ignoring hash.")

    args = parser.parse_args()

    manager = IngestionManager()
    await manager.run_ingestion(args.url, force=args.force)

if __name__ == "__main__":
    asyncio.run(main())
