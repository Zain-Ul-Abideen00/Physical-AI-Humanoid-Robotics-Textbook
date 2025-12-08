# Implementation Plan: Fix Content Duplication & Expand Hardware

**Branch**: `003-content-fix` | **Date**: 2025-12-07 | **Spec**: [specs/003-content-fix/spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-content-fix/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan addresses two critical content issues: fixing the repetitive weekly schedule content and significantly expanding the hardware requirements page. Content will be sourced directly from the provided `Physical AI & Humanoid Robotics Textbook.md` document to ensure accuracy and detail.

## Technical Context

**Language/Version**: Markdown, Docusaurus Frontmatter
**Primary Dependencies**: Existing Docusaurus 3.9 project
**Storage**: Markdown files in `docs/weeks/` and `docs/hardware/`
**Testing**: Manual content verification, `npm run build` (link checking), markdown linting
**Target Platform**: GitHub Pages (Static Web Hosting)
**Project Type**: Content Update
**Performance Goals**: Maintain existing FCP < 1.5s
**Constraints**: Must use provided content verbatim; maintain Docusaurus markdown/frontmatter standards
**Scale/Scope**: 13 weekly schedule files, 1 hardware guide file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Spec-Driven Content**: ✅ Spec exists and is approved (`specs/003-content-fix/spec.md`).
- **II. Content Quality & Validation**: ✅ Plan includes manual verification, build validation, and markdown linting.
- **III. Modular Structure**: ✅ Updates existing modular structure; no new top-level modules.
- **IV. Documentation is the Product**: ✅ Directly improves content quality.
- **V. Interactive Learning**: ✅ Ensures accurate and detailed information for learners.
- **Project Metadata**: ✅ Content updates align with textbook's purpose.
- **Tech Stack Governance**: ✅ Complies with Docusaurus Markdown standards.
- **Agent Execution**: ✅ Follows standard workflow.

## Project Structure

### Documentation (this feature)

```text
specs/003-content-fix/
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
│   ├── weeks/                   # Updated weekly content (week-01 to week-13)
│   └── hardware/                # Updated hardware guide (intro.md)
├── .markdownlint.json          # For linting
└── package.json                 # For npm scripts (lint, build)
```

**Structure Decision**: No new directory structures or components are introduced. Existing content files will be updated.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Architecture Plan

### New Homepage Layout Architecture
N/A - The homepage is not directly affected by this feature.

### Components Needed
N/A - This feature focuses on content updates, not new components.

### Required Images/Icons
- Placeholder images already exist for hardware. No new images/icons are strictly required for this content update.

### Updated Folder Structure (if any)
N/A - Existing `docs/weeks/` and `docs/hardware/` structure will be utilized.

### Placement of Module Cards, Hero, Feature Sections
N/A - Homepage elements are outside the scope of this content fix.

## Book Content Expansion Plan

### Exact List of Chapters to Expand
- `docs/weeks/week-01.md` through `docs/weeks/week-13.md`
- `docs/hardware/intro.md`

### Structure of New Sections to Add
- **Weekly Breakdown**: Each `week-XX.md` will follow a structure similar to `Week 01`, but with content specific to that week's topics. It will include:
    - Main heading (H1) for the week.
    - "Goals for this Week" (H2).
    - "Schedule" (H2) with a table mapping days to topics and relevant resources.
    - "Assignments" (H2).
- **Hardware Requirements**: `docs/hardware/intro.md` will be expanded with:
    - "The Digital Twin" Workstation details.
    - "The Physical AI" Edge Kit details.
    - "The Robot Lab" options (A, B, C).
    - "Summary of Architecture" table.
    - "Option 2 High OpEx: The 'Ether' Lab (Cloud-Native)" details.
    - "The Economy Jetson Student Kit" table.
    - "The Latency Trap (Hidden Cost)" section.

### Where to Add Diagrams
N/A - No new diagrams are being added in this content fix. Existing diagrams are preserved.

### How to Improve Module Transitions
- Module transitions are implicitly improved by providing correct weekly content. Cross-links between weeks/modules can be added if relevant during content population.

### How to Add Intros & Summaries
- Each `week-XX.md` will have an implied "Introduction" through its content, and "Goals" and "Assignments" sections will serve as mini-summaries.
- The `docs/hardware/intro.md` will include detailed descriptions for each section that act as introductions.

### How to Cross-Linking Recommendations
- Cross-links will be added within the weekly schedules to relevant module chapters (e.g., Week 3-5 to ROS 2 modules).
- Cross-links within the hardware guide will point to specific hardware images (if available).

## Navigation Plan

### Improved Sidebar Structure
- The existing `sidebars.ts` auto-generation for `weeks` and `hardware` is sufficient. The content updates will make the sidebar more meaningful.

### Better Ordering of Chapters
- Implicitly handled by the `sidebar_position` in frontmatter and the numerical naming of week files.

### Slugs and IDs Plan for Easier Internal Links
- Docusaurus auto-generates slugs from filenames and headings. For weekly pages, `/docs/weeks/week-XX` will be the pattern.
- For hardware sections, direct heading links (e.g., `#the-digital-twin-workstation`) will be used.

### Breadcrumbs Improvements
N/A - Docusaurus automatically handles breadcrumbs based on file structure.

## Implementation Strategy

### Order of Homepage Component Creation
N/A - Homepage is not directly affected.

### Order of Chapter Enhancements
1. Update `docs/hardware/intro.md` completely.
2. Update `docs/weeks/week-01.md` with the full content for Week 1-2 (Introduction to Physical AI).
3. Update `docs/weeks/week-02.md` with the full content for Week 1-2 (Introduction to Physical AI).
4. Update `docs/weeks/week-03.md` through `week-05.md` with content for "ROS 2 Fundamentals".
5. Update `docs/weeks/week-06.md` through `week-07.md` with content for "Robot Simulation with Gazebo".
6. Update `docs/weeks/week-08.md` through `week-10.md` with content for "NVIDIA Isaac Platform".
7. Update `docs/weeks/week-11.md` through `week-12.md` with content for "Humanoid Robot Development".
8. Update `docs/weeks/week-13.md` with content for "Conversational Robotics".

### How to Integrate Diagrams
N/A - No new diagrams are being integrated.

### How to Ensure Formatting Consistency
- Adhere to existing markdownlint rules.
- Manually review content to ensure consistent heading levels, code block formatting, and list styles.

## Build Pipeline Considerations

### Where New Assets Go (/static/img)
N/A - No new images are being added, existing placeholders will be utilized.

### Any New NPM Dependencies (if required)
N/A - No new npm dependencies for this content update.

### How to Manage MDX Usage
N/A - Content will remain in standard Markdown (`.md`) format.

## Alternatives & Trade-Offs

### MD vs MDX for Expanded Chapters
- **Decision**: Stick to `.md` for simplicity and easier content creation.
- **Rationale**: The content for weeks and hardware does not require interactive React components. Keeping it as `.md` aligns with the principle of "Simplicity" and avoids unnecessary complexity.

### Mermaid Diagrams vs Static Images
N/A - No new diagrams are being added, existing Mermaid usage is maintained.

### Card Components vs Pure Markdown
N/A - Focus is on Markdown content.

## Risks & Mitigation

- **Risk**: Incorrect content transfer from source document.
  - **Mitigation**: Careful copy-pasting and manual review against the source text.
- **Risk**: Introduction of new broken links.
  - **Mitigation**: Thorough `npm run build` with `onBrokenLinks: 'throw'` configured.
- **Risk**: Markdown linting issues from new content.
  - **Mitigation**: Run `npm run lint:md -- --fix` to auto-correct and manual review for remaining issues.

## Review Gates

- **After hardware guide update**: Manual review of `docs/hardware/intro.md` for completeness and accuracy.
- **After weekly schedules update**: Manual review of `docs/weeks/` for unique content and correct topics.
- **Final build verification**: Ensure `npm run build` passes with no warnings or errors.
