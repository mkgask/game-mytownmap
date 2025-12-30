# Screen Functional Spec: Title Screen

## Purpose
- Provide entry points for starting a new game, resuming recent saves, and accessing menu items (Tutorial, Config, Package Licenses).
- When many saves exist, route to a dedicated save-selection screen to keep the title screen uncluttered.

## Layout
- Top: Game title logo centered.
- Bottom: Two-column layout.
  - Left column: New Game button + Recent Saves list (latest 3–5 items).
  - Right column: Menu (Tutorial, Config, Package Licenses).

## Element Specifications
### Common
- Inputs: Mouse/touch/keyboard (Enter/Arrow/Tab).
- Focus: Arrow or Tab moves between actionable items; visible focus ring.

### New Game Button
- Label: "New Game".
- Action: Starts a new session and transitions to gameplay.
- Defaults: Uses current Config settings (e.g., routing difficulty) on start.

### Recent Saves List
- Count: Show latest 3–5 saves; if fewer exist, show all. Hard cap at 5 on title screen.
- Order: Newest first.
- Display: Save name/slot ID, last modified time, brief progress summary (optional day/score).
- Action: Click/tap to load and resume that save.
- Overflow: If more than 5 saves exist, show "View All" (or similar) that navigates to the save selection screen.

### Save Selection Screen (destination requirements)
- Role: Full list/search/scroll to choose any save.
- Return path: Provide a "Back to Title" action.

### Menu (right column)
- Tutorial
  - Status: To be built after core gameplay is ready; placeholder/disabled with "Coming soon" label is acceptable for now.
  - Goal: Teach basic operations and objectives (congestion relief, road/building edits, seeded reproducibility).
- Config
  - Minimum item: Routing difficulty mode selection (Easy/Normal/Hard).
  - Future: Reserve space for audio/display settings.
- Package Licenses
  - Content: Static page listing package names and licenses present in the built bundle.
  - Generation: Auto-generated during build; accessible from the title menu.

## States & Flows
- Init: Show logo → init buttons/menus → fetch recent saves → render.
- "New Game": Initialize new session → enter gameplay.
- Recent save click: Load target save → enter gameplay.
- "View All": Navigate to save selection screen.
- Menu clicks: Navigate to respective screens (Tutorial placeholder if not yet implemented).

## Error/Exception Cases
- Save load failure: Show error message and offer retry/select different save/back to title.
- Zero saves: Hide recent list or show "No saves available"; keep New Game enabled.
- Missing built license list: Disable the Package Licenses menu item and send a warning log to New Relic. No toast/dialog is shown to end users because it is non-core gameplay.

## Accessibility
- Keyboard: Focus ring on actionable items; Enter/Space to activate; Esc for cancel/back where applicable.
- Screen readers: Alt text for logo; roles/labels on buttons and list items.

## Telemetry (policy-level)
- Instrument title view, button clicks, save load outcomes (success/failure). Do not send PII or save content.
