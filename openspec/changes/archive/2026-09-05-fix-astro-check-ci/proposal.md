# Proposal: Fix Astro Check CI

## Intent

`astro check` fails (~8 TS errors in `AboutStats.astro`). No `check` script and no CI gate, so type/build regressions can merge unnoticed. Restore a clean check and fail PRs on check/build failures (GitHub #6).

## Scope

### In Scope
- Fix `AboutStats.astro` client-script typing (`dataset`, implicit `any`)
- Add npm `check` script (`astro check`)
- Add GitHub Actions: install → check → build on PRs to `main`/`develop`
- Optional post-build smoke for `sitemap` / `robots` artifacts

### Out of Scope
- Full E2E suite
- Perf/LCP/critical-path work
- Fixing existing `astro(4000)` / unused-var **hints** unless they fail exit code

## Approach

Type the processed `<script>` like other typed client code (`Massages.astro` / `HTMLElement` generics). Keep `build` as `astro build`; CI runs `check` then `build` as separate steps. Node 22 per `engines`.

## Capabilities

| Capability | Kind |
|------------|------|
| `astro-check-ci` | ADDED |

## Rollback

Revert `AboutStats.astro`, `package.json` scripts, and `.github/workflows/` CI file.

## Open Questions

- (none blocking) — optional artifact smoke and check-before-build left to design defaults
