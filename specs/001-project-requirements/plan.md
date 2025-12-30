# Implementation Plan: Constraint-Derived Requirements Baseline

**Branch**: `001-project-requirements` | **Date**: 2025-12-30 | **Spec**: [specs/001-project-requirements/spec.md](specs/001-project-requirements/spec.md)
**Input**: Feature specification from `specs/001-project-requirements/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow. Before updating development documentation, consult the repository-root `CONTRIBUTING.md` and follow its guidance; reference it in your PR.

**App Location (fixed)**: `src/apps/mytownmap`  
**Package Manager (REQUIRED)**: bun  
**Mandated Stack**: PixiJS (2D rendering), bitECS (ECS runtime), bun (build/package), Cloudflare Pages (hosting), New Relic (errors only), Playwright (UI/E2E tests)  
**Architecture Focus**: ECS-first, deterministic/seeded simulation; vehicles stay on roads, cannot overlap; congestion mitigation is the goal; daily schedule (residence→factory/shop in morning, factory/shop→random shop at noon, shop→residence in evening) with workplace/shop capacity enforced; player interventions are limited to adding, modifying, or removing roads and buildings; UI/E2E tests use Playwright.

## Summary

Baseline the constitution-driven functional/non-functional requirements for MyTownMap, emphasizing deterministic ECS simulation on roads-only movement, seeded randomness, and congestion mitigation. Technical approach centers on a browser-only PixiJS + bitECS SPA built with bun, with IndexedDB persistence, seeded PRNG, Playwright automation, and New Relic error-only observability deployed to Cloudflare Pages.

## Technical Context

**Language/Version**: TypeScript 5.x targeting modern evergreen browsers; bun for tooling/runtime where applicable.  
**Primary Dependencies**: PixiJS for 2D rendering; bitECS for ECS runtime; bun toolchain; Playwright for UI/E2E; vitest for unit/integration; New Relic browser agent (errors only); Cloudflare Pages hosting.  
**Storage**: IndexedDB for game state (roads, buildings, agents, seeds, saves); no server-side storage; configuration via env/runtime injection.  
**Testing**: vitest for pure systems and integration; Playwright for P1 flows (road building, building placement, day-cycle run); deterministic simulation hashing for regression.  
**Target Platform**: Browser SPA deployed as static assets to Cloudflare Pages; no server backend assumed.  
**Project Type**: Web SPA (game) under `src/apps/mytownmap`.  
**Performance Goals**: Complete seeded day simulation for 500 residents/50 shops/25 factories within 30s wall-clock on 2024 mid-tier laptop; cap rendering at 60 FPS; Playwright P1 suite under 5 minutes; zero divergence across same-seed runs.  
**Constraints**: Static deployable bundle; vehicles only on roads with no overlap; seeded PRNG required for all randomness (shops, imports/exports, deliveries); player actions limited to road/building CRUD; configuration externalized; offline-capable via IndexedDB saves; ECS systems single-responsibility and deterministic.  
**Scale/Scope**: Support maps with hundreds of agents (≥500 residents) and dozens of buildings (≈50 shops, 25 factories) with deterministic replay and congestion behaviors.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*
- App resides at `src/apps/mytownmap` as a browser-playable SPA for Cloudflare Pages. ✅
- Package management/scripts use bun only; no npm/pnpm/yarn. ✅
- ECS via bitECS; systems deterministic, small, and seeded. ✅
- Rendering via PixiJS; vehicles road-bound and non-overlapping; daily schedule and capacity rules enforced. ✅
- Player actions limited to road/building add/modify/remove; other actions require governance. ✅
- Observability via New Relic errors only; Cloudflare Web Analytics optional; config externalized. ✅
- UI/E2E testing with Playwright only. ✅

## Project Structure

### Documentation (this feature)

```text
specs/001-project-requirements/
├── spec.md          # Feature spec (/speckit.spec output)
├── plan.md          # This file (/speckit.plan output)
├── research.md      # Phase 0 output (/speckit.plan output)
├── data-model.md    # Phase 1 output (/speckit.plan output)
├── quickstart.md    # Phase 1 output (/speckit.plan output)
├── contracts/       # Phase 1 output (/speckit.plan output)
└── tasks.md         # Phase 2 output (/speckit.tasks output)
```

### Source Code (monorepo root)

```text
src/
└── apps/
    └── mytownmap/
        ├── src/
        └── tests/
```

**Structure Decision**: The game lives at `src/apps/mytownmap`; place all app code and tests under this path.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
