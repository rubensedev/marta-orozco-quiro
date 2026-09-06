# Tasks: Creative 404

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~520–700 authored (extract ≈320; 404/i18n/Layout ≈150–250; housekeeping ≈50–130) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | Prefer single PR if apply stays ≤400; else peel extract-first |
| Delivery strategy | ask-on-risk → resolved stacked |
| Chain strategy | feature-branch-chain (stacked on `feat/improved-seo`) |

Decision needed before apply: No (user locked 2 stacked PRs)
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 0 | Init housekeeping on branch | fold into PR1 | N/A (docs/config only) | N/A — no runtime | `openspec/config.yaml`, `.atl/skill-registry.md` |
| 1 | Shared `relax-flow` extract + ThankYou retarget | PR1 | `npx astro check` | Preview `/gracias` + `/en/thank-you` canvas | `src/scripts/relax-flow.ts` + ThankYou attr/script revert |
| 2 | 404 UI, `ui.notFound`, Layout robots | PR2 | `npx astro check` + `npm run build` | Preview unknown path; `/en…` miss; storage EN; robots/CTAs | `404.astro`, `NotFoundPage.astro`, `ui.notFound`, Layout `robots` |

Peel bases: PR1 `feat/relax-flow-extract` ← `feat/improved-seo`; PR2 `feat/add-creative-404` ← `feat/relax-flow-extract`.

## Phase 0: Housekeeping

- [x] 0.1 Keep `openspec/config.yaml` hybrid/init settings on branch (chore; already present).
- [x] 0.2 Keep `.atl/skill-registry.md` refresh on branch (chore; already present).

## Phase 1: Shared relax-flow

- [x] 1.1 Create `src/scripts/relax-flow.ts` exporting `initRelaxFlow(root, canvas)`; hooks `data-relax-flow-root` / `data-relax-flow-canvas`; multi-instance safe; keep reduced-motion + dark paint from ThankYou.
- [x] 1.2 Update `src/components/ThankYouPage.astro`: swap attrs to shared hooks; thin `<script>` imports `initRelaxFlow`; delete inline canvas body.

## Phase 2: Layout + i18n

- [x] 2.1 Add optional `robots?: string` on `src/layouts/Layout.astro` (default `index, follow`) wired to `<meta name="robots">`.
- [x] 2.2 Add `ui.notFound` to `src/data/site/es.ts` (statusMark, title, message, massagesLabel, whatsappLabel reuse, metaTitle, metaDescription) per locked ES copy.
- [x] 2.3 Add matching `ui.notFound` to `src/data/site/en.ts` per locked EN copy / EN-GB glossary.

## Phase 3: 404 page

- [x] 3.1 Create `src/components/NotFoundPage.astro`: glass twin — logo, decorative “404”, soft `h1`, body, primary massages + WA secondary; no home/chips; shared relax-flow hooks.
- [x] 3.2 Create `src/pages/404.astro`: dual `getSite("es"|"en")` panels + early `is:inline` locale reveal (`/en…` → EN; else preferred EN → EN; else ES); Layout `skipLocaleRedirect`, `includeJsonLd={false}`, `robots="noindex, nofollow"`; sync `document.title` / `html[lang]` when EN wins.
- [x] 3.3 Wire CTAs: ES `/#masajes`, EN `/en#massages`; WA via `meta.whatsappInquiry` + thank-you label fields.

## Phase 4: Verification

- [x] 4.1 Run `npx astro check` — clean.
- [x] 4.2 Run `npm run build` — confirm `dist/404.html` exists.
- [ ] 4.3 Manual: unknown path keeps URL; `/en…` miss → EN; non-`/en` + stored EN → EN; else ES; no locale redirect; no home/chips; thank-you canvas still works; robots include `noindex`; no JSON-LD.
