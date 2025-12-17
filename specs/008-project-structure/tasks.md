# Tasks: Project Restructure for Deployment

**Branch**: `008-project-structure` | **Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

## 1. Setup Phase
- [x] **Task 1.1**: Update `.gitignore` [P]
  - **Description**: Add comprehensive ignores for Python, Node, and OS files to root `.gitignore`.
  - **Files**: `.gitignore`
  - **Step**: Modify `.gitignore` with new patterns.

- [x] **Task 1.2**: Update `README.md` [P]
  - **Description**: Update documentation to reflect new directory structure.
  - **Files**: `README.md`
  - **Step**: Update build/run instructions for `frontend/` and `backend/`.

## 2. Backend Restructure
- [x] **Task 2.1**: Create Backend Directory [P]
  - **Description**: Initialize `backend/` folder and basic config.
  - **Files**: `backend/`, `backend/requirements.txt`, `backend/pyproject.toml`
  - **Step**: Create directory. Move/create config files.

- [x] **Task 2.2**: Move API and Services
  - **Description**: Move `apps/api` contents and `services/` contents to `backend/`.
  - **Files**: `apps/api/`, `services/`, `backend/api/`, `backend/services/`
  - **Step**:
    1. Move `apps/api/routers` to `backend/api/`.
    2. Move `services/` to `backend/services/`.
    3. Move `main.py` (root) to `backend/main.py` (or create new).

- [x] **Task 2.3**: Fix Imports
  - **Description**: Update Python imports in `backend/` to work with new structure.
  - **Files**: `backend/**/*.py`
  - **Step**:
    - Change `from apps.api.routers` to `from backend.api` or relative imports.
    - Change `from services` to `from backend.services` (if running as module) or ensure path correctness.
    - *Decision*: We will treat `backend` as the python package root. So `from services` might work if running from `backend/`.

## 3. Frontend Restructure
- [x] **Task 3.1**: Move Frontend Directory
  - **Description**: Move `apps/web` to `frontend`.
  - **Files**: `apps/web/`, `frontend/`
  - **Step**: Rename `apps/web` to `frontend`.

## 4. Cleanup
- [x] **Task 4.1**: Remove Old Directories
  - **Description**: Remove empty `apps/`, `services/` (if exist), and root python files.
  - **Files**: `apps/`, `services/`, `main.py`, `db.py`, `config.py`
  - **Step**: Delete old paths after verification.

## 5. Verification
- [x] **Task 5.1**: Verify Backend Startup
  - **Description**: Ensure backend starts in new location.
  - **Step**: Run `uv run uvicorn main:app` in `backend/`.

- [x] **Task 5.2**: Verify Frontend Build
  - **Description**: Ensure frontend builds in new location.
  - **Step**: Run `npm run build` in `frontend/`.
