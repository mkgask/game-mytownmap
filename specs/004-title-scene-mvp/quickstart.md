# Quick Start: Title Scene MVP

## Overview

Title Scene MVP implements the game title screen. It provides game title display and game start functionality via Play button.

## Prerequisites

- Node.js 18+ or Bun
- PixiJS v8
- Existing Game.ts and Scene.ts infrastructure

## Installation

This feature is integrated into the existing project. No additional dependencies are required.

## Usage

### Basic Implementation

```typescript
import { TitleScene } from '@/libs/game/features/scenes/TitleScene'
import { Game } from '@/libs/game/core/Game'

// GameCanvas.astro での使用例
const game = new Game({
  container: document.getElementById('game-canvas'),
  width: 800,
  height: 600
})

await game.initialize()
// TitleScene は自動的に初期シーンとして設定される
game.start()
```

### TitleScene の直接使用

```typescript
import { TitleScene } from '@/libs/game/features/scenes/TitleScene'

const titleScene = new TitleScene()
await titleScene.initialize()

// シーンをゲームに追加
game.addScene(titleScene)
game.setActiveScene('title')
```

## Configuration

### Title Text

デフォルトのタイトルは "Traffic Jam Reducing City Builder" です。

```typescript
const titleScene = new TitleScene({
  title: "Custom Game Title"
})
```

### Button Styling

Playボタンのスタイルは TitleScene 内で定義されています。

```typescript
// TitleScene.ts 内の設定
private createPlayButton() {
  // ボタンの作成とスタイリング
  const button = new PIXI.Graphics()
  // ... スタイリングコード
}
```

## Testing

### Unit Tests

```bash
bun test tests/unit/libs/game/scenes/TitleScene.test.ts
```

### E2E Tests

```bash
bun test tests/e2e/game-page.spec.ts --grep "title"
```

### Manual Testing

1. ゲームページにアクセス
2. タイトルが中央に表示されることを確認
3. Playボタンがクリック可能であることを確認
4. ボタンクリックでゲームシーンに遷移することを確認

## File Structure

```
src/libs/game/features/scenes/
├── TitleScene.ts          # タイトルシーン実装
└── Scene.ts              # ベースシーンクラス

tests/
├── unit/libs/game/scenes/
│   └── TitleScene.test.ts # ユニットテスト
└── e2e/
    └── game-page.spec.ts  # E2Eテスト
```

## API Reference

### TitleScene

#### Constructor
```typescript
new TitleScene(options?: TitleSceneOptions)
```

#### Methods
- `initialize(): Promise<void>` - シーン初期化
- `onPlayClick(): void` - Playボタンクリックハンドラー

#### Properties
- `titleText: PIXI.Text` - タイトルテキストオブジェクト
- `playButton: PIXI.Graphics` - Playボタンオブジェクト

## Troubleshooting

### タイトルが表示されない
- PixiJS が正しく初期化されているか確認
- フォントファイルが読み込まれているか確認

### ボタンがクリックできない
- ボタンのヒットエリアが正しく設定されているか確認
- イベントリスナーが正しく登録されているか確認

### シーン遷移が失敗する
- Game.ts のシーン管理が正しく実装されているか確認
- 遷移先のシーンが存在するか確認

## Performance Notes

- タイトルシーンは軽量な実装
- テキストとボタンのみなので60FPSを維持
- モバイルデバイスでも快適に動作

## Next Steps

このMVP実装後に以下の機能を追加可能：
- アニメーション効果
- サウンド効果
- 設定メニュー
- クレジット表示</content>
<parameter name="filePath">/mnt/g/projects/web/game-mytownmap/specs/004-title-scene-mvp/quickstart.md