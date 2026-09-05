# Archive Report: optimize-hero-lcp

**Change**: optimize-hero-lcp  
**Archived**: 2026-09-05  
**Archived to**: `openspec/changes/archive/2026-09-05-optimize-hero-lcp/`  
**Mode**: hybrid  
**Verdict at close**: PASS — SDD cycle complete (CWV superseded by `fix-critical-path`)

## Final State (authoritative)

| Fact | Value | Source rank |
|------|-------|-------------|
| Tasks | 11/11 complete (all `[x]` in `tasks.md`, incl. Phase 6 superseded) | Persisted `tasks.md` |
| Verify | PASS; 0 CRITICAL; Phase 6 LH superseded | `verify-report.md` + launch prompt |
| Apply | SVG→WebP portrait via Astro Image; C gate skipped (~53 KB max) | Launch prompt + apply-progress |
| Optional Phase 6 LH | Superseded by `fix-critical-path` Netlify moqtest Perf **87** / LCP **3.9s** | Launch prompt (outranks earlier optional-LH open) |
| LCP priority (current) | Hero **background** sole `fetchpriority="high"` (C2) — owned by `fix-critical-path` | Launch prompt + main `openspec/specs/hero-lcp` |
| Spec sync this archive | **SKIPPED** conflicting portrait-sole-high delta; main C2 preserved | Launch prompt critical fact #3 |
| Active change folder | removed | archive step 3 |

### Snapshot attribution (not final state)

- Per Engram `apply-progress` #145 (2026-09-04 10:20): at apply time Phases 1–5 done; Phase 6 optional unchecked — **superseded** by filesystem `tasks.md` (6.1/6.2 `[x]` via supersession) + verify PASS.
- Per Engram `tasks` #144 (2026-09-04 10:14): observation still showed all unchecked at save time — **stale vs filesystem** `tasks.md` (11/11 `[x]` at archive). Filesystem tasks artifact is Task Completion Gate authority for hybrid.
- Change delta `specs/hero-lcp` still asserts "Single high-priority LCP **portrait**" — historical audit of original intent; **not** current main-spec truth (C2 background sole high).

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| `hero-lcp` | **No sync (intentional skip)** | Main already seeded/amended by `fix-critical-path` archive with C2. Merging this change’s older portrait-sole-high delta would regress main. Non-conflicting requirements (Astro Image, byte budget, SVG deleted, localized alt) already present identically in main. |

### hero-lcp requirements now in main (unchanged by this archive)

1. Astro Image portrait from src/assets
2. Largest served variant byte budget
3. **Single high-priority LCP background** (C2 — preserved; do not revert to portrait)
4. SVG portrait deleted
5. Localized portrait alt text

## Archive Contents

- proposal.md ✅
- specs/hero-lcp/spec.md ✅ (historical delta; portrait-sole-high retained as archive trail)
- design.md ✅
- tasks.md ✅ (11/11 complete; 0 unchecked)
- verify-report.md ✅
- exploration.md ✅
- state.yaml ✅ (status: archived; archive: done)
- archive-report.md ✅ (this file; additive after move)

## Implementation Shipped (final)

| Item | Outcome |
|------|---------|
| Portrait | SVG deleted; WebP via Astro Image from `src/assets` |
| C gate | Max served ~52.7 KB ≤~300 KB — C not run |
| Priority (this change’s original intent) | Portrait was sole high at apply time |
| Priority (at close) | Superseded by C2: bg sole high (`fix-critical-path`) |
| CWV at close | Perf 87 / LCP 3.9s on Netlify moqtest (via `fix-critical-path`) |

## Mechanical Readback

- Spec sync: **not performed** (would regress C2); main `hero-lcp` left intact
- Archive move `diff -r` (pre-move snapshot → destination): empty (exit 0)
- `git mv` / `mv` failed with Permission denied on Windows; **cp -R → diff verify → rm -rf source** used; source absent; destination matches snapshot

Verbatim empty diff from archive executor:

```
=== MANDATORY diff -r (snapshot vs destination) ===
(empty diff — PASS)
```

## Engram Observation IDs (traceability)

| Artifact | ID | Notes |
|----------|-----|-------|
| state | #139 | |
| explore | #140 | |
| proposal | #141 | |
| spec | #142 | Older portrait-sole-high |
| design | #143 | |
| tasks | #144 | Stale unchecked vs filesystem |
| apply-progress | #145 | Phases 1–5; Phase 6 open at write time |
| verify-report | *(filesystem only)* | No Engram observation found at archive |
| archive-report | *(this save)* | `sdd/optimize-hero-lcp/archive-report` |

## SDD Cycle Complete

Planned → implemented → verified (PASS with supersession) → archived.  
Main `openspec/specs/hero-lcp` C2 left intact. Ready for next change.
