# Design: Optimize AI / Local Discovery

## Technical Approach

Data-first, additive change. Three independent tracks land in one PR:

1. **Entity alignment** — collapse the drifting per-locale business name/locality in `src/data/site/shared.ts` into single canonical strings that match the Google Business Profile (GBP) entity, and make the Maps short link + Place ID single-sourced. `SeoJsonLd.astro` consumes the new shape; no new schema types, no `Review`/`AggregateRating`.
2. **Unique local content** — expand `about.paragraphs` (+2) and `faq.items` (+2) in `es.ts` / `en.ts`. No new section component, no new `sectionIds` / nav / hash entries. Only `About.astro` needs two extra reveal-delay CSS rules.
3. **Crawl hygiene** — `robots="noindex, follow"` prop on the two thank-you routes (Layout already supports it) and an `@astrojs/sitemap` `filter()` in `astro.config.mjs`.

Origin stays `https://martaorozcoquiro.netlify.app`. No `llms.txt`, no AI-only chunking, no per-treatment landing pages.

## Architecture Decisions

| Decision | Options | Tradeoff | Choice |
|----------|---------|----------|--------|
| Canonical public name | Keep site `Quiromasajista` / rename GBP / align site→GBP | GBP rename resets local-pack history and is owner-only | **Align site → GBP**: `Marta Orozco Quiromasaje` |
| Name shape in data | Keep `{ es, en }` with equal values vs single string | Per-locale map is exactly what caused the drift | **Collapse to `businessInfo.name: string`** (one consumer: `SeoJsonLd.astro:28`) |
| EN name policy | Translate to `Massage Therapist` vs keep proper noun | A translated entity name splits the entity for Google/AI | **Never translate the entity name.** English descriptors survive only in descriptive slots (meta title tail, hero subtitle, About subtitle, `Person.jobTitle`) |
| `addressLocality` | Per-locale `Sevilla`/`Seville` vs one value | `Seville` in EN JSON-LD is a NAP mismatch against GBP/Maps | **Collapse to `"Sevilla"`** (postal truth). Prose may still say "Seville" |
| Visible EN address line | `41002 Seville` vs `41002 Sevilla` | Visible NAP should match the citation string | **`41002 Sevilla`** in `en.ts contact.addressLines[1]` |
| Canonical Maps link | `nS9Yng5LUJSzkG467` vs `HdZVpzvzBEGV6GAZ8` | Both resolve to the same place (same feature id/coords); switching churns 5 call sites for zero gain | **`HdZVpzvzBEGV6GAZ8`** (already in use → zero diff at call sites) |
| Maps single-sourcing | Two literals vs one constant | `mapsUrl` and `googleReviewsUrl` can silently diverge | **`const MAPS_PLACE_URL`** in `shared.ts`, reused by both fields |
| Place ID location | Local const in `SeoJsonLd.astro` vs `shared.ts` | Maps identity split across two files | **Move `googlePlaceId` to `shared.ts`**; `hasMap` still derives the `?q=place_id:` URL |
| `sameAs` contents | Add place-ID URL vs keep as-is | Listing the same place twice adds noise, not signal | **Unchanged**: `[instagramUrl, googleReviewsUrl]`; `hasMap` carries the stable ID |
| `WebSite.name` | Align to full entity vs keep `Marta Orozco` | Google's site-name feature prefers a short name; slot ≠ business entity | **Keep `Marta Orozco`** (also `og:site_name`) |
| Unique-content placement | New home section vs About/FAQ expansion | A new section forces `sectionIds` + `navItems` + `HASH_*` maps + footer links + a component — large blast radius for one copy block | **Expand About + FAQ only** |
| About expansion shape | New typed subfield vs extra `paragraphs` entries | New field means type + component changes | **Two extra `paragraphs` entries** + `.about-reveal--8/--9` CSS delays |
| FAQ answer format | Multi-paragraph / list vs single paragraph | `FAQ.astro` renders `item.answer` inside one `<p>`; lists need a component change | **Single-paragraph answers**, `FaqAnswerPart[]` only |
| H1 | Rewrite to `Masaje en Sevilla` vs keep | Keyword-shaped H1 hurts brand voice and is close to stuffing | **Keep H1**; tighten ES hero *subtitle* to carry entity + city |
| Thank-you noindex | Layout change vs existing `robots` prop | Prop already exists (`Layout.astro:26,38`) | **Pass `robots="noindex, follow"`** from both page files |
| Sitemap exclusion | `filter()` vs `serialize()` returning `undefined` | `serialize` is for mutating entries | **`filter()`**, path-normalised (trailing slash) |
| Thank-you hreflang | Strip alternates vs keep | Google ignores hreflang on `noindex` pages; stripping adds churn | **Keep** (non-blocking) |
| Review quotes | Replace with real Google excerpts vs defer | Needs owner-approved verbatim quotes + attribution policy | **Out of scope (P2)** — see Residual Risks |

## Data Flow

```
shared.ts
  ├─ MAPS_PLACE_URL ──┬─> sharedMeta.mapsUrl ──────> Contact / Footer / FAQ (visible CTA)
  │                   └─> sharedMeta.googleReviewsUrl > Reviews CTA + JSON-LD sameAs
  ├─ googlePlaceId ─────> SeoJsonLd hasMap (?q=place_id:…)
  └─ businessInfo.name ─> SeoJsonLd HealthAndBeautyBusiness.name   (locale-independent)
     businessInfo.addressLocality ─> PostalAddress.addressLocality (locale-independent)

es.ts / en.ts  →  getSite(locale)  →  Layout  →  HomePage → About (+2 paragraphs)
                                                          → FAQ   (+2 items) → FAQPage JSON-LD

gracias.astro / en/thank-you.astro → Layout robots="noindex, follow"
astro.config.mjs sitemap.filter()  → sitemap-0.xml (2 locs only)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/data/site/shared.ts` | Modify | `MAPS_PLACE_URL` + `googlePlaceId` constants; `businessInfo.name` → `"Marta Orozco Quiromasaje"` (string); `addressLocality` → `"Sevilla"` (string) |
| `src/components/SeoJsonLd.astro` | Modify | Drop `[locale]` indexing on name/locality; import `googlePlaceId` from shared instead of local const |
| `src/data/site/es.ts` | Modify | `meta.title`; hero subtitle; About `+2` paragraphs; FAQ `+2` items; `footer.copyright`; `ui.thankYou.metaTitle`; `ui.notFound.metaTitle`; update the "do not alter wording" docblock |
| `src/data/site/en.ts` | Modify | EN parity of the above; `contact.addressLines[1]` → `41002 Sevilla`; `footer.copyright` uses the untranslated entity name |
| `src/components/About.astro` | Modify | Add `.about-reveal--8` / `--9` transition-delay rules (CSS only) |
| `src/pages/gracias.astro` | Modify | `robots="noindex, follow"` |
| `src/pages/en/thank-you.astro` | Modify | `robots="noindex, follow"` |
| `astro.config.mjs` | Modify | `sitemap({ filter })` excluding `/gracias` and `/en/thank-you` |
| `src/layouts/Layout.astro` | None | `robots` prop already exists and defaults to `index, follow` |
| `public/` | None | No `llms.txt` or equivalent (acceptance criterion) |
| `src/components/Reviews.astro` | None | P2 |

Estimated authored diff: ~50 lines of code + ~8 copy strings per locale. Single PR.

## Interfaces / Contracts

`src/data/site/shared.ts`:

```ts
/** Canonical Google place identity — single source for every Maps surface. */
const MAPS_PLACE_URL = "https://maps.app.goo.gl/HdZVpzvzBEGV6GAZ8";
export const googlePlaceId = "ChIJE7KlJmBtEg0Rn-RGXchxER0";

export const sharedMeta = {
  // …
  googleReviewsUrl: MAPS_PLACE_URL,
  mapsUrl: MAPS_PLACE_URL,
};

export const businessInfo = {
  /** Must equal the Google Business Profile display name, in every locale. */
  name: "Marta Orozco Quiromasaje",
  streetAddress: "C. Esperanza Elena Caro, 2, 1°A4",
  postalCode: "41002",
  addressLocality: "Sevilla",
  // …unchanged
} as const;
```

`src/components/SeoJsonLd.astro`:

```ts
import { businessInfo, googlePlaceId, sharedMeta } from "../data/site/shared";

const googlePlaceMapUrl = `https://www.google.com/maps/place/?q=place_id:${googlePlaceId}`;
const businessName = businessInfo.name;          // was businessInfo.name[locale]
const addressLocality = businessInfo.addressLocality; // was …[locale]
```

`Person.jobTitle` keeps its locale switch (`Quiromasajista` / `Massage Therapist`) — that is a role descriptor, not the entity name.

`astro.config.mjs`:

```js
const SITEMAP_EXCLUDED_PATHS = new Set(["/gracias", "/en/thank-you"]);

sitemap({
  filter: (page) => !SITEMAP_EXCLUDED_PATHS.has(new URL(page).pathname.replace(/\/$/, "")),
  i18n: { /* unchanged */ },
});
```

Thank-you pages:

```astro
<Layout site={site} pagePath="/gracias" robots="noindex, follow" /* …unchanged props */>
```

`src/components/About.astro` style block:

```css
.about-reveal--8  { transition-delay: 0.74s; }
.about-reveal--9  { transition-delay: 0.84s; }
```

## Content Contract (unique local copy)

ES is authored first; EN is a faithful translation of the same facts. Every string below must be **verifiable** — no invented landmarks, transport, parking, certifications, or client numbers.

| Slot | Requirement | Draft direction |
|------|-------------|-----------------|
| `about.paragraphs[3]` | First-hand session flow, not commodity tips | How a session actually runs with Marta: short intake about where the tension is, pressure adjusted during the session, one-to-one space, always by prior appointment |
| `about.paragraphs[4]` | Sevilla-specific grounding | The space in 41002 Casco Antiguo, Thursday-only availability, what "arriving" looks like (building, 1°A4) |
| `faq.items[+1]` | `¿Cómo es una sesión contigo, paso a paso?` | ~3 sentences, single paragraph, first-person, covers intake → session → aftercare advice |
| `faq.items[+2]` | `¿Cómo llego al espacio y qué hago al llegar?` | Arrival guidance keyed to the existing `maps` action link; reuses the `{ label, action: "maps" }` part |
| `es.meta.title` | Entity + city | `Marta Orozco Quiromasaje \| Masajes en Sevilla` |
| `en.meta.title` | Entity + English descriptor | `Marta Orozco Quiromasaje \| Massage Therapist in Seville` |
| `es.hero.subtitle` | Entity + city, no stuffing | `Quiromasaje profesional en el centro de Sevilla` |
| `en.hero.subtitle` | Unchanged | `Professional massage therapist in Seville` |
| `footer.copyright` | Canonical name both locales | `© {year} Marta Orozco Quiromasaje. …` / `… All rights reserved.` |

**Facts requiring owner confirmation before apply** (blocks only the two arrival-related slots):

- Building access at `C. Esperanza Elena Caro, 2, 1°A4` — buzzer/intercom, lift or stairs, what the client does on arrival.
- Whether parking/transport guidance may be stated at all, and in what terms.
- Any neighbourhood name Marta is comfortable publishing for the space.

If these are not confirmed, ship the session-flow slots only; the local-discovery spec is satisfied by one unique block per locale.

## Testing Strategy

`strict_tdd: false`; no test runner in the repo. Quality gate is `npm run check` + `npm run build`, then assertions against `dist/`.

| Layer | What | Approach |
|-------|------|----------|
| Static/type | `businessInfo.name` / `addressLocality` shape change compiles | `npm run check` (catches any missed `[locale]` indexing) |
| Build smoke — entity | Same name in both locales | `dist/index.html` and `dist/en/index.html` JSON-LD both contain `"name":"Marta Orozco Quiromasaje"` and `"addressLocality":"Sevilla"` |
| Build smoke — maps | One place everywhere | `maps.app.goo.gl/HdZVpzvzBEGV6GAZ8` appears in both locale HTML; `hasMap` still `?q=place_id:ChIJE7KlJmBtEg0Rn-RGXchxER0` |
| Build smoke — robots | Thank-you excluded | `dist/gracias/index.html` and `dist/en/thank-you/index.html` contain `content="noindex, follow"`; home pages still `index, follow` |
| Build smoke — sitemap | Exactly two locs | `dist/sitemap-0.xml` contains only `/` and `/en/` (baseline today: 4 locs; `404` is already auto-excluded) |
| Build smoke — AEO | No AI-only artifacts | No `dist/llms.txt` |
| Manual | Rich results + content | Google Rich Results Test and Schema.org validator on `/` and `/en/`; read the new About/FAQ copy in both locales for parity and for reveal animation with and without `prefers-reduced-motion` |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. The sitemap `filter` is build-time only. No new external links, no new user input, no new client-side JS.

## Migration / Rollout

No migration. Single PR on `feat-fixes-and-improvements`. After deploy, the thank-you URLs stay indexed until Google recrawls them; `noindex` + sitemap removal is the correct passive path, and no URL removal request is needed since the pages remain reachable. Entity-name changes propagate on the next crawl; AI surfaces with their own caches lag further.

Rollback: revert the commit. No data, no persisted state, no redirects.

## Owner-only checklist (external, not code)

Not part of acceptance; tracked so it is not lost:

1. Confirm GBP display name is exactly `Marta Orozco Quiromasaje`.
2. Confirm the GBP website field points at `https://martaorozcoquiro.netlify.app`.
3. Confirm GBP primary/secondary categories and that hours match Thursday 15:00–21:00.
4. After deploy: Search Console → URL Inspection on `/` and `/en/`, and resubmit `sitemap-index.xml`.
5. Decide whether verbatim Google review quotes may be used on-site (feeds the P2 change).

## Residual Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Owner does not approve the GBP-aligned name | Entity drift persists; this change's main lever is lost | Name lives in one constant — a reversal is a one-line edit |
| Arrival facts unconfirmed at apply time | Half the planned unique content cannot ship | Session-flow slots alone satisfy the spec; arrival slots are separable |
| On-site testimonials in `es.ts`/`en.ts` read as illustrative rather than sourced from Google | Trust and quality signal for both humans and AI assistants; misaligned with the "people-first" rubric this change is built on | Explicitly P2. Recommend a follow-up change `use-verified-review-quotes` (owner-approved verbatim quotes, or relabel the section as illustrative). No `Review`/`AggregateRating` schema is emitted, so there is no structured-data exposure today |
| Name change temporarily depresses brand-query matching | Short-term ranking wobble | Expected and self-correcting once GBP and site agree |
| `es.ts` docblock says "Do not alter wording" | Future contributors treat edited copy as frozen or revert it | Update the docblock in the same commit |

## Open Questions

- [x] Final public business name? **`Marta Orozco Quiromasaje`**, single locale-independent string; English descriptors kept only in descriptive slots, never as the entity name.
- [x] Canonical Maps short link? **`https://maps.app.goo.gl/HdZVpzvzBEGV6GAZ8`** — already in use at all five call sites; single-sourced via `MAPS_PLACE_URL`.
- [x] New home section or About/FAQ expansion? **About (+2 paragraphs) and FAQ (+2 items) only** — a new section would drag in `sectionIds`, `navItems`, `HASH_ES_TO_EN`/`HASH_EN_TO_ES`, footer links and a component.
- [x] Google review quotes on-site? **Out of scope (P2)**, tracked as a residual risk and a follow-up change.
- [ ] Owner confirmation of building-access / arrival facts — blocks two content slots only, not the change.
