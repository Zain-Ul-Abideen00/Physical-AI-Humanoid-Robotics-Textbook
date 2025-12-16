# Research: Chat Widget UI + Backend Wiring

**Status**: Complete
**Date**: 2025-12-17

## Decisions

### 1. Integration Method for Docusaurus
- **Decision**: implementation via `src/theme/Root.tsx`.
- **Rationale**: Docusaurus allows wrapping the entire application by creating a `Root` component in the theme folder. This is the standard way to inject global providers or persistent UI elements like a chat widget that persist across persistent navigation.

### 2. Frontend Chat Library
- **Decision**: Use `@openai/chatkit-react`.
- **Rationale**: User explicitly requested OpenAI ChatKit. Found successfully via Context7. It provides a `ChatKit` component and `useChatKit` hook.
- **Implementation Details**:
  - Install `@openai/chatkit-react`.
  - Use `useChatKit` hook to initialize with backend URL (`http://localhost:8000/chatkit`) and `domainKey`.
  - Render `<ChatKit control={control} />`.
  - Customize using `options` in `useChatKit` (header, theme, etc.) for the Hybrid persistence/theme requirements.
  - **Note**: The backend URL `/chatkit` suggests a specific protocol. I will need to ensure the backend implements the endpoints ChatKit expects, or check if it handles standard streaming. *Self-correction*: If ChatKit expects a specific server protocol, I might need to adapt my `/chat` endpoint to match it or use a "custom client" adapter if supported. For now, I'll aim to point it to my backend and investigate the expected protocol during implementation.

### 3. Backend Connection
- **Decision**: Update backend to support ChatKit protocol if needed, or point ChatKit to standard SSE.
- **Rationale**: ChatKit likely expects a specific response format.
- **Refinement**: I will start by pointing it to `http://localhost:8000` and see what it attempts to fetch (likely POST `/chatkit/chat` or similar). I will check `apps/api` requirements later.
- **Hypothesis**: ChatKit probably uses a defined API contract. I'll need to research "ChatKit backend protocol" or "advanced integration" if standard SSE doesn't work out of the box.

## Unknowns & Risks

- **Backend Protocol**: Does `@openai/chatkit-react` work with a generic SSE endpoint or does it require a specific OpenAI-compatible schema?
- **Mitigation**: I will inspect the network requests during the frontend verification phase and adapt the backend router (`apps/api/routers/chat.py`) to match what the client sends.
