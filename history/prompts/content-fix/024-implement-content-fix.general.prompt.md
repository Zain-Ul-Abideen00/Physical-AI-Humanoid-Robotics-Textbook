---
id: 024
title: Implement Content Fix
stage: general
date: 2025-12-07
surface: agent
model: gemini
feature: content-fix
branch: 003-content-fix
user: user
command: /sp.implement
labels: ["implement", "content", "fix", "schedule", "hardware"]
links:
  spec: specs/003-content-fix/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/weeks/week-01.md
  - docs/weeks/week-02.md
  - docs/weeks/week-03.md
  - docs/weeks/week-04.md
  - docs/weeks/week-05.md
  - docs/weeks/week-06.md
  - docs/weeks/week-07.md
  - docs/weeks/week-08.md
  - docs/weeks/week-09.md
  - docs/weeks/week-10.md
  - docs/weeks/week-11.md
  - docs/weeks/week-12.md
  - docs/weeks/week-13.md
  - docs/hardware/intro.md
  - tasks.md
  - prompt_history.md
tests:
  - none
---

## Prompt

/sp.implement (Fix duplicate schedule and expand hardware)

## Response snapshot

Implemented content fixes for "Physical AI & Humanoid Robotics Textbook".
- **Weekly Schedule**: Replaced duplicate "Week 01" pages with unique content for Weeks 1-13, accurately reflecting the syllabus topics (ROS 2, Gazebo, Isaac, Humanoid Dev).
- **Hardware Guide**: Expanded `docs/hardware/intro.md` with detailed specifications for Workstations, Edge Kits, and Robot Lab options (A/B/C) + Cloud options.

## Outcome

- ✅ Impact: Syllabus is now accurate and hardware requirements are comprehensive.
- 🧪 Tests: N/A (Content update).
- 📁 Files: Updated 14 markdown files.
- 🔁 Next prompts: Polish/Linting.
- 🧠 Reflection: Direct mapping from source text to markdown ensured accuracy.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None
