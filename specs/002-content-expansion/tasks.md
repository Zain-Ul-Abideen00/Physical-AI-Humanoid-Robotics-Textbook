# Tasks: Book Content Expansion & Homepage Redesign

**Input**: Design documents from `/specs/002-content-expansion/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md
**Feature Branch**: `002-content-expansion`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Docusaurus project for new components and content structure.

- [x] T001 [P] Install `react-icons` dependency for Homepage feature cards in `package.json`
- [x] T002 [P] Create `src/data/homepage.ts` for centralized homepage content management
- [x] T003 Create `src/components/HomepageFeatures/` directory structure
- [x] T004 Create `src/components/Hero/` directory structure
- [x] T005 Create `src/components/LearningOutcomes/` directory structure
- [x] T006 [P] Setup `static/img/hero` and `static/img/icons` directories

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the data models and core component logic that the UI depends on.

- [x] T007 Implement `FeatureItem` and `LearningOutcome` interfaces in `src/data/homepage.ts`
- [x] T008 Populate `src/data/homepage.ts` with initial content for "Why Physical AI Matters" and "Learning Outcomes"
- [x] T009 Create reusable `FeatureCard` component in `src/components/HomepageFeatures/FeatureCard.tsx`
- [x] T010 Create reusable `HardwareCard` component in `src/components/HomepageFeatures/HardwareCard.tsx`

**Checkpoint**: Data and basic components ready - Content and UI work can proceed in parallel.

## Phase 3: User Story 1 - Professional First Impression (Priority: P1)

**Goal**: Redesign the homepage to be professional, modern, and informative.

**Independent Test**: Verify the homepage loads with all 6 new sections and is responsive.

### Implementation for User Story 1

- [x] T011 [P] [US1] Implement `Hero` component with abstract background and CTA in `src/components/Hero/Hero.tsx`
- [x] T012 [P] [US1] Implement `HomepageFeatures` section using `FeatureCard` in `src/components/HomepageFeatures/index.tsx`
- [x] T013 [P] [US1] Implement `LearningOutcomes` section reading from data in `src/components/LearningOutcomes/index.tsx`
- [x] T014 [P] [US1] Implement `HardwareRequirements` section using `HardwareCard` in `src/components/HomepageFeatures/HardwareRequirements.tsx`
- [x] T015 [P] [US1] Implement "Why Physical AI Matters" section in `src/pages/index.tsx` (or separate component)
- [x] T016 [US1] Update `src/pages/index.tsx` to assemble all new sections (Hero, Features, Why, Outcomes, Hardware)
- [x] T017 [US1] Add custom CSS for Hero, Cards, and Sections in `src/css/custom.css`
- [x] T018 [US1] Update Docusaurus Footer in `docusaurus.config.ts` to be more "attractive" and organized

## Phase 4: User Story 2 - Deep & Connected Learning (Priority: P1)

**Goal**: Expand chapter content with depth, diagrams, and clear structure.

**Independent Test**: Check a sample chapter for "What's Next?", Mermaid diagrams, and proper formatting.

### Implementation for User Story 2

- [x] T019 [P] [US2] Normalize Module 1 (ROS 2) intros/chapters with new structure (Intro, Diagram, Output, Summary, Next)
- [x] T020 [P] [US2] Normalize Module 2 (Gazebo) intros/chapters with new structure
- [x] T021 [P] [US2] Normalize Module 3 (Isaac) intros/chapters with new structure
- [x] T022 [P] [US2] Normalize Module 4 (VLA) intros/chapters with new structure
- [x] T023 [P] [US2] Add Mermaid diagrams to Module 1 conceptual chapters (replacing placeholders where possible)
- [x] T024 [P] [US2] Add Mermaid diagrams to Module 2 conceptual chapters
- [x] T025 [P] [US2] Add Mermaid diagrams to Module 3 conceptual chapters
- [x] T026 [P] [US2] Add Mermaid diagrams to Module 4 conceptual chapters
- [x] T027 [US2] Implement "What's Next?" footer standard across all updated chapters

## Phase 5: User Story 3 - Unified Navigation (Priority: P2)

**Goal**: Improve navigation between related concepts across modules.

**Independent Test**: Verify links between modules work and sidebar is intuitive.

### Implementation for User Story 3

- [x] T028 [US3] Review and update `sidebars.ts` if manual ordering is needed for better flow
- [x] T029 [P] [US3] Add cross-module links (ROS 2 -> Gazebo) in relevant chapters
- [x] T030 [P] [US3] Add cross-module links (Gazebo -> Isaac) in relevant chapters
- [x] T031 [P] [US3] Add cross-module links (Isaac -> VLA) in relevant chapters

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Ensure quality, consistency, and final polish.

- [x] T032 Run markdown linting across all expanded content
- [x] T033 Verify all new internal links (cross-module and "What's Next?")
- [x] T034 Verify mobile responsiveness of the new Homepage
- [x] T035 Optimize any new static images added for the Hero or Hardware sections
- [x] T036 Run production build check

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Blocks everything.
- **Foundational (Phase 2)**: Blocks Homepage (Phase 3).
- **User Stories (Phase 3-5)**:
  - US1 (Homepage) and US2 (Content) can run in parallel.
  - US3 (Navigation) depends on US2 content being in place.
- **Polish (Phase 6)**: Run at the end.

### Parallel Opportunities

- **T011-T015**: Homepage sections can be built by different devs.
- **T019-T022**: Module expansion can be parallelized by topic experts.
- **T023-T026**: Diagramming can be done by a visual specialist in parallel with writing.

## Implementation Strategy

### MVP First (US1 + US2 Module 1)

1. **Homepage**: Get the new landing page live to set the tone.
2. **Module 1**: Fully expand the ROS 2 module as the "gold standard" example.
3. **Expand**: Roll out improvements to Modules 2-4.

### Incremental Delivery

1. **Week 1**: Homepage Redesign + Module 1 Expansion.
2. **Week 2**: Module 2 & 3 Expansion + Navigation Links.
3. **Week 3**: Module 4 Expansion + Final Polish.
