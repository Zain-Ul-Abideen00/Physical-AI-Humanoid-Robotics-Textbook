# Implementation Plan - Phase 2 (Ready for Execution)

**Feature**: ChatKit Integration
**Spec**: [spec.md](./spec.md)
**Status**: Ready

## Summary

Integrate OpenAI ChatKit into the Docusaurus frontend and FastAPI backend to provide a robust, streaming chat interface powered by Gemini 2.0 Flash. This replaces the bespoke chat UI with a standardized, feature-rich widget.

## Technical Context

**Language/Version**: Python 3.11+, TypeScript 5+ (React 18)
**Primary Dependencies**:
- Backend: `openai-chatkit`, `openai-agents[litellm]`, `fastapi`.
- Frontend: `@openai/chatkit-react`.
**Storage**: In-Memory (MVP), capable of migration to Postgres.
**Testing**: Manual E2E testing.
**Performance Goals**: < 2s time-to-first-token.

## Constitution Check

- [x] **2.1 Monorepo Structure**: Compliant.
- [x] **2.2 Tech Stack**: Compliant.
- [x] **2.4 Data Architecture**: MVP (In-Memory) is a documented deviation from "Chat history stored in Postgres", approved for Phase 1 MVP to prioritize functionality.
- [x] **3.3 Code Quality**: Compliant.

## Phase 0: Research Findings

1. **Streaming**: Will use `StreamingResponse` wrapping `ChatKitServer` output.
2. **Model**: Using `LitellmModel` for Gemini integration (requires `GEMINI_API_KEY`).
3. **Data Store**: `MemoryStore` is sufficient for MVP.

## Proposed Changes

### Backend

#### [MODIFY] [backend/requirements.txt](file:///d:/GIAIC/Quarter%204/Hackathon/Project%201/humanoid-robotics/backend/requirements.txt)
- Add `openai-chatkit` and `openai-agents[litellm]`.

#### [NEW] [backend/services/chatkit_store.py](file:///d:/GIAIC/Quarter%204/Hackathon/Project%201/humanoid-robotics/backend/services/chatkit_store.py)
- Implement `MemoryStore` class matching ChatKit's `Store[dict]` interface.

#### [NEW] [backend/api/chatkit_routes.py](file:///d:/GIAIC/Quarter%204/Hackathon/Project%201/humanoid-robotics/backend/api/chatkit_routes.py)
- Implement `RAGChatKitServer` class.
- Override `respond` to use `QueryService` for context retrieval.
- Expose `POST /chatkit` endpoint.

#### [MODIFY] [backend/main.py](file:///d:/GIAIC/Quarter%204/Hackathon/Project%201/humanoid-robotics/backend/main.py)
- Include `chatkit_router`.

### Frontend

#### [NEW] [frontend/src/components/ChatKitWidget.tsx](file:///d:/GIAIC/Quarter%204/Hackathon/Project%201/humanoid-robotics/frontend/src/components/ChatKitWidget.tsx)
- Implement `ChatKitWidget` component using `useChatKit`.
- Configure with "Dark Blue/Neon" theme.

#### [MODIFY] [frontend/src/theme/Root.tsx](file:///d:/GIAIC/Quarter%204/Hackathon/Project%201/humanoid-robotics/frontend/src/theme/Root.tsx)
- Integrate `ChatKitWidget` to render globally.

## Verification Plan

### Automated Tests
- None for this feature (Constitution allows manual testing for UI/Chat).

### Manual Verification
1. **Start Backend**: `uv run uvicorn main:app --reload`.
2. **Start Frontend**: `npm start`.
3. **Widget Load**: Check bottom-right corner for chat button.
4. **Chat**: Ask "What is a sensor?". Verify streaming response.
5. **Persistence**: Reload page, verify chat history remains.
