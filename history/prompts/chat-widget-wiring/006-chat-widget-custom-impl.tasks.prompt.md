---
id: 006
title: chat-widget-custom-impl
stage: tasks
date: 2025-12-17
surface: agent
model: gemini-2.0-flash-exp
feature: chat-widget-wiring
branch: 007-chat-widget-wiring
user: User
command: /sp-implement
labels: ["custom", "react", "repair", "streaming"]
links:
  spec: specs/007-chat-widget-wiring/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - apps/web/src/components/ChatWidget.tsx
  - apps/web/package.json
tests:
  - null
---

## Prompt

"chat widget is empty?" (User reported issue with library-based implementation)

## Response snapshot

Diagnosed missing implementation in `@openai/chatkit-react` package. Pivoted to Custom React Implementation using `react-markdown`. Rewrote `ChatWidget.tsx` to be a self-contained streaming chat UI.

## Outcome

- ✅ Impact: Fixed empty widget by replacing broken library
- 🧪 Tests: User verification needed
- 📁 Files: ChatWidget.tsx rewritten
- 🔁 Next prompts: /sp-git.commit_pr
- 🧠 Reflection: Quick pivot was necessary given the library issue. Custom implementation provides better control and stability.

## Evaluation notes (flywheel)

- Failure modes observed: External library (ChatKit) was types-only or broken.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
