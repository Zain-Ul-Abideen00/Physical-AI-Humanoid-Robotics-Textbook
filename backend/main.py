from dotenv import load_dotenv
from fastapi import FastAPI

from contextlib import asynccontextmanager
from api import ingest, query, chat, chatkit_routes, auth
from services.db import Database

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await Database.connect()
    yield
    await Database.disconnect()

app = FastAPI(title="Humanoid Robotics RAG API", version="0.1.0", lifespan=lifespan)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", # Always allow localhost for dev
        "http://localhost:3001", # Allow auth service if needed (though backend calls auth, frontend calls both)
        "https://zain-humanoid-robotics.vercel.app", # Allow production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(ingest.router, prefix="/api/v1", tags=["Ingestion"])
app.include_router(query.router, prefix="/api", tags=["Query"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(auth.router, prefix="/api", tags=["Auth"])
app.include_router(chatkit_routes.router, tags=["ChatKit"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
