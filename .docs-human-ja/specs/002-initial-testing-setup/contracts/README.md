# テスト契約: 初期テスト実装

**日付**: 2026-01-31
**機能**: [specs/002-initial-testing-setup/spec.md](specs/002-initial-testing-setup/spec.md)

## 概要

この文書はテストインフラの契約とインターフェースを定義します。この初期セットアップであるため、契約はフレームワークとコンポーネントが実装しなければならない基本インターフェースに焦点を当てます。

## テストランナー契約

### インターフェース: TestRunner
異なるタイプのテストを実行するための契約。

```typescript
interface TestRunner {
  /**
   * 単一のテストケースを実行
   * @param testCase 実行するテストケース
   * @returns テスト結果に解決するPromise
   */
  runTest(testCase: TestCase): Promise<TestResult>;

  /**
   * テストスイートのすべてのテストを実行
   * @param suite 実行するテストスイート
   * @returns テスト結果の配列に解決するPromise
   */
  runSuite(suite: TestSuite): Promise<TestResult[]>;

  /**
   * パターンに一致するテストを実行
   * @param pattern テストファイルマッチングのためのGlobパターン
   * @param type 実行するテストのタイプ
   * @returns テスト結果の配列に解決するPromise
   */
  runPattern(pattern: string, type: TestType): Promise<TestResult[]>;
}
```

**契約要件**:
- 非同期テスト実行を処理しなければならない
- 詳細なエラー情報を提供しなければならない
- テストタイムアウトをサポートしなければならない
- 異なる環境で設定可能でなければならない

## テストフレームワーク契約

### Bun Test契約
ユニットおよび統合テスト用。

```typescript
interface BunTestConfig {
  test: {
    globals: boolean;
    environment: 'jsdom' | 'node';
    setupFiles: string[];
    include: string[];
    exclude: string[];
  };
}
```

### Playwright契約
E2Eテスト用。

```typescript
interface PlaywrightConfig {
  use: {
    headless: boolean;
    viewport: { width: number; height: number };
    baseURL: string;
  };
  projects: Array<{
    name: string;
    use: { browserName: 'chromium' | 'firefox' | 'webkit' };
  }>;
}
```

## エラーバウンダリ契約

### インターフェース: ErrorBoundaryProps
ErrorBoundaryコンポーネントのプロップス。

```typescript
interface ErrorBoundaryProps {
  /**
   * エラー発生時にレンダリングするコンポーネント
   */
  fallback: React.ComponentType<{ error: Error; resetError: () => void }>;

  /**
   * エラーがキャッチされたときに発火するコールバック
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;

  /**
   * 変更時にバウンダリリセットをトリガーするキー
   */
  resetKeys?: Array<string | number>;

  /**
   * 保護する子コンポーネント
   */
  children: React.ReactNode;
}
```

**契約要件**:
- コンポーネントツリー内のJavaScriptエラーをキャッチしなければならない
- エラー回復メカニズムを提供しなければならない
- 正常なレンダリングに干渉してはならない
- エラーログをサポートしなければならない

## テスト発見契約

### インターフェース: TestDiscovery
テストの発見と読み込みのための契約。

```typescript
interface TestDiscovery {
  /**
   * パターンに一致するすべてのテストファイルを発見
   * @param patterns Globパターンの配列
   * @returns テストファイルパスの配列に解決するPromise
   */
  discoverTests(patterns: string[]): Promise<string[]>;

  /**
   * ファイルからテストケースを読み込み
   * @param filePath テストファイルへのパス
   * @returns テストケースの配列に解決するPromise
   */
  loadTestCases(filePath: string): Promise<TestCase[]>;

  /**
   * テストファイル構造を検証
   * @param filePath テストファイルへのパス
   * @returns 検証結果に解決するPromise
   */
  validateTestFile(filePath: string): Promise<ValidationResult>;
}
```

## データ契約

### TestCaseスキーマ
テストケースデータのJSONスキーマ。

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "type": { "enum": ["unit", "integration", "e2e"] },
    "filePath": { "type": "string" },
    "description": { "type": "string" },
    "tags": { "type": "array", "items": { "type": "string" } },
    "timeout": { "type": "number", "minimum": 0 }
  },
  "required": ["id", "name", "type", "filePath"]
}
```

### TestResultスキーマ
テスト結果データのJSONスキーマ。

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "testCaseId": { "type": "string" },
    "status": { "enum": ["pass", "fail", "skip", "error"] },
    "duration": { "type": "number", "minimum": 0 },
    "error": { "type": ["string", "null"] },
    "timestamp": { "type": "string", "format": "date-time" },
    "metadata": { "type": "object" }
  },
  "required": ["id", "testCaseId", "status", "duration", "timestamp"]
}
```

## 統合契約

### フレームワーク統合ポイント
- Bun test: PixiJS/bitECSのためのカスタムテスト環境をサポート
- Playwright: Astro devサーバーと統合
- Error Boundary: Astroのコンポーネントシステムで動作

### 環境契約
- 開発: ローカルdevサーバーに対してテストを実行
- CI/CD: 事前定義された設定でヘッドレスモードでテストを実行
- ブラウザ: サポートされたブラウザ (Chrome, Firefox, Safari) でテストが動作