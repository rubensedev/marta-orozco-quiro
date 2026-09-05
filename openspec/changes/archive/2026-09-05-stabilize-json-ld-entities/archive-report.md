# Archive Report: stabilize-json-ld-entities

**Change**: stabilize-json-ld-entities  
**Archived**: 2026-09-05  
**Archived to**: `openspec/changes/archive/2026-09-05-stabilize-json-ld-entities/`  
**Mode**: hybrid  
**Archive mode**: intentional-with-warnings  
**Verdict at close**: PASS WITH WARNINGS — SDD cycle complete (task 5.5 Rich Results accepted residual)

## Final State (authoritative)

| Fact | Value | Source rank |
|------|-------|-------------|
| Tasks | 15/16 `[x]`; 5.5 remains unchecked as accepted residual (manual Rich Results / Schema.org) | Persisted `tasks.md` (rank 1) + launch prompt (rank 2) |
| Verify | PASS WITH WARNINGS; 0 blockers; 0 CRITICAL; 4/4 req; 4/4 scenarios | Launch prompt + `verify-report.md` (evidence_revision `sha256:2d04f28f617a4efa…`) |
| Implementation commit | `cb873f3` on `feat/improved-seo` | Launch prompt + verify-report |
| GitHub issue | #8 (parent owns close; not closed by archive) | Launch prompt |
| Specs synced | `seo-json-ld` **created** (4 ADDED requirements) | Archive step 2 |
| Active change folder | removed | Archive step 3 |
| Residual WARNING | Task 5.5 external Rich Results / Schema.org not runnable on non-public branch HTML; local dist smoke covered implementable acceptance | Launch prompt: preserve residual; verify-report WARNING |

### Intentional partial-archive reason

Native `sdd-status` reported `dependencies.archive: blocked` / `allComplete: false` because task 5.5 is unchecked. Orchestrator launch prompt explicitly authorized archive with **PASS WITH WARNINGS** and instructed to preserve the 5.5 Rich Results residual. This is **not** stale-checkbox reconciliation (5.5 was not completed); archive proceeds as **intentional-with-warnings** per Strict-vs-OpenSpec Archive Policy (non-critical partial archive with explicit approval). CRITICAL findings: none.

### Snapshot attribution (not final state)

- Per Engram `apply-progress` #185 (2026-09-05 16:39): at apply time 5.5 remaining as manual follow-up — **still true at close** (accepted residual, not superseded).
- Per Engram `tasks` #183: 15/16 `[x]` with 5.5 unchecked — **matches** filesystem `tasks.md` at archive (Task Completion Gate: incomplete manual harness retained intentionally).
- Per Engram `verify-report` #186 / FS verify-report: PASS WITH WARNINGS at verification time — **carried forward as final verdict** (no later remediating commits claimed).

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| `seo-json-ld` | **Created** | Main did not exist; delta copied mechanically (ADDED full capability). 4 requirements, 4 scenarios. |

### seo-json-ld requirements now in main

1. Stable business and person entity IDs
2. WebSite and WebPage nodes
3. Stable service IDs and business provider refs
4. Existing types remain valid; NAP unchanged

## Archive Contents

- proposal.md ✅
- specs/seo-json-ld/spec.md ✅
- design.md ✅
- tasks.md ✅ (15/16 complete; 5.5 unchecked accepted residual)
- apply-progress.md ✅
- verify-report.md ✅
- state.yaml ✅ (`status: archived`; `archive: done`; `next: none`; `archive_mode: intentional-with-warnings`)
- archive-report.md ✅ (this file; additive after move)

## Implementation Shipped

| File | Change |
|------|--------|
| `src/components/SeoJsonLd.astro` | Origin-rooted `#business`/`#person`/`#website`/`#service-{id}`; WebSite/WebPage; provider `@id`; FAQ `#faq`+`isPartOf`; Place ID `hasMap` |

## Residual WARNING (preserved at close)

- **Task 5.5** remains unchecked: Google Rich Results Test + Schema.org validator not runnable here (branch HTML not publicly fetchable for Google; inventing external PASS forbidden).
- Accepted residual per design Testing Strategy (Manual) and verify-report WARNING.
- **Suggestion (unchanged)**: After Netlify preview/prod deploy of `cb873f3`, run Rich Results Test on `/` and `/en/` and check off 5.5 if desired (follow-up; does not reopen this SDD cycle).

## Mechanical Readback

- Spec sync `seo-json-ld` `diff -r` (delta → temp → main): **empty** (exit 0)
- Post-archive `diff -r` (archived delta ↔ main `seo-json-ld`): **empty** (exit 0)
- Archive move `diff -r` (pre-move snapshot → destination): **empty** (exit 0)
- Fallback source↔destination interim `diff -r`: **empty** (exit 0)
- `git mv` failed Permission denied; `mv` failed Permission denied; **cp -R → diff verify → rm -rf source** used (Windows); source absent; destination matches snapshot

Verbatim empty diffs from archive executor:

```
=== SPEC SYNC DIFF (delta → temp) ===
=== END SPEC SYNC DIFF (exit=0) ===
=== SPEC SYNC POST DIFF (delta → main) ===
=== END SPEC SYNC POST DIFF (exit=0) ===

=== FALLBACK DIFF (source → destination) ===
=== END FALLBACK DIFF ===

=== ARCHIVE MOVE DIFF (snapshot → destination) ===
=== END ARCHIVE MOVE DIFF (exit=0) ===

=== POST-ARCHIVE delta(in archive) vs main ===
=== END (exit=0) ===
```

## Observation IDs (Engram / filesystem)

| Artifact | Locator | ID / path |
|----------|---------|-----------|
| proposal | Engram + FS | #180; archived `proposal.md` |
| spec | Engram + FS | #179; archived `specs/seo-json-ld/spec.md` |
| design | FS (+ Engram #182 title known; full get blocked by auto-review mid-phase — FS design.md read) | archived `design.md`; Engram topic `sdd/stabilize-json-ld-entities/design` #182 |
| tasks | Engram + FS | #183; archived `tasks.md` |
| apply-progress | Engram + FS | #185; archived `apply-progress.md` (intermediate snapshot) |
| verify-report | Engram + FS | #186; archived `verify-report.md` |
| state | Engram + FS | #181; archived `state.yaml` |
| archive-report | Engram + FS | this file + `sdd/stabilize-json-ld-entities/archive-report` |

## Parent next steps (not executed by archive)

1. Commit archive outputs (`openspec/specs/seo-json-ld/`, `openspec/changes/archive/2026-09-05-stabilize-json-ld-entities/`, deletions of active change path)
2. Push branch `feat/improved-seo`
3. Comment on GitHub issue #8 and close #8 (parent owns)

## SDD Cycle Complete

Change planned, implemented (`cb873f3`), verified (PASS WITH WARNINGS), and archived. Ready for the next change (e.g. `crawlable-locale-switcher` remains active).
