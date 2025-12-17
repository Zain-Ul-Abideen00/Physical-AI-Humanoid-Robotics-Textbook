# Quickstart: Project Structure

**Feature**: Project Restructure for Deployment
**Date**: 2025-12-17

## New Directory Layout

- **Frontend**: `frontend/` (Docusaurus)
- **Backend**: `backend/` (FastAPI + RAG)

## Running Locally

### Backend

```bash
cd backend
uv sync
uv run uvicorn main:app --reload
```

*Access API at http://localhost:8000/docs*

### Frontend

```bash
cd frontend
npm install
npm start
```

*Access App at http://localhost:3000*

## Deployment (Vercel)

1. **Frontend Project**:
   - Root Directory: `frontend`
   - Framework Preset: Docusaurus 2
   - Build Command: `npm run build`

2. **Backend Project**:
   - Root Directory: `backend`
   - Framework Preset: Other (Python)
   - Build Command: `uv sync` (or custom install)
