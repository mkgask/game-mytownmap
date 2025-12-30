# game-mytownmap （日本語版アプリREADME）

## コード構成（マトリックス: ゲーム要素 × プログラム層）

依存方向: `app/usecase → feature → infrastructure` の一方向。feature間の横断は禁止（必要ならusecase経由）。UIはECS stateを読むだけで書き込み禁止。persistenceはDTO経由のみ。

| Layer \ Element | Seed & Config | Map / Roads / Buildings | Routing (Easy/Normal/Hard) | Residents / Vehicles / Delivery | Day-Cycle | Persistence | UI / Screens | Assets |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| app / usecase (呼ぶ側) | `src/app/*`, `src/usecase/*`<br>DI/起動、モード選択、ユースケース実行 | 道路/建物操作を指示 | ルート/車線モード選択して委譲 | スケジュール進行やコマンド発火 | 日次進行トリガー | セーブ/ロード呼び出し | 画面遷移・入力ハンドオフ | アセットロード指示 |
| feature (呼ばれる側) | `src/feature/config/*`, `feature/rng/*` | `feature/ecs/components/*` (roads/buildings) | `feature/routing/*` (graph, cache, lane policy) | `feature/ecs/components/*`, `feature/ecs/systems/*` (agents/vehicles/delivery) | `feature/ecs/systems/scheduling/*`, `feature/ecs/world/*` | — (persistenceはinfra経由) | `feature/ecs` がUIに渡すstate | — |
| infrastructure (呼ばれる側) | — | — | — | — | — | `src/infrastructure/persistence/*` (IndexedDB/DTO) | `src/infrastructure/ui/*`, `ui/pixi/*`, `ui/screens/*`, `ui/hud/*` | `src/infrastructure/assets/*` |

補足ルール
- Routingモード(Easy/Normal/Hard)は `feature/routing` に置き、選択は `usecase`。PRNGは `feature/rng` のみ使用。
- Config/env/constants/featureFlags は `feature/config`。外部入力を読むだけ。
- UIは状態表示のみ。状態変更は usecase→ECS/system 経由。
- Persistenceは DTO 経由でのみ state を保存/復元し、ECSコンポーネントへ直接触れない。

## Runbook（暫定）
- 依存インストール: `bun install`
- 実行: 将来 `bun run dev:mytownmap` に統一予定（エントリ整備後に更新）。
