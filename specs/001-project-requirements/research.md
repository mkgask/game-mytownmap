# Phase 0 Research

## Seeded PRNG for deterministic simulation
- Decision: Use `seedrandom` to generate deterministic PRNG instances per simulation seed and derive separate streams for movement, shop selection, and import/export choices.
- Rationale: `seedrandom` is browser-friendly, reproducible across platforms, and allows namespaced streams to keep randomness independent between subsystems, preventing cross-talk that could break determinism.
- Alternatives considered: Built-in `Math.random` (non-deterministic, unsuitable for replay); `pure-rand` (also viable but adds slightly heavier API surface; `seedrandom` already familiar and minimal for browser SPA).

## ECS scheduling and system boundaries with bitECS
- Decision: Model discrete systems per responsibility (road validation, capacity assignment, daily schedule state machine, routing/pathfinding, vehicle movement/collision avoidance, delivery dispatch, congestion metrics) with explicit deterministic ordering and no shared mutable globals.
- Rationale: Small, single-responsibility systems align with constitution, ease unit testing in isolation, and keep deterministic ordering explicit for reproducibility and replay hashing.
- Alternatives considered: Monolithic update loop (hurts testability and determinism); other ECS libs (not allowed by constitution without approval).

## Rendering integration via PixiJS
- Decision: Keep PixiJS rendering in a dedicated presentation layer that reads ECS component snapshots; decouple render tick from simulation tick using a fixed-step simulation loop and capped 60 FPS render loop.
- Rationale: Separation keeps simulation deterministic and testable while allowing rendering to drop frames under load without affecting state progression; complies with requirement to decouple compute vs draw.
- Alternatives considered: Driving simulation off `requestAnimationFrame` (would couple sim speed to frame rate and harm determinism); integrating rendering directly into systems (blurs concerns and complicates testing).

## Persistence layer choice
- Decision: Use IndexedDB via a thin wrapper (e.g., `idb`) to persist game state, saves, seeds, and settings; serialize ECS components into deterministic DTOs.
- Rationale: IndexedDB satisfies NFR-007, is asynchronous/non-blocking, and `idb` simplifies transactions while keeping bundle small; deterministic serialization preserves replay fidelity.
- Alternatives considered: localStorage (disallowed and synchronous); custom bare IndexedDB calls (more boilerplate, higher error risk); service-worker-backed KV (unnecessary complexity for current scope).

## Observability strategy (errors only)
- Decision: Integrate New Relic browser agent with error-only capture, stripping PII and request bodies; emit structured error events from simulation subsystems for ingestion.
- Rationale: Aligns with constitution observability constraints and keeps operational insight while respecting privacy and cost controls.
- Alternatives considered: Custom error collector (reinvents wheel, lacks governance approval); full telemetry/analytics (out of scope and privacy risk).

## Testing approach
- Decision: Use vitest for unit/integration of pure systems (routing, scheduling, collision avoidance) with seeded fixtures; use Playwright for P1 acceptance flows (road build, building placement, full day run) running under 5 minutes.
- Rationale: Matches mandated tooling; determinism via seeds enables stable assertions and hash-based regression checks; Playwright satisfies UI/E2E requirement.
- Alternatives considered: Jest or Cypress (not aligned with mandated stack without governance approval); ad-hoc manual testing (insufficient coverage and repeatability).

## Build and package management
- Decision: Standardize on bun workspaces for dependency installs, scripts, and builds; produce static SPA bundle suitable for Cloudflare Pages.
- Rationale: Constitution mandates bun; static output aligns with Cloudflare Pages and keeps deployment simple and fast.
- Alternatives considered: npm/pnpm/yarn (disallowed); server-side rendering or backend services (outside scope and violates static deploy constraint).

## Deployment and routing
- Decision: Target Cloudflare Pages with SPA fallback to `index.html`, optionally enabling hash routing for deterministic reload behavior if path-based routing conflicts with static hosting.
- Rationale: Meets NFR-001 and constitution hosting constraints; hash fallback avoids 404s without custom Workers while preserving reproducible navigation for Playwright flows.
- Alternatives considered: Custom server/Workers routing (more ops overhead, requires extra governance approval); no fallback (would break deep links and E2E flows on reload).
