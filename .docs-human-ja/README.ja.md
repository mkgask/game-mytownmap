# MyTownMap（日本語版 README）

## 概要
MyTownMap は `src/apps/mytownmap` に配置されたブラウザ向け 2D 交通渋滞シミュレーションゲーム（SPA）です。

## 前提条件
- bun（最新安定版）
- Git
- モダンブラウザ（ローカル実行用）

## 初期セットアップ（新規プロジェクト）
1) bun をインストール: https://bun.sh
2) リポジトリを初期化:
  - `mkdir game-mytownmap && cd game-mytownmap`
  - `git init`
  - `bun init -y`
3) 必要ディレクトリを作成:
  - `mkdir -p src/apps/mytownmap src/packages scripts .specify .docs-human-ja`
4) コア依存（アプリ + ツール）を追加:
  - `bun add pixi.js bitecs`
  - `bun add -d typescript biome vitest`
5) ワークスペース依存をインストール:
  - `bun install`
6) スクリプト確認（リポジトリルートで実行）:
  - `bun run lint`（定義されていれば）
  - `bun run test`（定義されていれば）

## プロジェクト構成
- `src/apps/mytownmap/` — メインゲームアプリ (SPA)
- `src/packages/` — 共有パッケージ（再利用が明確に必要な場合のみ）
- `.specify/` — 仕様テンプレートと憲章
- `.docs-human-ja/` — 日本語ドキュメント
- `scripts/` — ドキュメントチェック用などの補助スクリプト

## ゲームコード構成（マトリックス: ゲーム要素 × プログラム層）

**レイヤの考え方**
- 呼ぶ側: `app/`（エントリ・DI）、`usecase/`（ユースケースオーケストレーション）。
- 呼ばれる側: `feature/`（ドメインロジック/ECS/経路/設定等）、`infrastructure/`（UI/Pixi、IndexedDB、アセット）。
- 依存方向: `app/usecase → feature → infrastructure` の一方向。feature間の横断は禁止（必要ならusecase経由）。UIはECS stateを「読むだけ」、書き込みはusecase→ECS/system経由。persistenceはDTO経由のみ。

| Layer \ Element | Seed & Config | Map / Roads / Buildings | Routing (Easy/Normal/Hard) | Residents / Vehicles / Delivery | Day-Cycle | Persistence | UI / Screens | Assets |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| app / usecase (呼ぶ側) | `src/apps/mytownmap/src/app/*`, `src/apps/mytownmap/src/usecase/*`<br>DI、起動、モード選択、ユースケース実行 | 道路/建物操作を指示 | ルート/車線モード選択して委譲 | スケジュール進行やコマンド発火 | 日次進行トリガー | セーブ/ロード呼び出し | 画面遷移・入力ハンドオフ | アセットロード指示 |
| feature (呼ばれる側) | `src/apps/mytownmap/src/feature/config/*`, `feature/rng/*` | `feature/ecs/components/*` (roads/buildings) | `feature/routing/*` (graph, cache, lane policy) | `feature/ecs/components/*`, `feature/ecs/systems/*` (agents/vehicles/delivery) | `feature/ecs/systems/scheduling/*`, `feature/ecs/world/*` | — (persistenceはinfra経由) | `feature/ecs` がUIに渡すstate | — |
| infrastructure (呼ばれる側) | — | — | — | — | — | `src/apps/mytownmap/src/infrastructure/persistence/*` (IndexedDB/DTO) | `src/apps/mytownmap/src/infrastructure/ui/*`, `ui/pixi/*`, `ui/screens/*`, `ui/hud/*` (state読み取りのみ) | `src/apps/mytownmap/src/infrastructure/assets/*` |

補足ルール
- Routingモード(Easy/Normal/Hard)は `feature/routing`。選択は `usecase`。PRNGは `feature/rng` のみ使用。
- Config/env/constants/featureFlags は `feature/config` に集約し外部入力を読む。
- UIは状態表示のみ。状態変更は usecase→ECS/system 経由。
- Persistenceは DTO 経由でのみ state を保存/復元し、ECSコンポーネントへ直接触れない。

## ドキュメントと貢献
- 開発ドキュメントを更新する前に、ルートの `CONTRIBUTING.md` を読み、指示に従ってください。PRで参照を明記してください。
- 日本語ドキュメントは `.docs-human-ja/` 配下に置き、このファイルの日本語版は本ファイルです。

---

_最終更新: 2025-12-30_
