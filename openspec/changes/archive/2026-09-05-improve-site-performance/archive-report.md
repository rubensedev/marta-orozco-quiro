# Archive Report: improve-site-performance

**Change**: improve-site-performance  
**Archived**: 2026-09-05  
**Archived to**: `openspec/changes/archive/2026-09-05-improve-site-performance/`  
**Mode**: hybrid  
**Verdict at close**: PASS (reduced scope) — SDD cycle complete

## Final State (authoritative)

| Fact | Value | Source rank |
|------|-------|-------------|
| Shipped deliverable | Fonts + images only (commit `09fcf55`) | Launch prompt (rank 2) + verify-report + tasks.md |
| Icons / FA→SVG | **CANCELLED** 2026-09-05; FA approach restored; `src/components/icons/` deleted; FA CDN kept in Layout | Launch prompt |
| Tasks (in-scope) | 8/8 `[x]` (phases 3–5) | Persisted `tasks.md` (rank 1) |
| Tasks (cancelled) | 3 unchecked strikethrough lines (1.1, 1.2, 2.1–2.5) — intentional cancel, not incomplete | `tasks.md` + launch prompt |
| Verify | PASS reduced scope; 0 blockers; 0 CRITICAL; 4/4 req; 7/7 scenarios | `verify-report.md` |
| Specs synced | `site-perf-assets` **created** (fonts+images only); `site-header` **NOT synced** | Archive step 2 + launch prompt |
| Active change folder | removed | Archive step 3 |

### Snapshot attribution (not final state)

- Per Engram `apply-progress` #173 (2026-09-05 12:03): at Unit-1 apply time icons still “deferred/pending” and 5.3 LH pending — **superseded** by user cancel of icons, tasks.md cancellation note, verify PASS reduced scope, and launch-prompt final-state facts.
- Per Engram `proposal`/`design`/`tasks`/#166–#170 (pre-cancel planning): still described A1 SVG icons / drop FA CDN — **superseded** at close; shipped scope is fonts+images with FA retained.

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| `site-perf-assets` | **Created** | Main did not exist; delta copied mechanically (full reduced-scope spec). 4 requirements, 7 scenarios. No FA-removal requirement. |
| `site-header` | **Skipped** | Delta marked **CANCELLED — do NOT sync to main**. Main hamburger remains Font Awesome. |

### site-perf-assets requirements now in main

1. Self-hosted brand fonts (Noto Sans+Serif via fontsource; no GFonts)
2. AboutStats responsive image delivery
3. Footer logo intrinsic sizing
4. Preview or production CWV verification (FA retention recorded)

## Archive Contents

- proposal.md ✅
- specs/site-perf-assets/spec.md ✅
- specs/site-header/spec.md ✅ (cancelled delta retained in archive only)
- design.md ✅
- tasks.md ✅ (8/8 in-scope complete; icon phases cancelled)
- verify-report.md ✅
- exploration.md ✅
- state.yaml ✅
- archive-report.md ✅ (this file; additive after move)

## Implementation Shipped

| Item | Change |
|------|--------|
| `@fontsource/noto-sans` + `@fontsource/noto-serif` | latin 300/400/500/600 |
| `Layout.astro` | Drop GFonts; fontsource CSS + preload Sans/Serif 400; **FA CDN kept** |
| `global.css` | Tokens remain Noto Sans / Noto Serif |
| `AboutStats.astro` | `widths={[400,640,960]}`, display-fit `sizes`, lazy |
| `Footer.astro` | Logo `width="300" height="56"` |
| Icons | Cancelled / rolled back; FA classes restored |

## Mechanical Readback

- Spec sync `site-perf-assets` `diff -r` (delta → main temp/copy): **empty** (exit 0)
- Post-archive `diff -r` (archived delta ↔ main `site-perf-assets`): **empty** (exit 0)
- Archive move `diff -r` (pre-move snapshot → destination): **empty** (exit 0)
- `git mv` failed Permission denied; `mv` failed Permission denied; **cp -R → diff verify → rm -rf source** used (Windows); source absent; destination matches snapshot
- `openspec/specs/site-header/spec.md` unchanged (Font Awesome hamburger preserved)

Verbatim empty diffs from archive executor:

```
=== DIFF site-perf-assets source vs temp (must be empty) ===
(end diff site-perf-assets)

=== DIFF snapshot vs destination after cp (must be empty) ===
(end interim diff)
=== MANDATORY DIFF snapshot vs destination (must be empty) ===
(end mandatory archive move diff; exit=0)

=== DIFF archived delta vs main site-perf-assets (must be empty) ===
(end post-archive spec diff)
```

## Observation IDs (Engram / filesystem)

| Artifact | Locator | ID / path |
|----------|---------|-----------|
| proposal | Engram + FS | #166; archived `proposal.md` |
| spec | Engram + FS | #168; archived `specs/site-perf-assets/spec.md` |
| design | Engram + FS | #169; archived `design.md` |
| tasks | Engram + FS | #170; archived `tasks.md` |
| apply-progress | Engram | #173 (intermediate; superseded at close) |
| verify-report | FS only | archived `verify-report.md` (no Engram observation at archive time) |
| archive-report | Engram + FS | this file + `sdd/improve-site-performance/archive-report` |

## SDD Cycle Complete

Ready for the next change. Icons/FA CDN removal may be a future `/sdd-new` if revisited.
