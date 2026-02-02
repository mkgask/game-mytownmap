# Quickstart: PixiJS Game MVP

**Feature**: PixiJS Game MVP | **Date**: 2026-02-01
**Plan**: [specs/003-pixijs-game-mvp/plan.md](specs/003-pixijs-game-mvp/plan.md)

## Overview

This guide provides quick setup instructions for implementing the PixiJS Game MVP. The implementation establishes a basic game canvas with PixiJS rendering environment.

## Prerequisites

- Node.js/Bun environment set up
- Basic Astro project running
- PixiJS dependencies installed

## Installation

```bash
# Install PixiJS
bun add pixi.js
bun add -D @types/pixi.js
```

## Basic Implementation

### 1. Create GameCanvas Component

```typescript
// src/components/GameCanvas.tsx
import { onMount } from 'astro/jsx-runtime'
import * as PIXI from 'pixi.js'

export default function GameCanvas() {
  onMount(() => {
    // Create PixiJS application
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    })

    // Get canvas container
    const container = document.getElementById('game-canvas')
    if (container) {
      container.appendChild(app.view as HTMLCanvasElement)
    }

    // Add empty scene
    const scene = new PIXI.Container()
    app.stage.addChild(scene)

    // Start render loop
    app.ticker.start()
  })

  return <div id="game-canvas"></div>
}
```

### 2. Create Game Page

```astro
---
// src/pages/game.astro
import GameCanvas from '../components/GameCanvas.tsx'
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>City Building Game</title>
  </head>
  <body>
    <h1>Traffic Jam Reducing City Builder</h1>
    <GameCanvas />
  </body>
</html>
```

### 3. Add Game Logic Structure

```typescript
// src/libs/game/Game.ts
import * as PIXI from 'pixi.js'

export class Game {
  private app: PIXI.Application
  private scene: PIXI.Container

  constructor(config: GameConfig) {
    this.app = new PIXI.Application(config)
    this.scene = new PIXI.Container()
    this.app.stage.addChild(this.scene)
  }

  init(container: HTMLElement) {
    container.appendChild(this.app.view as HTMLCanvasElement)
    this.app.ticker.start()
  }

  destroy() {
    this.app.destroy()
  }
}

interface GameConfig {
  width: number
  height: number
  backgroundColor: number
  antialias: boolean
  resolution: number
}
```

## Testing

### Unit Tests

```typescript
// tests/unit/Game.test.ts
import { describe, expect, it } from 'bun:test'
import { Game } from '../../src/libs/game/Game'

describe('Game', () => {
  it('should create game instance', () => {
    const config = {
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
      antialias: true,
      resolution: 1
    }
    const game = new Game(config)
    expect(game).toBeDefined()
  })
})
```

### Integration Tests

```typescript
// tests/integration/game-rendering.test.ts
import { describe, expect, it } from 'bun:test'
import { render } from '@testing-library/react'
import GameCanvas from '../../src/components/GameCanvas'

describe('Game Rendering', () => {
  it('should render canvas element', () => {
    const { container } = render(<GameCanvas />)
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })
})
```

## Development Workflow

1. **Setup**: Install dependencies and create basic structure
2. **Implement**: Add GameCanvas component and Game class
3. **Test**: Run unit and integration tests
4. **Verify**: Check canvas renders in browser
5. **Extend**: Add more game features in future iterations

## Common Issues

- **Canvas not visible**: Check container element exists in DOM
- **WebGL errors**: Ensure browser supports WebGL
- **Performance issues**: Reduce canvas size or disable antialiasing

## Next Steps

- Add scene management
- Implement basic game loop
- Add user input handling
- Integrate with ECS (bitECS)