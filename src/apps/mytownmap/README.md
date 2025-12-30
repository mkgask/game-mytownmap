# game-mytownmap

## Code Structure (matrix: game element × program layer)

Dependency direction: one-way `app/usecase → feature → infrastructure`. No cross-feature calls (usecase only). UI reads ECS state only; writes flow usecase → ECS/system. Persistence uses DTOs only.

| Layer \ Element | Seed & Config | Map / Roads / Buildings | Routing (Easy/Normal/Hard) | Residents / Vehicles / Delivery | Day-Cycle | Persistence | UI / Screens | Assets |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| app / usecase (caller) | `src/app/*`, `src/usecase/*`<br>DI/boot, mode selection, orchestrate use cases | Issue road/building commands | Select route/lane mode and delegate | Trigger schedule/commands | Trigger daily cycle | Call save/load | Screen routing, input handoff | Instruct asset loading |
| feature (callee) | `src/feature/config/*`, `feature/rng/*` | `feature/ecs/components/*` (roads/buildings) | `feature/routing/*` (graph, cache, lane policy) | `feature/ecs/components/*`, `feature/ecs/systems/*` (agents/vehicles/delivery) | `feature/ecs/systems/scheduling/*`, `feature/ecs/world/*` | — | `feature/ecs` exposes read-only state to UI | — |
| infrastructure (callee) | — | — | — | — | — | `src/infrastructure/persistence/*` (IndexedDB/DTO) | `src/infrastructure/ui/*`, `ui/pixi/*`, `ui/screens/*`, `ui/hud/*` | `src/infrastructure/assets/*` |

Notes
- Routing modes (Easy/Normal/Hard) live in `feature/routing`; selection happens in `usecase`. PRNG comes only from `feature/rng`.
- Config/env/constants/featureFlags live in `feature/config` and consume injected values only.
- UI is read-only; state mutations go usecase → ECS/system.
- Persistence saves/loads via DTOs only; never touch ECS components directly.

## Runbook
- Install deps: `bun install`
- Run (placeholder until entry is wired): `bun run dev:mytownmap` (planned)
