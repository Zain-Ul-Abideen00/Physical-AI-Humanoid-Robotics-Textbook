# Implementation Plan: Project Restructure for Deployment

**Branch**: `008-project-structure` | **Date**: 2025-12-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/008-project-structure/spec.md`

## Summary

Restructure the repository into clear `frontend/` and `backend/` top-level directories to facilitate separate or unified deployment pipelines (specifically targeting Vercel). Consolidate all Python code (API + Services) into `backend/` and move Docusaurus app to `frontend/`. Clean up root directory.

## Technical Context

**Language/Version**: Python 3.12 (Backend), Node/TypeScript (Frontend)
**Primary Dependencies**: FastAPI, LangChain, Qdrant Client, Gemini/Google GenAI, Docusaurus.
**Target Platform**:
- **Frontend**: Vercel (Recommended) or GitHub Pages.
- **Backend/RAG**: Vercel Serverless (Primary target, subject to timeout limits), Fallback to Railway/Render.
**Project Type**: Monorepo with distinct frontend/backend roots.
**Constraints**:
- **Vercel Serverless**: 250MB bundle size limit, 10s default timeout (requires optimization).
- **Security**: Must fix `.gitignore` to prevent secret leakage.

## Constitution Check

*GATE: Pass.*
- **Monorepo Structure**: Constitution specifies `apps/web` and `apps/api`. This plan *modifies* that structure to `frontend/` and `backend/` as per user request (Deployment Optimization). This is a valid deviation for operational simplicity.
- **Tech Stack**: No changes to core stack (FastAPI, Docusaurus).

## Project Structure

### Documentation (this feature)

```text
specs/008-project-structure/
├── plan.md
├── research.md
├── checklists/
│   └── requirements.md
└── spec.md
```

### Source Code (repository root)

```text
root/
├── frontend/                 # Moved from apps/web
│   ├── src/
│   ├── docusaurus.config.ts
│   └── package.json
├── backend/                  # Moved from apps/api + services + root-scripts
│   ├── main.py               # Entry point
│   ├── api/                  # Routers (chat, ingest, query)
│   ├── services/             # RAG logic (ingest, query, embedding, vector_store)
│   ├── pyproject.toml        # Unified python config
│   └── requirements.txt      # Exported for Vercel
├── .gitignore                # Updated
└── README.md
```

**Structure Decision**:
- **Backend Consolidation**: `apps/api/routers` -> `backend/api`. `services/*` -> `backend/services`. Root `main.py` -> `backend/main.py`.
- **Frontend Move**: `apps/web` -> `frontend`.
- **Root Cleanup**: Remove `apps/`, `services/`, `main.py` (after move).

## User Review Required

> [!IMPORTANT]
> **Deployment Strategy**: We are optimizing for Vercel.
> - **Frontend**: Can point Vercel project to `frontend/` root.
> - **Backend**: Can point Vercel project to `backend/` root. Vercel automatically detects `requirements.txt` or `pyproject.toml`.
> - **Risk**: RAG timeouts on Vercel. If this handles heavy processing, we might need to move Backend to Render later. The structure supports both.

## Proposed Changes

### Root Configuration

#### [MODIFY] [.gitignore](file:///d:/GIAIC/Quarter 4/Hackathon/Project 1/humanoid-robotics/.gitignore)
- Update to include comprehensive ignores for both Python (`.venv`, `__pycache__`) and Node (`node_modules`) at all levels.

#### [NEW] [README.md](file:///d:/GIAIC/Quarter 4/Hackathon/Project 1/humanoid-robotics/README.md)
- Update build/run instructions to reflect new paths.

### Backend Restructure (`backend/`)

#### [NEW] backend/pyproject.toml
- Move/consolidate configuration.

#### [NEW] backend/main.py
- Entry point for FastAPI.

#### [NEW] backend/services/
- Move all content from `services/` here.

#### [NEW] backend/api/
- Move all routers from `apps/api/routers` here.

### Frontend Restructure (`frontend/`)

#### [MOVE] apps/web -> frontend
- Move entire directory.

## Verification Plan

### Automated Tests
1. **Frontend Build**: `cd frontend && npm install && npm run build` (Must pass).
2. **Backend Startup**: `cd backend && uv sync && uv run uvicorn main:app` (Must start without import errors).
3. **Git Hygiene**: `git status` check for ignored files.

### Manual Verification
1. Verify `http://localhost:8000/docs` loads.
2. Verify Chat Widget works on local frontend (`localhost:3000`).
