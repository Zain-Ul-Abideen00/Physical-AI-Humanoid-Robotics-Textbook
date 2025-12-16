from dotenv import load_dotenv
from fastapi import FastAPI

from apps.api.routers import ingest, query, chat

load_dotenv()

app = FastAPI(title="Humanoid Robotics RAG API", version="0.1.0")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(ingest.router, prefix="/api/v1", tags=["Ingestion"])
app.include_router(query.router, prefix="/api", tags=["Query"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
