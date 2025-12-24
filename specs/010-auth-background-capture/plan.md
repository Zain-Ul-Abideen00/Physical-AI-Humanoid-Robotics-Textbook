# Implementation Plan: Authentication with User Background Capture

**Branch**: `010-auth-background-capture` | **Date**: 2025-12-22 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/010-auth-background-capture/spec.md`

## Summary

Implement a **Sidecar Authentication Architecture** using Better-Auth (Node.js) alongside the existing FastAPI backend. The rollout includes:
1.  **Auth Service**: A standalone Node.js service handling Signup/Signin/Sessions.
2.  **frontend Integration**: Docusaurus connects to Auth Service via `better-auth/react`.
3.  **Backend Verification**: FastAPI verifies tokens statelessly via JWKS.
4.  **Profile Capture**: A "Hard Gate" flow requiring new users to complete a software/hardware background questionnaire immediately after signup.
5.  **Session Merging**: Migrating anonymous ChatKit history (`/api/chatkit/merge`) to the newly authenticated user.

## Technical Context

**Language/Version**: Python 3.12 (Backend), Node.js 20+ (Auth Service), TypeScript 5.0+ (Frontend)
**Primary Dependencies**:
- Backend: `fastapi`, `pyjwt[crypto]`, `sqlalchemy`, `alembic`
- Auth Service: `better-auth`, `hono`, `pg`
- Frontend: `better-auth/react`
**Storage**: Neon Postgres (Shared). Backend manages `user_profiles`, `chat_sessions`. Auth Service manages `user`, `session`, `account`.
**Testing**: `pytest` for Backend auth verification. Manual testing for Frontend flow.
**Target Platform**: Railway/Render (Multi-service deployment)
**Project Type**: Web Application (Monorepo: Frontend + Backend + Auth Service)
**Performance Goals**: Auth check < 10ms (stateless). Profile creates < 200ms.
**Constraints**: Must run side-by-side with Docusaurus on localhost.
**Scale/Scope**: ~1000s of users.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Monorepo Structure**: respecting `backend/` and `frontend/`. Adding `auth-service/` as a sibling (permissible deviation for Sidecar pattern).
- [x] **Tech Stack**: Using **Better-Auth** as mandated by spec and constitution.
- [x] **Database**: Using **Neon Postgres** (Shared) as mandated.
- [x] **Security**: Stateless JWT verification (Constitution 2.2).
- [x] **No Docker**: Using native `package.json` / `uv` setups for deployment.

## Project Structure

### Documentation (this feature)

```text
specs/010-auth-background-capture/
├── plan.md              # This file
├── research.md          # Architecture decisions (Sidecar)
├── data-model.md        # Database schema details
├── quickstart.md        # Developer guide
├── contracts/
│   └── api-schema.yaml  # OpenAPI spec for Profile/Merge APIs
└── checklists/          # spec quality checklist
```

### Source Code (repository root)

```text
# Root structure
project-root/
├── auth-service/     # [NEW] Node.js Service for Better-Auth
│   ├── src/
│   │   └── index.ts  # Hono server
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── api/
│   │   ├── auth.py          # [NEW] Profile & Merge endpoints
│   │   ├── chatkit_routes.py # [MODIFY] Add auth dependency to /chatkit
│   │   └── deps.py          # [NEW] Auth dependency (get_current_user)
│   ├── schemas/             # Pydantic models for Profile
│   └── database/            # Alembic migrations for user_profiles
└── frontend/
    ├── src/
    │   ├── lib/      # auth-client.ts
    │   ├── components/Auth/ # Signup/Signin/Profile Forms
    │   └── theme/    # Navbar (Login/Logout buttons)
```

**Structure Decision**: **Option 2 (Web App)** modified. We are adding `auth-service` as a top-level directory to maintain clear separation of concerns (Polyglot Monorepo).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| New Service (`auth-service`) | Better-Auth requires Node.js runtime, backend is Python. | Using a Python-native auth lib rejected per "User Experience Excellence" (Better-auth provides better social/UI primitives). |
