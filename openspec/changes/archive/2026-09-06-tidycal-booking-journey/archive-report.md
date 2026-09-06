# Archive Report: tidycal-booking-journey

**Change**: tidycal-booking-journey  
**Archived**: 2026-09-06  
**Archived to**: `openspec/changes/archive/2026-09-06-tidycal-booking-journey/`  
**Mode**: hybrid  
**Archive mode**: intentional-with-warnings  
**Verdict at close**: PASS WITH WARNINGS — SDD cycle archived; **sdd-verify skipped** (no `verify-report.md`); Task Completion Gate satisfied after archive-time reconciliation of 5.2  
**Branch committed**: `feat/tidycal-modal-copy-ux` (stack tip with Phase 7)  
**Next delivery**: merge-to-improved-seo (orchestrator; do not merge/delete branches in archive)

## Final State (authoritative)

| Fact | Value | Source rank |
|------|-------|-------------|
| Tasks | all implementation tasks `[x]` incl. 5.2 waived at archive | Persisted `tasks.md` (rank 1) after exceptional reconciliation |
| Apply | Phases 1–7 / PRs #15–#21 MERGED (stack pieces) | Launch prompt final-state facts (rank 2) + `apply-progress.md` |
| Verify | **Skipped** — no `verify-report.md`; user explicitly invoked `/sdd-archive` while native status may still say `archive: blocked` / `nextRecommended: apply\|verify` | Launch prompt (rank 2); FS absence of verify-report |
| CRITICAL findings | None (no verify-report to contain CRITICAL; inventing PASS forbidden) | Launch prompt + skill Strict-vs-OpenSpec |
| Specs synced | `booking-journey` **Created**; `site-i18n` **Updated** | Archive step 2 |
| Active change folder | removed | Archive step 3 |
| Residual WARNING | 5.2 manual smoke waived; FAQ/meta may still mention TidyCal (deferred scrub); residual interactive smoke may remain | Launch prompt |

### Intentional partial-archive reason

Native readiness would treat archive as blocked while verify is pending / nextRecommended is apply|verify and no `verify-report.md`. Orchestrator launch prompt states the user **explicitly requested `/sdd-archive`** and is skipping ahead past verify (same pattern as `crawlable-locale-switcher`). Per Strict-vs-OpenSpec Archive Policy: non-critical partial archive with explicit approval proceeds as **intentional-with-warnings**. No fake PASS `verify-report` was written. CRITICAL override: N/A (no CRITICAL report exists).

### Task Completion Gate — exceptional reconciliation

- At archive start, task **5.2** was unchecked (`- [ ]`).
- Orchestrator instructed: mark `[x]` with understanding smoke was waived by maintainer at archive; note residual interactive smoke may remain.
- Reconciled in persisted `tasks.md` before move: `5.2 ... — waived at /sdd-archive (maintainer intentional; residual interactive smoke may remain)`.
- Archive-report note: **5.2 manual smoke waived by explicit /sdd-archive; residual interactive smoke may remain.**

### Snapshot attribution (not final state)

- Per FS `state.yaml` pre-archive: `apply: pending`, `verify: pending`, `next: verify` — **superseded at close** by archive (`apply: done`, `verify: skipped`, `archive: done`, `next: none`, `archive_mode: intentional-with-warnings`).
- Per Engram `apply-progress` #206 (at Phase 7 apply): PR #21 opened; tasks 7.1–7.3 `[x]`; `astro check` 0 errors — **final**: stack PRs #15–#21 merged per launch prompt; whether `feat/improved-seo` already contains #20/#21 is for next merge step.
- Per Engram `tasks` #204: Phase 7 amend tasks — **final** tasks.md all `[x]` after 5.2 reconciliation.
- No Engram/FS `verify-report` — intentional absence.

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| `booking-journey` | **Created** | Mechanical copy of delta → `openspec/specs/booking-journey/spec.md` (new capability: slim modal, URL map, confirm+handoff, bonos WA, pricing-card package→WA, fail-closed, thank-you + polish, channel split, select chevron) |
| `site-i18n` | **Updated** | ADDED `Booking channel copy`, `Modal UI copy without vendor name`; MODIFIED `Locale WhatsApp messages`, `Spanish copy preservation`. Other site-i18n requirements preserved. |

## Archive Contents

- proposal.md ✅
- specs/booking-journey/spec.md ✅
- specs/site-i18n/spec.md ✅
- design.md ✅
- tasks.md ✅ (all complete; 5.2 waived-reconciled)
- apply-progress.md ✅
- exploration.md ✅
- verify-report.md ❌ (intentionally absent — verify skipped)
- state.yaml ✅ (`status: archived`; `verify: skipped`; `archive: done`; `next: none`; `archive_mode: intentional-with-warnings`)
- archive-report.md ✅ (this file; additive after move)

## Implementation Shipped (final)

| Capability / slice | Evidence |
|--------------------|----------|
| booking-journey (new) | Data URLs, slim modal, resolve+open, thank-you routes, fail-closed |
| site-i18n (modified) | Channel copy; WA questions/packages only; vendor-free modal intro/submit |
| Thank-you polish | Logo, dark BG, relax-flow (PR #20) |
| Modal copy UX | Vendor-free copy + select chevron air (PR #21) |
| Pricing-card package→WA | Phase 4.5 / PR #18 |
| PRs | #15–#21 MERGED (stack pieces; #20/#21 into intermediate stack branches) |

## Residual WARNING (preserved at close)

1. **5.2 manual smoke waived by explicit /sdd-archive; residual interactive smoke may remain** (ES/EN url_map + rituals, fail-closed, handoff, pricing-card package→WA / single→modal, Phase 7 modal copy/chevron).
2. FAQ/meta may still mention TidyCal (deferred scrub per locked decision `faq_meta_tidycal_scrub: deferred_optional`).
3. Stack tip may still need merge into `feat/improved-seo` (orchestrator owns next step).

## Engram observation IDs read (traceability)

| Artifact | Observation ID |
|----------|----------------|
| proposal | #200 |
| spec | #202 |
| design | #203 |
| tasks | #204 |
| apply-progress | #206 |
| verify-report | \<unresolved\> / absent (intentional) |
| related: planning complete | #205 |
| related: stack PRs | #207 |
| related: thank-you polish | #208 |
| related: pricing-card WA | #209 |

Filesystem artifacts under `openspec/changes/archive/2026-09-06-tidycal-booking-journey/` are authoritative for audit trail content; Engram IDs above were consulted for hybrid traceability.

## Mechanical Readback

- Spec create (`booking-journey`): `diff -r` delta → temp before mv — **empty** (exit 0)
- Spec merge (`site-i18n`): MODIFIED/ADDED requirement bodies matched into main (Previously: notes stripped from delta MODIFIED)
- Archive move `diff -r` (pre-move snapshot → destination): **empty** (exit 0)
- Fallback source integrity `diff -r` (snapshot → source before fallback): **empty** (exit 0)
- Fallback interim `diff -r` (source → destination before rm): **empty** (exit 0)
- `git mv` failed (Permission denied); `mv` failed Permission denied; **cp -R → diff verify → rm -rf source** used (Windows); source absent; destination matches snapshot

Verbatim empty diffs from archive executor:

```
=== BOOKING-JOURNEY SPEC COPY DIFF ===
=== END BOOKING-JOURNEY SPEC COPY DIFF (exit=0) ===

=== FALLBACK SOURCE INTEGRITY DIFF (snapshot → source; must be empty) ===
=== END FALLBACK SOURCE INTEGRITY DIFF (exit=0) ===

=== FALLBACK DIFF (source → destination) ===
=== END FALLBACK DIFF (exit=0) ===

=== ARCHIVE MOVE DIFF (snapshot → destination) ===
=== END ARCHIVE MOVE DIFF (exit=0) ===
```

## SDD Cycle Complete (with warnings)

The change has been planned, implemented (stacked PRs), intentionally archived without verify, and specs synced to source of truth. Ready for orchestrator merge-to-improved-seo.
