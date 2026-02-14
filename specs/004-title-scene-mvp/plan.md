# Implementation Plan: Title Scene MVP

**Branch**: `004-title-scene-mvp` | **Date**: 2026-02-08 | **Spec**: [specs/004-title-scene-mvp/spec.md](specs/004-title-scene-mvp/spec.md)
**Input**: Feature specification from `/specs/004-title-scene-mvp/spec.md`

## Summary

Implement Title Scene MVP to provide game title display and game start functionality via Play button. Adopt a simple scene management approach using PixiJS.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: PixiJS v8, Astro  
**Storage**: N/A (クライアントサイドのみ)  
**Testing**: Playwright (E2E), Bun test (Unit)  
**Target Platform**: Web browsers (Chrome, Firefox, Safari)  
**Project Type**: Web application  
**Performance Goals**: 60 FPS, <2s page load  
**Constraints**: <100KB bundle size, mobile responsive  
**Scale/Scope**: Single scene, 2 UI elements  

## Constitution Check

- ✅ Context-First: TitleScene is implemented as an independent context
- ✅ Test-First: Unit tests for scene creation, E2E for user interaction
- ✅ Runtime-First: Client-side only, no server dependencies
- ✅ Minimum-Change Scope: Only extend existing Game.ts

## Project Structure

### Documentation (this feature)

```text
specs/004-title-scene-mvp/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── libs/game/
│   ├── features/scenes/
│   │   └── TitleScene.ts    # New: Title scene implementation
│   └── core/
│       └── Game.ts          # Modified: Scene management integration
└── components/astro/
    └── GameCanvas.astro     # Modified: Title scene initialization
```

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations identified - implementation follows constitution principles.

## Implementation Phases

### Phase 0: Research & Design (Current)
- [x] Analyze existing Scene.ts base class
- [x] Research PixiJS text and button implementation
- [x] Define TitleScene interface and contracts

### Phase 1: Core Implementation
- [ ] Create TitleScene.ts with title display
- [ ] Implement Play button with click handler
- [ ] Integrate with Game.ts scene management

### Phase 2: Testing & Polish
- [ ] Add unit tests for TitleScene
- [ ] Add E2E tests for title display and button interaction
- [ ] Performance optimization and mobile responsiveness

## Risk Assessment

### High Risk
- **PixiJS Text Rendering**: フォントロードと表示の一貫性
- **Button Interaction**: モバイルでのタッチイベント処理

### Medium Risk
- **Scene Transition**: Game.ts との統合
- **Styling Consistency**: 既存UIとのデザイン統一

### Low Risk
- **Performance**: シンプルな実装なので問題なし
- **Browser Compatibility**: 既存コードが動作しているブラウザでOK

## Success Metrics

- ✅ Title displays correctly on page load
- ✅ Play button is clickable and triggers scene transition
- ✅ No console errors in browser
- ✅ Passes all unit and E2E tests
- ✅ Loads within 2 seconds on 3G connection</content>
<parameter name="filePath">/mnt/g/projects/web/game-mytownmap/specs/004-title-scene-mvp/plan.md