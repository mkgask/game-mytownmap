# Implementation Plan: PixiJS Game MVP

**Branch**: `003-pixijs-game-mvp` | **Date**: 2026-02-01 | **Spec**: [specs/003-pixijs-game-mvp/spec.md](specs/003-pixijs-game-mvp/spec.md)
**Input**: Feature specification from `specs/003-pixijs-game-mvp/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement basic PixiJS game canvas, rendering setup, and empty scene to establish the foundation for the city-building game. Focus on minimal viable setup that provides a working game environment without any game content.

## Technical Context

**Language/Version**: TypeScript (Astro framework)  
**Primary Dependencies**: PixiJS for 2D rendering, Astro for base framework  
**Storage**: N/A (client-side only)  
**Testing**: bun test for unit/integration tests, Playwright for E2E tests  
**Target Platform**: Web browser (Chrome, Firefox, Safari)  
**Project Type**: Web application (client-side game)  
**Performance Goals**: 60 FPS rendering, <1s initialization  
**Constraints**: Client-side only, no server dependencies, WebGL/WebGL2 support required  
**Scale/Scope**: Single canvas element, basic PixiJS application setup

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Test-First & Integration Testing**: ✅ COMPLIES - Feature implements test-first approach with unit tests for PixiJS setup and integration tests for rendering
- **Runtime-First Thinking**: ✅ COMPLIES - PixiJS application designed for browser environment, no hard-coded values, observable through canvas rendering
- **Context-First**: ✅ COMPLIES - Game rendering logic organized under game context, minimal cross-context interactions
- **Minimum-Change Scope Principle**: ✅ COMPLIES - Starting with minimal canvas setup, expanding scope incrementally
- **Basic Principles**: ✅ COMPLIES - Pure functions for game logic, testability maximized, JSDoc comments required

## Project Structure

### Documentation (this feature)

```text
specs/003-pixijs-game-mvp/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── astro/
│   │   ├── GameCanvas.tsx    # PixiJS canvas component for Astro
│   │   └── GameUI.tsx        # Game UI components wrapper
│   └── game/
│       ├── Canvas.tsx        # Canvas-specific components
│       └── Controls.tsx      # Game control components
├── libs/
│   └── game/
│       ├── core/
│       │   ├── Game.ts       # Main game class and lifecycle
│       │   ├── Config.ts     # Game configuration types
│       │   └── State.ts      # Game state management
│       ├── features/
│       │   ├── rendering/
│       │   │   ├── Renderer.ts   # PixiJS renderer wrapper
│       │   │   ├── Canvas.ts     # Canvas DOM management
│       │   │   └── Viewport.ts   # Viewport and camera logic
│       │   └── scenes/
│       │       ├── Scene.ts      # Base scene container
│       │       ├── EmptyScene.ts # Default empty scene implementation
│       │       └── SceneManager.ts # Scene switching logic
│       └── types/
│           └── index.ts       # Game-related type definitions
└── pages/
    ├── index.astro          # Main landing page
    └── game.astro           # Game page with canvas

tests/
├── unit/
│   ├── game/
│   │   ├── core/
│   │   │   ├── Game.test.ts      # Game class tests
│   │   │   ├── Config.test.ts    # Configuration tests
│   │   │   └── State.test.ts     # State management tests
│   │   ├── features/
│   │   │   ├── rendering/
│   │   │   │   ├── Renderer.test.ts  # Renderer tests
│   │   │   │   ├── Canvas.test.ts    # Canvas tests
│   │   │   │   └── Viewport.test.ts  # Viewport tests
│   │   │   └── scenes/
│   │   │       ├── Scene.test.ts     # Scene tests
│   │   │       ├── EmptyScene.test.ts # Empty scene tests
│   │   │       └── SceneManager.test.ts # Scene manager tests
│   │   └── types/
│   │       └── index.test.ts      # Type definition tests
│   └── components/
│       ├── astro/
│       │   ├── GameCanvas.test.tsx # Astro component tests
│       │   └── GameUI.test.tsx     # UI component tests
│       └── game/
│           ├── Canvas.test.tsx     # Game canvas tests
│           └── Controls.test.tsx   # Control tests
├── integration/
│   ├── game-rendering.test.ts     # Canvas rendering integration
│   ├── game-initialization.test.ts # Full game setup integration
│   └── component-integration.test.ts # Component interaction tests
└── e2e/
    ├── game-page.spec.ts          # Game page E2E tests
    └── navigation.spec.ts         # Page navigation tests
```

**Structure Decision**: Constitution-aligned directory structure with clear separation between Astro UI components and game engine logic. Game libs organized by domain (core, features) following constitution.md patterns - features/ for game features like rendering and scenes (including scene management). Tests mirror source structure for easy navigation and focused testing. This structure supports future expansion while maintaining clean boundaries between concerns and logical dependency flow (core → features).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations identified - implementation follows constitution principles.