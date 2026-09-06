# Apply Progress: add-creative-404

**Mode**: Standard (`strict_tdd: false`)
**Updated**: 2026-09-06
**Status**: apply complete — ready for `sdd-verify`

## Chain strategy (locked)

`feature-branch-chain` stacked on `feat/improved-seo`:

| PR | Branch | Base | Scope |
|----|--------|------|-------|
| PR1 #22 | `feat/relax-flow-extract` | `feat/improved-seo` | Phase 0 + Phase 1 extract |
| PR2 | `feat/add-creative-404` | `feat/relax-flow-extract` | Phase 2–4 + full openspec change folder |

```
feat/improved-seo
  └─ feat/relax-flow-extract  (PR1)
       └─ feat/add-creative-404  📍 (PR2)
```

## Work unit 1 (PR1) — extract

- Branch: `feat/relax-flow-extract`
- Base: `feat/improved-seo`
- Tasks: 0.1, 0.2, 1.1, 1.2
- Commits:
  - `chore(sdd): refresh OpenSpec config and skill registry`
  - `refactor(ui): extract shared relax-flow canvas module`
- PR: https://github.com/rubensedev/marta-orozco-quiro/pull/22

### Work Unit Evidence (WU1)

| Evidence | Result |
|----------|--------|
| Focused test | `npx astro check` → 0 errors |
| Runtime harness | N/A in CI — manual preview `/gracias` + `/en/thank-you` canvas (task 4.3) |
| Rollback boundary | Revert `src/scripts/relax-flow.ts` + ThankYou attrs/script; restore prior inline canvas |

## Work unit 2 (PR2) — 404 UI

- Branch: `feat/add-creative-404`
- Base: `feat/relax-flow-extract`
- Tasks: 2.1–2.3, 3.1–3.3, 4.1–4.2 (4.3 manual remains)
- Files: Layout robots, `ui.notFound` ES/EN, `NotFoundPage.astro`, `404.astro`, openspec change docs

### Work Unit Evidence (WU2)

| Evidence | Result |
|----------|--------|
| Focused test | `npx astro check` → 0 errors |
| Runtime harness | `npm run build` → `dist/404.html` present; contains `noindex, nofollow`, dual locale panels, CTAs `/#masajes` + `/en#massages` |
| Rollback boundary | Delete `404.astro` / `NotFoundPage.astro` / `ui.notFound`; revert Layout `robots` prop |

## Completed tasks

- [x] 0.1–0.2 Housekeeping
- [x] 1.1–1.2 Shared relax-flow
- [x] 2.1–2.3 Layout + i18n
- [x] 3.1–3.3 NotFoundPage + 404.astro + CTAs
- [x] 4.1–4.2 check + build
- [ ] 4.3 Manual browser verification (deferred to human / verify phase)

## Deviations from design

None — implementation matches design (shared module, dual panels + early locale, robots override, locked CTAs/copy).

## Issues

None blocking. Task 4.3 remains for manual Netlify/preview URL-preserve checks.
