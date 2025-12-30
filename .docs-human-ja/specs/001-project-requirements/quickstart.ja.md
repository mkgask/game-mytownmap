# クイックスタート (フェーズ1)

1. 前提: bun >= 1.x。Nodeは不要。最新ブラウザを用意。
2. 依存インストール（リポジトリルート）: `bun install`。
3. リント/テスト（実装後）: `bun run lint` (biome), `bun run test` (vitest)。
4. Playwright P1スイート（実装後）: `bun run test:e2e`。対象は道路敷設、建物配置、1日サイクル完走。
5. Cloudflare Pages向けビルド: `bun run build` で静的アセット生成。SPAルーティング用に `index.html` フォールバック（必要ならハッシュルーティング）。
6. 環境設定: シード、アナリティクス切替、New Relicキー等は環境変数/注入ファイルで設定。秘密やURLのハードコードは禁止。
7. 永続化: IndexedDBにセーブ/シード/設定を保存。リセット時はブラウザ開発者ツールでクリア。
