# Data Model: Title Scene MVP

## Overview

Data structures and state management model for Title Scene MVP.

## Core Data Structures

### TitleSceneState

```typescript
interface TitleSceneState {
  // Scene metadata
  sceneName: 'title'
  isInitialized: boolean
  isActive: boolean

  // UI state
  titleText: string
  buttonText: string
  isButtonEnabled: boolean

  // Interaction state
  isButtonHovered: boolean
  isButtonPressed: boolean

  // Transition state
  isTransitioning: boolean
  transitionTarget: string | null
}
```

### TitleSceneConfig

```typescript
interface TitleSceneConfig {
  // Text content
  title: {
    text: string
    fontSize: number
    color: string
    fontFamily: string
  }

  // Button configuration
  button: {
    text: string
    width: number
    height: number
    backgroundColor: string
    hoverColor: string
    pressedColor: string
    textColor: string
    borderRadius: number
  }

  // Layout configuration
  layout: {
    titlePosition: { x: number, y: number }
    buttonPosition: { x: number, y: number }
    centerHorizontally: boolean
    centerVertically: boolean
  }

  // Animation configuration
  animations: {
    buttonHoverDuration: number
    buttonPressDuration: number
    transitionDuration: number
  }
}
```

## State Transitions

### Scene Lifecycle States

```typescript
type SceneState = 'uninitialized' | 'initializing' | 'ready' | 'active' | 'transitioning' | 'destroyed'
```

### State Transition Diagram

```
uninitialized → initializing → ready → active → transitioning → destroyed
     ↑              ↓           ↓         ↓           ↓
     └──────────────┴───────────┴─────────┴───────────┘
```

### Button Interaction States

```typescript
type ButtonState = 'idle' | 'hovered' | 'pressed' | 'disabled'
```

## Event Data Structures

### SceneEvent

```typescript
interface SceneEvent {
  type: 'scene_initialized' | 'scene_activated' | 'scene_deactivated' | 'scene_destroyed'
  sceneName: string
  timestamp: number
  data?: any
}
```

### ButtonEvent

```typescript
interface ButtonEvent {
  type: 'button_hover' | 'button_unhover' | 'button_press' | 'button_release' | 'button_click'
  buttonId: string
  timestamp: number
  position?: { x: number, y: number }
}
```

### TransitionEvent

```typescript
interface TransitionEvent {
  type: 'transition_start' | 'transition_progress' | 'transition_complete'
  fromScene: string
  toScene: string
  progress: number // 0.0 to 1.0
  duration: number
}
```

## Configuration Data

### Default Configuration

```typescript
const DEFAULT_TITLE_SCENE_CONFIG: TitleSceneConfig = {
  title: {
    text: 'My Town Map',
    fontSize: 48,
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif'
  },
  button: {
    text: 'Play Game',
    width: 200,
    height: 60,
    backgroundColor: '#4CAF50',
    hoverColor: '#45a049',
    pressedColor: '#3e8e41',
    textColor: '#ffffff',
    borderRadius: 8
  },
  layout: {
    titlePosition: { x: 0, y: -100 },
    buttonPosition: { x: 0, y: 50 },
    centerHorizontally: true,
    centerVertically: true
  },
  animations: {
    buttonHoverDuration: 200,
    buttonPressDuration: 100,
    transitionDuration: 500
  }
}
```

## Validation Rules

### Configuration Validation

```typescript
interface ConfigValidationRule {
  field: string
  rule: (value: any) => boolean
  errorMessage: string
}

const TITLE_SCENE_VALIDATION_RULES: ConfigValidationRule[] = [
  {
    field: 'title.text',
    rule: (value: string) => value.length > 0 && value.length <= 100,
    errorMessage: 'Title text must be 1-100 characters'
  },
  {
    field: 'button.width',
    rule: (value: number) => value > 0 && value <= 1000,
    errorMessage: 'Button width must be 1-1000 pixels'
  },
  {
    field: 'button.height',
    rule: (value: number) => value > 0 && value <= 500,
    errorMessage: 'Button height must be 1-500 pixels'
  }
]
```

## Data Flow

### Initialization Flow

1. Load configuration
2. Validate configuration
3. Create PIXI objects
4. Set initial state
5. Bind event handlers
6. Emit 'scene_initialized' event

### Interaction Flow

1. User hovers button → Update button state → Apply hover style
2. User clicks button → Update button state → Apply pressed style → Trigger transition
3. Transition starts → Update scene state → Animate transition → Emit transition events

## Persistence

### Session Storage

- Current scene state (temporary)
- User preferences (theme, language)

### No Persistent Storage Required

- Title scene is stateless
- Configuration loaded from code/constants
- No user data to persist

## Error Handling

### Error Types

```typescript
type TitleSceneError =
  | 'CONFIG_INVALID'
  | 'PIXIJS_NOT_AVAILABLE'
  | 'CANVAS_NOT_FOUND'
  | 'FONT_LOAD_FAILED'
  | 'TRANSITION_FAILED'
```

### Error Recovery

- Invalid config → Use defaults
- PixiJS not available → Show error message
- Canvas not found → Retry initialization
- Font load failed → Use fallback font
- Transition failed → Stay on current scene</content>
<parameter name="filePath">/mnt/g/projects/web/game-mytownmap/specs/004-title-scene-mvp/data-model.md