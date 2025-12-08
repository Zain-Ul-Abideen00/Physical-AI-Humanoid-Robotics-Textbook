# Research: Fix Content Duplication & Expand Hardware

**Feature**: `003-content-fix`
**Date**: 2025-12-07

## 1. Weekly Schedule Content Source

- **Decision**: Directly use the "Weekly Breakdown" section from `@content/Physical AI & Humanoid Robotics Textbook.md`.
- **Rationale**: This ensures consistency and accuracy with the provided syllabus.
- **Alternatives Considered**: Creating new content (rejected: user specified using provided content).

## 2. Hardware Guide Content Source

- **Decision**: Directly use the "Hardware Requirements" section from `@content/Physical AI & Humanoid Robotics Textbook.md`.
- **Rationale**: Provides comprehensive details as requested by the user.
- **Alternatives Considered**: Summarizing the content (rejected: user requested detailed expansion).

## 3. Link Handling

- **Decision**: Cross-reference existing content where appropriate (e.g., linking weekly topics to module intros).
- **Rationale**: Improves navigability and content cohesion.

## 4. Markdown Formatting

- **Decision**: Adhere to existing markdownlint rules and manually verify complex tables/code blocks.
- **Rationale**: Ensures consistency and avoids new linting errors.