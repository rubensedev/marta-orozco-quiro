# Design: Add ES/EN i18n

## Technical Approach

Astro built-in i18n (`defaultLocale: es`, `prefixDefaultLocale: false`) → `/` + `/en/`. Thin locale pages compose a shared shell fed by `getSite(locale)`. Layout owns `lang` / meta / hreflang. Header language menu mirrors the theme widget and navigates via `getRelativeLocaleUrl` + ES↔EN hash map. Early inline boot script (theme-boot pattern) persists preferred locale and redirects once. Client maps key by treatment/ritual `id`; UI/WhatsApp strings come from a `define:vars` bag. No extra i18n libraries.

## Architecture Decisions

| Decision | Options | Tradeoff | Choice |
|----------|---------|----------|--------|
| Routing | Astro i18n vs client swap vs library | SEO/`lang` correct only with URL locales | Astro i18n; `locales: [es,en]`; prefix default off |
| Content API | Monolith `site.ts` vs split modules + `getSite` | Split avoids drift with shared types | `src/data/site/{shared,es,en,index}.ts`; `getSite(locale)` returns full typed site |
| Page shell | Duplicate pages vs `HomePage.astro` | Dup risks drift | Shared `src/components/HomePage.astro`; `index` + `en/index` only pass locale |
| Site URL | Absolute hreflang vs relative | Prod domain unknown in repo | `site: "https://SITE_URL_PLACEHOLDER"` in config; Layout uses `Astro.site` for absolute alternates; replace placeholder before deploy |
| Client maps | `bookingValue` vs `id` | EN labels break value keys | Key maps by stable `id`; `data-treatment` / open-modal use id |
| Switcher UI | Text toggle vs theme-like dropdown | Locked UX | Translate icon + current `ES`/`EN` + chevron; dual desktop+drawer; write `localStorage` then navigate |
| Detect | Always redirect vs skip when match | Loops / crawler risk | Prefer storage → else Spain langs → else EN; skip bots + already-correct path; `location.replace` |

## Data Flow

```
astro.config (i18n + site)
        │
pages/{index|en/index} → HomePage → components(getSite)
        │
Layout: lang, title, description, link[hreflang]
        │
Header: getRelativeLocaleUrl + HASH_MAP + localStorage
        │
PageScripts/Massages: define:vars { ui, treatments, rituals } keyed by id
```

**Boot (inline, `<head>`):** read `marta-orozco-locale` → if unset, map `navigator.languages` (`es`/`es-*`/`ca`/`gl`/`eu` → `es`, else `en`) → if preferred ≠ current path locale, `replace` once.

**Switcher:** option click → `localStorage.setItem(LOCALE_KEY, locale)` → `href = getRelativeLocaleUrl(locale) + mappedHash`.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `astro.config.mjs` | Modify | `i18n` + `site` placeholder |
| `src/data/site/shared.ts` | Create | Non-translated: ids, prices, images, WA number, maps/IG URLs |
| `src/data/site/es.ts` | Create | Current Spanish copy (unchanged wording) |
| `src/data/site/en.ts` | Create | EN-GB strings + glossary |
| `src/data/site/hashes.ts` | Create | Bidirectional section hash map |
| `src/data/site/index.ts` | Create | Types, `Locale`, `getSite(locale)`, `ui` bag |
| `src/data/site.ts` | Delete/re-export | Avoid dual entry; re-export from `site/index` or remove after migration |
| `src/components/HomePage.astro` | Create | Shared composition |
| `src/pages/index.astro` | Modify | `getSite('es')` / `Astro.currentLocale` → HomePage |
| `src/pages/en/index.astro` | Create | EN entry |
| `src/layouts/Layout.astro` | Modify | Locale props; hreflang; locale boot beside theme boot |
| `src/components/Header.astro` | Modify | Lang menu; localized nav/theme/CTA labels |
| `BookingModal`, `PageScripts`, `Massages`, `PricingCard`, `Rituals`, `MobileBar`, `Footer`, `Contact`, `Hero`, `About` | Modify | Consume `getSite` / props; id-based maps; UI bag |

## Interfaces / Contracts

```ts
type Locale = "es" | "en";
const LOCALE_KEY = "marta-orozco-locale";
// HASH_MAP: { "sobre-mi":"about", "masajes":"massages", "bonos":"packages", "contacto":"contact", "inicio":"home" } (+ reverse)
function getSite(locale: Locale): SiteBundle; // meta, nav, sections, treatments, rituals, bonos, ui, whatsappTemplates
```

`ui` bag (non-exhaustive): theme labels, reserve CTAs, modal chrome, pricing pill labels, `minutesSuffix`, booking WhatsApp template fields, Massages CTA prefix, aria-labels.

Section IDs on EN pages: `#about`, `#massages`, `#packages`, `#contact`, `#home` (main). Nav `href`s match.

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | N/A | No runner |
| Integration | Build output paths | `astro build`; assert `/` + `/en/` emit |
| Manual E2E | Switcher+hash, detect, WA, maps | Smoke `/` and `/en/`: theme, modal, id booking, hreflang, storage preference, no redirect loop |

## Threat Matrix

N/A — Astro locale URL routing only; no shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. Matrix rows (doc-like paths, git selection, commit/push/PR) do not apply.

## Migration / Rollout

Single PR on `feat/i18n-es-en` with `delivery_strategy: exception-ok`. Replace `SITE_URL_PLACEHOLDER` with real canonical origin before production. Rollback: revert branch / drop `/en/` + restore Spanish-only data.

## Open Questions

- [ ] Real production origin for `astro.config` `site` (placeholder until known)
- [ ] Exact EN main id: `#home` vs keep `#inicio` on both (locked translate → use `#home`)
