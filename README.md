# MyTownMap

## Overview
MyTownMap is a browser-based 2D traffic-congestion simulation game built as a single-page application located at `src/apps/mytownmap`.

## Prerequisites
- bun (latest stable)
- Git
- A modern browser for running the app locally

## Initial Setup (fresh project bootstrap)
1) Install bun: https://bun.sh
2) Initialize a new repository:
   - `mkdir game-mytownmap && cd game-mytownmap`
   - `git init`
   - `bun init -y`
3) Create required directories:
   - `mkdir -p src/apps/mytownmap src/packages scripts .specify .docs-human-ja`
4) Add core dependencies (app + tooling):
   - `bun add pixi.js bitecs`
   - `bun add -d typescript biome vitest`
5) Install workspace dependencies:
   - `bun install`
6) Verify workspace scripts (run from repo root):
   - `bun run lint` (if defined)
   - `bun run test` (if defined)

## Project Layout
- `src/apps/mytownmap/` — main game application (SPA)
- `src/packages/` — shared packages (only if justified for reuse)
- `.specify/` — specification templates and constitution
- `.docs-human-ja/` — human-readable Japanese documentation
- `scripts/` — helper scripts (documentation checks)

## Game Code Structure (matrix: game element × program layer)

Layer model
- Caller: `app/` (entry, DI), `usecase/` (use-case orchestration).
- Callee: `feature/` (domain logic/ECS/routing/config), `infrastructure/` (UI/Pixi, IndexedDB, assets).
- Dependency direction: one-way `app/usecase → feature → infrastructure`. No cross-feature calls (go via usecase). UI reads ECS state only; mutations flow usecase → ECS/system. Persistence goes through DTOs only.

| Layer \ Element | Seed & Config | Map / Roads / Buildings | Routing (Easy/Normal/Hard) | Residents / Vehicles / Delivery | Day-Cycle | Persistence | UI / Screens | Assets |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| app / usecase (caller) | `src/apps/mytownmap/src/app/*`, `src/apps/mytownmap/src/usecase/*`<br>DI, boot, mode selection, orchestrating use cases | Issue road/building commands from use cases | Choose route/lane mode and delegate to feature | Trigger schedule progress and commands | Trigger daily cycle | Call save/load | Screen routing and input handoff | Instruct asset loading |
| feature (callee) | `src/apps/mytownmap/src/feature/config/*`, `feature/rng/*` | `feature/ecs/components/*` (roads/buildings) | `feature/routing/*` (graph, path cache, lane policy) | `feature/ecs/components/*`, `feature/ecs/systems/*` (agents/vehicles/delivery) | `feature/ecs/systems/scheduling/*`, `feature/ecs/world/*` | — (persistence via infra only) | `feature/ecs` exposes read-only state to UI | — |
| infrastructure (callee) | — | — | — | — | — | `src/apps/mytownmap/src/infrastructure/persistence/*` (IndexedDB, DTO) | `infrastructure/ui/*`, `ui/pixi/*`, `ui/screens/*`, `ui/hud/*` (read-only state) | `infrastructure/assets/*` |

Rules of engagement
- Routing modes (Easy/Normal/Hard) live in `feature/routing`; selection happens in `usecase`. PRNG must come from `feature/rng`.
- Config/env/constants/featureFlags live in `feature/config`; consume injected values only.
- Persistence only via `infrastructure/persistence` DTOs; no direct ECS component access.
- UI renders Pixi/screens only; state changes go through usecase → ECS.

## Documentation & Contribution
- Before updating development documentation, read the root `CONTRIBUTING.md` and follow its guidance; reference it in your PR.
- Japanese documentation lives under `.docs-human-ja/`; the Japanese counterpart of this file is `README.ja.md` at the repository root.
