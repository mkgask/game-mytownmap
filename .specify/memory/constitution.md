# Traffic jam-reducing city-building web game Constitution

## Core Principles

### I. Documentation
- Development documentation is primarily authored in English and placed in appropriate directories (e.g., project root, `.specify/`, `specs/`, `.upstream/`, etc.).
- New development documents MUST be linked from `AGENTS.md`.
- Japanese translation files are an exception and MAY be placed under `.docs-human-ja/` mirroring their path from the project root.
- Japanese translation files MUST NOT be linked in `AGENTS.md`.
- For bilingual documents the English document is the source of truth and MUST be kept in immediate parity; any non-conforming documentation MUST be corrected promptly.
- As the canonical source, English documentation is the source of truth; Japanese translations must faithfully preserve the nuance, intent, and meaning of the English original and be reviewed for fidelity.

### II. Don't be Evil Policy
- As senior engineers, exercise deep insight and conduct rigorous, detailed analysis; deliver honest, reliable work and clear, well-founded responses.
- Do not prioritize pleasing the user over evidence: prioritize scientific facts, official documentation, and up-to-date information (preferably within the last six months) when they conflict with user preference.
- Produce expert-level, deep insights rather than superficial or basic explanations.
- Explicitly call out uncertainty, assumptions, guesses, and TODOs; do not silently fill gaps. If something is unknown, state "unknown" and propose what information or investigation is needed.
- Share promptly any facts or risks that could affect performance, safety, maintainability, or operational constraints; do not hide inconvenient truths.
- Prohibit practices that mislead or intentionally obscure important behaviors or system constraints.
- On change requests, first review surrounding existing code; if no implementation is necessary, avoid changes and explicitly inform the requester that no implementation was performed.

### III. Context-First
- Every feature starts by considering its execution context: components should be designed as self-contained units, independently testable and documented; clear purpose required - no organization-only components.
- Whenever creating or modifying code elements (files, functions, variables, constants, interfaces, types, etc.), confirm and record their owning context.
- Cross-context interactions MUST be minimized and expressed through explicit contracts: prefer function signatures, `module-as-record`, typed DTOs, and API schemas; favor functional-style interfaces. Classes or stateful objects are allowed only as exceptions and the reason MUST be documented in the design notes.
- Small contexts may belong to the nearest, most relevant context based on purpose and responsibility.
- Splitting for its own sake is discouraged—if a split only increases the number of files without clarifying responsibility, it should be avoided.

### IV. Test-First & Integration Testing
- Test-First (TDD) is required: write tests first, obtain appropriate stakeholder/owner approval, verify tests fail, then implement; follow a strict Red-Green-Refactor cycle.
- Integration testing is required for critical areas: new library contract tests, contract changes, inter-service communication, and shared schemas.
- When changing or deleting code, always take a wide view of the impact surface and verify changes with static analysis plus unit tests.
- Because a narrowly scoped impact analysis causes missed dependencies, you MUST check all areas that may be indirectly dependent on the changed code (including build scripts, shared utilities, consumed schemas, and deployment manifests).

### V. Runtime-First Thinking
- APIs, batch jobs, CLIs, and similar runtime artifacts MUST be designed with the production execution environment in mind: deployment configuration, observability, failure modes, and rate limiting.
- Configuration values (secrets, endpoints, flags, etc.) MUST NOT be hard-coded; these MUST be treated as external configuration provided via environment variables or configuration providers.
- Observability — logs, metrics, and traces — MUST be sufficient to diagnose production incidents without attaching a debugger.
- Changes that affect external contracts (APIs, message schemas) or persisted data MUST be evaluated for backward compatibility and a migration path.

### VI. Minimum-Change Scope Principle
- Start by attempting the smallest possible change (for example, replacing an environment variable at runtime); only broaden scope incrementally when the minimal change cannot satisfy the requirement.
- Record each scope-expansion step and favor reversible changes; document the rationale and the rollback plan for each expansion.

## Basic Principles

1. Prefer constants and pure functions; minimize side effects
2. Functions with side effects must be prefixed with `wse` (short for WithSideEffect)
3. Global variables and singletons are strictly prohibited. If necessary, prioritize global stores.
4. Prioritize functional descriptions and implement them as much as possible using pure functions and module-as-record. Use classes/interfaces only when there is a clear need for internal state, lifecycle, or polymorphism that cannot be fully expressed using functional descriptions.
5. Dependencies are injected from outside, and contracts are made explicit with function signatures, modules (records of function groups), protocols, etc. (DI is required)
6. Prioritize testability and prohibit implementations that impair testability.
7. Single responsibility. One file per responsibility. Use ~300 lines as an upper guide and split when needed
8. Maximize type safety/null safety so invalid states cannot be represented
9. Catch only recoverable exceptions; otherwise rely on higher-level Error Boundaries for early detection
10. Event naming: "Publisher: doingSomething" (progressive), "Subscriber: somethingDone" (past)
11. Turn all magic numbers/strings into constants
12. In layers that depend on external APIs/DB schemas/infrastructure, use the Adapter pattern
13. Unit tests cover pure-function happy paths, error paths, and boundary tests; move side effects/external dependencies to integration tests; keep unit tests blazing fast even beyond 1000 cases
14. Write JSDoc-style (JavaDoc-compatible) comments for file headers, functions, and type definitions
15. Comments are minimal; focus on implicit knowledge and non-obvious parts. Explain why code has its current form based on present constraints/specs/relationships, not historical reasons
16. When assigning special meaning within the expressible type range, explicitly document the value and meaning (e.g., using -1 or INT_MIN as error/invalid markers, or `int` status values with distinct meanings)
17. Files that can be generated by standard tools, such as `package.json`, `tsconfig.json`, lock files, and base config, should not be written manually but should be generated by the corresponding CLI (e.g., `pnpm init`, `tsc --init`, or various framework generators).
18. Including null or undefined in the return value should be a last resort. As a rule, set an appropriate default value within the range that can be expressed by the type (0 for int, an empty string for string, etc.).
19. Nest as shallowly as possible
20. Always return early and determine whether the main process can be executed in advance within the function.

## Technical Characteristics

### Technical Stack
- PixiJS (2D rendering)
- bitECS (ECS runtime)
- bun (build / package manager / unit tests)
- Biome (linter / formatter)
- Cloudflare Pages (hosting)
- Astro (base framework)
- New Relic (errors only)
- Playwright (UI / E2E testing)
- IndexedDB in browser (Sava Data, Don't use localStorage)

### Import Conventions
- All imports MUST use the @/ path alias for consistency and maintainability.
- Example: import { Game } from '@/libs/core/game/core/Game'

### Directory Structure
All source code lives under `src/`:

```
src/
    pages/
        index.astro    # link to /play
        play.astro
    app/
        bootstrap.ts    # bootstrap for the game displayed in play.astro
    libs/    # game libraries
        features/
            title/
                scene.ts
            config/
                scene.ts
            play/
                scene.ts
        core/    # game domain logic
            scenes/
                management.ts
            ecs/
            config/
            persistence/
        instructures/
        utilities/
```

### Project Structure
- Modular architecture with clear separation of concerns
- Feature-based organization under libs/features/
- Core domain logic in libs/core/ with ECS, config, and persistence
- Utilities and infrastructures as shared modules
- Context-First design: each module has a single responsibility and is independently testable

### Dependency Structure
- `libs/core/` calls `libs/features/` (core domain logic orchestrates features)
- `libs/features/` calls `libs/infrastructures/` (features use infrastructure services)
- `libs/utilities/` is called by any of the above three layers (shared utilities)
- Dependency direction generally flows: core → features → infrastructures, with utilities accessible from all layers
- Dependency inversion is allowed when necessary (e.g., interfaces in core implemented by features)

### Performance
- Target FPS: 60
- If loading takes more than 1 second, transition to a loading screen
- If processing becomes heavy, limit the number of objects processed per frame and distribute over multiple frames
- Use object pooling for frequently created/destroyed objects
- Asynchronous asset loading with progress tracking
- Memory usage monitoring and cleanup hints for garbage collection
- Display: Extremely simple 2D graphics

### Localization
- Supported languages: English, Japanese

### Scalability
- Primarily client-side game with minimal server load
- Hosted on Cloudflare Pages for global distribution and scalability
- No microservices required at this scale; monolithic client-side architecture suffices

### Monitoring
- Error monitoring using New Relic for production incidents
- Client-side performance metrics (FPS, load times, memory usage)
- User interaction logging for gameplay analytics
- Centralized logging for debugging and issue tracking

### Security

#### General web security (MUST where critical)

- **HTTPS/TLS (MUST):** Serve all pages, APIs, and assets over TLS; enable HSTS and modern cipher suites.
- **Content Security Policy (CSP, SHOULD):** Restrict script/style/source origins to reduce XSS risk; apply SRI for third-party resources when feasible.
- **CORS (MUST):** Apply strict origin policies for APIs; avoid overly permissive CORS.
- **Input Validation & Output Encoding (MUST):** Validate and canonicalize on the server; never trust client input.
- **Authentication & Sessions (MUST):** Use secure, short-lived tokens, proper cookie flags (HttpOnly, Secure, SameSite), and rotation/revocation mechanisms.
- **Rate Limiting & Abuse Detection (MUST):** Protect endpoints against brute-force, automated misuse, and abuse; apply global and per-endpoint limits.
- **Secrets Management (MUST):** No hard-coded secrets; use environment variables or a dedicated secret store and restrict access.
- **Dependency Security (SHOULD):** Automated vulnerability scanning, pinned versions, and an update policy for major dependencies.
- **Logging & Monitoring (MUST):** Centralized logs, security-relevant metrics, and alerts for suspicious activity or errors.
- **WAF / Edge Protections (SHOULD):** Use CDN/WAF features for DDoS mitigation and basic request filtering.

#### Web-game-specific considerations

- **Authoritative Server State (MUST):** Treat the server as authoritative for game-critical state; validate all client actions server-side to prevent cheating.
- **Anti-cheat & Tamper Detection (SHOULD / DEPENDS):** Implement heuristics, anomaly detection, and server-side checks; do not rely only on client-side obfuscation.
- **Asset Integrity & Versioning (SHOULD):** Use versioned manifests or signed assets to prevent tampered art/levels being served to clients.
- **Predictable RNG & Fairness (MUST for fairness-sensitive systems):** Avoid exposing predictable random seeds to the client; keep RNG server-side or use cryptographically-secure approaches.
- **Input Batching & Throttling (SHOULD):** Prevent automation/bot play by throttling high-frequency gameplay actions and adding server-side validation.
- **Privacy & Data Minimization (MUST):** Collect minimal PII; store only what's necessary and implement retention/delete policies.
- **Game State Migration Safety (MUST):** Plan migration paths for schema changes that affect player progress; provide recovery and rollback strategies.
- **Client-Side Obfuscation (DISCOURAGED as sole measure):** Obfuscation is a mild deterrent; never assume client-side measures provide security.

## Governance

- The Constitution is the project's source of truth and supersedes informal or ad-hoc practices.
- Amendments MUST be proposed via a documented PR that includes a clear rationale and, when code or data are affected, a migration/rollout plan. Amendments require approval by at least two maintainers or project leads.
- Versioning follows semantic versioning: MAJOR for governance-breaking changes, MINOR for added principles or material expansions, PATCH for clarifications and non-semantic wording fixes.
- Compliance: PRs that touch areas governed by this Constitution MUST reference the relevant sections and demonstrate compliance (tests, docs, or rationale). Maintainers may block merges that violate the Constitution.
- Review cadence: the Constitution SHOULD be reviewed annually or after any major incident that suggests changes are needed.

**Version**: 1.0.1 | **Ratified**: 2026-01-19 | **Last Amended**: 2026-02-07

<!-- Sync Impact Report
Version change: 1.0.0 → 1.0.1
List of modified principles (old title → new title if renamed): None
Added sections: Import Conventions
Removed sections: None
Templates requiring updates (✅ updated / ⚠ pending): None
Follow-up TODOs if any: None
-->
