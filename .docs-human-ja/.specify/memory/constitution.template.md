# [PROJECT_NAME] 憲法
<!-- 例: Spec Constitution、TaskFlow Constitution など -->

## 中核原則

### [PRINCIPLE_1_NAME]
<!-- 例: I. ライブラリ優先 -->
[PRINCIPLE_1_DESCRIPTION]
<!-- 例: すべての機能は独立したライブラリとして始める。ライブラリは自己完結で、独立してテスト可能、文書化されていること。明確な目的が必要 — 組織専用のライブラリは作らない。 -->

### [PRINCIPLE_2_NAME]
<!-- 例: II. CLI インタフェース -->
[PRINCIPLE_2_DESCRIPTION]
<!-- 例: すべてのライブラリは CLI を通じて機能を公開する。テキスト入出力プロトコル: stdin/args → stdout、エラー → stderr。JSON と人間可読フォーマットをサポート。 -->

### [PRINCIPLE_3_NAME]
<!-- 例: III. テストファースト（非交渉） -->
[PRINCIPLE_3_DESCRIPTION]
<!-- 例: TDD を必須とする: テストを書き → 利用者が承認 → テストが失敗することを確認 → 実装する。Red-Green-Refactor のサイクルを厳格に守る。 -->

### [PRINCIPLE_4_NAME]
<!-- 例: IV. 統合テスト -->
[PRINCIPLE_4_DESCRIPTION]
<!-- 例: 統合テストが必要な注目領域: 新しいライブラリの契約テスト、契約の変更、サービス間通信、共有スキーマ。 -->

### [PRINCIPLE_5_NAME]
<!-- 例: V. 可観測性、VI. バージョニングと破壊的変更、VII. 単純性 -->
[PRINCIPLE_5_DESCRIPTION]
<!-- 例: テキスト入出力はデバッグを容易にする。構造化ログを必須とする。バージョンは MAJOR.MINOR.BUILD 形式を推奨。まずは単純に、YAGNI の原則に従う。 -->

## [SECTION_2_NAME]
<!-- 例: 追加の制約、セキュリティ要件、性能基準など -->

[SECTION_2_CONTENT]
<!-- 例: 技術スタック要件、コンプライアンス基準、デプロイポリシーなど -->

## [SECTION_3_NAME]
<!-- 例: 開発ワークフロー、レビュー手順、品質ゲートなど -->

[SECTION_3_CONTENT]
<!-- 例: コードレビュー要件、テストゲート、デプロイ承認プロセスなど -->

## ガバナンス
<!-- 例: 憲法は他の慣行より優先される。修正にはドキュメント、承認、移行計画が必要。 -->

[GOVERNANCE_RULES]
<!-- 例: すべての PR/レビューは遵守を検証すること。複雑性は正当化が必要。[GUIDANCE_FILE] をランタイム開発ガイダンスとして使用。 -->

**Version**: [CONSTITUTION_VERSION] | **承認日**: [RATIFICATION_DATE] | **最終改正日**: [LAST_AMENDED_DATE]
<!-- 例: Version: 2.1.1 | 承認日: 2025-06-13 | 最終改正日: 2025-07-16 -->
