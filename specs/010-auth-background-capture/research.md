# Research: Better-Auth Sidecar Architecture

**Feature**: Authentication with User Background Capture
**Status**: Completed
**Date**: 2025-12-22

## 1. Architecture Decision: Sidecar Pattern

**Decision**: Deploy Better-Auth as a standalone Node.js microservice ("Sidecar") alongside the existing Python FastAPI backend.

**Rationale**:
- **Polyglot Constraints**: Better-Auth requires a Node.js runtime. Our primary backend is Python (FastAPI).
- **Security**: The "Sidecar" pattern isolates authentication logic, ensuring the Python backend only validates tokens (stateless verification via JWKS) and doesn't handle sensitive credential operations directly.
- **Scalability**: Auth service can scale independently of the RAG backend.
- **Integration**: Docusaurus (React) can interact directly with the Auth Service for login/signup, while the FastAPI backend remains focused on RAG logic.

**Alternatives Considered**:
- **Python Auth Library (e.g., FastAPI-Users)**: Rejected. Better-Auth offers superior pre-built UI components, social login integrations, and plugin ecosystem that accelerates development, matching the "simplicity first" principle.
- **Embedding Node in Python**: Rejected. Too complex to manage runtimes within a single process.

## 2. Integration Strategy

### Frontend (Docusaurus)
- **Client**: Use `better-auth/react` SDK.
- **Configuration**: Point client to the Auth Service URL (e.g., `http://localhost:3001` or `https://auth.project.com`).
- **Proxying**: No proxying needed if CORS is configured correctly on the Auth Service.

### Backend (FastAPI)
- **Token Verification**: Implement stateless JWT verification using `pyjwt[crypto]`.
- **JWKS Endpoint**: Backend fetches public keys from `Auth Service` -> `/.well-known/jwks.json` to verify signatures.
- **User Context**: Decode JWT to get `sub` (User ID) and inject into request via `Depends(get_current_user)`.

### Database
- **Shared Source**: Both services connect to the same Neon PostgreSQL instance.
- **Schema Separation**:
  - `public` schema: Shared. Better-Auth manages `user`, `session`, `account`.
  - Application tables: `user_profiles`, `chat_sessions` managed by Alembic (Python).

## 3. Data Capture Strategy

**Decision**: Capture background data immediately after account creation (Atomic/Hard Gate).

**Flow**:
1. User signs up (Better-Auth flow).
2. On success, Frontend detects "new user" or "missing profile" state.
3. Frontend presents "Background Questionnaire" (Software/Hardware Context).
4. Frontend submits data to FastAPI (`POST /api/user/profile`).
5. **Critically**: The `user_profiles` table is strictly 1:1 with `users`.

## 4. Unknowns Resolved

- **NEEDS CLARIFICATION (Tech Stack)**: Resolved. Node.js (Hono) for Auth Service, Python (FastAPI) for Resource Server.
- **NEEDS CLARIFICATION (Session Merging)**: Resolved. Frontend will send anonymous `session_id` to FastAPI endpoint `POST /api/chat/session/merge` after successful login.
