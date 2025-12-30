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

## ゲームコード構成 (src/apps/mytownmap)
- `bootstrap/` — エントリ配線、設定ロード、シード・初期状態
- `routing/` — 画面/シーンのルーティング（タイトル、コンフィグ、ゲーム）
- `foundation/` — レンダリングループとシミュレーションTickのオーケストレーション、および共有ランタイム配線
- `usecase/` — フィーチャーモジュールを調停するアプリケーションフロー
- `feature/` — フィーチャー固有のロジック（primitives/infrastructure を利用）
- `primitives/` — フィーチャー間で共有するエンティティと値オブジェクト
- `utilities/` — モジュール間で使い回すヘルパー/ユーティリティ
- `infrastructure/` — ビュー、入力、IndexedDB アダプタ（共有）

画面: タイトル、コンフィグ、ゲーム。タイトル/コンフィグは通常のWeb画面として動かしてもよいが、追加フレームワークなしで統一性を保つため、シンプルさ重視でゲームループ内に組み込むことも可能。

依存は基本的に上から下への一方向とし、ポート/アダプタなど依存性逆転が必要な箇所のみ例外を認める。

## ドキュメントと貢献
- 開発ドキュメントを更新する前に、ルートの `CONTRIBUTING.md` を読み、指示に従ってください。PRで参照を明記してください。
- 日本語ドキュメントは `.docs-human-ja/` 配下に置き、このファイルの日本語版は本ファイルです。

---

_最終更新: 2025-12-30_
