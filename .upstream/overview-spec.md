# Project Overview Specification

**Project Name**: Traffic jam-reducing city-building web game  
**Created**: 2026-01-24  
**Status**: Draft  

## Project Overview

This project is a browser-based 2D city-building game focused on reducing traffic jams, with the ultimate goal of evolving into an economic logistics game. Players build and manage cities, including residential areas, commercial facilities, factories, and leisure facilities, while managing logistics, transportation, and resource flows to optimize city operations and minimize congestion.

The game emphasizes simulation of real-world urban planning challenges, incorporating elements of economics, transportation, and infrastructure management. It is designed to run entirely in the browser, providing an accessible and engaging experience for players interested in strategy and simulation games.

## Main Features Summary

- **City Building and Management**: Players construct various buildings such as residential housing, shops, factories, and leisure facilities along roads, managing resources like water, electricity, and gas.
- **Logistics and Transportation**: Simulation of production, inventory management, and distribution of goods via vehicles, with options for rail, ship, or air transport. Includes import/export mechanisms when local supply/demand imbalances occur.
- **Traffic and Congestion Reduction**: Core gameplay revolves around optimizing transportation routes and infrastructure to reduce traffic jams, enhancing city efficiency.
- **Economic Simulation**: Factories produce goods, shops sell them, and leisure facilities provide services, with a focus on supply chain dynamics and economic balance.
- **Resident and Business Simulation**: Residents live in housing, work in facilities, and consume goods/services, while businesses manage inventory and employment.
- **Infrastructure Utilities**: Management of parking, bike racks, and other facilities to support urban mobility.

## Technical Constraints and Requirements

- **Technology Stack**: PixiJS for 2D rendering, bitECS for ECS runtime, Bun for build/package management/unit tests, Cloudflare Pages for hosting, Astro as base framework, New Relic for error monitoring, Playwright for UI/E2E testing, IndexedDB for save data (no localStorage).
- **Device Support**: Desktop: 1366px+ width, Tablet: 768px+ width, Mobile: 320px+ width.
- **Performance**: Target FPS of 60 to ensure smooth gameplay.
- **Localization**: Support for English and Japanese languages.
- **Security**: Adhere to web security best practices including HTTPS/TLS, CSP, CORS, input validation, authentication, rate limiting, and game-specific considerations like authoritative server state, anti-cheat measures, and privacy/data minimization.
- **Architecture**: Source code under `src/`, with structured directories for pages, app bootstrap, libraries (features, core, infrastructures, utilities).
- **Development Principles**: Follow Test-First (TDD), integration testing, runtime-first thinking, minimum-change scope, and context-first design. Documentation in English, with Japanese translations mirroring structure.

## Assumptions

- The game runs in modern web browsers with support for required technologies (e.g., WebGL for PixiJS, IndexedDB).
- Players have stable internet connections for hosting on Cloudflare Pages.
- Target audience includes strategy game enthusiasts interested in urban planning and logistics simulation.
- No server-side multiplayer; single-player experience with potential for future expansions.

## Success Criteria

- Achieve consistent 60 FPS performance across supported browsers and devices.
- Provide an engaging, balanced gameplay loop where players can build functional cities and manage logistics effectively.
- Ensure high security and integrity, preventing cheating and maintaining fair play.
- Successful localization with accurate English and Japanese content.
- Positive user feedback on game mechanics, with metrics like session duration, completion rates, and player retention indicating enjoyment and challenge balance.