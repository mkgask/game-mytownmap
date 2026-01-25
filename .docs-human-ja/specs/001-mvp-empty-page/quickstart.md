# クイックスタート: Empty page MVP

**機能**: Empty page MVP | **日付**: 2026-01-26

## 前提条件

- Bun ランタイムインストール済み (`curl -fsSL https://bun.sh/install | bash`)
- デプロイ用の Cloudflare アカウント

## ローカル開発

1. **クローンとセットアップ**:
   ```bash
   git clone <repo-url>
   cd game-mytownmap
   git checkout 001-mvp-empty-page
   ```

2. **依存関係インストール**:
   ```bash
   bun install
   ```

3. **Astro 設定作成** (存在しない場合):
   ```javascript
   // astro.config.mjs
   import { defineConfig } from 'astro/config';

   export default defineConfig({});
   ```

4. **開発サーバー起動**:
   ```bash
   bun run dev
   ```
   http://localhost:4321 を開く

## ビルド

```bash
bun run build
```

ビルドファイルは `dist/` ディレクトリに生成される。

## デプロイ

1. **品質チェック実行**:
   ```bash
   bun run check
   ```

2. **Cloudflare Pages へデプロイ**:
   ```bash
   bun run deploy
   ```

または手動:
```bash
wrangler pages deploy dist
```

## 検証

- デプロイ URL でページ読み込み
- プロジェクトタイトルと説明表示
- ドキュメントリンククリック可能
- 2 秒以内に読み込み

## トラブルシューティング

- **ビルド失敗**: `bun install` で全依存関係インストール確認
- **デプロイ失敗**: Cloudflare アカウントと Wrangler 認証確認
- **ページ読み込み不可**: dist/ 内容とネットワーク接続確認