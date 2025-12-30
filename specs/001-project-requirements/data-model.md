# Data Model (Phase 1)

## RoadSegment
- Fields: `id`, `start_node_id`, `end_node_id`, `is_bidirectional`, `capacity_vehicle_count`, `occupied_vehicle_ids`, `connected_edge_gateway_id?`, `congestion_score`, `length_meters`.
- Relationships: Connects two nodes; may connect to an `EdgeGateway` for import/export.
- Validation: Must connect only to valid nodes; capacity > 0; vehicles assigned must be unique; roads must form continuous graph for routing.
- State transitions: Occupancy changes as vehicles enter/exit; congestion recalculated per tick.

## BuildingParcel
- Fields: `id`, `parcel_type` (residence | shop | factory), `road_adjacent_segment_ids`, `worker_capacity`, `assigned_worker_ids`, `resident_ids`, `goods_inventory`, `workplace_role` (for shops: workplace or shopping-destination flag), `location_tile`.
- Relationships: Must have adjacency to at least one `RoadSegment`; residents link to residence; workers link to workplace shop or factory.
- Validation: Placement requires road adjacency; worker_capacity >= assigned_worker_ids length; factories produce goods; shops consume goods.
- State transitions: Goods inventory and assignments change during schedule and deliveries; removal requires unassignment of residents/workers.

## ResidentAgent
- Fields: `id`, `residence_building_id`, `workplace_building_id?`, `current_action` (CommuteToWork | ShoppingTrip | ReturnHome | Idle), `vehicle_id`, `schedule_state` (Morning | Noon | Evening), `rng_stream_id`.
- Relationships: Bound to a `BuildingParcel` residence; optionally bound to workplace shop or factory; owns/uses a `Vehicle`.
- Validation: Exactly one residence; workplace assignment respects capacity; action progression follows daily order.
- State transitions: Advances actions in order CommuteToWork → ShoppingTrip → ReturnHome with deterministic timing; assignment changes only through capacity-checked operations.

## DeliveryVehicle
- Fields: `id`, `origin_factory_id`, `destination_shop_id | destination_edge_gateway_id`, `cargo_units`, `route_segment_ids`, `current_segment_index`, `state` (en_route | delivered | exporting | importing).
- Relationships: Originates from a factory building; targets either a shop or edge gateway based on supply/demand rules.
- Validation: One vehicle dispatched per factory per day; route must stay on roads; no segment collisions (exclusive occupancy per segment position).
- State transitions: Moves along route; cargo decremented on delivery; may switch to export/import depending on factory/shop counts.

## Vehicle
- Fields: `id`, `owner_resident_id?`, `vehicle_type` (commuter | delivery), `position` (segment id + offset), `speed_mps`, `queued_ahead_vehicle_id?`, `route_segment_ids`, `current_segment_index`, `state` (idle | moving | queued | arrived).
- Relationships: Owned by resident or factory; travels only on `RoadSegment` routes.
- Validation: Cannot occupy same position as another vehicle; must stay on road network; route must be valid and connected.
- State transitions: Movement tick updates position; transitions between moving/queued/arrived based on congestion and route completion.

## EdgeGateway
- Fields: `id`, `connected_segment_id`, `mode` (import | export | both), `selection_weight`.
- Relationships: Linked to a boundary `RoadSegment`; used by delivery vehicles for import/export routing.
- Validation: Must attach to road at map edge; selection uses seeded randomness when multiple gateways eligible.
- State transitions: Mode may adjust based on supply/demand; selection weight affects random choice but remains deterministic per seed.

## SimulationConfig
- Fields: `seed`, `rng_streams` (by subsystem), `max_day_duration_ms`, `render_fps_cap`, `entity_hash_strategy`, `traffic_rules` (collision spacing, speed caps).
- Relationships: Applied globally to simulation; used by PRNG creation and hashing.
- Validation: Seed required; fps cap must be 60; timings must respect performance goals.
- State transitions: Seed fixed per run; config changes create new simulation instance.

## DayCycle
- Fields: `current_phase` (Morning | Noon | Evening | Night), `phase_start_tick`, `phase_duration_ticks`, `pending_actions`.
- Relationships: Drives `ResidentAgent.current_action` transitions and delivery dispatch timing.
- Validation: Phase order fixed; transitions deterministic given tick counts; pending actions must match phase.
- State transitions: Advances on schedule; resets at start of new day; dispatches per-phase actions.

## CongestionMetric
- Fields: `segment_id`, `average_speed_mps`, `queue_length`, `travel_time_delta_ms`, `timestamp_tick`.
- Relationships: Derived from `Vehicle` states per `RoadSegment`.
- Validation: Calculated deterministically from simulation state; used for UI and success criteria measurements.
- State transitions: Updated each tick or on interval; used for analytics and player feedback.
