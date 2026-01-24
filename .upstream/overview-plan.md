# Project Overview Plan

**Project Name**: Traffic jam-reducing city-building web game  
**Date**: 2026-01-24  
**Spec**: [.upstream/overview-spec.md](.upstream/overview-spec.md)  

## Summary

This plan outlines the high-level development approach for the browser-based 2D city-building game focused on traffic jam reduction, evolving towards an economic logistics simulation. The project will follow a phased development process emphasizing Test-First (TDD), integration testing, and minimum-change scope principles from the constitution. Key objectives include achieving 60 FPS performance, robust security, and engaging gameplay, with a single-player experience hosted on Cloudflare Pages.

## Development Phases

1. **Research and Planning (1-2 months)**: Conduct market research on similar games, finalize technical architecture based on PixiJS/bitECS stack, and define detailed feature specs. Timeline: Feb-Mar 2026.
2. **Design and Prototyping (2-3 months)**: Create UI/UX designs, prototype core mechanics (city building, logistics), and set up development environment with Bun and Astro. Timeline: Apr-Jun 2026.
3. **Implementation (4-6 months)**: Develop features iteratively using TDD, starting with basic city building and logistics simulation. Integrate security measures and localization. Timeline: Jul-Dec 2026.
4. **Testing and Optimization (2-3 months)**: Perform E2E testing with Playwright, optimize for 60 FPS, conduct security audits, and refine gameplay balance. Timeline: Jan-Mar 2027.
5. **Deployment and Launch (1 month)**: Deploy to Cloudflare Pages, monitor with New Relic, and gather initial user feedback. Timeline: Apr 2027.

## Risks and Mitigations

- **Performance Issues**: Risk of not achieving 60 FPS due to complex simulations. Mitigation: Early prototyping and profiling with PixiJS; optimize ECS with bitECS.
- **Security Vulnerabilities**: Web-based game susceptible to client-side exploits. Mitigation: Implement authoritative server state, anti-cheat heuristics, and regular audits.
- **Scope Creep**: Evolving from basic game to full logistics simulation. Mitigation: Adhere to minimum-change scope; use SpecKit for detailed feature planning.
- **Browser Compatibility**: Variations in IndexedDB/WebGL support. Mitigation: Test across modern browsers; provide fallbacks where possible.
- **Team Availability**: Dependency on developer expertise in specified stack. Mitigation: Ensure team training and consider hiring if needed.

## Dependencies

- **Technical Stack Availability**: PixiJS, bitECS, Bun, Astro, Cloudflare Pages, New Relic, Playwright must be accessible and maintained.
- **Team Skills**: Developers proficient in TypeScript, ECS patterns, and web security.
- **Regulatory**: Compliance with web privacy laws (e.g., GDPR for data minimization).
- **External Services**: Stable hosting on Cloudflare; monitoring via New Relic.

## Milestones

- **Milestone 1**: Completion of research and spec finalization (End of Mar 2026).
- **Milestone 2**: Prototype demo with basic city building (End of Jun 2026).
- **Milestone 3**: Core implementation of logistics and traffic reduction (End of Dec 2026).
- **Milestone 4**: Full testing and optimization (End of Mar 2027).
- **Milestone 5**: Launch and post-launch monitoring (End of Apr 2027).

## Detailed Implementation Plan for Main Features

This section provides deeper context and implementation plans for the main features outlined in the spec, focusing on required contexts, components, and testing strategies. Each feature is designed as a self-contained context with explicit contracts, following functional-style interfaces and dependency injection. Implementation follows Test-First (TDD) with integration tests for critical areas.

### 1. City Building and Management
**Context**: Core game domain under `src/libs/core/`, using bitECS for entity management. Buildings are entities with components for position, type, resources, and utilities.

**Required Components**:
- Building placement system: Validate road adjacency, prevent overlaps.
- Resource management: Track water, electricity, gas per building type.
- Persistence: Save building state to IndexedDB.

**Implementation Steps**:
1. Define ECS components (e.g., Position, BuildingType, Resources).
2. Implement placement logic with validation (pure functions for checks).
3. Integrate with scene management for rendering via PixiJS.
4. Add UI for building selection and placement.

**Testing Strategy**: Unit tests for placement logic; integration tests for ECS updates and persistence. E2E tests with Playwright for UI interactions.

**Dependencies**: PixiJS for rendering, bitECS for ECS, IndexedDB for storage.

### 2. Logistics and Transportation
**Context**: Simulation domain under `src/libs/core/ecs/`, modeling supply chains with vehicles as entities.

**Required Components**:
- Vehicle routing: Pathfinding algorithms for roads, considering traffic.
- Inventory management: Production, storage, and distribution.
- Import/Export: Fallback mechanisms when local supply fails.

**Implementation Steps**:
1. Model production facilities and stores as ECS entities with inventory components.
2. Implement order matching and vehicle dispatch (pure functions for logic).
3. Add transport options (rail, ship, air) with cost calculations.
4. Integrate traffic simulation for congestion effects.

**Testing Strategy**: TDD for routing algorithms; integration tests for full supply chain cycles. Simulate time-based events for import/export.

**Dependencies**: bitECS for entities, custom pathfinding library (if needed), IndexedDB for state.

### 3. Traffic and Congestion Reduction
**Context**: Optimization context under `src/libs/core/scenes/management.ts`, focusing on real-time simulation.

**Required Components**:
- Congestion calculation: Based on vehicle density and road capacity.
- Route optimization: Dynamic path adjustments to reduce jams.
- Feedback loops: Player actions affecting traffic flow.

**Implementation Steps**:
1. Implement traffic flow models (simplified physics-based).
2. Add metrics for congestion levels and player scoring.
3. Provide tools for infrastructure upgrades (e.g., new roads).
4. Balance with economic impacts.

**Testing Strategy**: Performance tests for 60 FPS under high vehicle counts; unit tests for calculation functions. E2E for optimization effectiveness.

**Dependencies**: PixiJS for visualization, bitECS for entity updates.

### 4. Economic Simulation
**Context**: Business logic under `src/libs/core/`, with contracts for transactions.

**Required Components**:
- Production cycles: Time-based goods creation.
- Market dynamics: Supply/demand balancing with pricing.
- Chain reactions: Failures propagating through logistics.

**Implementation Steps**:
1. Define economic entities (factories, shops) with production rates.
2. Implement transaction logic (pure functions for calculations).
3. Add economic events (e.g., demand spikes).
4. Integrate with resident consumption.

**Testing Strategy**: Unit tests for economic models; integration tests for full cycles. Mock time for simulations.

**Dependencies**: bitECS for entities, custom math libraries.

### 5. Resident and Business Simulation
**Context**: AI/behavior context under `src/libs/core/`, simulating autonomous agents.

**Required Components**:
- Resident behaviors: Housing, work, consumption.
- Business operations: Employment, inventory turnover.
- Population dynamics: Births, moves, business failures.

**Implementation Steps**:
1. Model residents and businesses as ECS entities with state machines.
2. Implement decision logic (e.g., job seeking, shopping).
3. Add lifecycle events (e.g., building abandonment).
4. Balance with city resources.

**Testing Strategy**: TDD for behavior logic; integration tests for emergent behaviors. E2E for overall city health.

**Dependencies**: bitECS for agents, random number generators (secure for fairness).

### 6. Infrastructure Utilities
**Context**: Support context under `src/libs/core/config/`, managing city-wide services.

**Required Components**:
- Utility grids: Power, water networks with capacity.
- Parking and mobility: Allocation systems.
- Upgrades: Player investments for improvements.

**Implementation Steps**:
1. Define utility components and grid logic.
2. Implement allocation algorithms (e.g., parking assignment).
3. Add visualization for utility status.
4. Integrate with building requirements.

**Testing Strategy**: Unit tests for grid calculations; integration tests for city-wide effects. Performance tests for large grids.

**Dependencies**: PixiJS for maps, bitECS for components.

**Overall Notes**: Each feature uses dependency injection for external services (e.g., persistence). Changes are reversible with rollback plans. Security audits ensure no hard-coded values. For detailed specs, refer to SpecKit agents.