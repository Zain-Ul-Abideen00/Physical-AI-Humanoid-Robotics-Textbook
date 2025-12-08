# Feature Specification: Fix Content Duplication & Expand Hardware

**Feature Branch**: `003-content-fix`
**Created**: 2025-12-07
**Status**: Draft
**Input**: User description: "Fix schedule duplication week01 - introduction & setup repeatedly... On hardware tab we have very less content, add some content."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Correct Weekly Schedule (Priority: P1)

As a **Student**, I want to see unique content for each week (Week 1-13) corresponding to the syllabus so that I can follow the course progression without confusion.

**Why this priority**: Currently, all weekly pages are duplicates of Week 1, which is confusing and incorrect.

**Independent Test**: Navigate to Week 2, Week 6, and Week 13. Each page should have unique titles and content matching the syllabus.

**Acceptance Scenarios**:

1. **Given** I navigate to `/docs/weeks/week-02`, **When** the page loads, **Then** I see "Introduction to Physical AI" content, not "Course Kickoff".
2. **Given** I navigate to `/docs/weeks/week-06`, **When** the page loads, **Then** I see "Robot Simulation with Gazebo" content.
3. **Given** I navigate to `/docs/weeks/week-13`, **When** the page loads, **Then** I see "Conversational Robotics" content.

---

### User Story 2 - Comprehensive Hardware Guide (Priority: P1)

As a **Student**, I want detailed hardware specifications and options (Digital Twin Workstation, Edge Kit, Robot Lab) so that I can purchase or configure the correct equipment for the course.

**Why this priority**: The current hardware page is "very less content". Students need detailed specs (GPU, CPU, Sensors) to participate.

**Independent Test**: Navigate to `/docs/hardware/intro`. It should contain the full details from the source material, including the 3 lab options and specific component lists.

**Acceptance Scenarios**:

1. **Given** I am on the Hardware Guide page, **When** I scroll to "Digital Twin Workstation", **Then** I see requirements for NVIDIA RTX 4070 Ti or higher and 64GB RAM.
2. **Given** I look at the "Economy Jetson Student Kit" section, **When** I read the components, **Then** I see the Orin Nano, RealSense D435i, and ReSpeaker mic listed with prices.
3. **Given** I check the "Robot Lab" options, **When** I compare them, **Then** I see Option A (Proxy), Option B (Miniature), and Option C (Premium) described.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (Schedule)**: The system MUST have unique markdown files for Weeks 1-13.
- **FR-002 (Schedule)**: Week 1-2 content MUST match "Introduction to Physical AI".
- **FR-003 (Schedule)**: Week 3-5 content MUST match "ROS 2 Fundamentals".
- **FR-004 (Schedule)**: Week 6-7 content MUST match "Robot Simulation with Gazebo".
- **FR-005 (Schedule)**: Week 8-10 content MUST match "NVIDIA Isaac Platform".
- **FR-006 (Schedule)**: Week 11-12 content MUST match "Humanoid Robot Development".
- **FR-007 (Schedule)**: Week 13 content MUST match "Conversational Robotics".
- **FR-008 (Hardware)**: The Hardware Guide MUST include the "Digital Twin Workstation" specs (GPU, CPU, RAM, OS).
- **FR-009 (Hardware)**: The Hardware Guide MUST include the "Physical AI Edge Kit" details (Brain, Eyes, Inner Ear, Voice).
- **FR-010 (Hardware)**: The Hardware Guide MUST include the 3 Robot Lab options (Proxy, Miniature, Premium).
- **FR-011 (Hardware)**: The Hardware Guide MUST include the "Ether Lab" (Cloud-Native) option with cost calculations.

### Key Entities

- **Week**: A unit of time in the curriculum with specific topics and resources.
- **Lab Config**: A specific hardware setup (Workstation, Edge Kit, Robot).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 13 unique pages exist in `/docs/weeks/`, each with a distinct title matching the syllabus.
- **SC-002**: The Hardware Guide page word count increases by >300 words (reflecting the added detail).
- **SC-003**: No duplicate "Week 01" headers found in files named `week-02.md` through `week-13.md`.

## Assumptions & Dependencies

- **Assumption**: The content provided in the prompt is the single source of truth.
- **Dependency**: Docusaurus instance is already set up.

## Out of Scope

- Creating new diagrams for these sections (text content update only).