# Feature Specification: Project Restructure for Deployment

**Feature Branch**: `008-project-structure`
**Created**: 2025-12-17
**Status**: Draft
**Input**: User description: "We need to deploy this complete project. For that we need a proper structure, right now our backend is in the root directory and frontend in the apps directory. We need to move our backend and rag in different folder and keep the frontend in separate folder. In the root we can just have spec-kit related files and folder. maybe we can keep backend frontend running files in the root so we can run both from the root directory, or we should run these from their separate folder? We also need to add .gitignore with proper content so unecessary and secret files could not pushed on github. Right now we are focusing on best clean structure for easy deployment"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clean Project Structure (Priority: P1)

As a developer or DevOps engineer, I want the project organized into distinct top-level folders for backend and frontend so that deployment pipelines and local development are simplified and isolated.

**Why this priority**: Critical for "easy deployment" and maintaining a clean codebase as requested.

**Independent Test**: Verify file structure and ensure no critical files are left in root (except configuration/docs).

**Acceptance Scenarios**:

1. **Given** the current mixed directory structure, **When** I examine the root directory, **Then** I see only implementation-agnostic files (e.g., `.gitignore`, `.specify`, Global README/Config) and top-level folders (`backend`, `frontend`).
2. **Given** the new structure, **When** I verify `backend/` content, **Then** it contains all server-side logic (API, RAG services).
3. **Given** the new structure, **When** I verify `frontend/` content, **Then** it contains the web application.

---

### User Story 2 - Deployment Readiness (Priority: P1)

As a DevOps engineer, I want to be able to build and run the backend and frontend independently from their respective directories or via root scripts, ensuring the refactor didn't break functionality.

**Why this priority**: Validates that the move didn't break references/imports.

**Independent Test**: Run backend verify/test command and frontend build command.

**Acceptance Scenarios**:

1. **Given** the `frontend` folder, **When** I run `npm install` and `npm run build` (or equivalent), **Then** the application builds successfully without path errors.
2. **Given** the `backend` folder, **When** I install dependencies (e.g., `uv sync`) and start the server, **Then** the API starts and can access RAG services (imports verified).

---

### User Story 3 - Git Hygiene (Priority: P2)

As a developer, I want a proper `.gitignore` so that strict environment variables, caches, and virtual environments are not committed.

**Why this priority**: Security (secrets) and repository cleanliness.

**Independent Test**: Check `git status` after a build/run cycle.

**Acceptance Scenarios**:

1. **Given** a fresh workspace, **When** I generate build artifacts or `.env` files, **Then** `git status` still shows clean or ignores those files.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST have a top-level `frontend` directory containing the contents of the current `apps/web`.
- **FR-002**: System MUST have a top-level `backend` directory.
- **FR-003**: The `backend` directory MUST contain the code currently in `apps/api`, `services`, and root-level python files (`main.py`, `db.py`, etc.).
  - *Note*: Imports in `apps/api` and `services` MUST be updated to reflect the new structure.
- **FR-004**: System MUST have a comprehensive `.gitignore` in the root (and/or subdirectories) that excludes:
  - Python: `.venv`, `__pycache__`, `*.pyc`, `.env`
  - Node: `node_modules`, `.next`, `build`, `dist`, `.env.local`
  - OS: `.DS_Store`, etc.
- **FR-005**: RAG services MUST be located within the `backend/` directory (e.g., `backend/services`) to facilitate unified deployment on platforms like Vercel.
- **FR-006**: Root directory MUST contain necessary runner scripts or configuration (e.g., `package.json` workspaces or a `Makefile`) if requested, OR instructions to run from subdirectories.
  - *Recommendation*: Keep root minimal.

### Key Entities

- **Backend**: Python-based FastAPI application + RAG services (Qdrant, Gemini, etc.).
- **Frontend**: React/Docusaurus web application.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Backend passes a "health check" API call after restructuring.
- **SC-002**: Frontend builds successfully (exit code 0) after restructuring.
- **SC-003**: Repository root file count decreased (moved to subfolders).
- **SC-004**: No sensitive files (env, venv, node_modules) committed to git (verified via `.gitignore`).
