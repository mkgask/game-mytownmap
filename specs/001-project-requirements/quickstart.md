# Quickstart (Phase 1)

1. Prerequisites: bun >= 1.x, Node not required for tooling; modern browser for SPA testing.
2. Install dependencies (workspace root): `bun install`.
3. Run lint/tests (once implemented): `bun run lint` (biome) and `bun run test` (vitest).
4. Run Playwright P1 suite (once flows exist): `bun run test:e2e` targeting road build, building placement, and day-cycle scenarios.
5. Build SPA for Cloudflare Pages: `bun run build` producing static assets; ensure `index.html` fallback is configured for SPA routing (hash fallback if needed).
6. Configure env/runtime: supply seed, analytics toggles, and New Relic keys via env or injected config file; never hardcode secrets or URLs.
7. Persistence: IndexedDB stores saves/seeds/settings; clear via browser devtools when resetting state.
