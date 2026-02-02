# 実装計画: PixiJS Game MVP

**ブランチ**: `003-pixijs-game-mvp` | **日付**: 2026-02-01 | **仕様**: [specs/003-pixijs-game-mvp/spec.md](specs/003-pixijs-game-mvp/spec.md)
**入力**: `specs/003-pixijs-game-mvp/spec.md` からの機能仕様

**注**: このテンプレートは `/speckit.plan` コマンドによって埋められます。実行ワークフローについては `.specify/templates/commands/plan.md` を参照してください。

## 概要

都市建設ゲームの基盤を確立するために、基本的なPixiJSゲームキャンバス、レンダリングセットアップ、空のシーンを実装します。ゲームコンテンツを含まない動作可能なゲーム環境を提供する最小限のセットアップに焦点を当てます。

## 技術的文脈

**言語/バージョン**: TypeScript (Astroフレームワーク)  
**主要依存関係**: 2Dレンダリング用のPixiJS、ベースフレームワーク用のAstro  
**ストレージ**: N/A (クライアントサイドのみ)  
**テスト**: ユニット/統合テスト用bun test、E2Eテスト用Playwright  
**ターゲットプラットフォーム**: Webブラウザ (Chrome, Firefox, Safari)  
**プロジェクトタイプ**: Webアプリケーション (クライアントサイドゲーム)  
**パフォーマンス目標**: 60 FPSレンダリング、<1s初期化  
**制約**: クライアントサイドのみ、サーバー依存なし、WebGL/WebGL2サポート必須  
**規模/範囲**: 単一キャンバス要素、基本的なPixiJSアプリケーションセットアップ

## 憲法チェック

*GATE: Phase 0研究前に合格する必要あり。Phase 1設計後に再チェック。*

- **Test-First & 統合テスト**: ✅ 準拠 - PixiJSセットアップのユニットテストとレンダリングの統合テストでtest-firstアプローチを実装
- **Runtime-First思考**: ✅ 準拠 - PixiJSアプリケーションはブラウザ環境向けに設計、ハードコード値なし、キャンバスレンダリングを通じて観測可能
- **Context-First**: ✅ 準拠 - ゲームレンダリングロジックをゲームコンテキスト下に整理、最小限のクロスコンテキスト相互作用
- **Minimum-Change Scope Principle**: ✅ 準拠 - 最小限のキャンバスセットアップから開始、段階的に範囲を拡大
- **基本原則**: ✅ 準拠 - ゲームロジック用の純粋関数、テスト可能性最大化、JSDocコメント必須

## プロジェクト構造

### ドキュメント (この機能)

```text
specs/003-pixijs-game-mvp/
├── plan.md              # このファイル (/speckit.plan コマンド出力)
├── research.md          # Phase 0 出力 (/speckit.plan コマンド)
├── data-model.md        # Phase 1 出力 (/speckit.plan コマンド)
├── quickstart.md        # Phase 1 出力 (/speckit.plan コマンド)
├── contracts/           # Phase 1 出力 (/speckit.plan コマンド)
└── tasks.md             # Phase 2 出力 (/speckit.tasks コマンド - /speckit.plan では作成されない)
```

### ソースコード (リポジトリルート)

```text
src/
├── components/
│   ├── astro/
│   │   ├── GameCanvas.tsx    # Astro用のPixiJSキャンバスコンポーネント
│   │   └── GameUI.tsx        # ゲームUIコンポーネントラッパー
│   └── game/
│       ├── Canvas.tsx        # キャンバス固有のコンポーネント
│       └── Controls.tsx      # ゲームコントロールコンポーネント
├── libs/
│   └── game/
│       ├── core/
│       │   ├── Game.ts       # メインゲームクラスとライフサイクル
│       │   ├── Config.ts     # ゲーム設定タイプ
│       │   └── State.ts      # ゲーム状態管理
│       ├── features/
│       │   ├── rendering/
│       │   │   ├── Renderer.ts   # PixiJSレンダラーラッパー
│       │   │   ├── Canvas.ts     # キャンバスDOM管理
│       │   │   └── Viewport.ts   # ビューポートとカメラロジック
│       │   └── scenes/
│       │       ├── Scene.ts      # ベースシーンコンテナ
│       │       ├── EmptyScene.ts # デフォルトの空シーン実装
│       │       └── SceneManager.ts # シーン切り替えロジック
│       └── types/
│           └── index.ts       # ゲーム関連の型定義
└── pages/
    ├── index.astro          # メインロンディングページ
    └── game.astro           # キャンバス付きゲームページ

tests/
├── unit/
│   ├── game/
│   │   ├── core/
│   │   │   ├── Game.test.ts      # ゲームクラステスト
│   │   │   ├── Config.test.ts    # 設定テスト
│   │   │   └── State.test.ts     # 状態管理テスト
│   │   ├── features/
│   │   │   ├── rendering/
│   │   │   │   ├── Renderer.test.ts  # レンダラーテスト
│   │   │   │   ├── Canvas.test.ts    # キャンバステスト
│   │   │   │   └── Viewport.test.ts  # ビューポートテスト
│   │   │   └── scenes/
│   │   │       ├── Scene.test.ts     # シーンテスト
│   │   │       ├── EmptyScene.test.ts # 空シーンテスト
│   │   │       └── SceneManager.test.ts # シーンマネージャーテスト
│   │   └── types/
│   │       └── index.test.ts      # 型定義テスト
│   └── components/
│       ├── astro/
│       │   ├── GameCanvas.test.tsx # Astroコンポーネントテスト
│       │   └── GameUI.test.tsx     # UIコンポーネントテスト
│       └── game/
│           ├── Canvas.test.tsx     # ゲームキャンバステスト
│           └── Controls.test.tsx   # コントロールテスト
├── integration/
│   ├── game-rendering.test.ts     # キャンバスレンダリング統合
│   ├── game-initialization.test.ts # 完全なゲームセットアップ統合
│   └── component-integration.test.ts # コンポーネント相互作用テスト
└── e2e/
    ├── game-page.spec.ts          # ゲームページE2Eテスト
    └── navigation.spec.ts         # ページナビゲーションテスト
```

**構造決定**: 憲法に準拠したディレクトリ構造で、Astro UIコンポーネントとゲームエンジンロジックの明確な分離。ゲームライブラリはドメイン別 (core, features) に整理して constitution.md のパターンに従う - features/ はレンダリングやシーンなどのゲーム機能用（シーン管理を含む）。テストはソース構造をミラーリングしてナビゲーションしやすくし、フォーカスされたテストを可能に。この構造は将来の拡張をサポートしつつ、懸念の境界をクリーンに保ち、論理的な依存関係フロー (core → features) を維持する。

## 複雑さ追跡

> **憲法チェックに違反がある場合のみ記入**

違反なし - 実装は憲法原則に従っています。