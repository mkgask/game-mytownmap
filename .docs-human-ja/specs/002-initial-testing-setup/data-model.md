# データモデル: 初期テスト実装

**日付**: 2026-01-31
**機能**: [specs/002-initial-testing-setup/spec.md](specs/002-initial-testing-setup/spec.md)

## 概要

この機能はテストインフラの基礎となるデータ構造を確立します。完全なテスト実装ではなく初期テストセットアップであるため、データモデルはテスト組織とエラーハンドリングに必要な基本エンティティに焦点を当てます。

## コアエンティティ

### TestCase
設定と実行メタデータを持つ単一のテストを表します。

**属性**:
- `id`: string - テストケースの一意の識別子
- `name`: string - 人間が読めるテスト名
- `type`: TestType - Unit, Integration, または E2E
- `filePath`: string - テストファイルへのパス
- `description`: string - テストが検証するもののオプションの説明
- `tags`: string[] - テスト分類のためのオプションのタグ
- `timeout`: number - ミリ秒単位の最大実行時間 (デフォルト: 5000)

**関係**:
- TestSuiteに属する (オプション)
- TestResultを多数持つ

**検証ルール**:
- `id`はプロジェクト内で一意でなければならない
- `filePath`は存在し、読み取り可能でなければならない
- `type`は定義されたTestType値のいずれかでなければならない

### TestSuite
一緒に実行できる関連するテストケースのコレクション。

**属性**:
- `id`: string - テストスイートの一意の識別子
- `name`: string - 人間が読めるスイート名
- `type`: TestType - このスイート内のテストのタイプ
- `pattern`: string - テストファイルマッチングのためのGlobパターン
- `config`: TestSuiteConfig - スイート固有の設定

**関係**:
- TestCaseを多数持つ

**検証ルール**:
- `pattern`は有効なglobパターンでなければならない
- スイート内のすべてのTestCaseは一致する`type`を持たなければならない

### TestResult
テスト実行の結果。

**属性**:
- `id`: string - 結果の一意の識別子
- `testCaseId`: string - 実行されたテストケースへの参照
- `status`: TestStatus - Pass, Fail, Skip, または Error
- `duration`: number - ミリ秒単位の実行時間
- `error`: string | null - 失敗した場合のエラーメッセージ
- `timestamp`: Date - テストが実行されたとき
- `metadata`: Record<string, any> - 追加の実行データ

**関係**:
- TestCaseに属する

**検証ルール**:
- `status`は定義されたTestStatus値のいずれかでなければならない
- `duration`は非負でなければならない
- `timestamp`は有効な日付でなければならない

### ErrorBoundary
コンポーネントツリー内のJavaScriptエラーをキャッチして処理するコンポーネント。

**属性**:
- `id`: string - バウンダリインスタンスの一意の識別子
- `componentName`: string - 保護されているコンポーネントの名前
- `fallbackUI`: React.Component - エラー時にレンダリングするコンポーネント
- `onError`: (error: Error, errorInfo: any) => void - エラーハンドラー関数
- `resetKeys`: any[] - バウンダリリセットをトリガーするキー

**関係**:
- 子コンポーネントをラップ (構成関係)

**検証ルール**:
- `fallbackUI`は有効なReactコンポーネントでなければならない
- `onError`は提供される場合関数でなければならない

## サポートタイプ

### TestType
```typescript
type TestType = 'unit' | 'integration' | 'e2e';
```

### TestStatus
```typescript
type TestStatus = 'pass' | 'fail' | 'skip' | 'error';
```

### TestSuiteConfig
```typescript
interface TestSuiteConfig {
  setupFiles?: string[];
  globalSetup?: string;
  globalTeardown?: string;
  testEnvironment?: string;
  slowTestThreshold?: number;
}
```

## 状態遷移

### TestResult Status Flow
- 初期: 結果なし
- 実行中: テスト実行開始
- Pass: テストが正常に完了
- Fail: アサーションエラーでテスト失敗
- Error: ランタイムエラーでテスト失敗
- Skip: テストがスキップされた

### ErrorBoundary State Flow
- 正常: コンポーネントが正常にレンダリング
- エラー: エラーがキャッチされ、フォールバックUIが表示
- リセット: バウンダリがリセットされ、正常状態に戻る

## データフロー

1. **テスト実行フロー**:
   - TestRunnerがTestSuiteパターンを介してTestCaseを発見
   - TestRunnerがTestCaseを実行し、TestResultを作成
   - TestResultが実行メタデータとともに保存される

2. **エラーハンドリングフロー**:
   - ErrorBoundaryがコンポーネントをラップ
   - エラー時、バウンダリがキャッチし、fallbackUIをレンダリング
   - エラーがonErrorコールバック経由でログ
   - ユーザーがリトライのためにリセットをトリガー可能

## 制約

- すべてのエンティティはテストレポートのためにシリアライズ可能でなければならない
- TestCaseとTestSuiteは非同期操作をサポートしなければならない
- ErrorBoundaryは通常のコンポーネントライフサイクルに干渉してはならない
- データモデルはJestとPlaywrightの両方の環境と互換性があるものでなければならない