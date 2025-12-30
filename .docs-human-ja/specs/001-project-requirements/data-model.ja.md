# データモデル (フェーズ1)

## RoadSegment
- フィールド: `id`, `start_node_id`, `end_node_id`, `is_bidirectional`, `capacity_vehicle_count`, `occupied_vehicle_ids`, `connected_edge_gateway_id?`, `congestion_score`, `length_meters`。
- 関係: 2ノードを接続し、必要に応じて `EdgeGateway` に接続。
- バリデーション: 有効ノード間のみ接続。容量>0。車両IDは一意。経路網は連結であること。
- 状態遷移: 車両の進入/退出で占有が変化し、渋滞指標を再計算。

## BuildingParcel
- フィールド: `id`, `parcel_type` (residence | shop | factory), `road_adjacent_segment_ids`, `worker_capacity`, `assigned_worker_ids`, `resident_ids`, `goods_inventory`, `workplace_role` (shopの役割), `location_tile`。
- 関係: 少なくとも1本の `RoadSegment` に隣接。住居/職場/工場として居住者や労働者と紐づく。
- バリデーション: 配置は道路隣接が必須。worker_capacity >= 割当労働者数。工場は生産、ショップは消費を持つ。
- 状態遷移: 在庫・アサインがスケジュールと配送で変化。削除時は割当解除が必要。

## ResidentAgent
- フィールド: `id`, `residence_building_id`, `workplace_building_id?`, `current_action` (CommuteToWork | ShoppingTrip | ReturnHome | Idle), `vehicle_id`, `schedule_state` (Morning | Noon | Evening), `rng_stream_id`。
- 関係: 住宅に必ず所属し、任意で職場ショップ/工場に所属。車両を利用。
- バリデーション: 住宅は一意。職場は容量遵守。アクションは所定順序で進行。
- 状態遷移: CommuteToWork → ShoppingTrip → ReturnHome を決定的に進め、割当変更は容量チェックを伴う。

## DeliveryVehicle
- フィールド: `id`, `origin_factory_id`, `destination_shop_id | destination_edge_gateway_id`, `cargo_units`, `route_segment_ids`, `current_segment_index`, `state` (en_route | delivered | exporting | importing)。
- 関係: 工場発でショップまたはエッジゲートへ配送。
- バリデーション: 工場1日1台。経路は道路のみ。衝突なし。
- 状態遷移: 経路進行、配達で在庫減少、需給に応じて輸出入先を選択。

## Vehicle
- フィールド: `id`, `owner_resident_id?`, `vehicle_type` (commuter | delivery), `position` (segment + offset), `speed_mps`, `queued_ahead_vehicle_id?`, `route_segment_ids`, `current_segment_index`, `state` (idle | moving | queued | arrived)。
- 関係: 住民または工場に紐づき、道路のみ走行。
- バリデーション: 同位置重複不可。有効な道路経路のみ。 
- 状態遷移: tickで位置更新。混雑で moving/queued/arrived を遷移。

## EdgeGateway
- フィールド: `id`, `connected_segment_id`, `mode` (import | export | both), `selection_weight`。
- 関係: マップ端の道路に接続し、輸出入経路として利用。
- バリデーション: 辺接続が必須。複数候補時はシードランダムで選択。
- 状態遷移: 需給に応じてモードや重みが変わり得るが、選択は決定的。

## SimulationConfig
- フィールド: `seed`, `rng_streams`, `max_day_duration_ms`, `render_fps_cap`, `entity_hash_strategy`, `traffic_rules` (衝突間隔や速度上限)。
- 関係: シミュレーション全体に適用しPRNG生成やハッシュ計算に利用。
- バリデーション: seed必須。FPS上限60。時間設定は性能目標を尊重。
- 状態遷移: seedは実行ごとに固定。変更時は新インスタンスを生成。

## DayCycle
- フィールド: `current_phase` (Morning | Noon | Evening | Night), `phase_start_tick`, `phase_duration_ticks`, `pending_actions`。
- 関係: Residentのアクションと配送タイミングを駆動。
- バリデーション: フェーズ順は固定。tickに対し決定的。pendingはフェーズと整合。
- 状態遷移: スケジュールに従い進行し、日替わりでリセット。

## CongestionMetric
- フィールド: `segment_id`, `average_speed_mps`, `queue_length`, `travel_time_delta_ms`, `timestamp_tick`。
- 関係: `Vehicle` 状態から `RoadSegment` 毎に算出。
- バリデーション: シミュレーション状態から決定的に算出。UIと成功指標で利用。
- 状態遷移: tickまたは間隔で更新し、分析・フィードバックに用いる。
