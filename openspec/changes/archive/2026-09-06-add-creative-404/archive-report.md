# Archive Report: add-creative-404

**Change**: add-creative-404  
**Archived**: 2026-09-06  
**Archived to**: `openspec/changes/archive/2026-09-06-add-creative-404/`  
**Mode**: hybrid  
**Archive mode**: intentional-with-warnings  
**Verdict at close**: PASS WITH WARNINGS — proceed-with-warnings (user/orchestrator asked to continue until archive)  
**Branch tip**: `feat/add-creative-404` (stacked on `feat/relax-flow-extract` → `feat/improved-seo`)  
**PRs**: #22 (extract), #23 (creative 404) — **not merged by archive**; parent merges #22 then #23  

## Final State (authoritative)

| Fact | Value | Source rank |
|------|-------|-------------|
| Tasks | 13/13 `[x]` (0.1–4.3) | Persisted `tasks.md` (rank 1) |
| Apply | Stacked PRs #22 + #23 open/mergeable; extract + 404 shipped on tip | Launch prompt + `apply-progress.md` (rank 2/3) |
| Verify | `pass_with_warnings`; 10/10 requirements; 18/18 scenarios; 0 CRITICAL | `verify-report.md` + launch prompt |
| CRITICAL findings | None | `verify-report` |
| Specs synced | `creative-404` **Created**; `site-i18n` **Updated** | Archive step 2 |
| Active change folder | removed | Archive step 3 |
| Residual WARNING | Body-copy drift vs proposal; Netlify live HTTP/URL/FOUC residuals; empty CI rollup on #22/#23 at verify time | `verify-report` (attributed snapshot) + user proceed-with-warnings |

### Intentional-with-warnings reason

`sdd-verify` returned **PASS WITH WARNINGS** (`archive_recommendation: proceed-with-warnings`). Orchestrator launch prompt: user asked to continue until archive. No CRITICAL findings. Archive proceeds as **intentional-with-warnings** without inventing a clean PASS.

### Task Completion Gate

- All implementation tasks in archived `tasks.md` are `[x]` — no exceptional checkbox reconciliation required.
- Task 4.3 closed via static `dist/404.html` + source smoke; live Netlify residuals remain WARNING-only (not incomplete tasks).

### Snapshot attribution (not final state)

- Per `verify-report` (Engram #225 / FS) at verification time: body-copy punctuation drift; Netlify live residuals; PR CI statusCheckRollup empty — **still residual WARNING at close** (no later fix claimed in launch prompt).
- Per `apply-progress.md` Issues line “4.3 remains for manual…” — **stale relative to tasks.md**: tasks artifact (rank 1) and verify Completeness show 4.3 `[x]` with static evidence; Netlify live is WARNING residual only.
- Per pre-archive `state.yaml`: `archive: pending`, `next: sdd-archive` — **superseded at close** (`archive: done`, `next: none`, `archive_mode: intentional-with-warnings`).

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| `creative-404` | **Created** | Mechanical copy → `openspec/specs/creative-404/spec.md` (7 requirements: static artifact, thank-you twin, CTAs, no home/chips, shared relax-flow, robots noindex) |
| `site-i18n` | **Updated** | ADDED `404 locale resolution`, `Not-found UI copy dictionaries`; MODIFIED `Preferred-language detection` (+ `skipLocaleRedirect` / 404 skip scenario). Other site-i18n requirements preserved. |

## Archive Contents

- proposal.md ✅
- specs/creative-404/spec.md ✅
- specs/site-i18n/spec.md ✅
- design.md ✅
- tasks.md ✅ (13/13 complete)
- apply-progress.md ✅
- exploration.md ✅
- verify-report.md ✅ (`pass_with_warnings`)
- state.yaml ✅ (`status: archived`; `archive: done`; `next: none`; `archive_mode: intentional-with-warnings`)
- archive-report.md ✅ (this file; additive after move)

## Implementation Shipped (final)

| Capability / slice | Evidence |
|--------------------|----------|
| creative-404 (new) | `404.astro` → `dist/404.html`; `NotFoundPage`; dual locale panels; noindex |
| Shared relax-flow | `src/scripts/relax-flow.ts`; ThankYou retarget (PR #22) |
| site-i18n (modified) | `ui.notFound` ES/EN; Layout `skipLocaleRedirect` + robots prop |
| PRs | #22 MERGEABLE into `feat/improved-seo`; #23 MERGEABLE into extract tip — parent merges in order |

## Residual WARNING (preserved at close)

1. **Body copy** in `ui.notFound` drifts slightly from proposal locked lines (clicking / comma vs colon/em-dash). Soft `h1` + CTA labels match locked strings. Product may align strings later or amend proposal/spec.
2. **Environment-only**: live Netlify HTTP 404 + URL preserve; browser FOUC/localStorage locale; canvas/reduced-motion feel — not runnable in verify environment; static smoke covered implementable acceptance for 4.3.
3. **PR CI** statusCheckRollup empty on #22/#23 at verify time (mergeable CLEAN) — confirm required checks before merge if branch protection demands it.

## Engram observation IDs read (traceability)

| Artifact | Observation ID |
|----------|----------------|
| explore | #216 |
| proposal | #217 |
| spec | #218 |
| design | #219 |
| tasks | #220 |
| apply-progress | #223 |
| verify-report | #225 |
| related: locked decisions | #215 |
| related: planning complete | #221 |
| related: stacked PR chain | #222 |
| related: apply stacked PRs | #224 |

Filesystem artifacts under `openspec/changes/archive/2026-09-06-add-creative-404/` are authoritative for audit trail content; Engram IDs above were consulted for hybrid traceability.

## Mechanical Readback

- Spec create (`creative-404`): `diff -r` delta → temp before mv — **empty** (exit 0)
- Spec merge (`site-i18n`): MODIFIED Preferred-language detection replaced; ADDED 404 locale + notFound dictionaries appended; Previously: notes stripped from delta MODIFIED
- Archive move `diff -r` (pre-move snapshot → destination): **empty** (exit 0)
- Fallback source integrity `diff -r` (snapshot → source before fallback): **empty** (exit 0)
- Fallback interim `diff -r` (source → destination before rm): **empty** (exit 0)
- `git mv` failed (Permission denied); `mv` failed Permission denied; **cp -R → diff verify → rm -rf source** used (Windows); source absent; destination matches snapshot

Verbatim empty diffs from archive executor:

```
=== creative-404 copy diff (must be empty) ===
=== END creative-404 copy diff (exit=0) ===

=== FALLBACK SOURCE INTEGRITY DIFF (snapshot → source; must be empty) ===
=== END FALLBACK SOURCE INTEGRITY DIFF (exit=0) ===

=== FALLBACK DIFF (source → destination) ===
=== END FALLBACK DIFF (exit=0) ===

=== ARCHIVE MOVE DIFF (snapshot → destination) ===
=== END ARCHIVE MOVE DIFF (exit=0) ===
```

## SDD Cycle Complete

Planned, implemented (stacked #22/#23), verified (PASS WITH WARNINGS), and archived. Parent owns merge of #22 then #23 into `feat/improved-seo` and branch cleanup. Ready for the next change after merge.
