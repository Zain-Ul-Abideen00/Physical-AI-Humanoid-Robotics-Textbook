---
id: 002
title: List GitHub Repositories
stage: general
date: 2025-12-10
surface: agent
model: gemini
feature: none
branch: main
user: user
command: "@mcp:github: list my repositories names"
labels: ["github", "repositories"]
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

@mcp:github: list my repositories names

## Response snapshot

Found 24 repositories for user Zain-Ul-Abideen00. Here are some of them:
- Zain-Ul-Abideen00
- Nicke-Clone
- Steplo
- Portfolio
- premium-lifestyle-footwear-marketplace
- Python-Projects
- Physical-AI-Humanoid-Robotics-Textbook
- Blog
- Hover-Cards
- Steplo2

## Outcome

- ✅ Impact: Listed user's GitHub repositories
- 🧪 Tests: N/A
- 📁 Files: 0 files
- 🔁 Next prompts: Wait for user instruction
- 🧠 Reflection: Successfully used mcp_github_search_repositories

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
