# リサーチ: Title Scene MVP

## 概要

タイトルシーンMVPの実装に必要な技術的調査と決定事項をまとめます。

## PixiJS UI Implementation

### Text Display
- **PIXI.Text** を使用してタイトルを表示
- フォント: システムフォントまたはWebフォント
- 配置: 画面中央 (canvas.width/2, canvas.height/2)
- サイズ: 48px (デスクトップ), 32px (モバイル)

### Button Implementation
- **PIXI.Graphics** でボタンの背景を作成
- **PIXI.Text** でボタンテキスト
- クリックイベント: `pointerdown` イベントを使用
- 視覚フィードバック: クリック時に色変更

### Scene Management
- 既存の Scene.ts ベースクラスを拡張
- Game.ts のシーン管理機能を活用
- シーン遷移: TitleScene → GameScene

## Technical Decisions

### 1. UI Framework Choice
**Decision**: Pure PixiJS implementation
**Rationale**:
- 既存の PixiJS 環境との一貫性
- 追加のUIライブラリ不要
- パフォーマンス最適化
- モバイル対応が容易

**Alternatives Considered**:
- React Pixi: 学習コストが高い
- Custom HTML overlay: PixiJSとの統合が複雑

### 2. Font Loading Strategy
**Decision**: System fonts with web font fallback
**Rationale**:
- 高速な読み込み
- バンドルサイズ削減
- クロスプラットフォーム対応

### 3. Button Interaction Model
**Decision**: Pointer events with visual feedback
**Rationale**:
- タッチデバイス対応
- ユーザビリティ向上
- アクセシビリティ考慮

## Implementation Patterns

### TitleScene Structure
```typescript
export class TitleScene extends Scene {
  private titleText: PIXI.Text
  private playButton: PIXI.Container

  async initialize(): Promise<void> {
    this.createTitle()
    this.createPlayButton()
  }

  private createTitle(): void {
    // タイトル作成
  }

  private createPlayButton(): void {
    // ボタン作成
  }

  private onPlayClick(): void {
    // シーン遷移
  }
}
```

### Game Integration
```typescript
// Game.ts での使用
const titleScene = new TitleScene()
await titleScene.initialize()
this.addScene(titleScene)
this.setActiveScene('title')
```

## Mobile Considerations

- **Touch Targets**: ボタンサイズを最小44px
- **Viewport**: レスポンシブデザイン
- **Performance**: シンプルなアニメーションのみ

## Testing Strategy

### Unit Tests
- TitleScene インスタンス作成
- タイトルテキスト表示
- ボタン作成とクリックイベント

### E2E Tests
- ページロード時のタイトル表示
- ボタンクリックとシーン遷移
- モバイルビューポート対応

## Dependencies Analysis

### Required
- PixiJS v8 (existing)
- TypeScript (existing)
- Existing Scene.ts and Game.ts

### Optional
- Web fonts (if needed)
- Additional UI libraries (not recommended)

## Risk Assessment

### Low Risk
- **Implementation Complexity**: 既存パターンの拡張のみ
- **Performance Impact**: 軽量なUI要素のみ

### Medium Risk
- **Font Rendering**: クロスブラウザの一貫性
- **Touch Events**: モバイルでのイベント処理

## References

- [PixiJS Text Documentation](https://pixijs.com/8.x/guides/components/text)
- [PixiJS Events](https://pixijs.com/8.x/guides/components/interaction)
- [Existing Scene.ts implementation](src/libs/game/features/scenes/Scene.ts)
- [Game.ts scene management](src/libs/game/core/Game.ts)