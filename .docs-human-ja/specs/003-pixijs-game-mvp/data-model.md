# データモデル: PixiJS Game MVP

**機能**: PixiJS Game MVP | **日付**: 2026-02-01
**計画**: [specs/003-pixijs-game-mvp/plan.md](specs/003-pixijs-game-mvp/plan.md)

## 概要

基本的なPixiJSゲームセットアップのためのデータモデル。このMVPはキャンバスレンダリングとゲーム初期化に必要な最小限のデータ構造に焦点を当てます。

## コアエンティティ

### GameConfiguration

**目的**: ゲームキャンバスとレンダリングの設定

**属性:**
- `width`: number - ピクセル単位のキャンバス幅 (デフォルト: 800)
- `height`: number - ピクセル単位のキャンバス高さ (デフォルト: 600)
- `backgroundColor`: number - キャンバス背景の16進数カラー (デフォルト: 0x1099bb)
- `antialias`: boolean - アンチエイリアシングを有効化 (デフォルト: true)
- `resolution`: number - デバイスピクセル比 (デフォルト: window.devicePixelRatio)

**関係:**
- 初期化のためにGameクラスで使用
- PixiJS Applicationコンストラクタに渡される

### GameState

**目的**: ゲームアプリケーションの現在の状態

**属性:**
- `isInitialized`: boolean - PixiJSアプリが準備完了かどうか
- `isRunning`: boolean - レンダーループがアクティブかどうか
- `fps`: number - 現在のフレーム毎秒
- `lastUpdate`: number - 最後の更新のタイムスタンプ

**関係:**
- Gameクラスによって管理
- 状態検証のためにテストで観測

### CanvasElement

**目的**: DOMキャンバス要素参照

**属性:**
- `element`: HTMLCanvasElement - 実際のDOM要素
- `container`: HTMLElement - 親コンテナ要素
- `isAttached`: boolean - キャンバスがDOMにアタッチされているかどうか

**関係:**
- Rendererクラスによって作成
- DOM操作のためにGameクラスで参照

## データフロー

1. **初期化**:
   - GameConfiguration → Game.create() → Renderer.initialize()
   - CanvasElementが作成されDOMにアタッチ

2. **実行時**:
   - 各フレームでGameStateが更新
   - ゲームプレイ中にCanvasElementは静的

3. **クリーンアップ**:
   - Game.destroy() → Renderer.cleanup() → CanvasElementがデタッチ

## 検証ルール

- キャンバス寸法は正の整数でなければならない
- 背景色は有効な16進数でなければならない
- デバイスピクセル比は>= 1でなければならない

## 将来の拡張

ゲーム機能が追加されると、このモデルは以下を含むように拡張されます:
- シーンデータ構造
- ECSのためのエンティティ/コンポーネントデータ
- アセット読み込み状態
- ユーザー入力状態
- ゲーム保存/読み込みデータ

## テスト考慮事項

- ユニットテスト用のCanvasElementモック
- 統合テスト用の実際のDOM要素
- GameConfiguration制約の検証
- GameState遷移のテスト