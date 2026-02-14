# Traffic Jam-Reducing City-Building Web Game

## 概要

このプロジェクトは、交通渋滞を減らすことを目指したブラウザベースの2D都市建設ゲームです。最終的に経済物流ゲームへと進化することを目標としています。プレイヤーは住宅、商業施設、工場、レジャー施設を建設し、物流、輸送、リソースフローを管理して都市の効率を最適化します。

## 技術スタック (MVP最小限)

- **Bun**: ビルド、パッケージ管理、ユニットテスト用
- **Biome**: linter / formatter
- **Astro**: ベースフレームワーク
- **PixiJS v8**: 2Dゲームレンダリングエンジン
- **TypeScript**: 型安全な開発
- **Cloudflare Wrangler**: Cloudflare Pagesへのデプロイ用

## ゲームアーキテクチャ

### コアコンポーネント

- **Game**: メインゲームクラス。全体のライフサイクルとシーン管理を担当
- **Renderer**: PixiJS Application の初期化と管理
- **Scene**: ゲームシーン（画面）の管理。PIXI.Container を拡張

### ディレクトリ構造

```
src/
├── libs/game/
│   ├── core/
│   │   └── Game.ts            # メインゲームクラス
│   ├── features/
│   │   ├── rendering/
│   │   │   └── Renderer.ts    # PixiJS レンダラー管理
│   │   └── scenes/
│   │       └── Scene.ts       # シーン管理
│   └── types/                 # 共有型定義
├── components/
│   ├── ErrorBoundary.tsx      # エラーバウンダリコンポーネント
│   └── astro/
│       └── GameCanvas.astro   # ゲームキャンバスコンポーネント
└── pages/
    ├── index.astro            # ランディングページ
    └── game.astro             # ゲームページ
```

### ゲーム開発ガイド

#### 基本的なゲーム作成

1. **Game インスタンス作成**:
```typescript
import { Game } from '@/libs/core/game/core/Game'

const game = new Game({
  container: document.getElementById('game-canvas'),
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb
})
```

2. **ゲーム初期化と開始**:
```typescript
await game.initialize()
game.start()
```

3. **シーン管理**:
```typescript
import { Scene } from '@/libs/core/game/scenes/Scene'

// 新しいシーン作成
const scene = new Scene('my-scene')
await scene.initialize()

// ゲームオブジェクト追加
const sprite = PIXI.Sprite.from('image.png')
scene.addGameObject(sprite)

// シーン切り替え
game.setScene(scene)
```

#### テスト実行

ゲーム開発中のテスト実行:
```bash
# ユニットテスト（Game/Scene/Renderer）
bun run test:unit

# 統合テスト（フルゲーム初期化）
bun run test:integration

# E2Eテスト（ブラウザでのゲームページ動作）
bun run test:e2e
```

#### パフォーマンス監視

開発中にフレームレートを確認:
```typescript
// ブラウザコンソールで確認可能
console.log('FPS:', game.getRenderer().getApplication()?.ticker.FPS)
```

## 必要条件 (MVP最小限)

- Node.js (Bunが推奨)
- Cloudflareアカウント (デプロイ用)

## インストール

1. Bunをインストール (https://bun.sh/docs/installation)

2. Astroを追加:
   ```bash
   bun add astro
   ```

3. Astro設定ファイルを作成 (例: astro.config.mjs):
   ```javascript
   import { defineConfig } from 'astro/config';

   export default defineConfig({});
   ```

4. Cloudflare Wranglerをインストール:
   ```bash
   bun add -D wrangler
   ```

5. Biomeをインストール:
   ```bash
   bun add -D @biomejs/biome
   ```

## 開発

開発サーバーを起動:
```bash
bun run dev
```

ブラウザで http://localhost:4321 にアクセスして開発できます。

## ビルド

本番用ビルドを作成:
```bash
bun run build
```

ビルドされたファイルは `dist/` ディレクトリに生成されます。

## デプロイ

### 自動デプロイ (推奨: GitHub連携)

Cloudflare PagesのGitHub連携を使用して、mainブランチの更新で自動デプロイを設定します。

1. Cloudflare Dashboard (https://dash.cloudflare.com/) にログイン。
2. **Pages** タブを選択し、**Create a project** をクリック。
3. **Connect to Git** を選択し、GitHubリポジトリを接続。
4. ビルド設定を以下のように設定:
   - **Build command**: `bun run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (プロジェクトルート)
5. **Save and Deploy** をクリック。

これで、mainブランチにプッシュするたびに自動でビルドとデプロイが行われます。

### 手動デプロイ (代替)

品質チェックとデプロイを一括実行:
```bash
bun run deploy
```

または、個別に実行:
```bash
# 品質チェック
bun run check

# ビルド
bun run build

# デプロイ
bun run deploy:cf
```

初回デプロイ時は、Cloudflareアカウントの認証とプロジェクトの設定が必要です。

## テスト

このプロジェクトでは、以下のテストインフラを整備しています：

### テストの種類

- **ユニットテスト**: 個別の関数やコンポーネントのテスト (`tests/unit/`)
- **統合テスト**: コンポーネント間の連携テスト (`tests/integration/`)
- **E2Eテスト**: エンドツーエンドのユーザーシナリオテスト (`tests/e2e/`)

### テスト実行

全テスト実行:
```bash
bun run test:all
```

ユニットテストのみ:
```bash
bun run test:unit
```

統合テストのみ:
```bash
bun run test:integration
```

E2Eテストのみ:
```bash
bun run test:e2e
```

### テストの追加

- ユニットテスト: `tests/unit/` に `.test.ts` ファイルを追加
- 統合テスト: `tests/integration/` に `.test.ts` ファイルを追加
- E2Eテスト: `tests/e2e/` に `.spec.ts` ファイルを追加

### テスト設定

- テストフレームワーク: Bun test (Jest互換)
- E2Eテスト: Playwright
- 環境: jsdom (ブラウザ環境シミュレーション)
- セットアップ: `tests/setup.ts`

### カバレッジレポート

テストカバレッジを生成:
```bash
bun test --coverage
```

レポートは `coverage/` ディレクトリに生成されます。

## ライセンス

[NYSL Version 0.9982](https://www.kmonos.net/nysl/)

```text
A. 本ソフトウェアは Everyone'sWare です。このソフトを手にした一人一人が、ご自分の作ったものを扱うのと同じように、自由に利用することが出来ます。

  A-1. フリーウェアです。作者からは使用料等を要求しません。
  A-2. 有料無料や媒体の如何を問わず、自由に転載・再配布できます。
  A-3. いかなる種類の 改変・他プログラムでの利用 を行っても構いません。
  A-4. 変更したものや部分的に使用したものは、あなたのものになります。
       公開する場合は、あなたの名前の下で行って下さい。

B. このソフトを利用することによって生じた損害等について、作者は
   責任を負わないものとします。各自の責任においてご利用下さい。

C. 著作者人格権は mkgask (https://github.com/mkgask) に帰属します。著作権は放棄します。

D. 以上の３項は、ソース・実行バイナリの双方に適用されます。
```
