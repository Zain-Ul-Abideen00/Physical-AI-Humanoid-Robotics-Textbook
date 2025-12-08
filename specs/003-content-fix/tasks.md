# Tasks: Fix Content Duplication & Expand Hardware

**Input**: Design documents from `/specs/003-content-fix/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md
**Feature Branch**: `003-content-fix`

## Phase 1: Setup (No Changes)

**Purpose**: No infrastructure changes required for this content fix.

- [x] T000 [P] No setup tasks required - existing infrastructure is sufficient.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Ensure the target files exist (which they do from previous features) and ready for content injection.

- [ ] T001 Verify existence of `docs/hardware/intro.md` and `docs/weeks/week-XX.md` files (Implicit check)

## Phase 3: User Story 1 - Correct Weekly Schedule (Priority: P1)

**Goal**: Replace duplicate "Week 01" content with unique, correct weekly schedules from the syllabus.

**Independent Test**: Verify each week page has unique content matching the syllabus.

### Implementation for User Story 1

- [x] T002 [P] [US1] Update `docs/weeks/week-01.md` with Week 1 content (Intro to Physical AI)
- [x] T003 [P] [US1] Update `docs/weeks/week-02.md` with Week 2 content (Intro to Physical AI continued)
- [x] T004 [P] [US1] Update `docs/weeks/week-03.md` with Week 3 content (ROS 2 Fundamentals)
- [x] T005 [P] [US1] Update `docs/weeks/week-04.md` with Week 4 content (ROS 2 Fundamentals continued)
- [x] T006 [P] [US1] Update `docs/weeks/week-05.md` with Week 5 content (ROS 2 Fundamentals continued)
- [x] T007 [P] [US1] Update `docs/weeks/week-06.md` with Week 6 content (Robot Simulation with Gazebo)
- [x] T008 [P] [US1] Update `docs/weeks/week-07.md` with Week 7 content (Robot Simulation with Gazebo continued)
- [x] T009 [P] [US1] Update `docs/weeks/week-08.md` with Week 8 content (NVIDIA Isaac Platform)
- [x] T010 [P] [US1] Update `docs/weeks/week-09.md` with Week 9 content (NVIDIA Isaac Platform continued)
- [x] T011 [P] [US1] Update `docs/weeks/week-10.md` with Week 10 content (NVIDIA Isaac Platform continued)
- [x] T012 [P] [US1] Update `docs/weeks/week-11.md` with Week 11 content (Humanoid Robot Development)
- [x] T013 [P] [US1] Update `docs/weeks/week-12.md` with Week 12 content (Humanoid Robot Development continued)
- [x] T014 [P] [US1] Update `docs/weeks/week-13.md` with Week 13 content (Conversational Robotics)

## Phase 4: User Story 2 - Comprehensive Hardware Guide (Priority: P1)

**Goal**: Expand the hardware guide with detailed specifications and options.

**Independent Test**: Verify hardware guide contains detailed specs for all 3 categories (Workstation, Edge, Robot).

### Implementation for User Story 2

- [x] T015 [US2] Rewrite `docs/hardware/intro.md` to include "Digital Twin Workstation" specs (GPU/CPU/RAM)
- [x] T016 [US2] Append "Physical AI Edge Kit" details to `docs/hardware/intro.md`
- [x] T017 [US2] Append "Robot Lab" options (A, B, C) to `docs/hardware/intro.md`
- [x] T018 [US2] Append "Ether Lab" (Cloud) details and Cost analysis to `docs/hardware/intro.md`

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Ensure quality and consistency.

- [x] T019 Run markdown linting across updated files and fix violations (`npm run lint:md`)
- [x] T020 Run production build (`npm run build`) to verify no broken links

## Dependencies & Execution Order

### Phase Dependencies

- **US1 (Schedule)** and **US2 (Hardware)** are independent and can run in parallel.
- **Polish (Phase 5)** must run after all content updates.

### Parallel Opportunities

- **T002-T014**: All weekly updates can be done in parallel (or sequentially by an LLM).
- **T015-T018**: Can be done as a single large edit or sequential appends to `docs/hardware/intro.md`.

## Implementation Strategy

1. **Hardware**: Tackle the Hardware Guide first (T015-T018) as it's a single file.
2. **Schedule**: Iterate through Weeks 1-13 (T002-T014).
3. **Verify**: Run build and lint.
