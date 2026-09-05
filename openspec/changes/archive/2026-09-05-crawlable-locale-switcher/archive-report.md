# Archive Report: crawlable-locale-switcher

**Change**: crawlable-locale-switcher  
**Archived**: 2026-09-05  
**Archived to**: `openspec/changes/archive/2026-09-05-crawlable-locale-switcher/`  
**Mode**: hybrid  
**Archive mode**: intentional-with-warnings  
**Verdict at close**: PASS WITH WARNINGS — SDD cycle archived; **sdd-verify skipped** (no `verify-report.md`); apply smoke + Task Completion Gate satisfied  
**GitHub**: issue #9 (parent owns close; archive does not close the issue)

## Final State (authoritative)

| Fact | Value | Source rank |
|------|-------|-------------|
| Tasks | 12/12 `[x]` | Persisted `tasks.md` (rank 1) |
| Apply | Header.astro only; `astro check` pass; build anchors pass | Launch prompt + `apply-progress.md` |
| Verify | **Skipped** — no `verify-report.md`; user explicitly invoked `/sdd-archive` while `verify: pending` | Launch prompt (rank 2); FS absence of verify-report |
| CRITICAL findings | None (no verify-report to contain CRITICAL; inventing PASS forbidden) | Launch prompt + skill Strict-vs-OpenSpec |
| Specs synced | `site-header` **Updated** (1 MODIFIED requirement: Language switcher control) | Archive step 2 |
| Active change folder | removed | Archive step 3 |
| Residual WARNING | Interactive human checks may remain: no-JS details→locale click; JS drawer Escape/outside/focus + hash remap | Launch prompt `residual_manual` + apply-progress |

### Intentional partial-archive reason

Native readiness would treat archive as blocked while `verify: pending` / `next: sdd-verify` and no `verify-report.md`. Orchestrator launch prompt states the user **explicitly requested `/sdd-archive`** and is skipping ahead past verify. Per Strict-vs-OpenSpec Archive Policy: non-critical partial archive with explicit approval proceeds as **intentional-with-warnings**. No fake PASS `verify-report` was written. CRITICAL override: N/A (no CRITICAL report exists). Task Completion Gate: **passed** (all implementation tasks `[x]`).

### Snapshot attribution (not final state)

- Per Engram `state` #190 / FS state at apply time: `verify: pending`, `next: sdd-verify` — **superseded at close** by archive (`verify: skipped`, `archive: done`, `next: none`).
- Per Engram `apply-progress` #194 (2026-09-05): at apply time ready for verify; residual interactive checks — residuals **still noted at close** as WARNING (not claimed completed by archive).
- Per Engram `tasks` #191: 12/12 `[x]` — **matches** archived `tasks.md` (Task Completion Gate).

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| `site-header` | **Updated** | MODIFIED `Language switcher control`: crawlable `<a href>` via `getRelativeLocaleUrl`; no-JS disclosure; `aria-current="page"`; hash remap when JS; 2 scenarios added (Crawlable locale anchors, No-JS locale switch); hash scenarios clarified as (JS). Other site-header requirements preserved. |

## Archive Contents

- proposal.md ✅
- specs/site-header/spec.md ✅
- design.md ✅
- tasks.md ✅ (12/12 complete)
- apply-progress.md ✅
- verify-report.md ❌ (intentionally absent — verify skipped)
- state.yaml ✅ (`status: archived`; `verify: skipped`; `archive: done`; `next: none`; `archive_mode: intentional-with-warnings`)
- archive-report.md ✅ (this file; additive after move)

## Implementation Shipped

| File | Change |
|------|--------|
| `src/components/Header.astro` | Locale widgets → `<details>`/`<summary>` + crawlable ES/EN `<a>`; PE script for hash/`localStorage`; `aria-current`; drop `data-lang-href` |

## Residual WARNING (preserved at close)

1. Interactive no-JS: open locale `<details>`, activate non-current locale in a browser with JS disabled (static dist anchors already verified at apply).
2. Interactive with JS: hash remap ES↔EN + preference; drawer lang Escape/outside-click/focus.

These do not reopen the SDD cycle unless a future change is filed. Issue #9 close remains a parent/human decision after any desired residual checks.

## Mechanical Readback

- Spec merge (MODIFIED into existing main): requirement body `Language switcher control` in `openspec/specs/site-header/spec.md` byte-matches delta requirement (CRLF-normalized compare) — **OK**
- Archive move `diff -r` (pre-move snapshot → destination): **empty** (exit 0)
- Fallback source integrity `diff -r` (snapshot → source before fallback): **empty** (exit 0)
- Fallback interim `diff -r` (source → destination before rm): **empty**
- `git mv` failed (empty/untracked source); `mv` failed Permission denied; **cp -R → diff verify → rm -rf source** used (Windows); source absent; destination matches snapshot

Verbatim empty diffs from archive executor:

```
=== FALLBACK SOURCE INTEGRITY DIFF (snapshot → source; must be empty) ===
=== END FALLBACK SOURCE INTEGRITY DIFF (exit=0) ===

=== FALLBACK DIFF (source → destination) ===
=== END FALLBACK DIFF ===

=== ARCHIVE MOVE DIFF (snapshot → destination) ===
=== END ARCHIVE MOVE DIFF (exit=0) ===
```

## Observation IDs (Engram / filesystem)

| Artifact | Locator | ID / path |
|----------|---------|-----------|
| proposal | Engram + FS | #187; archived `proposal.md` |
| spec | Engram + FS | #188; archived `specs/site-header/spec.md` |
| design | Engram + FS | #189; archived `design.md` |
| tasks | Engram + FS | #191; archived `tasks.md` |
| apply-progress | Engram + FS | #194; archived `apply-progress.md` (intermediate snapshot) |
| state (pre-archive) | Engram + FS | #190; superseded by archived `state.yaml` |
| verify-report | — | **unresolved / absent** (verify skipped) |
| archive-report | Engram + FS | this file + `sdd/crawlable-locale-switcher/archive-report` |

## Parent next steps (not executed by archive)

1. Commit archive outputs (`openspec/specs/site-header/spec.md`, `openspec/changes/archive/2026-09-05-crawlable-locale-switcher/`, removal of active change path) when ready
2. Optionally run residual interactive browser checks
3. Comment on / close GitHub issue #9 (parent owns)

## SDD Cycle Complete (with warnings)

Change planned, implemented (Header.astro), apply smoke verified, **formal sdd-verify skipped by explicit user request**, and archived. Ready for the next change.
