# Tasks: Chat Widget UI + Backend Wiring

**Feature**: Chat Widget UI + Backend Wiring (`chat-widget-wiring`)
**Status**: Complete

## Phase 1: Setup

- [x] T001 Install `@openai/chatkit-react` dependency (Note: Library failed, switched to custom)
- [x] T002 Create global styling variables
- [x] T003 Ensure CORS is configured
- [x] T014 Install `react-markdown` `remark-gfm` for Custom UI

## Phase 2: User Story 1 & 2 - Custom Chat Widget

- [x] T004 Create `ChatWidget.tsx` (Launcher shell)
- [x] T005 Implement "Launcher" logic
- [x] T006 Create `Root.tsx` to mount globally
- [x] T015 Rewrite `ChatWidget.tsx` to implement custom Chat UI (Message list, Input, Streaming logic)
- [x] T016 Implement Markdown rendering in Chat UI

## Phase 3: Backend Integration

- [x] T008/T009 Backend adapted (Compatible with custom message format)
- [x] T010 Configure API URL in Custom Widget
- [x] T011 Verify streaming format

## Phase 4: Polish

- [x] T012 CSS Overrides (Implicit in Custom UI code)
- [x] T013 Error Handling (Implemented in T015)
