# Tasks: Authentication with User Background Capture

**Feature**: `010-auth-background-capture`
**Status**: Pending

## Dependencies

1.  **Phase 1 (Setup)**: Must complete before any other phase.
2.  **Phase 2 (Foundation)**: Must complete before User Stories.
3.  **Phase 3 (US1)** -> **Phase 4 (US2)**: Profile capture depends on basic auth, but can be built in parallel if stubbed. We will treat them as loosely sequential.
4.  **Phase 5 (US3)**: Dependent on US1/US2 (need persistence).
5.  **Phase 6 (US4)**: Dependent on all previous.

## Phase 1: Setup

Goal: Initialize the `auth-service` and prepare the monorepo for multi-service execution.

- [x] T001 Initialize `auth-service` directory with Hono/Better-Auth scaffolding in `auth-service/`
- [x] T002 Configure `auth-service/package.json` with dependencies (`better-auth`, `hono`, `pg`, `dotenv`)
- [x] T003 Configure `auth-service/tsconfig.json` for NodeNext module resolution
- [x] T004 Create `auth-service/src/index.ts` with Hono server and basic Better-Auth config
- [x] T005 Install `better-auth/react` in `frontend/`
- [x] T006 Add `pyjwt[crypto]` to `backend/pyproject.toml` (or `requirements.txt`)

## Phase 2: Foundation

Goal: Database schema and Environment configuration for the "Railway Duo".

- [x] T007 Configure `.env` files for `auth-service`, `backend`, and `frontend` (Secrets, URLs)
- [x] T008 [P] Run Better-Auth migrations to create `user`, `session` tables in Neon (via `auth-service`)
- [x] T009 [P] Create Alembic migration for `user_profiles` table in `backend/database/versions/` (Replaced with manual script)
- [x] T010 Apply Alembic migrations to Neon database (Executed script)

## Phase 3: User Story 1 - Sign Up & Background Capture (P1)

Goal: Users can sign up and are immediately required to complete their profile.

**Frontend**:
- [x] T011 Create `frontend/src/lib/auth-client.ts` wrapper
- [x] T012 Implement `SignUpForm.tsx` component in `frontend/src/components/Auth/`
- [x] T013 Implement `BackgroundQuestionnaire.tsx` with predefined dropdowns (Hard Gate)
- [x] T014 Create `AuthPage.tsx` container handling the "Signup -> Questionnaire" flow

**Backend**:
- [x] T015 Create Pydantic models for Profile (`schemas/profile.py`) matching `data-model.md`
- [x] T016 Create `backend/api/deps.py` with `get_current_user` using `pyjwt[crypto]` and JWKS caching
- [x] T017 Create `backend/api/auth.py` with `POST /api/user/profile` endpoint, updating `user_profiles` table
- [x] T018 Wire up `auth.router` in `backend/main.py`

**Integration**:
- [x] T019 Connect `BackgroundQuestionnaire` to `POST /api/user/profile` using `auth-client` token

## Phase 4: User Story 2 - Sign In (P1)

Goal: Users can sign in using Email/Pass or Social Providers.

- [x] T020 Implement `SignInForm.tsx` in `frontend/src/components/Auth/`
- [x] T021 Add Login/Logout buttons to Navbar (Added via `docusaurus.config.ts`)
- [x] T022 Verify `get_current_user` correctly extracts User ID (Verified in Phase 3 debugging)

## Phase 5: User Story 3 - Anonymous Usage Preservation (P1)

Goal: Merge anonymous chat activity into the new user's account upon login.

- [x] T023 [P] Modify `backend/api/chatkit_routes.py` to accept `bearerAuth` (Optional - handled via auth.py dependency)
- [x] T024 Implement `POST /api/chatkit/merge` in `backend/api/auth.py` (Implemented as stub for now)
- [x] T025 Update `ChatKitWidget.tsx` to expose `threadId` via Context or Callback (Bypassed: using localStorage 'chatkit-thread-id')
- [x] T026 Update `AuthPage.tsx` (or `auth-client.ts` hook) to call `/merge` after successful login

## Phase 6: User Story 4 - Contextualized Chat (P2)

Goal: Chat capabilities are reliably linked to the authenticated user.

- [-] T027 Verify `chat_sessions` table has valid `user_id` populated for new chats (Deferred: ChatKit currently uses MemoryStore; RAG Context has `user_id` injected)
- [x] T028 Update `chatkit_routes.py` to inject `user_id` into RAG Agent context (if available)

## Final Phase: Polish

- [x] T029 Clean up any temporary files (Moved debug scripts to `backend/scripts/debug/`)
- [ ] T030 Final Manual Test Run (Quickstart walkthrough)
