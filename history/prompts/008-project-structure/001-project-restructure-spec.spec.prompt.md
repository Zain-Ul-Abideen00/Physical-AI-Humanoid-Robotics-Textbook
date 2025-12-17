---
id: 001
title: project-restructure-spec
stage: spec
date: 2025-12-17
surface: agent
model: gemini-2.0-flash-exp
feature: project-structure
branch: 008-project-structure
user: Zain-Ul-Abideen00
command: /sp-specify
labels: ["structure", "refactor", "deployment"]
links:
  spec: specs/008-project-structure/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/008-project-structure/spec.md
 - specs/008-project-structure/checklists/requirements.md
tests:
 - spec-validation
---

## Prompt

@[/sp-specify] We need to deploy this complete project. For that we need a proper structure, right now our backend is in the root directory and frontend in the apps directory. We need to move our backend and rag in different folder and keep the frontend in separate folder. In the root we can just have spec-kit related files and folder. maybe we can keep backend frontend running files in the root so we can run both from the root directory, or we should run these from their separate folder? We also need to add .gitignore with proper content so unecessary and secret files could not pushed on github. Right now we are focusing on best clean structure for easy deployment

## Response snapshot

Created feature branch `008-project-structure` and specification `specs/008-project-structure/spec.md`.
Clarified RAG services location: Option A (Unified Backend) selected for compatibility with Vercel deployment.
Spec validation checklist passed.

## Outcome

- ✅ Impact: defined structure for deployment
- 🧪 Tests: validated spec against checklist
- 📁 Files: created spec and checklist
- 🔁 Next prompts: /sp-plan
- 🧠 Reflection: User clarification was essential for folder structure decision.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
