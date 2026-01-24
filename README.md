# Traffic Jam-Reducing City-Building Web Game

## 概要

このプロジェクトは、交通渋滞を減らすことを目指したブラウザベースの2D都市建設ゲームです。最終的に経済物流ゲームへと進化することを目標としています。プレイヤーは住宅、商業施設、工場、レジャー施設を建設し、物流、輸送、リソースフローを管理して都市の効率を最適化します。

## 技術スタック (MVP最小限)

- **Bun**: ビルド、パッケージ管理、ユニットテスト用
- **Astro**: ベースフレームワーク
- **Cloudflare Wrangler**: Cloudflare Pagesへのデプロイ用

## 必要条件 (MVP最小限)

- Node.js (Bunが推奨)
- Cloudflareアカウント (デプロイ用)

## インストール

1. Bunをインストール (https://bun.sh/docs/installation)

2. Astroプロジェクトを作成:
   ```bash
   bun create astro@latest game-mytownmap
   cd game-mytownmap
   ```

3. 依存関係をインストール:
   ```bash
   bun install
   ```

4. Cloudflare Wranglerをインストール:
   ```bash
   bun add -D wrangler
   ```

## 開発

開発サーバーを起動:
```bash
bun run dev
```

ブラウザで http://localhost:4321 にアクセスして開発できます。

## ビルド

本番用ビルドを作成:
```bash
bun run build
```

ビルドされたファイルは `dist/` ディレクトリに生成されます。

## デプロイ

### 自動デプロイ (推奨: GitHub連携)

Cloudflare PagesのGitHub連携を使用して、mainブランチの更新で自動デプロイを設定します。

1. Cloudflare Dashboard (https://dash.cloudflare.com/) にログイン。
2. **Pages** タブを選択し、**Create a project** をクリック。
3. **Connect to Git** を選択し、GitHubリポジトリを接続。
4. ビルド設定を以下のように設定:
   - **Build command**: `bun run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (プロジェクトルート)
5. **Save and Deploy** をクリック。

これで、mainブランチにプッシュするたびに自動でビルドとデプロイが行われます。

### 手動デプロイ (代替)

手動でデプロイする場合:
```bash
wrangler pages deploy dist
```

初回デプロイ時は、Cloudflareアカウントの認証とプロジェクトの設定が必要です。

## テスト

ユニットテストを実行:
```bash
bun test
```

## ライセンス

[NYSL Version 0.9982](https://www.kmonos.net/nysl/)

```text
A. 本ソフトウェアは Everyone'sWare です。このソフトを手にした一人一人が、ご自分の作ったものを扱うのと同じように、自由に利用することが出来ます。

  A-1. フリーウェアです。作者からは使用料等を要求しません。
  A-2. 有料無料や媒体の如何を問わず、自由に転載・再配布できます。
  A-3. いかなる種類の 改変・他プログラムでの利用 を行っても構いません。
  A-4. 変更したものや部分的に使用したものは、あなたのものになります。
       公開する場合は、あなたの名前の下で行って下さい。

B. このソフトを利用することによって生じた損害等について、作者は
   責任を負わないものとします。各自の責任においてご利用下さい。

C. 著作者人格権は mkgask (https://github.com/mkgask) に帰属します。著作権は放棄します。

D. 以上の３項は、ソース・実行バイナリの双方に適用されます。
```
