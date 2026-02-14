# Contracts: Title Scene MVP

## Overview

External interfaces and contract definitions for Title Scene MVP.

## TitleScene Interface

### Public API

```typescript
interface TitleSceneInterface {
  // Initialization
  initialize(): Promise<void>

  // Event handlers
  onPlayClick(): void

  // Properties
  readonly titleText: PIXI.Text
  readonly playButton: PIXI.Container
}
```

### Constructor Options

```typescript
interface TitleSceneOptions {
  title?: string
  buttonText?: string
  onPlayClick?: () => void
}
```

## Game Integration Contract

### Scene Management

```typescript
interface GameSceneManager {
  addScene(scene: Scene): void
  setActiveScene(sceneName: string): void
  getCurrentScene(): Scene | null
}
```

### Scene Lifecycle

```typescript
interface SceneLifecycle {
  initialize(): Promise<void>
  destroy(): void
  update(deltaTime: number): void
}
```

## Event Contracts

### Button Click Event

**Event Type**: `pointerdown`
**Target**: Play button graphics
**Handler**: `onPlayClick()`
**Action**: Trigger scene transition to game scene

### Scene Transition Event

**Event Type**: Custom event
**Payload**:
```typescript
interface SceneTransitionEvent {
  fromScene: string
  toScene: string
  transitionType: 'immediate' | 'fade' | 'slide'
}
```

## Data Contracts

### Configuration Schema

```typescript
interface TitleSceneConfig {
  title: {
    text: string
    fontSize: number
    color: string
    fontFamily: string
  }
  button: {
    text: string
    width: number
    height: number
    backgroundColor: string
    textColor: string
  }
  layout: {
    titlePosition: { x: number, y: number }
    buttonPosition: { x: number, y: number }
  }
}
```

## Error Contracts

### Initialization Errors

- **INVALID_CONTAINER**: Game canvas container not found
- **PIXIJS_NOT_READY**: PixiJS application not initialized
- **FONT_LOAD_FAILED**: Title font failed to load

### Runtime Errors

- **SCENE_TRANSITION_FAILED**: Unable to transition to game scene
- **BUTTON_NOT_INTERACTIVE**: Play button not responding to clicks

## Performance Contracts

### Load Time Requirements
- Title scene initialization: <500ms
- First paint: <1000ms
- Interactive: <1500ms

### Frame Rate Requirements
- Maintain 60 FPS during title display
- No frame drops during button interactions

## Compatibility Contracts

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Device Support
- Desktop: 1366px+ width
- Tablet: 768px+ width
- Mobile: 320px+ width

## Testing Contracts

### Unit Test Contracts
- TitleScene can be instantiated
- Title text is rendered correctly
- Play button handles click events
- Scene transition is triggered

### E2E Test Contracts
- Page loads with title displayed
- Button is clickable
- Scene transition occurs on click
- No console errors during interaction</content>
<parameter name="filePath">/mnt/g/projects/web/game-mytownmap/specs/004-title-scene-mvp/contracts/README.md