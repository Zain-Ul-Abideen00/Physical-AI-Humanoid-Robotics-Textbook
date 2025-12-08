# Research: Book Content Expansion & Homepage Redesign

**Feature**: `002-content-expansion`
**Date**: 2025-12-07

## 1. Homepage Icons

- **Decision**: Use `react-icons` (specifically FontAwesome 6 subset).
- **Rationale**: Provides the "FontAwesome icons" requested in clarification without loading heavy external CSS. Easy integration with React/Docusaurus.
- **Alternatives Considered**:
  - Static SVGs: Harder to maintain color/size consistency.
  - External CDN: Performance hit, potential blocking by ad blockers.

## 2. Diagram Strategy

- **Decision**: Convert all "placeholder" images to Mermaid.js code blocks where possible.
- **Rationale**: Matches Constitution and Spec requirements for maintainability and "professional" look.
- **Exceptions**: Complex hardware photos (3-Robot Lab) will remain images but optimized.

## 3. Content Reuse for Homepage

- **Decision**: Create `src/content/homepage.json` or `homepage.ts` to store "Why Physical AI Matters" and "Learning Outcomes" data.
- **Rationale**: Keeps `index.tsx` clean (presentation only) and allows easy text updates without touching React code. Matches the "dedicated file" clarification.

## 4. Cross-Linking Strategy

- **Decision**: Use Docusaurus relative links (e.g., `[Link](../../module-1/intro.md)`) for stability.
- **Rationale**: Docusaurus checks these at build time (SC-001 integrity). Avoids hardcoded URLs that break on versioning.

## 5. MDX Usage in Chapters

- **Decision**: Upgrade `.md` files to `.mdx` only where "Feature Cards" or complex "Tabs" are needed.
- **Rationale**: Keep simple chapters as `.md` for portability, upgrade to `.mdx` for interactive elements (Tabs for code snippets).
