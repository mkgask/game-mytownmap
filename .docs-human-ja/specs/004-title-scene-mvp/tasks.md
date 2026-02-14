# タスク: Title Scene MVP

**入力**: `/specs/004-title-scene-mvp/` からの設計ドキュメント
**前提条件**: plan.md (必須), spec.md (ユーザーストーリーに必須), research.md, data-model.md, contracts/

**テスト**: TitleScene のユニットテスト、ユーザーインタラクションの E2E テスト

**組織化**: タスクはユーザーストーリーごとにグループ化され、各ストーリーの独立した実装とテストを可能にする。Test-First (TDD) アプローチに従う: まず失敗するテストを書いてから、実装してテストを通す。

## フォーマット: `[ID] [P?] [Story] Description`

- **[P]**: 並行実行可能（異なるファイル、依存関係なし）
- **[Story]**: このタスクが属するユーザーストーリー（例: US1, US2）
- 説明に正確なファイルパスを含める

## パス規則

- **単一プロジェクト**: リポジトリルートに `src/`、`tests/`
- パスはウェブアプリケーション構造を想定

## Phase 1: Test-First Implementation

### ユーザーストーリー1: ゲームタイトルの表示 (US1)

**目的**: ゲームタイトルを表示する基本機能

- [x] T001 [P] [US1] tests/unit/libs/game/scenes/TitleScene.test.ts に TitleScene インスタンス化の失敗するユニットテストを書く
- [x] T002 [P] [US1] src/libs/game/features/scenes/TitleScene.ts に TitleScene.ts を作成してテストを通す
- [x] T003 [P] [US1] TitleScene.test.ts にタイトルテキスト表示の失敗するユニットテストを書く
- [x] T004 [P] [US1] TitleScene.initialize() でタイトルテキスト表示を実装してテストを通す
- [x] T005 [P] [US1] TitleScene.test.ts にタイトルスタイリングの失敗するユニットテストを書く
- [x] T006 [P] [US1] タイトルスタイリングを追加（中央揃え、大フォント）してテストを通す
- [x] T007 [P] [US1] tests/unit/libs/game/core/Game.test.ts に Game.ts TitleScene サポートの失敗するユニットテストを書く
- [x] T008 [P] [US1] Game.ts を更新して TitleScene 初期化をサポートしてテストを通す
- [x] T009 [P] [US1] tests/e2e/game-page.spec.ts にタイトル表示の失敗する E2E テストを書く
- [x] T010 [P] [US1] GameCanvas.astro を修正して起動時に TitleScene をロードしてテストを通す

### ユーザーストーリー2: Playボタンでゲームを開始 (US2)

**目的**: Playボタンでゲームを開始する機能

- [ ] T011 [P] [US2] TitleScene.test.ts に Play ボタン作成の失敗するユニットテストを書く
- [ ] T012 [P] [US2] TitleScene.ts に Play ボタンを追加してテストを通す
- [ ] T013 [P] [US2] TitleScene.test.ts にボタンクリックハンドラの失敗するユニットテストを書く
- [ ] T014 [P] [US2] TitleScene にボタンクリックハンドラを実装してテストを通す
- [ ] T015 [P] [US2] TitleScene.test.ts にシーン遷移ロジックの失敗するユニットテストを書く
- [ ] T016 [P] [US2] TitleScene から GameScene へのシーン遷移ロジックを追加してテストを通す
- [ ] T017 [P] [US2] TitleScene.test.ts にボタンスタイリングの失敗するユニットテストを書く
- [ ] T018 [P] [US2] Play ボタンのスタイル（位置、外観）を設定してテストを通す
- [ ] T019 [P] [US2] game-page.spec.ts にボタンクリックとシーン遷移の失敗する E2E テストを書く
- [ ] T020 [P] [US2] E2E テストが通ることを確認（必要に応じて実装を調整）

## Phase 2: 統合とテスト

**目的**: 全機能の統合とテスト

- [ ] T021 [P] [US1+US2] TitleScene 統合のための Game.ts シーン管理を更新（未カバーの場合）
- [ ] T022 [P] [US1+US2] 完全なユーザー体験をテスト: ロード → タイトル表示 → ボタンクリック → ゲーム開始
- [ ] T023 [P] [US1+US2] パフォーマンステスト: <2s ロード時間を確保
- [ ] T024 [P] [US1+US2] タイトルとボタンのモバイルレスポンシブテスト

## 完了の定義

- ✅ すべてのタスクが完了し、コードがコミットされる
- ✅ すべてのユニットテストが合格 (bun test)
- ✅ すべての E2E テストが合格 (bun run test:e2e)
- ✅ 手動テストでタイトル表示とボタン機能が確認される
- ✅ コードレビューが完了
- ✅ ドキュメントが更新 (README.md が必要な場合)
- ✅ ブラウザ開発者ツールにコンソールエラーがない
- ✅ モバイルレスポンシブ (モバイルビューポートでテスト)

## ノート

- TitleScene は既存の Scene.ts ベースクラスを拡張すべき
- UI 要素には PixiJS Text と Graphics を使用
- ボタンはクリック時に視覚的なフィードバックを提供すべき
- シーン遷移はスムーズ (ロード遅延なし)
- 実装をシンプルに保つ - コア機能に焦点を当てる
- Red-Green-Refactor サイクルに従う: 失敗するテストを書く (Red)、実装して通す (Green)、必要に応じてリファクタリング
- ✅ ブラウザ開発者ツールにコンソールエラーがない
- ✅ モバイルレスポンシブ (モバイルビューポートでテスト)

## ノート

- TitleScene は既存の Scene.ts ベースクラスを拡張すべき
- UI 要素には PixiJS Text と Graphics を使用
- ボタンはクリック時に視覚的なフィードバックを提供すべき
- シーン遷移はスムーズ (ロード遅延なし)
- 実装をシンプルに保つ - コア機能に焦点を当てる