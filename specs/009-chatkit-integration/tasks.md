---
description: "Task list for ChatKit integration"
---

# Tasks: ChatKit Integration

**Input**: Design documents from `specs/009-chatkit-integration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install backend dependencies in `backend/requirements.txt`
- [x] T002 Install frontend dependencies in `frontend/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T003 Create `MemoryStore` in `backend/services/chatkit_store.py`
- [x] T004 Create `RAGChatKitServer` in `backend/api/chatkit_routes.py`
- [x] T005 [P] Register `chatkit_router` in `backend/main.py`
- [x] T006 [P] Create `ChatKitWidget` component in `frontend/src/components/ChatKitWidget.tsx`

**Checkpoint**: Foundation ready - basic backend and frontend components exist.

---

## Phase 3: User Story 1 - Interact with AI Assistant (Priority: P1) 🎯 MVP

**Goal**: Enable users to chat with the RAG assistant via a floating widget.

**Independent Test**: Launch app, open widget, send message, receive streaming response.

### Implementation for User Story 1

- [x] T007 [US1] Implement `respond` method in `backend/api/chatkit_routes.py` to bridge `QueryService` and `ChatKit` events
- [x] T008 [US1] Integrate `ChatKitWidget` into `frontend/src/theme/Root.tsx`
- [x] T009 [US1] Configure `ChatKitWidget` with backend URL and theme in `frontend/src/components/ChatKitWidget.tsx`

**Checkpoint**: User Story 1 functional.

---

## Phase 4: User Story 2 - Persistent Chat Session (Priority: P2)

**Goal**: Preserve chat context across page navigation.

**Independent Test**: Refresh page or navigate, verify thread remains.

### Implementation for User Story 2

- [x] T010 [US2] update `ChatKitWidget.tsx` to save/load `threadId` from `localStorage`
- [x] T011 [US2] Update `MemoryStore` to handle thread retrieval correctly (if not already covered)

**Checkpoint**: User Stories 1 AND 2 work.

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T012 Verify `quickstart.md` instructions
- [x] T013 Manual E2E test of full flow

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup.
- **User Stories (Phase 3+)**: Depend on Foundational.

### User Story Dependencies
- **US1 (P1)**: foundational backend/frontend required.
- **US2 (P2)**: Extends US1 widget logic.
