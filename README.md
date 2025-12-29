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

## Documentation & Contribution
- Before updating development documentation, read the root `CONTRIBUTING.md` and follow its guidance; reference it in your PR.
- Japanese documentation lives under `.docs-human-ja/`; the Japanese counterpart of this file is `README.ja.md` at the repository root.
