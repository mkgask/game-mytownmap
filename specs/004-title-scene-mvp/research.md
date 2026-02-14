# Research: Title Scene MVP

## Overview

Research and technical investigation for Title Scene MVP implementation.

## PixiJS Scene Management

### Current Architecture Analysis

**Scene.ts Base Class**:
```typescript
export abstract class Scene extends PIXI.Container {
  protected app: PIXI.Application
  protected isInitialized: boolean = false

  constructor(app: PIXI.Application) {
    super()
    this.app = app
  }

  async initialize(): Promise<void> {
    this.isInitialized = true
  }

  abstract update(deltaTime: number): void
  abstract destroy(): void
}
```

**Game.ts Scene Management**:
- シーンを Map<string, Scene> で管理
- setActiveScene() でアクティブシーン切り替え
- update() ループでアクティブシーンの update() を呼び出し

### Title Scene Requirements

**Core Features**:
- Title text display
- Play button creation and click handling
- Scene transition event firing

**Technical Constraints**:
- PixiJS v8 compatibility
- Inherit from existing Scene.ts
- Mobile touch support

## UI Implementation Research

### Text Rendering

**PixiJS Text Options**:
```typescript
const text = new PIXI.Text('Title', {
  fontFamily: 'Arial',
  fontSize: 48,
  fill: 0xffffff,
  align: 'center'
})
```

**Best Practices**:
- フォントサイズ: 24-72px (可読性)
- アンチエイリアス: 自動有効
- フォントロード: 事前ロード推奨

### Button Implementation

**Approaches**:
1. **Graphics + Text Container**:
   ```typescript
   const button = new PIXI.Container()
   const bg = new PIXI.Graphics()
   bg.beginFill(0x4CAF50)
   bg.drawRoundedRect(0, 0, 200, 60, 8)
   const text = new PIXI.Text('Play')
   button.addChild(bg, text)
   ```

2. **Sprite Button**:
   ```typescript
   const button = PIXI.Sprite.from('button.png')
   ```

**Recommendation**: Graphics + Text Container (柔軟性が高い)

### Interaction Handling

**Pointer Events**:
- `pointerdown`: クリック/タッチ開始
- `pointerup`: クリック/タッチ終了
- `pointerover`: ホバー開始
- `pointerout`: ホバー終了

**Mobile Considerations**:
- タッチターゲットサイズ: 最小44px
- タッチフィードバック: 視覚的/振動
- マルチタッチ: 考慮不要（単一ボタン）

## Event System Research

### Current Event Implementation

**Scene Events**:
- EventEmitter パターン使用
- カスタムイベント: 'scene-transition'

**Game.ts Integration**:
```typescript
scene.on('scene-transition', (data) => {
  this.setActiveScene(data.to)
})
```

### Alternative Approaches

1. **Observer Pattern**: より型安全
2. **PubSub System**: グローバルイベントバス
3. **Callback Props**: 直接コールバック渡し

**Recommendation**: 現在の EventEmitter パターンを維持（シンプル）

## Performance Considerations

### Rendering Performance

**Target FPS**: 60 FPS
**Budget**: <16.67ms per frame

**Optimization Strategies**:
- 静的オブジェクトのキャッシュ
- 不要な再描画の回避
- オブジェクトプールの使用

### Memory Management

**Object Lifecycle**:
- シーン破棄時に PIXI オブジェクトをクリーンアップ
- イベントリスナーの適切な解除
- テクスチャの解放

## Browser Compatibility

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### PixiJS v8 Support
- WebGL 2.0 優先
- Canvas フォールバック
- モバイル GPU アクセラレーション

## Testing Strategy Research

### Unit Testing

**Testable Components**:
- TitleScene インスタンス化
- UI要素の作成
- イベント発火
- 状態遷移

**Mocking Requirements**:
- PIXI.Application モック
- イベントシステムモック

### E2E Testing

**Playwright Scenarios**:
- ページロード時のタイトル表示
- ボタンクリックとシーン遷移
- モバイルでのタッチ操作

## Implementation Plan

### Phase 1: Core Implementation
1. TitleScene.ts 作成
2. 基本UI要素の実装
3. イベントハンドリング

### Phase 2: Integration
1. Game.ts 統合
2. シーン遷移テスト
3. エラーハンドリング

### Phase 3: Polish
1. スタイリング調整
2. パフォーマンス最適化
3. クロスブラウザテスト

## Risks and Mitigations

### High Risk: PixiJS Compatibility
**Risk**: v8 の新機能による破壊的変更
**Mitigation**: 既存コードの動作確認、段階的アップグレード

### Medium Risk: Mobile Touch Handling
**Risk**: タッチイベントのブラウザ差異
**Mitigation**: Pointer Events API 使用、テストデバイス多様化

### Low Risk: Performance
**Risk**: シンプルなシーンなので問題なし
**Mitigation**: 継続的なパフォーマンス監視

## References

### PixiJS Documentation
- [Text Rendering](https://pixijs.com/guides/basics/text)
- [Interactive Elements](https://pixijs.com/guides/basics/interaction)
- [Scene Management Patterns](https://pixijs.com/guides/advanced/scene-management)

### Game Development Best Practices
- [Mobile Touch Guidelines](https://developers.google.com/web/fundamentals/design-and-ux/input/touch)
- [WebGL Performance](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)

### Existing Codebase
- Scene.ts: ベースクラス実装
- Game.ts: シーン管理パターン
- GameCanvas.astro: 統合ポイント</content>
<parameter name="filePath">/mnt/g/projects/web/game-mytownmap/specs/004-title-scene-mvp/research.md