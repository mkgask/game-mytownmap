<!--
Sync Impact Report
- Version change: 2.6.1 → 2.7.0
- Modified principles: added Game Code Structure matrix rules (Project Constraints §9)
- Added sections: Project Constraints §9 (Game Code Structure Matrix)
- Removed sections: none
- Templates checked/updated:
  - .specify/templates/plan-template.md ✅ (updated Constitution Check to include matrix rules)
  - .specify/templates/spec-template.md ✅ (updated Constitution Alignment checklist to include matrix rules)
  - .specify/templates/tasks-template.md ✅ (path conventions note for matrix layering)
  - .specify/templates/commands (directory not present) ⚠ pending (no files to update)
- Runtime docs/scripts: none
- Follow-up TODOs:
  - TODO(BUILD_CONFIG): add Cloudflare Pages CI job template for `src/apps/mytownmap` if not present
  - TODO(PR_TEMPLATE): add constitution compliance checklist and docs verification item to PR template
-->

# MyTownMap Constitution
<!-- Project: MyTownMap - 2D traffic congestion simulation game (browser SPA) -->

## 1. Conduct Guidelines

1. **Don't be Evil Policy**
- Act with deep insight as a senior engineer; respond with honesty and rigor
- Prioritize scientific facts, official documentation, and information from the last six months over user wishes
- Always mark uncertainty, assumptions, and TODOs; never silently fill gaps with guesses. If unknown, state "unknown" and propose additional info needs or investigation plans
- Share inconvenient facts or risks early, including performance, safety, maintainability, and operational constraints; never hide them
- Never mislead or intentionally obscure important behaviors or system constraints
- When specific instructions for changes are given, we first check all existing peripheral code and confirm if implementation is unnecessary.

2. **Balance separation of concerns and context boundaries**
- Whenever creating or touching files, functions, variables, constants, interfaces, or types, confirm their contextual ownership
- Minimize cross-context interaction; only communicate via explicit contracts such as typed DTOs, API schemas, or interfaces
- In small contexts, placing an item in the closest appropriate context is acceptable
- Do not split merely for the sake of splitting; if it just increases file count without purpose, reconsider

3. **Separate abstraction (what) from concretion (how)**
- Do not mix concrete implementation knowledge into the abstraction layer
- Do not apply abstraction-layer thinking inside the concrete layer
- Namespaces, modules/packages, directories, and filenames: some abstraction allowed (e.g., UserDomain, PaymentContext), but prefer concrete
- Interface names: abstraction allowed (e.g., IUserRepository, IPaymentGateway, IEventBus)
- Function, variable, constant, and type names: 100% concrete only (e.g., calculateTaxAmount, userId, MAX_RETRY_COUNT; abstract names must be corrected immediately)
- Avoid overusing abstract names; choose consistent concrete names aligned to purpose and responsibility. When unsure, bias toward concrete

4. **Thoroughly consider blast radius**
- When changing or deleting code, always use broad impact analysis plus static analysis and unit tests
- Narrow impact thinking causes misses; always check all areas that might indirectly depend on the change

5. **Runtime-first mindset grounded in operations**
- Design APIs, batch jobs, and CLIs assuming production deployment, observability, failure modes, and rate limits
- Never hardcode settings (secrets, endpoints, flags); treat them as external configuration (env vars or config providers)
- Provide observability (logs, metrics, traces) sufficient to diagnose production incidents without a debugger
- For changes affecting external contracts (APIs, message schemas) or persistent data, evaluate backward compatibility and migration paths

6. **Minimal Change Scope Principle**
- Start with minimal changes (e.g., replacing environment variables on the fly), and then gradually expand the scope if you find that it doesn't meet your requirements. Record each expansion step and keep reversibility in mind.

## 2. Basic Principles

1. Prefer constants and pure functions; minimize side effects
2. Functions with side effects must be prefixed with `wse` (short for WithSideEffect)
3. Global variables and singletons are forbidden; isolate state in a store if needed
4. Inject dependencies via interfaces wherever possible to ensure testability (DI required)
5. Implementations that harm testability are forbidden
6. Single responsibility. One file per responsibility. Use ~300 lines as an upper guide and split when needed
7. Maximize type safety/null safety so invalid states cannot be represented
8. Catch only recoverable exceptions; otherwise rely on higher-level Error Boundaries for early detection
9. Event naming: "Publisher: doingSomething" (progressive), "Subscriber: somethingDone" (past)
10. Turn all magic numbers/strings into constants
11. Do not use classes. Pass state from outside; use namespaces with types, constants, pure functions (plus variables and side-effectful functions when required)
12. In layers that depend on external APIs/DB schemas/infrastructure, use the Adapter pattern
13. Unit tests cover pure-function happy paths, error paths, and boundary tests; move side effects/external dependencies to integration tests; keep unit tests blazing fast even beyond 1000 cases
14. Write JSDoc (JavaDoc-compatible) comments for file headers, functions, and interfaces
15. Comments are minimal; focus on implicit knowledge and non-obvious parts. Explain why code has its current form based on present constraints/specs/relationships, not historical reasons
16. When assigning special meaning within the expressible type range, explicitly document the value and meaning (e.g., using -1 or INT_MIN as error/invalid markers, or `int` status values with distinct meanings)
17. Files that can be generated by standard tools, such as `package.json`, `tsconfig.json`, lock files, and base config, should not be written manually but should be generated by the corresponding CLI (e.g., `pnpm init`, `tsc --init`, or various framework generators).

## 3. Project Constraints

1. **Monorepo & Workspace layout**
- This repository is organized as a **monorepo**. Use **bun workspaces** for package management and task orchestration across apps and packages.
- The main application for this repository MUST live at:
  - `src/apps/mytownmap` — the MyTownMap 2D browser game (SPA)
- Shared packages (only when necessary) SHOULD be placed under `src/packages`. Prefer keeping functionality scoped to an app unless a clear reuse justification exists.
- Define workspace-level scripts and developer commands at the repository root (e.g., in root `package.json` or bun workspace config) so contributors can run `bun` scripts consistently across apps.
- The project is **frontend-first**: game logic, simulation, rendering, and state live in the browser. Any server-side component (e.g., authoritative simulation, leaderboard APIs) requires explicit justification and governance approval.

2. **Gameplay & Design Constraints**
- The product is a **2D, browser-playable game** where the core mechanics are traffic and congestion simulation with objectives to relieve traffic.
- **Map & placement**: The game must allow drawing roads; roads are the only traversable surface for vehicles. Buildings (residences, shops, factories) are placed adjacent to roads.
- **Agents & movement rules**:
  - NPCs (residents) are associated with a single residence and may be associated with a specific shop or factory as their **Workplace**. A shop can play two distinct roles: **WorkplaceShop** (assigned workplace, capacity-limited) and **ShoppingDestinationShop** (chosen randomly for shopping, no capacity limit); never conflate these roles.
  - Core daily actions (names are normative; timing windows are secondary and may change):
    - **CommuteToWork**: residence → assigned workplace (factory or WorkplaceShop).
    - **ShoppingTrip**: workplace → randomly chosen ShoppingDestinationShop (uniform over all shops, independent of WorkplaceShop assignment).
    - **ReturnHome**: shop → assigned residence.
  - If time windows are modeled, they typically map to Morning/Noon/Evening, but action ordering is the primary contract and must remain even if timing changes later.
  - Shops and factories have a **worker capacity** (max number of residents who can work there). Residents assigned to workplaces must respect those capacities.
- **Goods logistics**:
  - Each factory dispatches exactly one delivery car per day to a shop (destination may be random or policy-driven per design) to move goods.
  - Roads connected to map edges act as gateways to adjacent towns; goods can be imported from or exported to these external connections.
  - Export/import rule of thumb: when factories outnumber shops, surplus goods are exported via map-edge roads; when shops outnumber factories, deficit goods are imported from map-edge roads.
  - If multiple edge connections exist, the chosen edge for import/export is selected randomly unless game rules specify otherwise.
- **Vehicles**:
  - Cars may only travel on roads.
  - Cars cannot occupy the same space; implement collision avoidance at vehicle granularity.
  - Simulate congestion: vehicles should slow, queue, and form jams; systems and gameplay should allow players to alleviate congestion through design or interventions.
- **Player interventions**: Limited to adding, modifying, or removing roads and buildings; no other direct manipulation of agents or systems is permitted without governance approval.
- **Randomization & determinism**:
  - All gameplay elements and behaviors MUST be reproducible deterministically from a provided seed; all random selections (including explicitly random choices such as midday random shop selection or edge selection for import/export) MUST use a seeded PRNG so replays with the same seed produce identical outcomes.
- **Goal**: The game is explicitly about simulating and resolving traffic congestion. Game mechanics, scoring, and systems should reflect this objective.

3. **Architecture & ECS Requirement**
- **Runtime ECS library (REQUIRED):** use **bitECS** (or another governance-approved ECS) as the canonical runtime for entities, components, and systems.
- Systems should be small, single-responsibility, deterministic where possible, and testable in isolation. Components must be plain data and serializable to allow snapshotting and deterministic replays.

4. **Toolchain & Libraries**
- **Package manager (REQUIRED):** bun MUST be used as the repository package manager and for workspace-level package management. Use of other package managers is prohibited unless explicitly approved.
- **Required libraries & services:**
  - **PixiJS** — primary 2D rendering library for game visuals and sprite rendering.
  - **bitECS** — ECS runtime and patterns for simulation.
  - **Cloudflare** — Pages for static hosting and optional Workers if server-side features are later justified.
  - **New Relic** — for error collection and operational observability (errors only; do not send PII or full request payloads).
- Preferred developer tooling (unless otherwise approved): bun for builds, biome for linting/formatting, vitest for unit tests. Additional tooling must be proposed and approved before introduction.

5. **Build & Runtime**
- Build artifacts MUST be self-contained static assets (HTML/CSS/JS) compatible with Cloudflare Pages deployment.
- SPA router configuration MUST support client-side routing with appropriate fallback to `index.html` and support hash routing for deterministic reload behavior if necessary.
- Environment/configuration values (secrets, API endpoints, feature flags) MUST be externalized and injected via build-time or runtime configuration as appropriate.

6. **Observability & Analytics**
- **Error logging**: Use **New Relic** for **error collection only**; do not send full request bodies or user-sensitive data.
- **Site analytics**: Cloudflare Web Analytics is the preferred analytics provider; configure it to avoid collecting PII and to respect privacy.
- **Cost & data minimization**: Configure sampling, aggregation, and retention policies to minimize data transfer and storage costs and to comply with applicable privacy requirements.

7. **Testing, Determinism & Reproducibility**
- Unit tests MUST cover pure systems and logic (e.g., routing, vehicle physics, movement decisions, scheduling) with deterministic inputs and seeds.
- Integration and simulation tests SHOULD exercise multi-agent scenarios, congestion creation/removal, and large-map performance.
- Support deterministic simulation runs via seeding so that recorded seeds reproduce identical behavior for debugging and regression tests.
  - UI/E2E tests MUST use Playwright. Alternative UI/E2E frameworks require governance approval.

8. **Governance for Additions or Exceptions**
- Any deviation from the required toolchain or permitted services (e.g., adding third-party analytics, changing ECS runtime) MUST be documented in a proposal, justify the added risk/cost, and be approved by governance before merging.
- Breaking changes to core ECS data shapes, schedule semantics, or public save/restore formats MUST include migration guidance and compatibility testing.

9. **Game Code Structure Matrix (non-negotiable)**
- Dependency direction is one-way: `app/usecase → feature → infrastructure`. Cross-feature calls are forbidden; coordinate via `usecase`.
- UI is read-only against ECS state; state mutations flow `usecase → ECS/system`. Routing mode selection happens in `usecase`; routing implementations live in `feature/routing`; seeded PRNG lives in `feature/rng`.
- Persistence lives in `infrastructure/persistence` and MUST use DTOs; no direct reads/writes of ECS components from infrastructure.
- Config/env/constants/feature flags live in `feature/config` and consume injected values only.
- Asset loading lives in `infrastructure/assets`; Pixi/UI code in `infrastructure/ui`/`ui/pixi`/`ui/screens`/`ui/hud`; ECS data exposure to UI is read-only.
- Canonical mapping of game element × program layer is maintained in the root README "Game Code Structure" table and must be kept in sync with code and specs.

## Governance

- Documentation updates: Before updating any development documentation, consult the repository-root `CONTRIBUTING.md` and follow its guidance; reference it in the PR description.
- Documentation translations: Japanese translations MUST live under `.docs-human-ja/`, mirroring each English Markdown file's path from the repository root and using the `.ja.md` suffix. There is no required English docs directory; place English docs where appropriate.
- This constitution supersedes informal or ad-hoc practices; amendments require documentation and a migration plan where applicable.
- All PRs and code reviews must verify compliance with the constitution where relevant; complexity must be justified in PR descriptions.
- Non-compliance or deviations must be documented in the PR with a rationale and an explicit TODO for future alignment.

**Version**: 2.7.0 | **Ratified**: 2025-12-29 | **Last Amended**: 2025-12-30