# Tasks: Title Scene MVP

**Input**: Design documents from `/specs/004-title-scene-mvp/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Unit tests for TitleScene, E2E tests for user interaction

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story. Follows Test-First (TDD) approach: write failing tests first, then implement to make them pass.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths assume web application structure

## Phase 1: Test-First Implementation

### User Story 1: Display Game Title (US1)

**Purpose**: Basic functionality to display game title

- [x] T001 [P] [US1] Write failing unit test for TitleScene instantiation in tests/unit/libs/game/scenes/TitleScene.test.ts
- [x] T002 [P] [US1] Create TitleScene.ts in src/libs/game/features/scenes/TitleScene.ts to pass the test
- [x] T003 [P] [US1] Write failing unit test for title text display in TitleScene.test.ts
- [x] T004 [P] [US1] Implement title text display in TitleScene.initialize() to pass the test
- [x] T005 [P] [US1] Write failing unit test for title styling in TitleScene.test.ts
- [x] T006 [P] [US1] Add title styling (center alignment, large font) to pass the test
- [x] T007 [P] [US1] Write failing unit test for Game.ts TitleScene support in tests/unit/libs/game/core/Game.test.ts
- [x] T008 [P] [US1] Update Game.ts to support TitleScene initialization to pass the test
- [x] T009 [P] [US1] Write failing E2E test for title display in tests/e2e/game-page.spec.ts
- [x] T010 [P] [US1] Modify GameCanvas.astro to load TitleScene on startup to pass the test

### User Story 2: Start Game with Play Button (US2)

**Purpose**: Functionality to start game with Play button

- [x] T011 [P] [US2] Write failing unit test for Play button creation in TitleScene.test.ts
- [x] T012 [P] [US2] Add Play button to TitleScene.ts to pass the test
- [x] T013 [P] [US2] Write failing unit test for button click handler in TitleScene.test.ts
- [x] T014 [P] [US2] Implement button click handler in TitleScene to pass the test
- [x] T015 [P] [US2] Write failing unit test for scene transition logic in TitleScene.test.ts
- [x] T016 [P] [US2] Add scene transition logic from TitleScene to GameScene to pass the test
- [x] T017 [P] [US2] Write failing unit test for button styling in TitleScene.test.ts
- [x] T018 [P] [US2] Style Play button (positioning, appearance) to pass the test
- [x] T019 [P] [US2] Write failing E2E test for button click and scene transition in game-page.spec.ts
- [x] T020 [P] [US2] Ensure E2E test passes (adjust implementation if needed)

## Phase 2: Integration & Testing

**Purpose**: Integration and testing of all features

- [x] T021 [P] [US1+US2] Update Game.ts scene management for TitleScene integration (if not covered)
- [x] T022 [P] [US1+US2] Test full user journey: load → title display → button click → game start
- [x] T023 [P] [US1+US2] Performance test: ensure <2s load time
- [x] T024 [P] [US1+US2] Mobile responsiveness test for title and button

## Definition of Done

- ✅ All tasks completed and code committed
- ✅ All unit tests pass (bun test)
- ✅ All E2E tests pass (bun run test:e2e)
- ✅ Manual testing confirms title display and button functionality
- ✅ Code review completed
- ✅ Documentation updated (README.md if needed)
- ✅ No console errors in browser dev tools
- ✅ Mobile responsive (tested on mobile viewport)

## Notes

- TitleScene should extend the existing Scene.ts base class
- Use PixiJS Text and Graphics for UI elements
- Button should provide visual feedback on click
- Scene transition should be smooth (no loading delays)
- Keep implementation simple - focus on core functionality
- Follow Red-Green-Refactor cycle: write failing test (Red), implement to pass (Green), refactor if needed</content>
<parameter name="filePath">/mnt/g/projects/web/game-mytownmap/specs/004-title-scene-mvp/tasks.md