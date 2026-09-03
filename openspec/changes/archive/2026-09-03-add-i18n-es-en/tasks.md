# Tasks: Add ES/EN i18n

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 600–900 |
| 400-line budget risk | High |
| Chained PRs recommended | No |
| Suggested split | single PR (`size:exception`) |
| Delivery strategy | exception-ok |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Full ES/EN i18n | single PR `feat/i18n-es-en` | `npm run build` | Manual `/` + `/en/` smoke | Revert branch / drop `/en/` + restore Spanish-only `site` |

## Phase 1: Foundation (config + content)

- [x] 1.1 In `astro.config.mjs`, add `i18n: { defaultLocale: "es", locales: ["es","en"], routing: { prefixDefaultLocale: false } }` and `site: "https://SITE_URL_PLACEHOLDER"` (document: replace before prod).
- [x] 1.2 Create `src/data/site/shared.ts` with non-translated fields (ids, prices, images, WA number, maps/IG URLs).
- [x] 1.3 Create `src/data/site/es.ts` by moving current Spanish copy from `src/data/site.ts` verbatim (do not alter wording).
- [x] 1.4 Create `src/data/site/en.ts` with EN-GB strings using locked glossary (Quiromasajista, Bonos→session packs/`#packages`, Descontracturante, Cráneo Facial, brand unchanged).
- [x] 1.5 Create `src/data/site/hashes.ts` bidirectional map: `sobre-mi`↔`about`, `masajes`↔`massages`, `bonos`↔`packages`, `contacto`↔`contact`, `inicio`↔`home`.
- [x] 1.6 Create `src/data/site/index.ts` with `Locale`, `LOCALE_KEY`, types, `getSite(locale)`, and `ui` bag (theme, CTAs, modal, pills, WA templates, aria).
- [x] 1.7 Replace `src/data/site.ts` with re-export from `./site/index` (or delete after import migration).

## Phase 2: Pages + Layout

- [x] 2.1 Create `src/components/HomePage.astro` composing Header→sections→Footer→MobileBar→BookingModal→PageScripts from `getSite` props.
- [x] 2.2 Slim `src/pages/index.astro` to resolve locale (`es` / `Astro.currentLocale`) → `getSite` → `<HomePage />` + Layout meta.
- [x] 2.3 Create `src/pages/en/index.astro` same pattern for `en` (EN section ids: `#home`, `#about`, `#massages`, `#packages`, `#contact`).
- [x] 2.4 Update `src/layouts/Layout.astro`: props for `lang`/title/description; absolute `hreflang`/`rel=alternate` for `es`, `en`, `x-default`→es via `Astro.site`.
- [x] 2.5 In `Layout.astro`, add preferred-locale boot beside theme boot: read `marta-orozco-locale`; else Spain langs (`es`,`es-*`,`ca`,`gl`,`eu`)→es else→en; `replace` only if path mismatches; skip bots/loops.

## Phase 3: Header language switcher

- [x] 3.1 In `src/components/Header.astro`, add theme-like lang control (translate icon + `ES`/`EN` + chevron) on desktop beside theme.
- [x] 3.2 Duplicate lang control in mobile drawer next to theme.
- [x] 3.3 Wire options: `localStorage.setItem(LOCALE_KEY, locale)` then navigate `getRelativeLocaleUrl(locale) + mappedHash` via `hashes.ts` (no client-only string swap).
- [x] 3.4 Localize Header nav/theme/CTA labels from `getSite` / `ui`.

## Phase 4: Component + script locale wiring

- [x] 4.1 Refactor `Hero`, `About`, `Massages`, `Rituals`, `PricingCard`, `Contact`, `Footer`, `MobileBar`, `BookingModal` to consume site/props; EN section `id`s + nav hrefs match; no hardcoded Spanish.
- [x] 4.2 In `Massages.astro` / booking triggers: `data-treatment` / open-modal keyed by stable `id` (not `bookingValue`).
- [x] 4.3 Update `PageScripts.astro`: `define:vars` `{ ui, treatments, rituals, … }`; maps keyed by `id`; WA bodies/chrome from locale `ui`/templates.
- [x] 4.4 Ensure BookingModal labels/options/placeholders come from locale `ui` + locale treatment/bono labels.

## Phase 5: Verify (smoke)

- [x] 5.1 Run `npm run build`; confirm `/` and `/en/` emit.
- [x] 5.2 Manual `/`: Spanish copy unchanged; `html lang=es`; WA Spanish; theme still works.
- [x] 5.3 Manual `/en/`: EN-GB glossary; `lang=en`; EN anchors/nav; WA fully English; booking/maps via ids.
- [x] 5.4 Manual: switcher ES↔EN with hashes; preference in `localStorage`; boot detect + no loop; hreflang es/en/x-default present.
