# Feature Specification: ChatKit Integration

**Feature Branch**: `009-chatkit-integration`
**Created**: 2025-12-20
**Status**: Draft
**Input**: User description: "Add OpenAI ChatKit integration to frontend and backend"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Interact with AI Assistant (Priority: P1)

As a reader of the robotics textbook, I want to ask questions to an AI assistant directly on the documentation site so that I can get immediate clarifications without leaving the page.

**Why this priority**: Core value proposition of the feature.

**Independent Test**: Can be tested by launching the frontend and backend, opening the chat widget, typing a question, and verifying a streaming response appears.

**Acceptance Scenarios**:

1. **Given** the documentation site is open, **When** I click the floating "Chat" button, **Then** the chat window opens.
2. **Given** the chat window is open, **When** I type "What is an actuator?" and press Enter, **Then** I see a streaming response with information from the textbook.
3. **Given** the chat window is closed, **When** I click the button again, **Then** the previous conversation history is preserved.

---

### User Story 2 - Persistent Chat Session (Priority: P2)

As a user navigating between different chapters, I want my chat conversation to be preserved so that I don't lose context.

**Why this priority**: Improves user experience by maintaining continuity.

**Independent Test**: Clear browser storage, start chat, navigate to another page, verify chat remains.

**Acceptance Scenarios**:

1. **Given** I have an active chat session on "Chapter 1", **When** I navigate to "Chapter 2", **Then** the chat button remains visible.
2. **Given** I open the chat on "Chapter 2", **When** I view the history, **Then** I see the messages I exchanged on "Chapter 1".

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a floating chat button on the bottom-right of all documentation pages.
- **FR-002**: The chat widget MUST use the "Dark Blue/Neon" theme (Background: `#1a1a2e`, Accent: `#4cc9f0`).
- **FR-003**: The backend MUST expose a `POST /chatkit` endpoint compatible with the `openai-chatkit` protocol.
- **FR-004**: The backend MUST stream responses using Server-Sent Events (SSE).
- **FR-005**: The endpoint MUST use the existing `QueryService` to retrieve relevant textbook context for user queries (RAG).
- **FR-006**: The system MUST store chat threads and items in an in-memory store (for MVP).
- **FR-007**: The frontend MUST persist the `thread_id` in `localStorage` to maintain sessions.

### Key Entities *(include if feature involves data)*

- **Thread**: Represents a conversation session.
    - ID: string (UUID)
    - Metadata: key-value pairs
- **ThreadItem**: A message or event within a thread.
    - ID: string
    - Type: "message" (user/assistant)
    - Content: Text of the message.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users receive a first token response within 2 seconds.
- **SC-002**: The chat widget loads successfully on 100% of documentation pages.
- **SC-003**: Responses include relevant information from the textbook (verified by manual sampling of 5 varied queries).
