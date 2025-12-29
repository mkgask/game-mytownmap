---
title: "001 静的サイトのデプロイ"
summary: "本番環境へ静的サイトをデプロイする手順"
---

# 001 静的サイトのデプロイ

目的: パブリックサイトを本番環境にデプロイし、正常に配信されていることを確認する。

RunBook メタデータ
- RunBook 番号: 001
- 短いタイトル: deploy-static-site
- 重大度 / 影響: low
- タグ: deploy, website

前提条件
- ビルド成果物が存在すること（例: CI による `dist/` 生成）。
- デプロイ用資格情報が利用可能で CDN アカウントにアクセス可能であること。

手順
1. 準備
   - リリースブランチを取得: `git fetch && git checkout release/<version>`
   - 成果物を確認: `ls -la dist/`
2. 実行
   - CDN オリジンへ同期: `aws s3 sync dist/ s3://website-bucket --delete`
   - CDN キャッシュの無効化: `aws cloudfront create-invalidation --distribution-id ABC --paths '/*'`
3. 検証
   - `/health` エンドポイントや主要ページのロードを確認。
   - ダッシュボードのメトリクスを確認し、5xx エラーの増加がないか確認。

ロールバック / 対処
- 前回リリースのアーティファクトを `s3://website-bucket/backups/<previous>` から再同期する。
- 問題が続く場合はオンコール `@frontend-oncall` に連絡する。

後処理 / クリーンアップ
- リリースノートを更新し、課題トラッカーにデプロイをタグ付けする。
- 30 分間モニタリングする。

連絡先 & エスカレーション
- プライマリ: `@frontend-team`
- オンコール: `@frontend-oncall`

参照
- CI パイプライン: パイプラインへのリンク
- リリースノート: トラッカーへのリンク

_Last updated: 2025-12-27_
