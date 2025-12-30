# 実装計画: 制約ドリブン要件ベースライン

**ブランチ**: `001-project-requirements` | **日付**: 2025-12-30 | **仕様**: [specs/001-project-requirements/spec.md](specs/001-project-requirements/spec.md)
**入力**: `specs/001-project-requirements/spec.md` のフィーチャ仕様

**備考**: このテンプレートは `/speckit.plan` コマンドで埋められます。開発ドキュメントを更新する前にリポジトリルートの `CONTRIBUTING.md` を確認し、PRで参照してください。

**アプリ配置 (固定)**: `src/apps/mytownmap`  
**パッケージマネージャ (必須)**: bun  
**必須スタック**: PixiJS (2Dレンダリング), bitECS (ECSランタイム), bun (ビルド/パッケージ), Cloudflare Pages (ホスティング), New Relic (エラーのみ), Playwright (UI/E2Eテスト)  
**アーキテクチャ焦点**: ECSファースト、決定的/シード済みシミュレーション。車両は道路のみ走行し重複不可。渋滞緩和が目的。日次スケジュール（朝: 住宅→工場/職場ショップ、昼: 職場→ランダム買い物ショップ、夜: ショップ→住宅）と職場容量を遵守。プレイヤー操作は道路/建物の追加・変更・削除に限定。UI/E2EはPlaywright必須。

## サマリ

MyTownMapの憲法に基づく機能/非機能要件をベースライン化する。技術方針はブラウザ専用のPixiJS + bitECS SPAをbunで構築し、IndexedDB永続化、シードPRNG、Playwright自動化、New Relicエラー監視のみをCloudflare Pagesへ静的デプロイすることを中心とする。

## 技術コンテキスト

**言語/バージョン**: TypeScript 5.x（モダンブラウザ向け）、bunをツーリング/ランタイムで使用。  
**主要依存**: PixiJS (2Dレンダリング)、bitECS (ECS)、bunツールチェーン、Playwright (UI/E2E)、vitest (ユニット/統合)、New Relicブラウザエージェント(エラーのみ)、Cloudflare Pages。  
**ストレージ**: IndexedDBでゲーム状態（道路/建物/エージェント/シード/セーブ）を保持。サーバー側ストレージなし。設定は環境/ランタイム注入。  
**テスト**: vitestで純粋システムと統合をシード付きテスト。PlaywrightでP1フロー（道路敷設、建物配置、1日サイクル）を自動化。決定性検証のため状態ハッシュを利用。  
**ターゲット**: ブラウザSPAをCloudflare Pagesに静的デプロイ。バックエンド前提なし。  
**プロジェクト種別**: Web SPA（ゲーム）`src/apps/mytownmap` 配下。  
**性能目標**: 500居住者/50ショップ/25工場の1日シミュを2024年中位ノートで30秒以内。描画60FPS上限。Playwright P1は5分以内。シード一致で乖離0%。  
**制約**: 静的バンドル。車両は道路のみ&重複禁止。全ランダムはシードPRNG（ショップ選択/出入口選択/配送）。操作は道路・建物CRUDのみ。設定は外部化。IndexedDBでオフライン継続。ECSシステムは単一責任で決定的。  
**規模/スコープ**: 数百エージェント（>=500居住者）と数十建物（≈50ショップ, 25工場）で再現可能な渋滞挙動を支援。

## 憲法チェック

*ゲート: Phase 0前に必須。Phase 1後に再確認。*
- アプリは `src/apps/mytownmap` に置き、Cloudflare Pages向けSPA。✅
- パッケージ管理はbunのみ。npm/pnpm/yarn禁止。✅
- bitECSでECS実装。システムは決定的・小さく・シード駆動。✅
- レンダリングはPixiJS。車両は道路限定かつ非重複。日次スケジュールと容量遵守。✅
- プレイヤー操作は道路/建物の追加・変更・削除のみ。他操作はガバナンス必要。✅
- 観測はNew Relicエラーのみ。Cloudflare Web Analyticsは任意・プライバシー配慮。設定は外部化。✅
- UI/E2EはPlaywrightのみ。✅

## プロジェクト構造

### ドキュメント (本フィーチャ)

```text
specs/001-project-requirements/
├── spec.md          # フィーチャ仕様 (/speckit.spec)
├── plan.md          # 本ファイル (/speckit.plan)
├── research.md      # Phase 0 出力
├── data-model.md    # Phase 1 出力
├── quickstart.md    # Phase 1 出力
├── contracts/       # Phase 1 出力
└── tasks.md         # Phase 2 出力
```

### ソースコード (モノレポルート)

```text
src/
└── apps/
    └── mytownmap/
        ├── src/
        └── tests/
```

**構造方針**: ゲームは `src/apps/mytownmap` に集約し、コード/テストを同配下に配置。

## 複雑度トラッキング

> 憲法違反がある場合のみ記載（今回は該当なし）

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
