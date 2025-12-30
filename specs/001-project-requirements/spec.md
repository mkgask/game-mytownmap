# Feature Specification: Constraint-Derived Requirements Baseline

**Feature Branch**: `001-project-requirements`  
**Created**: 2025-12-30  
**Status**: Draft  
**Input**: User description: "プロジェクト制約から機能要件を策定してください 非機能要件も分かる範囲で策定してください"  
**Documentation updates**: Before modifying any development documentation for this feature, consult the repository-root `CONTRIBUTING.md` and follow its guidance; reference it in your PR.

**App Location (fixed)**: `src/apps/mytownmap`  
**Package Manager (REQUIRED)**: bun  
**Mandated Stack**: PixiJS (2D rendering), bitECS (ECS runtime), bun (build/package), Cloudflare Pages (hosting), New Relic (errors only), Playwright (UI/E2E tests)  
**Architecture Focus**: ECS-first, deterministic/seeded simulation; vehicles stay on roads, cannot overlap; congestion mitigation is the goal; daily schedule (residence→factory/shop in morning, factory/shop→random shop at noon, shop→residence in evening) with workplace/shop capacity enforced; player interventions are limited to adding, modifying, or removing roads and buildings; UI/E2E tests use Playwright.

## Constitution Alignment Checklist *(fill before drafting stories)*

- Scope remains the browser-playable SPA in `src/apps/mytownmap`, deployable as static assets to Cloudflare Pages; no server-side expansion assumed.
- bun is the sole package manager for workspace scripts and installs; no npm/pnpm/yarn introduction.
- ECS architecture with bitECS is mandatory; systems stay small, deterministic, and seed-driven.
- Rendering relies on PixiJS; vehicles travel only on roads without overlap; congestion is the primary challenge; daily movement schedule and building capacity rules are enforced.
- Player interaction is constrained to adding, modifying, or removing roads and buildings; any broader controls are out of scope without governance approval.
- Observability uses New Relic for errors only and optional privacy-respecting Cloudflare Web Analytics; all configuration is externalized (no hardcoded secrets/URLs).
- UI/E2E coverage must be delivered with Playwright; alternatives require governance approval.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Requirements Baseline Review (Priority: P1)

Product owner consolidates constitution-driven gameplay and observability requirements into a single baseline to plan upcoming milestones.

**Why this priority**: Aligns all teams on mandatory constraints before any feature work, preventing rework and scope creep.

**Independent Test**: Validate that the baseline lists all constitution constraints and can be reviewed without referencing external documents.

**Acceptance Scenarios**:

1. **Given** the baseline requirements document, **When** a stakeholder maps each constitution rule to a requirement, **Then** no constitution constraint remains unmapped.
2. **Given** the baseline, **When** a roadmap is drafted, **Then** every planned item references at least one baseline requirement.

---

### User Story 2 - Test Design from Requirements (Priority: P2)

QA designer derives acceptance and regression scenarios directly from the baseline requirements without consulting source code.

**Why this priority**: Ensures test coverage ties to constraints and prevents missing critical behaviors.

**Independent Test**: Verify that each requirement includes measurable behavior enabling test case creation.

**Acceptance Scenarios**:

1. **Given** the baseline requirements, **When** QA drafts tests, **Then** every functional requirement yields at least one acceptance test and one boundary test.
2. **Given** the baseline, **When** QA prepares Playwright flows, **Then** critical P1 scenarios (road building, building placement, day-cycle run) are testable end-to-end.

---

### User Story 3 - Engineering Planning (Priority: P3)

Game engineer estimates effort and sequencing using the baseline requirements and success criteria.

**Why this priority**: Provides deterministic scope and performance targets for simulation and UI work.

**Independent Test**: Confirm that requirements are specific enough to size work items without additional discovery.

**Acceptance Scenarios**:

1. **Given** the baseline, **When** engineering creates work breakdowns, **Then** each requirement maps to one or more estimable tasks with clear boundaries.
2. **Given** the baseline, **When** dependencies are identified, **Then** they align with mandated stack and constitution rules without conflict.

### Edge Cases

- Building placement attempted without adjacent road connection.
- Shop or factory worker capacity exceeded during assignment or simulation tick.
- Vehicle path attempts to traverse non-road tiles or collide with another vehicle.
- Seed mismatch between runs producing diverging simulations.
- Import/export tie when multiple edge roads exist and demand/supply crosses over.
- Road placement overlapping an existing building triggers demolition and deterministic reassignment/cleanup before the road is finalized.
- Vehicles with different origins/destinations require distinct optimal routes; routing difficulty modes must evaluate per-vehicle context to avoid shared-path assumptions.

## Requirements *(mandatory)*

### Terminology for Daily Actions

- **CommuteToWork**: Morning→Noon. Resident travels from assigned residence to assigned workplace, which can be either a factory or a workplace shop.
- **ShoppingTrip**: Noon→Evening. Resident travels from workplace (factory or shop) to a randomly chosen shopping-destination shop (uniform among all shops, independent of workplace shop assignment).
- **ReturnHome**: Evening→Night. Resident travels from the shopping-destination shop to their assigned residence.
- **Shop roles**: A single shop may serve two distinct roles: (a) **WorkplaceShop** (assigned as workplace, capacity-limited), and (b) **ShoppingDestinationShop** (randomly selected for ShoppingTrip). Keep these roles distinct in data and logic to avoid conflation.

### Functional Requirements

- **FR-001**: System MUST allow players to draw and modify roads that serve as the sole traversable network for all vehicles.
- **FR-002**: System MUST restrict building placement (residences, shops, factories) to tiles adjacent to roads and enforce removal/modification only within that constraint.
- **FR-003**: System MUST assign each resident to exactly one residence and optionally to a workplace shop or factory, honoring worker capacity limits for each building type.
- **FR-004**: System MUST simulate the daily schedule deterministically using the named actions: CommuteToWork (residence→workplace shop or factory), ShoppingTrip (workplace→random ShoppingDestinationShop with uniform choice), ReturnHome (shop→residence), with all randomness seed-driven.
- **FR-005**: System MUST ensure vehicles move only on roads, prevent spatial overlap, and express congestion via queuing/slowdown behaviors.
- **FR-006**: System MUST generate all random selections (midday shop choice, import/export edge choice, delivery routing) via a seeded PRNG so runs with identical seed and inputs reproduce identical outcomes.
- **FR-007**: System MUST dispatch one delivery car per factory per in-game day to deliver goods to shops and handle import/export via edge roads according to supply/demand rules.
- **FR-008**: System MUST limit player interventions to adding, modifying, or removing roads and buildings; any attempt at other controls is rejected with guidance to follow governance.
- **FR-009**: System MUST externalize configuration (seeds, analytics toggles, New Relic keys, feature flags) and avoid hardcoded secrets or URLs.
- **FR-010**: System MUST expose observable error events suitable for New Relic ingestion while excluding PII and full request payloads.
- **FR-011**: System MUST provide acceptance-testable flows for road building, building placement, and a full day-cycle run that QA can automate in Playwright.
- **FR-012**: When a player places a road whose footprint overlaps any portion of an existing building, the building MUST be demolished at placement confirmation with deterministic cleanup (unassign residents/workers and free capacity) before the road is finalized.
- **FR-013**: System MUST support seeded, deterministic routing difficulty modes for all vehicles: Easy (early optimal path choice with proactive lane positioning and congestion avoidance), Normal (mixed heuristic: ~50% Easy behavior and ~50% Hard behavior, selected via seeded PRNG), Hard (greedy destination-ward movement, defers lane choice until near arrival and enters congestion without avoidance). Mode selection and per-vehicle routing must respect each vehicle’s distinct origin/destination and remain reproducible under the simulation seed.

### Non-Functional Requirements

- **NFR-001**: Build outputs MUST be static assets deployable to Cloudflare Pages and runnable as a browser SPA without server dependencies.
- **NFR-002**: Package management and scripts MUST use bun across the workspace; other package managers are disallowed without governance approval.
- **NFR-003**: Simulation MUST remain deterministic across runs with the same seed; divergence rate must be 0% in regression checks that hash entity/component state per tick.
- **NFR-004**: System MUST support seeded simulations of at least 500 residents, 50 shops, and 25 factories completing an in-game day within 30 seconds wall-clock on a mid-tier 2024 laptop profile.
- **NFR-005**: Observability MUST capture 100% of unhandled errors and 95% of handled error pathways with sanitized metadata only; analytics, if enabled, must avoid PII collection.
- **NFR-006**: UI/E2E test suites MUST execute primary P1 scenarios within 5 minutes wall-clock to remain CI-feasible.
- **NFR-007**: All persisted game data (roads, buildings, residents, vehicles, save slots, progress, seeds, settings) MUST be stored in IndexedDB; localStorage SHALL NOT be used for game state to avoid quota fragmentation and synchronous I/O.
- **NFR-008**: Rendering FPS must be capped at 60; no minimum FPS is enforced. Performance may degrade as data volume grows, but the system SHOULD apply workload splitting/throttling to keep the experience as smooth as practical.
- **NFR-009**: Game logic computation and rendering/UI loops MUST be decoupled so that heavy simulation load does not significantly block draw or input responsiveness; prefer scheduling, chunking, and cooperative yielding to keep UI responsive under load.

### Key Entities *(include if feature involves data)*

- **RoadSegment**: Represents a directed or undirected traversable road unit connecting nodes; stores connectivity, capacity, and occupancy metadata used for routing and congestion.
- **BuildingParcel**: Represents a placed building tile with type (residence, shop, factory), adjacency to roads, capacity constraints, and assigned residents/workers.
- **ResidentAgent**: Represents a simulated NPC with residence binding, optional workplace/shop assignment, schedule state, and vehicle ownership/state.
- **DeliveryVehicle**: Represents a factory-dispatched vehicle carrying goods to a shop or edge connection, tracking route, cargo state, and timing.
- **EdgeGateway**: Represents a road connection to off-map towns handling import/export routing decisions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A constitution-to-requirement trace review finds 0 unmapped constraints and 0 conflicts across all baseline requirements.
- **SC-002**: Running two full-day simulations with identical seeds, maps, and agent assignments produces identical per-tick hashes of entity/component state, verifying determinism.
- **SC-003**: A player can start from a blank map, place at least 10 residences, 3 shops, 2 factories, connect them with roads, and complete one full simulated day in under 3 real minutes.
- **SC-004**: In a predefined congestion scenario, applying allowed player interventions (road or building changes) reduces average travel time by at least 20% compared to the baseline jam within one simulated day.
