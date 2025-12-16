# Implementation Plan - Chat Widget UI + Backend Wiring

**Feature**: Chat Widget UI + Backend Wiring (`chat-widget-wiring`)
**Status**: Planned

## Goal Description

Implement a global, persistent chat widget in the Docusaurus documentation site using the official `@openai/chatkit-react` library. The widget will connect to the local RAG backend.

## User Review Required

> [!NOTE]
> **ChatKit Protocol**: This plan uses `@openai/chatkit-react`. The backend API likely needs to match the ChatKit protocol. I will adjust the Python backend (`apps/api`) to serve the expected endpoints (e.g., `/chat/completions` or `/chatkit/chat`) compatible with the client.

## Proposed Changes

### Web App (`apps/web`)

#### [NEW] [ChatWidget.tsx](file:///d:/GIAIC/Quarter%204/Hackathon/Project%201/humanoid-robotics/apps/web/src/components/ChatWidget.tsx)
- **Purpose**: Wrapper component for `@openai/chatkit-react`.
- **Details**:
  - `import { ChatKit, useChatKit } from '@openai/chatkit-react';`
  - Initialize `useChatKit` with `api: { url: 'http://localhost:8000/chat', domainKey: 'local-dev' }`.
  - Handle expand/collapse logic (ChatKit might handle the window, but we need the bubble trigger if ChatKit is just the window). *Refinement: ChatKit usually provides the full window. I will wrap it in a custom "Launcher" bubble if needed, or check if it has a `launcher` mode.*
  - Style overrides for "Hybrid" theming.

#### [NEW] [Root.tsx](file:///d:/GIAIC/Quarter%204/Hackathon/Project%201/humanoid-robotics/apps/web/src/theme/Root.tsx)
- **Purpose**: Global wrapper.
- **Details**: Mounts `ChatWidget` to ensure persistence.

#### [MODIFY] [package.json](file:///d:/GIAIC/Quarter%204/Hackathon/Project%201/humanoid-robotics/apps/web/package.json)
- **Purpose**: Dependency.
- **Details**: Add `@openai/chatkit-react`.

### API (`apps/api`)

#### [MODIFY] [chat.py](file:///d:/GIAIC/Quarter%204/Hackathon/Project%201/humanoid-robotics/apps/api/routers/chat.py)
- **Purpose**: Adapt endpoint to ChatKit client.
- **Details**:
  - ChatKit likely expects a POST request with specific body.
  - I will verify the request format and ensure `chat_message` handles it.
  - If ChatKit expects structured streaming (data: JSON), ensure our SSE format matches.

## Verification Plan

### Automated Tests
- **Unit**: N/A.
- **Manual**:
  - `npm install` && `npm run start`.
  - Verify ChatKit loads.
  - Send message -> Verify backend receives correct payload.
  - Verify streaming response renders in ChatKit.

### Manual Verification
1. **Visual**: Check if ChatKit styles blend with Docusaurus.
2. **Persistence**: Navigate pages, ensure chat state is preserved.
