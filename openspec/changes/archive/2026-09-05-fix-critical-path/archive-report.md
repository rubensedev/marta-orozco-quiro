# Archive Report: fix-critical-path

**Change**: fix-critical-path  
**Archived**: 2026-09-05  
**Archived to**: `openspec/changes/archive/2026-09-05-fix-critical-path/`  
**Mode**: hybrid  
**Verdict at close**: PASS — SDD cycle complete

## Final State (authoritative)

| Fact | Value | Source rank |
|------|-------|-------------|
| Tasks | 10/10 complete (all `[x]` in `tasks.md`) | Persisted `tasks.md` |
| Verify | PASS; 0 blockers; 0 CRITICAL; 7/7 req; 10/10 scenarios | `verify-report.md` + launch prompt |
| Netlify moqtest CWV | Perf **87** / FCP **1.9s** / LCP **3.9s** / TBT **0** / CLS ~0 | Launch prompt + verify-report CWV section |
| LCP winner | Hero background (`img.absolute`); sole `fetchpriority="high"` (C2) | Launch prompt + shipped code |
| Code | On `feat/improved-seo` (`7c2ffba` within `7ac98b1+`; verify-report commit context `e783b4f`) | Launch prompt |
| FA / Google Fonts | Intentionally OUT OF SCOPE; fonts later started in `improve-site-performance`; icons still separate | Launch prompt |
| Specs synced | `hero-lcp` updated (C2); `critical-path-perf` created | archive step 2 |
| Active change folder | removed | archive step 3 |

### Snapshot attribution (not final state)

- Per Engram `apply-progress` #155 (2026-09-05 10:18): at apply-batch time 8/10 with 5.2/5.3 remaining — **superseded** by later tasks.md completion + verify PASS + moqtest 87.
- Per Engram `tasks` #152: observation still showed unchecked boxes at save time — **stale vs filesystem** `tasks.md` (10/10 `[x]` at archive). Filesystem tasks artifact is Task Completion Gate authority for hybrid.

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| `hero-lcp` | Created then MODIFIED | Main did not exist; seeded mechanically from `optimize-hero-lcp` ADDED full spec; applied RENAMED+MODIFIED C2 (portrait sole high → **background sole high**) |
| `critical-path-perf` | Created | Main did not exist; delta copied mechanically (5 requirements, 7 scenarios) |

### hero-lcp requirements now in main

1. Astro Image portrait from src/assets (preserved)
2. Largest served variant byte budget (preserved)
3. **Single high-priority LCP background** (RENAMED+MODIFIED from portrait)
4. SVG portrait deleted (preserved)
5. Localized portrait alt text (preserved)

### critical-path-perf requirements now in main

1. Responsive hero background sizing
2. Portrait display-fit widths and quality
3. Deferred horizontal carousel init
4. Preview or production CWV verification
5. Optional logo intrinsic dimensions

## Archive Contents

- proposal.md ✅
- specs/hero-lcp/spec.md ✅
- specs/critical-path-perf/spec.md ✅
- design.md ✅
- tasks.md ✅ (10/10 complete; 0 unchecked)
- verify-report.md ✅
- exploration.md ✅
- state.yaml ✅ (status: archived)
- archive-report.md ✅ (this file; additive after move)

## Implementation Shipped

| File | Change |
|------|--------|
| `src/components/Hero.astro` | Bg sole `fetchpriority="high"`; widths/sizes 100vw |
| `src/components/HeroPortrait.astro` | `auto` priority; widths 240/320/480; q80 |
| `src/scripts/horizontal-carousel.ts` | `whenNearIdle` (IO + rIC + timeout) |
| `src/components/Massages.astro` / `Reviews.astro` | Deferred carousel init |
| `src/components/Header.astro` | Logo intrinsic 214×40 |

## Mechanical Readback

- Spec sync `critical-path-perf` `diff -r` (delta → main temp/copy): empty (exit 0)
- Spec sync `hero-lcp` seed `diff -r` (optimize-hero-lcp → main seed): empty (exit 0); then intentional MODIFIED merge (C2) applied in place
- Spec sync `critical-path-perf` post-archive `diff -r` (archived delta ↔ main): empty (exit 0)
- Archive move `diff -r` (pre-move snapshot → destination): empty (exit 0)
- `git mv` / `mv` failed with Permission denied on Windows; **cp -R → diff verify → rm -rf source** used; source absent; destination matches snapshot

Verbatim empty diffs recorded in archive executor shell output:
```
=== critical-path-perf copy diff ===
(empty copy diff OK)
=== hero-lcp seed diff (optimize-hero-lcp → temp) ===
(empty seed diff OK)
=== post-copy diff snapshot → destination ===
(empty copy diff OK)
=== post-rm verification: active source gone; archive intact ===
(empty final diff OK)
=== critical-path-perf main vs archived ===
(empty OK)
```

## Engram Observation IDs (traceability)

| Artifact | Topic key | Observation ID |
|----------|-----------|----------------|
| proposal | `sdd/fix-critical-path/proposal` | #148 |
| spec | `sdd/fix-critical-path/spec` | #150 |
| design | `sdd/fix-critical-path/design` | #151 |
| tasks | `sdd/fix-critical-path/tasks` | #152 |
| apply-progress | `sdd/fix-critical-path/apply-progress` | #155 |
| verify-report | `sdd/fix-critical-path/verify-report` | #175 |
| state | `sdd/fix-critical-path/state` | #149 |

Filesystem locators also read (hybrid) under `openspec/changes/fix-critical-path/` prior to move: proposal, design, specs/*, tasks, verify-report, state, exploration.

## Deferred / Non-blocking

- FA CDN / Google Fonts / icon SVG migration — out of scope; fonts unit later in `improve-site-performance`; icons still gated
- Active change `optimize-hero-lcp` still present; its delta still says portrait-sole-high — main `openspec/specs/hero-lcp` now reflects C2; reconcile when that change archives

## SDD Cycle Complete

Explored → proposed → specified → designed → tasked → applied → verified (PASS) → archived.  
Ready for the next change (`none` for this cycle; follow-up work lives in `improve-site-performance`).
