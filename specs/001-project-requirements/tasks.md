# Tasks: Constraint-Derived Requirements Baseline

**Input**: Design documents from `specs/001-project-requirements/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Scope Guard**: Player-facing work must stay within road/building add/change/delete; other interactions need governance approval.
**Doc update rule**: Before updating development documentation, consult the repository-root `CONTRIBUTING.md` and reference it in the PR.
**UI/E2E testing**: Use Playwright only.

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Create base app directories `src/apps/mytownmap/src/` and `src/apps/mytownmap/tests/` with placeholder README explaining app/test scope.
- [ ] T002 [P] Add root workspace scripts in `package.json` to proxy app commands (`bun run dev:mytownmap`, `bun run build:mytownmap`, `bun run test:mytownmap`).
- [ ] T003 [P] Add app-level README stub at `src/apps/mytownmap/README.md` describing the caller/callee matrix and mandated stack.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish directory split and stub files so all user stories can build on a consistent layout.

- [ ] T004 Create core source tree with folder README placeholders: `src/apps/mytownmap/src/{app,usecase,feature,feature/config,feature/rng,feature/ecs,feature/ecs/components,feature/ecs/systems,feature/ecs/world,feature/routing,infrastructure,infrastructure/persistence,infrastructure/ui,infrastructure/ui/pixi,infrastructure/ui/screens,infrastructure/ui/hud,infrastructure/assets}`.
- [ ] T005 [P] Add bootstrap entry stubs `src/apps/mytownmap/src/app/main.ts` and `src/apps/mytownmap/src/app/createGameContext.ts` to host ECS+Pixi initialization later.
- [ ] T006 [P] Add configuration stubs `src/apps/mytownmap/src/feature/config/env.ts`, `src/apps/mytownmap/src/feature/config/constants.ts`, `src/apps/mytownmap/src/feature/config/featureFlags.ts` for externalized settings.
- [ ] T007 [P] Add seeded PRNG factory stub `src/apps/mytownmap/src/feature/rng/prngFactory.ts` for deterministic streams.
- [ ] T008 [P] Add routing scaffolding `src/apps/mytownmap/src/feature/routing/roadGraph.ts`, `src/apps/mytownmap/src/feature/routing/pathCache.ts`, `src/apps/mytownmap/src/feature/routing/lanePolicy.ts` to host Easy/Normal/Hard lane selection.
- [ ] T009 [P] Add ECS component stub files `src/apps/mytownmap/src/feature/ecs/components/{roadComponent.ts,buildingComponent.ts,residentComponent.ts,vehicleComponent.ts,deliveryVehicleComponent.ts,dayCycleComponent.ts,congestionMetricComponent.ts}`.
- [ ] T010 [P] Add ECS system stub files `src/apps/mytownmap/src/feature/ecs/systems/scheduling/dayCycleSystem.ts`, `.../assignment/capacitySystem.ts`, `.../routing/pathfindSystem.ts`, `.../routing/laneSelectionSystem.ts`, `.../movement/vehicleMovementSystem.ts`, `.../movement/collisionAvoidanceSystem.ts`, `.../delivery/deliveryDispatchSystem.ts`, `.../persistence/snapshotSystem.ts`, `.../observability/errorEventSystem.ts`.
- [ ] T011 [P] Add world wiring stubs `src/apps/mytownmap/src/feature/ecs/world/worldBuilder.ts`, `src/apps/mytownmap/src/feature/ecs/world/systemRegistry.ts`, `src/apps/mytownmap/src/feature/ecs/world/simulationLoop.ts`.
- [ ] T012 [P] Add persistence scaffolding `src/apps/mytownmap/src/infrastructure/persistence/{indexedDbClient.ts,saveRepository.ts,stateDto.ts}` for IndexedDB.
- [ ] T013 [P] Add usecase stubs `src/apps/mytownmap/src/usecase/{seedUsecase.ts,mapUsecase.ts}` to orchestrate seed management and road/building CRUD.
- [ ] T014 [P] Add UI scaffolding `src/apps/mytownmap/src/infrastructure/ui/pixi/{stageFactory.ts,assetsManifest.ts}`, `src/apps/mytownmap/src/infrastructure/ui/screens/{titleScreen.ts,saveSelectionScreen.ts,configScreen.ts,tutorialPlaceholder.ts}`, `src/apps/mytownmap/src/infrastructure/ui/hud/gameHud.ts`.
- [ ] T015 [P] Add assets folders with README placeholders `src/apps/mytownmap/src/infrastructure/assets/{fonts,sprites,tilesets,shaders}`.
- [ ] T016 [P] Add test layout with README placeholders: `src/apps/mytownmap/tests/unit/`, `src/apps/mytownmap/tests/integration/`, `src/apps/mytownmap/tests/e2e/playwright/`, `src/apps/mytownmap/tests/fixtures/{maps,seeds}`.

**Checkpoint**: Directory skeleton and stub files exist; stories can build independently.

---

## Phase 3: User Story 1 - Requirements Baseline Review (Priority: P1) 🎯 MVP

**Goal**: Baseline documents reflect directory split and mandated constraints.
**Independent Test**: Architecture README links each directory to relevant FR/NFR without needing external docs.

- [ ] T017 [US1] Update `src/apps/mytownmap/README.md` with the caller/callee matrix and directory-to-requirement mapping (roads-only movement, seeded PRNG, IndexedDB, Pixi/bitECS, routing modes).
- [ ] T018 [US1] Add traceability note at `specs/001-project-requirements/architecture/structure-trace.md` mapping FR-001..FR-013 and NFR-001..NFR-009 to the created directories/files (using the new matrix paths).

**Checkpoint**: Requirements baseline aligned with file structure.

---

## Phase 4: User Story 2 - Test Design from Requirements (Priority: P2)

**Goal**: Test scaffolding ties to requirements and seed determinism.
**Independent Test**: QA can derive tests and fixtures from README without code dive.

- [ ] T019 [US2] Add test strategy README `src/apps/mytownmap/tests/README.md` covering unit/integration/E2E split, Playwright usage, seed policy, and tick-hash regression intent.
- [ ] T020 [P] [US2] Add fixture index `src/apps/mytownmap/tests/fixtures/README.md` listing planned map/seed fixtures for P1 flows (road build, building placement, day-cycle).

**Checkpoint**: Test design guidance exists and is seed-aware.

---

## Phase 5: User Story 3 - Engineering Planning (Priority: P3)

**Goal**: Engineering can size work using system ordering and routing mode decomposition.
**Independent Test**: Work packages and system schedule are clear without further discovery.

- [ ] T021 [US3] Add routing plan `specs/001-project-requirements/architecture/routing-plan.md` detailing Easy/Normal/Hard heuristics, lane policies, and per-vehicle origin/destination handling.
- [ ] T022 [US3] Add system order doc `src/apps/mytownmap/src/ecs/world/systemOrder.md` describing deterministic execution order and dependencies between systems (assignment → routing → movement → delivery → persistence → observability).

**Checkpoint**: Engineering plan linked to concrete directories and execution order.

---

## Phase 6: Polish & Cross-Cutting

- [ ] T023 [P] Add license generation script placeholder `src/apps/mytownmap/scripts/generate-licenses.ts` producing the package license list page for the title menu.
- [ ] T024 [P] Add doc stub `src/apps/mytownmap/docs/quickstart-checklist.md` to validate quickstart commands and directory readiness.

---

## Dependencies & Execution Order

- Setup (Phase 1) → Foundational (Phase 2) → User stories (P1 → P2 → P3) → Polish.
- Foundational tasks marked [P] can run in parallel after directories exist (T004).
- User stories start only after Foundational checkpoint.

## Parallel Execution Examples

- After T004: run T005, T006, T007, T008, T009, T010, T011, T012, T013, T014, T015, T016 in parallel (distinct files/dirs).
- US2: T019 and T020 can proceed in parallel (docs vs fixtures index).

## Implementation Strategy

- MVP = Complete through Phase 3 (US1) so the directory plan is documented and traceable.
- Incremental: Finish Foundational skeleton → US1 docs → US2 test guidance → US3 engineering plan → Polish scripts/docs.
