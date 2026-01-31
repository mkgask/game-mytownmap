# 実装計画: 初期テスト実装

**ブランチ**: `002-initial-testing-setup` | **日付**: 2026-01-31 | **スペック**: [specs/002-initial-testing-setup/spec.md](specs/002-initial-testing-setup/spec.md)
**入力**: `/specs/002-initial-testing-setup/spec.md`からの機能仕様

**注**: このテンプレートは`/speckit.plan`コマンドによって埋められます。実行ワークフローは`.specify/templates/commands/plan.md`を参照してください。

## 概要

Traffic jam-reducing city-building web gameの初期テストインフラを実装します。bun testによるユニットテスト、統合テスト、PlaywrightによるE2Eテスト、エラーバウンダリコンポーネントを含みます。テストフレームワークのセットアップ、空テストファイルの作成、testsディレクトリ構造の確立に焦点を当て、反復的なコーディングとテストサイクルを可能にします。

## 技術的文脈

**言語/バージョン**: TypeScript (Astro framework)  
**主要依存関係**: bun test (unit/integration testing), Playwright (E2E testing), Astro (base framework), PixiJS (rendering), bitECS (ECS runtime)  
**ストレージ**: IndexedDB for game save data  
**テスト**: bun test for unit/integration tests, Playwright for E2E tests  
**ターゲットプラットフォーム**: Web browser (Chrome, Firefox, Safari)  
**プロジェクトタイプ**: Web application (client-side game)  
**パフォーマンス目標**: 60 FPS gameplay, test execution under 5 minutes  
**制約**: Client-side only, no server dependencies, tests must run in development environment  
**規模/範囲**: Single-page application with game scenes, test coverage for core features

## 憲法チェック

*ゲート: Phase 0 research前に合格する必要あり。Phase 1 design後に再チェック。*

- **Test-First & Integration Testing**: ✅ COMPLIES - Feature implements test-first approach with Jest for unit tests and integration tests for component interactions
- **Runtime-First Thinking**: ✅ COMPLIES - Tests designed for browser environment, no hard-coded values, observability through test outputs
- **Context-First**: ✅ COMPLIES - Test infrastructure organized by responsibility (unit, integration, e2e), minimal cross-context interactions
- **Minimum-Change Scope Principle**: ✅ COMPLIES - Starting with minimal test setup, expanding scope incrementally
- **Basic Principles**: ✅ COMPLIES - Pure functions prioritized, testability maximized, JSDoc comments required

## プロジェクト構造

### この機能のドキュメント

```text
specs/002-initial-testing-setup/
├── plan.md              # このファイル (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### リポジトリルートのソースコード

```text
src/
├── components/
│   └── ErrorBoundary.tsx    # Error boundary component
├── pages/
└── libs/
    ├── features/
    └── core/

tests/
├── unit/                   # Unit tests for individual functions/components
│   └── example.test.ts     # Empty unit test file
├── integration/            # Integration tests for component interactions
│   └── example.test.ts     # Empty integration test file
└── e2e/                    # E2E tests for user workflows
    ├── example.spec.ts     # Empty E2E test file
    └── playwright.config.ts # Playwright configuration

package.json                # Updated with test scripts and dependencies
```

**構造決定**: Constitutionのディレクトリ構造に従い、src/をソースコード用に、tests/をすべてのテストタイプ用に。テストはタイプ別 (unit, integration, e2e) に整理され、開発サイクル中のフォーカスされたテストを可能にします。

## 複雑さ追跡

> **Constitution Checkに違反がある場合のみ記入**

違反なし - 実装は憲法原則に従っています。