# Humanoid Robotics RAG Backend

This is the backend service for the Humanoid Robotics Textbook RAG agent. It provides an API for retrieving relevant content from the textbook, handling chat interactions, and ingesting content into a vector database.

## Prerequisites

- Python 3.13+
- [uv](https://github.com/astral-sh/uv) (for dependency management)

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Backend
```

### 2. Install Dependencies

Initialize the environment and install dependencies using `uv`:

```bash
uv sync
```

### 3. Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Open `.env` and configure the following variables:

```ini

# Cohere API Key (for Embeddings)
COHERE_API_KEY="v..."

# Google Gemini (LLM)
GEMINI_API_KEY="AI..."
GEMINI_MODEL="gemini-2.5-flash"

# Ingestion Configuration
SITEMAP_URL="https://humanoid-robotics-textbook.vercel.app/sitemap.xml"

# Qdrant Vector DB
QDRANT_URL="https://your-qdrant-instance.cloud.qdrant.io"
QDRANT_API_KEY="your-qdrant-key"

# Neon Postgres (Metadata)
NEON_DATABASE_URL="postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require"

```

## Running the Application

To start the customized FastAPI development server:

```bash
uv run uvicorn main:app
```

The API will be available at `http://localhost:8000`.
Health check: `http://localhost:8000/health`
Interactive Docs: `http://localhost:8000/docs`

## Data Ingestion

To ingest the textbook content (sitemap -> markdown -> chunks -> embeddings -> Qdrant):

```bash
uv run -m scripts.ingest-content
```

**Options:**
- `--url <SITEMAP_URL>`: Specify a different sitemap URL.
- `--force`: Force re-ingestion even if content hasn't changed.

## Testing

Run the test suite using `pytest`:

```bash
uv run pytest
```

## Helper Scripts

The `scripts/` directory contains several utility scripts for development and debugging:

### Initialize Database
Initialize the Postgres database schema (if needed manually):

```bash
uv run -m scripts.init_db
```

### Validate Retrieval
Test the retrieval system with sample queries to verify embedding and search quality:

```bash
uv run python scripts/validate_retrieval.py "What is Humanoid Robot?"
```

### Debug RAG
Debug the full RAG pipeline (Retrieval + Generation):

```bash
uv run scripts/debug_rag.py
```

### Test Chat Stream
Test the streaming chat response functionality in isolation:

```bash
uv run scripts/test_chat_stream.py "Why is simulation important?"
```
