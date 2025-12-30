# 実装計画: [FEATURE]

**ブランチ**: `[###-feature-name]` | **日付**: [DATE] | **仕様**: [link]
**入力**: `specs/[###-feature-name]/spec.md` のフィーチャー仕様

**注記**: このテンプレートは `/speckit.plan` コマンドで生成されます。実行手順は `.specify/templates/commands/plan.md` を参照してください。開発ドキュメントを更新する際は、必ずリポジトリルートの `CONTRIBUTING.md` を確認し、その指示に従い、PRで参照を明記してください。

**アプリ配置 (固定)**: `src/apps/mytownmap`  
**パッケージマネージャ (必須)**: bun  
**必須スタック**: PixiJS (2D レンダリング), bitECS (ECS ランタイム), bun (ビルド/パッケージ), Cloudflare Pages (ホスティング), New Relic (エラーのみ), Playwright (UI/E2E テスト)  
**アーキテクチャ焦点**: ECS ファースト、決定性/シード付きシミュレーション；車両は道路のみ走行し重ならない；渋滞緩和が目的；日次スケジュール（朝: 住宅→工場/商店、昼: 工場/商店→ランダム商店、夜: 商店→住宅）で就業/収容上限を尊重；プレイヤー介入は道路/建物の追加・変更・削除に限定；UI/E2E テストは Playwright を使用。

## サマリ

[フィーチャー仕様から主要要件と技術アプローチを抜粋]

## 技術コンテキスト

**言語/バージョン**: [例: TypeScript 5.x など]  
**主要依存**: [例: PixiJS, bitECS など]  
**ストレージ**: [該当する場合のみ、なければ N/A]  
**テスト**: [例: vitest, Playwright など]  
**ターゲットプラットフォーム**: [例: ブラウザ, WASM など]  
**プロジェクト種別**: [single/web/mobile など]  
**性能目標**: [例: 60 fps など]  
**制約**: [例: <200ms p95 等]  
**スケール/スコープ**: [例: マップサイズ、エージェント数 など]

## 憲章チェック

*ゲート: フェーズ0の調査前に必須。フェーズ1設計後に再確認。*
- アプリは `src/apps/mytownmap` に置き、Cloudflare Pages にデプロイ可能なSPAであること。
- パッケージ管理とスクリプトは bun（リポジトリルート）を使用し、他のPMは承認なしで禁止。
- ECS アーキテクチャ必須。bitECS を使用し、システムは単一責任かつシードで決定的、再現可能であること。
- レンダリングは PixiJS。車両は道路のみ走行し重ならない。渋滞が主課題。日次スケジュール（住宅→工場/商店、工場/商店→ランダム商店、商店→住宅）と就業/収容上限を遵守。
- プレイヤー介入は道路/建物の追加・変更・削除に限定。その他の行為はガバナンス承認が必要。
- 可観測性は New Relic（エラーのみ）。Cloudflare Web Analytics は任意かつプライバシー配慮。設定は外部化すること。
- UI/E2E テストは Playwright を必須とし、他フレームワーク利用はガバナンス承認が必要。
- ゲームコード構造マトリクスを厳守: 依存は一方向 `app/usecase → feature → infrastructure`、feature間の直接呼び出しは禁止（usecase経由）。UIはECS stateを参照のみ（変更は usecase→ECS/system）。永続化は `infrastructure/persistence` のDTO経由のみ。Routingは `feature/routing` 実装＋選択は `usecase`。シードPRNGは `feature/rng`。設定/定数/feature flagsは `feature/config`。アセットは `infrastructure/assets`、Pixi/UIは `infrastructure/ui`/`ui/pixi`/`ui/screens`/`ui/hud`。

## プロジェクト構成

ios/ or android/
### ドキュメント (本フィーチャー)

```text
specs/[###-feature]/
├── spec.md          # フィーチャー仕様 (/speckit.spec 出力)
├── plan.md          # このファイル (/speckit.plan 出力)
├── research.md      # フェーズ0 (/speckit.plan 出力)
├── data-model.md    # フェーズ1 (/speckit.plan 出力)
├── quickstart.md    # フェーズ1 (/speckit.plan 出力)
├── contracts/       # フェーズ1 (/speckit.plan 出力)
└── tasks.md         # フェーズ2 (/speckit.tasks 出力)
```

### ソースコード (モノレポルート)

```text
src/
└── apps/
	└── mytownmap/
		├── src/
		│   ├── app/                     # 起動/DI、エントリ、モード選択（caller）
		│   ├── usecase/                 # 道路/建物コマンド、経路モード選択のオーケストレーション
		│   ├── feature/                 # ドメイン/ECS/ルーティング/設定（callee）
		│   │   ├── config/              # env/constants/featureFlags（外部入力）
		│   │   ├── rng/                 # シード付きPRNGファクトリ
		│   │   ├── routing/             # 道路グラフ、パスキャッシュ、レーンポリシー（Easy/Normal/Hard）
		│   │   └── ecs/
		│   │       ├── components/      # road/building/resident/vehicle/delivery/day-cycle 等
		│   │       ├── systems/         # scheduling/assignment/routing/movement/delivery/persistence/observability
		│   │       └── world/           # worldBuilder, systemRegistry, simulationLoop
		│   └── infrastructure/          # UI/Pixi、永続化、アセット（callee）
		│       ├── persistence/         # IndexedDB アダプタ、DTO
		│       ├── ui/
		│       │   ├── pixi/            # stage factory, assets manifest
		│       │   ├── screens/         # title, save selection, config, tutorial placeholder
		│       │   └── hud/             # ゲーム内HUD
		│       └── assets/              # fonts, sprites, tilesets, shaders
		└── tests/
			├── unit/
			├── integration/
			└── e2e/playwright/
				└── fixtures/            # maps, seeds
```

**構成の決定**: ゲームは `src/apps/mytownmap` に配置し、アプリコードとテストはこの配下に置いてください。

## 複雑性トラッキング

> 憲章チェックの違反を正当化する場合のみ記入

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [例: 4th project] | [必要理由] | [3プロジェクトでは不足な理由] |
| [例: Repository pattern] | [具体的課題] | [なぜ直接DBアクセスでは不十分か] |
