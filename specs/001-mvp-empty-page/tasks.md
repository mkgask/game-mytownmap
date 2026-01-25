# Tasks: Empty page MVP

**Input**: Design documents from `/specs/001-mvp-empty-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - not requested in the feature specification, so no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/pages/`, `src/components/` at repository root
- Paths based on plan.md structure: src/pages/index.astro

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize Astro project with Bun dependencies
- [ ] T003 [P] Configure Biome linting and formatting
- [ ] T004 [P] Configure Wrangler for Cloudflare Pages deployment

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Setup Astro config for static site generation
- [ ] T006 [P] Create base page structure in src/pages/index.astro
- [ ] T007 [P] Add basic CSS for responsive layout

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Build landing placeholder (Priority: P1) 🎯 MVP

**Goal**: Deliver a minimal, testable web page at the site root that serves as a verified baseline for development, review, and deployment.

**Independent Test**: Run the build command locally and verify the page renders at localhost with placeholder content.

### Implementation for User Story 1

- [ ] T008 [US1] Add project name "MyTownMap" to src/pages/index.astro
- [ ] T009 [US1] Add short description to src/pages/index.astro
- [ ] T010 [US1] Ensure page is readable on mobile < 768px, tablet 768-1366px, desktop > 1366px
- [ ] T011 [US1] Add graceful degradation for failed static assets (show only project name text)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Deploy landing placeholder (Priority: P2)

**Goal**: Deploy the placeholder page to staging so it can be accessed online and confirm the deployment pipeline works.

**Independent Test**: Deploy to staging and verify the page is reachable online with placeholder content.

### Implementation for User Story 2

- [ ] T012 [US2] Configure Wrangler with Cloudflare Pages settings
- [ ] T013 [US2] Run build command to generate dist/ directory
- [ ] T014 [US2] Deploy to Cloudflare Pages staging environment
- [ ] T015 [US2] Verify HTTP 200 response and content display online

**Checkpoint**: At this point, User Story 2 should be fully functional and testable independently

---

## Phase 5: User Story 3 - Basic accessibility and responsiveness (Priority: P3)

**Goal**: Ensure the placeholder page is readable on desktop and mobile for basic QA across viewport sizes.

**Independent Test**: Resize browser or use device emulation to confirm content is visible and legible at common breakpoints.

### Implementation for User Story 3

- [ ] T016 [US3] Test and verify readability on mobile < 768px
- [ ] T017 [US3] Test and verify readability on tablet 768-1366px
- [ ] T018 [US3] Test and verify readability on desktop > 1366px
- [ ] T019 [US3] Ensure basic usability without specific accessibility standards

**Checkpoint**: At this point, User Story 3 should be fully functional and testable independently

---

## Final Phase: Polish & Cross-cutting Concerns

**Purpose**: Final touches and concerns that span multiple user stories

- [ ] T020 Run Biome check for code quality
- [ ] T021 Test Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] T022 Update README with deployment instructions

---

## Dependencies

**Story Completion Order** (must implement in this sequence):
1. User Story 1 (P1) - Build landing placeholder
2. User Story 2 (P2) - Deploy landing placeholder  
3. User Story 3 (P3) - Basic accessibility and responsiveness

**Parallel Opportunities**:
- Setup tasks (T001-T004) can run in parallel
- Foundational tasks (T005-T007) can run in parallel after setup
- User Story 1 tasks (T008-T011) depend on foundation
- User Story 2 tasks (T012-T015) depend on User Story 1 completion
- User Story 3 tasks (T016-T019) can run in parallel with User Story 2

**Example Parallel Execution**:
```bash
# Phase 1: Setup (parallel)
bun add astro
bun add -D @biomejs/biome
bun add -D wrangler

# Phase 2: Foundation (parallel after setup)
# Create astro.config.mjs
# Create src/pages/index.astro with basic structure
# Add CSS in index.astro

# Phase 3: US1 (sequential)
# Add content to index.astro
# Test responsiveness
# Test asset failure

# Phase 4: US2 (after US1)
# Configure wrangler
# Build and deploy
# Verify online

# Phase 5: US3 (parallel with US2)
# Test viewports
# Verify usability
```

## Implementation Strategy

**MVP First**: Start with User Story 1 (build and local rendering) - this validates the core pipeline.

**Incremental Delivery**: Each user story is independently testable and deliverable.

**Suggested Order**:
1. Complete Phase 1 & 2 (setup and foundation)
2. Implement User Story 1 and verify locally
3. Implement User Story 2 and verify deployment
4. Implement User Story 3 for polish

**Total Tasks**: 22
**Tasks per User Story**: US1: 4, US2: 4, US3: 4
**Parallel Opportunities Identified**: Setup (4 tasks), Foundation (3 tasks), US3 (4 tasks can parallel with US2)</content>
<parameter name="filePath">/mnt/g/projects/web/game-mytownmap/specs/001-mvp-empty-page/tasks.md