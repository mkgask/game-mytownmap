# タスク: 制約ドリブン要件ベースライン

**入力**: `specs/001-project-requirements/` の設計ドキュメント
**前提**: plan.md（必須）、spec.md（ユーザーストーリー必須）、research.md、data-model.md、contracts/

**スコープガード**: プレイヤー向け操作は道路/建物の追加・変更・削除に限定。それ以外はガバナンス承認が必要。
**ドキュメント更新ルール**: 開発ドキュメントを更新する前にリポジトリルートの `CONTRIBUTING.md` を参照し、PRで言及すること。
**UI/E2Eテスト**: Playwrightのみ使用。

## フェーズ1: セットアップ（共通基盤）

- [ ] T001 ベースディレクトリ作成 `src/apps/mytownmap/src/` と `src/apps/mytownmap/tests/` にプレースホルダーREADMEを配置（アプリ/テスト範囲の説明）。
- [ ] T002 [P] ルート `package.json` にワークスペースプロキシスクリプトを追加（`bun run dev:mytownmap`、`bun run build:mytownmap`、`bun run test:mytownmap`）。
- [ ] T003 [P] 呼ぶ側/呼ばれる側マトリックスと必須スタックを記すREADMEスタブを `src/apps/mytownmap/README.md` に追加。

---

## フェーズ2: 基盤（ブロッキング前提）

**目的**: ディレクトリ分割とスタブを整え、全ストーリーが共通レイアウトで作業できる状態にする。

- [ ] T004 コアソースツリー作成＋READMEプレースホルダー: `src/apps/mytownmap/src/{app,usecase,feature,feature/config,feature/rng,feature/ecs,feature/ecs/components,feature/ecs/systems,feature/ecs/world,feature/routing,infrastructure,infrastructure/persistence,infrastructure/ui,infrastructure/ui/pixi,infrastructure/ui/screens,infrastructure/ui/hud,infrastructure/assets}`。
- [ ] T005 [P] ブートストラップスタブ `src/apps/mytownmap/src/app/main.ts` と `src/apps/mytownmap/src/app/createGameContext.ts` を追加（ECS+Pixi初期化受け皿）。
- [ ] T006 [P] 設定スタブ `src/apps/mytownmap/src/feature/config/env.ts`, `feature/config/constants.ts`, `feature/config/featureFlags.ts` を追加（外部設定受け）。
- [ ] T007 [P] シードPRNGファクトリースタブ `src/apps/mytownmap/src/feature/rng/prngFactory.ts` を追加（決定的ストリーム生成）。
- [ ] T008 [P] 経路探索スキャフォールド `src/apps/mytownmap/src/feature/routing/roadGraph.ts`, `feature/routing/pathCache.ts`, `feature/routing/lanePolicy.ts` を追加（Easy/Normal/Hardの車線選択を実装予定）。
- [ ] T009 [P] ECSコンポーネントスタブ `src/apps/mytownmap/src/feature/ecs/components/{roadComponent.ts,buildingComponent.ts,residentComponent.ts,vehicleComponent.ts,deliveryVehicleComponent.ts,dayCycleComponent.ts,congestionMetricComponent.ts}` を追加。
- [ ] T010 [P] ECSシステムスタブ `src/apps/mytownmap/src/feature/ecs/systems/` 配下に以下を追加:
  - `scheduling/dayCycleSystem.ts`
  - `assignment/capacitySystem.ts`
  - `routing/pathfindSystem.ts`
  - `routing/laneSelectionSystem.ts`
  - `movement/vehicleMovementSystem.ts`
  - `movement/collisionAvoidanceSystem.ts`
  - `delivery/deliveryDispatchSystem.ts`
  - `persistence/snapshotSystem.ts`
  - `observability/errorEventSystem.ts`
- [ ] T011 [P] ワールド配線スタブ `src/apps/mytownmap/src/feature/ecs/world/{worldBuilder.ts,systemRegistry.ts,simulationLoop.ts}` を追加。
- [ ] T012 [P] 永続化スキャフォールド `src/apps/mytownmap/src/infrastructure/persistence/{indexedDbClient.ts,saveRepository.ts,stateDto.ts}` を追加（IndexedDB用）。
- [ ] T013 [P] ユースケーススタブ `src/apps/mytownmap/src/usecase/{seedUsecase.ts,mapUsecase.ts}` を追加（シード管理と道路/建物CRUDオーケストレーション）。
- [ ] T014 [P] UIスキャフォールド `src/apps/mytownmap/src/infrastructure/ui/pixi/{stageFactory.ts,assetsManifest.ts}`, `src/apps/mytownmap/src/infrastructure/ui/screens/{titleScreen.ts,saveSelectionScreen.ts,configScreen.ts,tutorialPlaceholder.ts}`, `src/apps/mytownmap/src/infrastructure/ui/hud/gameHud.ts` を追加。
- [ ] T015 [P] アセットフォルダとREADMEプレースホルダー `src/apps/mytownmap/src/infrastructure/assets/{fonts,sprites,tilesets,shaders}` を追加。
- [ ] T016 [P] テストレイアウトとREADMEプレースホルダー `src/apps/mytownmap/tests/{unit,integration,e2e/playwright,fixtures/{maps,seeds}}` を追加。

**チェックポイント**: ディレクトリ骨格とスタブが揃い、各ストーリーが独立に進行可能。

---

## フェーズ3: ユーザーストーリー1 - 要件ベースラインレビュー (P1) 🎯 MVP

**ゴール**: ディレクトリ分割と必須制約の対応関係をドキュメント化。
**独立テスト**: アーキREADMEからFR/NFR対応が参照でき、外部文書なしで理解できる。

- [ ] T017 [US1] `src/apps/mytownmap/README.md` を更新し、呼ぶ側/呼ばれる側マトリックスとディレクトリ→要件対応（道路限定移動、シードPRNG、IndexedDB、Pixi/bitECS、経路難易度モード）を記載。
- [ ] T018 [US1] `specs/001-project-requirements/architecture/structure-trace.md` を追加し、FR-001..FR-013とNFR-001..NFR-009を新マトリックスのパスでトレース。

**チェックポイント**: 要件ベースラインと構造が合致。

---

## フェーズ4: ユーザーストーリー2 - 要件からのテスト設計 (P2)

**ゴール**: テストスキャフォールドが要件とシード決定性に紐づく。
**独立テスト**: QAがREADMEだけでテスト設計・シードポリシーを把握できる。

- [ ] T019 [US2] テスト戦略README `src/apps/mytownmap/tests/README.md` を追加（ユニット/統合/E2Eの分担、Playwright利用、シード方針、tickハッシュ回帰の狙い）。
- [ ] T020 [P] [US2] フィクスチャ索引 `src/apps/mytownmap/tests/fixtures/README.md` を追加し、P1フロー用のマップ/シード計画を列挙（道路敷設、建物配置、日次サイクル）。

**チェックポイント**: シード前提のテスト設計ガイドが整備。

---

## フェーズ5: ユーザーストーリー3 - エンジニアリング計画 (P3)

**ゴール**: システム順序と経路モード分解に基づいて工数見積もりが可能。
**独立テスト**: 追加調査なしで作業パッケージとシステムスケジュールが把握できる。

- [ ] T021 [US3] ルーティング計画 `specs/001-project-requirements/architecture/routing-plan.md` を追加（Easy/Normal/Hardヒューリスティック、車線ポリシー、出発地/目的地別処理）。
- [ ] T022 [US3] システム順序ドキュメント `src/apps/mytownmap/src/ecs/world/systemOrder.md` を追加（決定的実行順とシステム依存関係: assignment → routing → movement → delivery → persistence → observability）。

**チェックポイント**: 工程計画が具体ディレクトリと実行順に紐づく。

---

## フェーズ6: 仕上げ & 横断対応

- [ ] T023 [P] ライセンス生成スクリプトプレースホルダー `src/apps/mytownmap/scripts/generate-licenses.ts` を追加（タイトルメニュー用のパッケージライセンス一覧生成）。
- [ ] T024 [P] `src/apps/mytownmap/docs/quickstart-checklist.md` を追加し、クイックスタート手順とディレクトリ準備を検証するチェックリストを置く。

---

## 依存関係と実行順

- セットアップ(Phase 1) → 基盤(Phase 2) → ユーザーストーリー(P1→P2→P3) → 仕上げ。
- T004完了後、T005〜T016は並列可能（異なるディレクトリ/ファイル）。
- ユーザーストーリー作業は基盤チェックポイント後に開始。

## 並列実行例

- T004後に T005, T006, T007, T008, T009, T010, T011, T012, T013, T014, T015, T016 を並列進行可。
- US2では T019 と T020 を並列実行可（ドキュメント vs フィクスチャ索引）。

## 実装戦略

- MVP: Phase 1–2 完了後、US1 まで（Phase 3）を終えて構造とトレーサビリティを固定。
- インクリメンタル: 基盤スケルトン → US1ドキュメント → US2テスト設計 → US3エンジ計画 → 仕上げスクリプト/チェックリスト。
