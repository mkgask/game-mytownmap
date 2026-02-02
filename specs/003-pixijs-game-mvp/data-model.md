# Data Model: PixiJS Game MVP

**Feature**: PixiJS Game MVP | **Date**: 2026-02-01
**Plan**: [specs/003-pixijs-game-mvp/plan.md](specs/003-pixijs-game-mvp/plan.md)

## Overview

Data model for the basic PixiJS game setup. This MVP focuses on the minimal data structures needed for canvas rendering and game initialization.

## Core Entities

### GameConfiguration

**Purpose**: Configuration settings for the game canvas and rendering

**Attributes:**
- `width`: number - Canvas width in pixels (default: 800)
- `height`: number - Canvas height in pixels (default: 600)
- `backgroundColor`: number - Hex color for canvas background (default: 0x1099bb)
- `antialias`: boolean - Enable antialiasing (default: true)
- `resolution`: number - Device pixel ratio (default: window.devicePixelRatio)

**Relationships:**
- Used by Game class for initialization
- Passed to PixiJS Application constructor

### GameState

**Purpose**: Current state of the game application

**Attributes:**
- `isInitialized`: boolean - Whether PixiJS app is ready
- `isRunning`: boolean - Whether render loop is active
- `fps`: number - Current frames per second
- `lastUpdate`: number - Timestamp of last update

**Relationships:**
- Managed by Game class
- Observed by tests for state verification

### CanvasElement

**Purpose**: DOM canvas element reference

**Attributes:**
- `element`: HTMLCanvasElement - The actual DOM element
- `container`: HTMLElement - Parent container element
- `isAttached`: boolean - Whether canvas is in DOM

**Relationships:**
- Created by Renderer class
- Referenced by Game class for DOM operations

## Data Flow

1. **Initialization**:
   - GameConfiguration → Game.create() → Renderer.initialize()
   - CanvasElement created and attached to DOM

2. **Runtime**:
   - GameState updated on each frame
   - CanvasElement remains static during gameplay

3. **Cleanup**:
   - Game.destroy() → Renderer.cleanup() → CanvasElement detached

## Validation Rules

- Canvas dimensions must be positive integers
- Background color must be valid hex number
- Device pixel ratio must be >= 1

## Future Extensions

When game features are added, this model will expand to include:
- Scene data structures
- Entity/component data for ECS
- Asset loading states
- User input state
- Game save/load data

## Testing Considerations

- Mock CanvasElement for unit tests
- Use real DOM elements for integration tests
- Validate GameConfiguration constraints
- Test GameState transitions