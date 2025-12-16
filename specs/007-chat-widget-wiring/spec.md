# Feature Specification: Chat Widget UI + Backend Wiring

**Feature Branch**: `007-chat-widget-wiring`
**Created**: 2025-12-17
**Status**: Draft
**Input**: Chat Widget UI + Backend Wiring

## Clarifications

### Session 2025-12-17
- Q: Chat Persistence Level → A: **Session-based** (sessionStorage): Survives navigation and page reloads. Cleared when tab closes.
- Q: Widget Theming → A: **Hybrid**: Use defaults but override primary colors/fonts to match site.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Access Chat Widget (Priority: P1)

As a reader, I want to access a chat widget from any page so that I can ask questions about the robotics content.

**Why this priority**: Essential entry point for the feature. Without the UI, the feature is inaccessible.

**Independent Test**: Verify the widget icon appears on all pages and expands on click, even if backend is disconnected.

**Acceptance Scenarios**:

1. **Given** I am on the home page, **When** I look at the bottom right, **Then** I see a chat bubble icon.
2. **Given** I am on a specific documentation page (e.g. Module 1), **When** I look at the bottom right, **Then** I see the chat bubble icon.
3. **Given** the chat bubble is visible, **When** I click it, **Then** the chat window opens/expands.
4. **Given** the chat window is open, **When** I click the close/minimize button, **Then** it collapses back to the bubble.

---

### User Story 2 - Real-time Chat Interaction (Priority: P2)

As a reader, I want to send messages and receive streaming responses so that I get immediate feedback on my specific questions.

**Why this priority**: Core functionality of the widget.

**Independent Test**: Mock the backend response and verify the UI handles streaming and markdown update.

**Acceptance Scenarios**:

1. **Given** the chat window is open, **When** I type "What is VLA?" and press Send, **Then** the input clears and my message appears in the history.
2. **Given** I sent a message, **When** the backend starts responding, **Then** I see the text appearing token-by-token (streaming) in real-time.
3. **Given** the response contains Markdown (bold, code blocks), **When** it renders, **Then** it is correctly formatted.
4. **Given** the backend is offline or returns an error, **When** I send a message, **Then** I see a friendly error message in the widget.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST render a globally available chat widget on the documentation site using `OpenAI ChatKit` components with specific theme overrides to match the site (Hybrid theming).
- **FR-002**: The widget MUST be toggleable (expand/collapse) and persistent across page navigations using `sessionStorage` (cleared on tab close).
- **FR-003**: The widget MUST connect to the backend chat API (e.g. `/chat`) to send user queries and receive streaming responses.
- **FR-004**: The system MUST support standard chat features: text input, submit button (or Enter key), and scrollable message history.
- **FR-005**: The UI MUST render Markdown content in AI responses.
- **FR-006**: The widget MUST handle loading states (e.g. typing indicator) before the stream begins.
- **FR-007**: The widget MUST handle error states gracefully (e.g. network failure).

### Key Entities

- **ChatMessage**: Represents content, role (user/assistant), and timestamp.
- **ChatState**: Manages the list of messages, loading status, and input value.

### Edge Cases

- **Network Failure**: If the network drops while streaming, the widget must show an error and allow retrying the last message.
- **Empty Input**: User attempts to send an empty message (should be disabled).
- **Backend Unavailable**: If the backend service is down, the widget should display a "Service Unavailable" message.
- **Large Responses**: If the response is very long, the widget should handle scrolling gracefully.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Chat widget is visible and interactive on 100% of the documentation pages.
- **SC-002**: Users can send a message and see the response start streaming within <1 second of backend response (minimal UI latency).
- **SC-003**: Markdown content (headers, lists, code) in responses is rendered correctly in the widget.
- **SC-004**: Widget successfully connects to the local backend API and performs a full conversation turn.
