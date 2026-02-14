# 契約: Title Scene MVP

## 概要

Title Scene MVP の外部インターフェースと契約定義。

## TitleScene Interface

### Public API

```typescript
interface TitleSceneInterface {
  // 初期化
  initialize(): Promise<void>

  // イベントハンドラー
  onPlayClick(): void

  // プロパティ
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

# 契約: Title Scene MVP

## 概要

Title Scene MVP の外部インターフェースと契約定義。

## TitleScene Interface

### Public API

```typescript
interface TitleSceneInterface {
  // 初期化
  initialize(): Promise<void>

  // イベントハンドラー
  onPlayClick(): void

  // プロパティ
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

**イベントタイプ**: `pointerdown`
**ターゲット**: Play button graphics
**ハンドラー**: `onPlayClick()`
**アクション**: ゲームシーンへのシーン遷移をトリガー

### Scene Transition Event

**イベントタイプ**: カスタムイベント
**ペイロード**:
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

- **INVALID_CONTAINER**: ゲームキャンバスコンテナが見つからない
- **PIXIJS_NOT_READY**: PixiJS アプリケーションが初期化されていない
- **FONT_LOAD_FAILED**: タイトルフォントのロードに失敗

### Runtime Errors

- **SCENE_TRANSITION_FAILED**: ゲームシーンへの遷移ができない
- **BUTTON_NOT_INTERACTIVE**: Play ボタンがクリックに応答しない

## Performance Contracts

### Load Time Requirements
- タイトルシーン初期化: <500ms
- 初回ペイント: <1000ms
- インタラクティブ: <1500ms

### Frame Rate Requirements
- タイトル表示中に 60 FPS を維持
- ボタンインタラクション中にフレームドロップなし

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
- TitleScene をインスタンス化できる
- タイトルテキストが正しくレンダリングされる
- Play ボタンがクリックイベントを処理する
- シーン遷移がトリガーされる

### E2E Test Contracts
- ページがタイトル表示でロードされる
- ボタンがクリック可能
- クリックでシーン遷移が発生
- インタラクション中にコンソールエラーがない