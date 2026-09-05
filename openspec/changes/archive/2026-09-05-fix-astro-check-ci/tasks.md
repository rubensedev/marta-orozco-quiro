# Tasks: Fix Astro Check CI

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~80–150 (AboutStats script types + package.json + 1 workflow; optional artifact asserts) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Type-fix AboutStats + `check` script + CI check/build | PR 1 | `npm run check` then `npm run build` | Open PR; confirm workflow runs check then build | Revert `AboutStats.astro`, `package.json`, `.github/workflows/` |

## Phase 1: Reproduce Baseline

- [x] 1.1 Run `npx astro check` (or `npm run check` if present); capture failing diagnostics (expect ~8: implicit `any`, invalid `dataset` in `src/components/AboutStats.astro`)
- [x] 1.2 Confirm no `.github/workflows/` CI gate exists yet (read-only)

## Phase 2: Fix AboutStats Typing

- [x] 2.1 In `src/components/AboutStats.astro` `<script>`: type helpers (`easeOutCubic`, `setStatNumber`, `animateCount`, `startStatCount`, rAF `tick`) — no implicit `any`
- [x] 2.2 Narrow DOM/`dataset` access (`countTo`, `countDelay`, `countStarted`) via typed element/`HTMLElement` + safe reads (`dataset` or `getAttribute`); keep count/reveal behavior
- [x] 2.3 Re-run `npx astro check`; AboutStats diagnostics cleared (no new TS errors from this fix)

## Phase 3: Package Scripts

- [x] 3.1 Add `"check": "astro check"` to `package.json` scripts
- [x] 3.2 Leave `"build": "astro build"` unchanged (do **not** chain check into build; CI sequences both) — locked in design

## Phase 4: CI Workflow

- [x] 4.1 Add `.github/workflows/ci.yml`: on `pull_request` and `push` to `main` and `develop`
- [x] 4.2 Job steps: checkout → Node 22 + npm cache → `npm ci` → `npm run check` → `npm run build` (fail job on either)

## Phase 5: Post-Build Artifact Asserts

- [x] 5.1 After CI build, assert `dist/robots.txt` and a sitemap file under `dist/` (`sitemap-index.xml` or `sitemap-*.xml`) — locked in design
- [x] 5.2 Smoke step fails the job if artifacts missing

## Phase 6: Verification

- [x] 6.1 Local: `npm run check` exits 0
- [x] 6.2 Local: `npm run build` succeeds
- [x] 6.3 Confirm no new TS diagnostics from the AboutStats fix; CI config present for PR check+build
