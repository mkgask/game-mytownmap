# 実装計画: Title Scene MVP

**ブランチ**: `004-title-scene-mvp` | **日付**: 2026-02-08 | **仕様**: [specs/004-title-scene-mvp/spec.md](specs/004-title-scene-mvp/spec.md)
**入力**: `/specs/004-title-scene-mvp/spec.md` からの機能仕様

## 概要

タイトルシーンMVPを実装し、ゲームタイトル表示とPlayボタンによるゲーム開始機能を提供する。PixiJSを使用したシンプルなシーン管理アプローチを採用。

## 技術的文脈

**言語/バージョン**: TypeScript 5.x
**主要依存関係**: PixiJS v8, Astro
**ストレージ**: N/A (クライアントサイドのみ)
**テスト**: Playwright (E2E), Bun test (Unit)
**対象プラットフォーム**: Web browsers (Chrome, Firefox, Safari)
**プロジェクトタイプ**: Web application
**パフォーマンス目標**: 60 FPS, <2秒 page load
**制約**: <100KB bundle size, mobile responsive
**規模/範囲**: Single scene, 2 UI elements

## 憲法チェック

- ✅ Context-First: TitleScene は独立したコンテキストとして実装
- ✅ Test-First: シーン作成のユニットテスト、ユーザーインタラクションのE2E
- ✅ Runtime-First: クライアントサイドのみ、サーバー依存なし
- ✅ Minimum-Change Scope: 既存のGame.tsを拡張するのみ

## プロジェクト構造

### ドキュメント (この機能)

```text
specs/004-title-scene-mvp/
├── plan.md              # このファイル (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### ソースコード (リポジトリルート)

```text
src/
├── libs/game/
│   ├── features/scenes/
│   │   └── TitleScene.ts    # 新規: タイトルシーン実装
│   └── core/
│       └── Game.ts          # 修正: シーン管理統合
└── components/astro/
    └── GameCanvas.astro     # 修正: タイトルシーン初期化
```

## 複雑性追跡

> **憲法チェックに違反がある場合のみ記入**

違反なし - 実装は憲法原則に従う

## 実装フェーズ

### Phase 0: Research & Design (Current)
- [x] 既存のScene.tsベースクラスを分析
- [x] PixiJSテキストとボタン実装を調査
- [x] TitleSceneインターフェースと契約を定義

### Phase 1: Core Implementation
- [ ] タイトル表示付きのTitleScene.tsを作成
- [ ] クリックハンドラー付きのPlayボタンを実装
- [ ] Game.tsシーン管理との統合

### Phase 2: Testing & Polish
- [ ] TitleSceneのユニットテストを追加
- [ ] タイトル表示とボタンインタラクションのE2Eテストを追加
- [ ] パフォーマンス最適化とモバイルレスポンシブ

## リスク評価

### 高リスク
- **PixiJS Text Rendering**: フォントロードと表示の一貫性
- **Button Interaction**: モバイルでのタッチイベント処理

### 中リスク
- **Scene Transition**: Game.tsとの統合
- **Styling Consistency**: 既存UIとのデザイン統一

### 低リスク
- **Performance**: シンプルな実装なので問題なし
- **Browser Compatibility**: 既存コードが動作しているブラウザでOK

## 成功メトリクス

- ✅ ページロード時にタイトルが正しく表示される
- ✅ Playボタンがクリック可能でシーン遷移をトリガーする
- ✅ ブラウザにコンソールエラーがない
- ✅ すべてのユニットおよびE2Eテストに合格
- ✅ 3G接続で2秒以内にロード