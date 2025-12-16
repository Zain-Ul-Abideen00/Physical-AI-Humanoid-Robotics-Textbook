---
id: 003
title: Resolve OpenAI ChatKit JS Library ID
stage: general
date: 2025-12-10
surface: agent
model: gemini
feature: none
branch: main
user: user
command: "@mcp:context7: resolve-library-id for openai chatkit js"
labels: ["context7", "openai", "chatkit"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - none
tests:
 - none
---

## Prompt

@mcp:context7: resolve-library-id for openai chatkit js

## Response snapshot

Resolved multiple libraries. The most relevant matches are:
- **ChatKit** (`/openai/chatkit-js`) - Benchmark Score: 56.8
- **OpenAI ChatKit** (`/websites/openai_github_io_chatkit-js`) - Benchmark Score: 52.7

I will recommend `/openai/chatkit-js` as it seems to be the main repository.

## Outcome

- ✅ Impact: Resolved library ID for OpenAI ChatKit JS
- 🧪 Tests: N/A
- 📁 Files: 0 files
- 🔁 Next prompts: Expecting get-library-docs
- 🧠 Reflection: User explicitly asked for library resolution

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
