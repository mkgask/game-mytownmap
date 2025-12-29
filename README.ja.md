# MyTownMap

## 概要
MyTownMap は `src/apps/mytownmap` に配置されたブラウザ向け 2D 交通渋滞シミュレーションのシングルページアプリケーションです。

## 前提条件
- bun（最新安定版）
- Git
- ローカル実行用のモダンブラウザ

## 初期セットアップ手順（新規プロジェクトのブートストラップ）
1) bun をインストール: https://bun.sh
2) 新規リポジトリを初期化:
   - `mkdir game-mytownmap && cd game-mytownmap`
   - `git init`
   - `bun init -y`
3) 必要なディレクトリを作成:
   - `mkdir -p src/apps/mytownmap src/packages scripts .specify .docs-human-ja`
4) コア依存関係を追加（アプリ＋ツール）:
   - `bun add pixi.js bitecs`
   - `bun add -d typescript biome vitest`
5) 依存関係をインストール（リポジトリルートで実行）:
   - `bun install`
6) ワークスペーススクリプトの確認（リポジトリルートで実行）:
   - `bun run lint`（定義されている場合）
   - `bun run test`（定義されている場合）

## プロジェクト構成
- `src/apps/mytownmap/` — メインのゲームアプリ（SPA）
- `src/packages/` — 共有パッケージ（再利用の正当性がある場合のみ）
- `.specify/` — スペックテンプレートと憲章
- `.docs-human-ja/` — 日本語の人間向けドキュメント
- `scripts/` — ドキュメントやランブックの検証スクリプト

## ドキュメントと貢献ガイド
- 開発ドキュメントを更新する前に、リポジトリルートの `CONTRIBUTING.md` を確認し、その指示に従ってください。PR には参照を記載してください。
- 日本語ドキュメントは `.docs-human-ja/` 配下にあります。このファイルの対となる英語版はリポジトリルートの `README.md` です。
