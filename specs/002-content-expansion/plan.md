# Implementation Plan: Book Content Expansion & Homepage Redesign

**Branch**: `002-content-expansion` | **Date**: 2025-12-07 | **Spec**: [specs/002-content-expansion/spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-content-expansion/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Comprehensive redesign of the project homepage and expansion of textbook content to professional standards. Key deliverables include a new Hero section, Module Feature Cards, and expanded chapters with diagrams, summaries, and "What's Next?" navigation.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Docusaurus 3.9, React 18, Mermaid.js, FontAwesome (via React icons or CDN)
**Storage**: Static Markdown/MDX, JSON data for homepage content
**Testing**: Markdown linting, Link checking, Build verification
**Target Platform**: GitHub Pages
**Project Type**: Web application (Static Site Generator)
**Performance Goals**: FCP < 1.5s, optimized images
**Constraints**: Must respect existing Docusaurus structure; maintain existing deep links
**Scale/Scope**: 4 Modules, ~20 Chapters to expand, 1 Homepage redesign

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Spec-Driven Content**: ✅ Spec exists and is approved.
- **II. Content Quality & Validation**: ✅ Plan focuses on quality expansion and validation.
- **III. Modular Structure**: ✅ Reinforces modular structure with better navigation.
- **IV. Documentation is the Product**: ✅ Direct improvement of the product.
- **V. Interactive Learning**: ✅ Adding diagrams and better navigation supports this.
- **Project Metadata**: ✅ Alignment with project goals.
- **Tech Stack Governance**: ✅ Compliant with Docusaurus 3.9.
- **Agent Execution**: ✅ Follows standard workflow.

## Project Structure

### Documentation (this feature)

```text
specs/002-content-expansion/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
/
├── docs/
│   ├── modules/                 # Expanded chapter content
│   ├── hardware/                # Expanded hardware guides
│   ├── weeks/                   # Updated weekly schedule
│   └── intro.md                 # (To be replaced/integrated into homepage)
├── src/
│   ├── components/
│   │   ├── HomepageFeatures/    # New feature cards
│   │   ├── Hero/                # New Hero component
│   │   └── LearningOutcomes/    # New Outcomes component
│   ├── pages/
│   │   └── index.tsx            # Redesigned Homepage
│   └── css/
│       └── custom.css           # Styling for new components
├── static/
│   └── img/
│       ├── hero/                # Hero assets
│       └── icons/               # Feature icons
├── docusaurus.config.ts         # Updated config (if needed)
└── package.json                 # New dependencies (icons)
```

**Structure Decision**: Keep core content in `docs/` but leverage `src/components` for the rich homepage layout to maintain separation of concerns.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
