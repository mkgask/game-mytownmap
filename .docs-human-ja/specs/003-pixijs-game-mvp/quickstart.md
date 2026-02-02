# クイックスタート: PixiJS Game MVP

**機能**: PixiJS Game MVP | **日付**: 2026-02-01
**計画**: [specs/003-pixijs-game-mvp/plan.md](specs/003-pixijs-game-mvp/plan.md)

## 概要

このガイドはPixiJS Game MVPの実装のためのクイックセットアップ手順を提供します。実装はPixiJSレンダリング環境を持つ基本的なゲームキャンバスを確立します。

## 前提条件

- Node.js/Bun環境のセットアップ
- 基本的なAstroプロジェクトの実行
- PixiJS依存関係のインストール

## インストール

```bash
# PixiJSのインストール
bun add pixi.js
bun add -D @types/pixi.js
```

## 基本的な実装

### 1. GameCanvasコンポーネントの作成

```typescript
// src/components/GameCanvas.tsx
import { onMount } from 'astro/jsx-runtime'
import * as PIXI from 'pixi.js'

export default function GameCanvas() {
  onMount(() => {
    // PixiJSアプリケーションの作成
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    })

    // キャンバスコンテナの取得
    const container = document.getElementById('game-canvas')
    if (container) {
      container.appendChild(app.view as HTMLCanvasElement)
    }

    // 空のシーンの追加
    const scene = new PIXI.Container()
    app.stage.addChild(scene)

    // レンダーループの開始
    app.ticker.start()
  })

  return <div id="game-canvas"></div>
}
```

### 2. ゲームページの作成

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

### 3. ゲームロジック構造の追加

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

## テスト

### ユニットテスト

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

### 統合テスト

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

## 開発ワークフロー

1. **セットアップ**: 依存関係のインストールと基本構造の作成
2. **実装**: GameCanvasコンポーネントとGameクラスの追加
3. **テスト**: ユニットおよび統合テストの実行
4. **検証**: ブラウザでキャンバスがレンダリングされることを確認
5. **拡張**: 将来のイテレーションでより多くのゲーム機能を追加

## 一般的な問題

- **キャンバスが表示されない**: コンテナ要素がDOMに存在することを確認
- **WebGLエラー**: ブラウザがWebGLをサポートしていることを確認
- **パフォーマンス問題**: キャンバスサイズを小さくするかアンチエイリアシングを無効化

## 次のステップ

- シーン管理の追加
- 基本的なゲームループの実装
- ユーザー入力処理の追加
- ECS (bitECS) との統合