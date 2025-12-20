from dotenv import load_dotenv
from fastapi import FastAPI

from api import ingest, query, chat, chatkit_routes

load_dotenv()

app = FastAPI(title="Humanoid Robotics RAG API", version="0.1.0")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", # Always allow localhost for dev
        "https://zain-humanoid-robotics.vercel.app", # Allow production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(ingest.router, prefix="/api/v1", tags=["Ingestion"])
app.include_router(query.router, prefix="/api", tags=["Query"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(chatkit_routes.router, tags=["ChatKit"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
