from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel, HttpUrl

from services.ingest.manager import IngestionManager

router = APIRouter()

class IngestRequest(BaseModel):
    url: HttpUrl = "https://zain-ul-abideen00.github.io/Physical-AI-Humanoid-Robotics-Textbook/sitemap.xml"
    force: bool = False

@router.post("/ingest", summary="Trigger content ingestion")
async def trigger_ingest(request: IngestRequest, background_tasks: BackgroundTasks):
    """
    Triggers the ingestion process in the background.
    """
    manager = IngestionManager()

    # Run in background to avoid blocking API
    background_tasks.add_task(manager.run_ingestion, str(request.url), request.force)

    return {"message": "Ingestion triggered in background", "url": str(request.url), "force": request.force}
