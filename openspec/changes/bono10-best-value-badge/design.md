# Design: Bono 10 Best-Value Badge

## Technical Approach

Mark only `bono10` in the Bonos two-column package grid with a **soft pill eyebrow** above `sessionsLabel`, driven by i18n copy on `bonos`. Keep the existing lavender `15%` circle + wave CTA as the hero; the badge creates choice hierarchy without a second promo graphic. Proposal artifact was absent in Engram — design follows the orchestrator brief + live `Rituals.astro` markup.

## Architecture Decisions

| Decision | Options | Tradeoff | Choice |
|----------|---------|----------|--------|
| Pattern | Corner ribbon / circular seal / pill / underline / eyebrow-only / hybrid | Ribbon needs card corners (none here); seal fights `15%` + wave scale(1.55); underline too weak; full hybrid adds clutter | **Soft pill eyebrow** above `10 SESIONES` |
| Copy frame | "Most popular" vs value/savings vs wise-choice | Popularity unverifiable; wise-choice soft but vague | **Máximo ahorro / Best value** (user-locked; EN is not "Max savings") |
| Gate | Hardcode `sessions===10` vs `tier.id==='bono10'` vs `featured` flag | Magic number vs id vs schema growth | **`tier.id === "bono10"`** + `bonos.bestValueLabel` |
| Chrome | Solid lavender+shadow (`.pricing-savings-highlight`) vs glass/outline pill | Solid = sale sticker on calm tiles | **Tinted glass pill** — lavender text, no heavy shadow |
| Motion | New pulse / hover bounce / none / piggyback reveal | Waves already use 2 animations | **No new loop**; badge inherits section reveal only |
| a11y | Color-only ring vs text badge + aria | Color-only fails | **Visible uppercase text** + include label in button `aria-label` |

### Why pill wins on this composition

Vertical stack is title → discount button (core + waves) → `DESCUENTO`. Waves expand outward from the button; any seal/ribbon on the circle collides with motion and steals focus from the conversion number. A centered pill **above** the title sits outside wave radius, reads first in the scan path, and leaves the circle as proof of savings.

### Dismissed (brief)

- **Corner ribbon**: no rectangular card frame; salesy vs brand.
- **Circular seal on/near core**: two competing circles; wave overlap.
- **"Most popular" eyebrow alone**: weak vs solid `15%` disc.
- **Underline accent**: insufficient pairwise hierarchy vs Bono 5.

## Placement (exact)

```
        [  MÁXIMO AHORRO  ]   ← pill, centered, mb ~0.5rem before h4
           10 SESIONES
              (○ 15% ○)       ← unchanged; waves clear of badge
            DESCUENTO
```

- Badge lives in `<article>`, **sibling before** `h4`, never inside `.bono-discount`.
- Do not overlap concentric rings; keep `overflow: visible` on article.
- Bono 5 column: no badge (asymmetry = the CTA signal).

## Visual specs

| Token | Spec |
|-------|------|
| Shape | `rounded-full`; `px-3 py-1`; height ~1.4–1.6rem |
| Type | 0.65–0.7rem, `font-semibold`, `uppercase`, `tracking-[0.14em]` (match `DESCUENTO` tracking language) |
| Light | `color: var(--color-brand-lavender-dark)`; `bg: color-mix(in srgb, var(--color-brand-lavender) 12%, white)`; `border: 1px solid color-mix(... lavender 28%, transparent)` |
| Dark | text `lavender-bright`; bg lavender ~22% / transparent; soft edge |
| z-index | Document flow only (no absolute over core); waves stay on button |
| Contrast | Text on tint ≥ WCAG AA for small text; never lavender-on-lavender without dark text |

## Micro-interaction

None beyond existing: core darkens on hover; waves pulse (reduced-motion already kills waves). Badge is static.

## Data flow

```
es.ts|en.ts bonos.bestValueLabel
        │
        ▼
getSite() → bonosContent
        │
        ▼
Rituals.astro packageTiers.map
  if tier.id === "bono10" → render pill
  button aria-label includes bestValueLabel + tier.label
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/data/site/es.ts` | Modify | `bonos.bestValueLabel: "Máximo ahorro"` |
| `src/data/site/en.ts` | Modify | `bonos.bestValueLabel: "Best value"` |
| `src/components/Rituals.astro` | Modify | Conditional pill; aria; scoped `.bono-featured-badge` styles next to `.bono-discount*` |
| `src/data/site/index.ts` | None | Type inferred from dict; no `BonoTier` change |
| `src/styles/global.css` | None | Keep badge CSS local in Rituals (existing bono widget pattern) |

## Interfaces / Contracts

```ts
// bonos content (es/en)
bestValueLabel: string; // shown only for bono10
```

No new components. Gate: `tier.id === "bono10"` (matches `sharedBonoTiers`).

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | N/A | No test runner (`strict_tdd: false`) |
| Typecheck | Site dict + Astro | `npx astro check` |
| Manual | ES/EN, mobile/desktop, dark, reduced-motion | Badge only on 10; waves clear; focus ring on discount button intact |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration required. Ship with locale copy; no feature flag.

## Open Questions

- [x] Copy: user-locked **ES `Máximo ahorro` / EN `Best value`** (overrides earlier design draft "Max savings").
- [ ] Optional later: faint featured-column cue (not required for v1).
