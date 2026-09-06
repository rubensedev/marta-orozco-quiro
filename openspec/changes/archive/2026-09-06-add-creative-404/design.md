# Design: Creative 404

## Technical Approach

Ship one static `src/pages/404.astro` → `dist/404.html` (Netlify default). UI is a thank-you twin (`NotFoundPage`) with shared canvas via `src/scripts/relax-flow.ts` (same pattern as `horizontal-carousel.ts`). Locale resolved client-side from preserved pathname + locked localStorage rule. Layout gains a robots override; 404 uses `skipLocaleRedirect` + `includeJsonLd={false}`. Maps proposal `creative-404` + `site-i18n` deltas.

## Architecture Decisions

| Decision | Options | Tradeoff | Choice |
|----------|---------|----------|--------|
| Host 404 | Single `404.astro` vs `en/404.astro` | Netlify serves only root `404.html` | **Single** `404.astro` |
| Locale | Pathname-only vs path + `marta-orozco-locale` | Locked: honor stored EN only when path lacks `/en` prefix | **Path `/en…` → EN; else preferred EN → EN; else ES** |
| Anti-FOUC | Late swap vs dual markup + early inline | Flash risk | **Dual locale panels + early `is:inline` reveal** |
| Canvas | Duplicate script vs shared module | DRY / review churn | **`relax-flow.ts` + `data-relax-flow-*` hooks** |
| Meta robots | Hardcode vs Layout prop | Thank-you stays indexable | **Optional `robots` prop; default `index, follow`; 404 `noindex, nofollow`** |
| CTAs | Home vs massages | Locked | **Primary `/#masajes` / `/en#massages`; WA = `meta.whatsappInquiry`** |
| Shipping | One PR vs peel | Extract alone ≈320 churn (+/−) | **Prefer one PR under 400; else PR1 extract → PR2 404 UI (`ask-on-risk`)** |

## Data Flow

```
Unknown URL (preserved)
        │
Netlify → dist/404.html (HTTP 404)
        │
Layout (skipLocaleRedirect, robots noindex, no JSON-LD)
        │
Early inline: path.startsWith("/en") ? en
            : localStorage EN ? en : es
        │
Reveal matching [data-not-found-locale] panel; hide other
        │
NotFoundPage markup → initRelaxFlow(root, canvas)
        │
Primary → /#masajes | /en#massages
Secondary → wa.me + whatsappInquiry (locale bundle)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/scripts/relax-flow.ts` | Create | Export `initRelaxFlow`; query `data-relax-flow-root` / `data-relax-flow-canvas`; multi-instance safe; keep reduced-motion + dark paint |
| `src/components/ThankYouPage.astro` | Modify | Swap attrs to shared hooks; thin `<script>` imports `initRelaxFlow` |
| `src/pages/404.astro` | Create | Shell: dual `getSite("es"|"en")` content; Layout props; early locale pick |
| `src/components/NotFoundPage.astro` | Create | Glass twin: logo, decorative “404”, soft `h1`, body, massages + WA; no home/chips |
| `src/layouts/Layout.astro` | Modify | Add `robots?: string` → `<meta name="robots">` |
| `src/data/site/es.ts` | Modify | `ui.notFound` copy + meta |
| `src/data/site/en.ts` | Modify | `ui.notFound` copy + meta |
| `openspec/specs/creative-404/spec.md` | Create | Via sdd-spec (parallel) |
| `openspec/specs/site-i18n/spec.md` | Modify | Via sdd-spec (parallel) |

## Interfaces / Contracts

```ts
// src/scripts/relax-flow.ts
export function initRelaxFlow(root: HTMLElement, canvas: HTMLCanvasElement): void;
// Markup: [data-relax-flow-root], [data-relax-flow-canvas]

// ui.notFound (es/en)
{
  statusMark: "404";
  title: string;       // soft h1
  message: string;
  massagesLabel: string;
  whatsappLabel: string; // reuse thank-you wording
  metaTitle: string;
  metaDescription: string;
}

// Layout Props addition
robots?: string; // default "index, follow"
```

Primary hrefs locked: ES `/#masajes`, EN `/en#massages` (not trailing-slash variants). WA: same construction as ThankYouPage.

404 shell meta: build with ES bundle defaults; early script may sync `document.title` / `html[lang]` when EN wins (noindex limits SEO impact).

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | — | N/A (no runner) |
| Typecheck | Props + `ui.notFound` shape | `npx astro check` |
| Build | `dist/404.html` emitted | `npm run build` |
| Manual | Locale path/storage; skip redirect; CTAs; thank-you canvas still works; robots | Local preview + Netlify 404 URL preserve |

## Threat Matrix

N/A — no shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. (HTTP 404 is host static serving, not the CLI threat matrix.)

## Migration / Rollout

No data migration. Deploy on `feat/add-creative-404`. If authored diff (add+del) threatens 400 lines: **PR1** `relax-flow` extract + ThankYouPage only; **PR2** 404/NotFoundPage/i18n/Layout robots. Rollback: delete 404 artifacts; restore inline canvas or keep shared module; revert robots prop.

## Open Questions

- [x] Locale + localStorage — locked in `state.yaml`
- [x] Decorative 404 + soft h1 — locked
- [x] Robots `noindex` (design uses `noindex, nofollow`) — locked intent
- [ ] Exact EN hash href `/en#massages` vs `/en/#massages` — follow locked strings unless homepage canonical differs at apply time
