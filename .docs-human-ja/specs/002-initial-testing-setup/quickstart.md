# クイックスタート: 初期テスト実装

**日付**: 2026-01-31
**機能**: [specs/002-initial-testing-setup/spec.md](specs/002-initial-testing-setup/spec.md)

## 概要

このガイドは初期テストインフラのセットアップと実行のためのクイック指示を提供します。セットアップは反復的なコーディングとテストサイクルの基礎を確立することに焦点を当てます。

## 前提条件

- Node.jsとbunパッケージマネージャーがインストールされている
- プロジェクト依存関係がインストールされている (`bun install`)
- ローカル開発サーバーが実行されている (`bun run dev:pages`)

## インストール

テスト依存関係は既にpackage.jsonで設定されています:

```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}
```

## ディレクトリ構造

セットアップ後、プロジェクトは以下の構造を持ちます:

```
tests/
├── unit/                   # ユニットテスト
│   └── example.test.ts     # 空のユニットテスト (テスト追加準備完了)
├── integration/            # 統合テスト
│   └── example.test.ts     # 空の統合テスト
└── e2e/                    # E2Eテスト
    ├── example.spec.ts     # 空のE2Eテスト
    └── playwright.config.ts # Playwright設定

src/
└── components/
    └── ErrorBoundary.tsx   # エラーバウンダリコンポーネント
```

## テストの実行

### ユニットテスト
```bash
# すべてのユニットテストを実行
bun run test:unit

# ウォッチモードでユニットテストを実行
bun run test:unit:watch

# カバレッジ付きでユニットテストを実行
bun run test:unit:coverage
```

### 統合テスト
```bash
# すべての統合テストを実行
bun run test:integration

# ウォッチモードで統合テストを実行
bun run test:integration:watch
```

### E2Eテスト
```bash
# Playwrightブラウザをインストール (初回のみ)
bun run test:e2e:install

# E2Eテストを実行
bun run test:e2e

# UIモードでE2Eテストを実行 (デバッグ用)
bun run test:e2e:ui
```

### すべてのテスト
```bash
# すべてのテストタイプを実行
bun run test

# カバレッジレポート付きでテストを実行
bun run test:coverage
```

## 新しいテストの追加

### ユニットテスト例
`tests/unit/myFunction.test.ts`を作成:

```typescript
import { myFunction } from '../../src/libs/myModule';

describe('myFunction', () => {
  it('should return expected result', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });
});
```

### 統合テスト例
`tests/integration/componentInteraction.test.ts`を作成:

```typescript
import { render } from '@testing-library/react';
import { MyComponent } from '../../src/components/MyComponent';

describe('MyComponent Integration', () => {
  it('should interact correctly with dependencies', () => {
    render(<MyComponent />);
    // 統合テストロジックを追加
  });
});
```

### E2Eテスト例
`tests/e2e/userWorkflow.spec.ts`を作成:

```typescript
import { test, expect } from '@playwright/test';

test('user can perform workflow', async ({ page }) => {
  await page.goto('http://localhost:4321');
  // E2Eテストステップを追加
});
```

## エラーバウンダリの使用

エラーが発生する可能性のあるコンポーネントをラップ:

```tsx
import { ErrorBoundary } from '../components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## 設定ファイル

### Bun Test設定 (package.json)
```json
{
  "scripts": {
    "test": "bun test",
    "test:unit": "bun test tests/unit",
    "test:integration": "bun test tests/integration",
    "test:coverage": "bun test --coverage"
  }
}
```

### Playwright設定 (tests/e2e/playwright.config.ts)
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:4321',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
```

## トラブルシューティング

### テストが実行されない
- ローカルdevサーバーがポート4321で実行されていることを確認
- テストファイルが`.test.ts`または`.spec.ts`拡張子を持っていることを確認
- package.jsonスクリプトが正しいことを確認

### E2Eテストが失敗する
- Playwrightブラウザをインストール: `bun run test:e2e:install`
- baseURLがdevサーバーと一致することを確認
- 視覚デバッグに`bun run test:e2e:ui`を使用

### カバレッジが生成されない
- ソースファイルが`collectCoverageFrom`に含まれていることを確認
- テストファイルが実行されていることを確認

## 次のステップ

1. `tests/unit/example.test.ts`に最初のユニットテストを追加
2. コンポーネント相互作用の統合テストを実装
3. 重要なユーザーワークフローのE2Eテストを追加
4. CI/CDで自動的にテストを実行するように設定
5. テストカバレッジレポートと閾値を設定