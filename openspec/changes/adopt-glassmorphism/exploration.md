## Exploration: adopt-glassmorphism

**Recommend Approach A** — a small **glass design-token layer** in `@theme` plus Tailwind utility composition in `.astro` templates, with targeted updates to the existing leftover allow-list (`btn-*`, carousel cards, modal). No new CSS framework. Progressive enhancement: semi-opaque fallback when `backdrop-filter` is unavailable.

Ready for proposal: **Yes**, pending user confirmation on three decision gates (see bottom).

### Current State

Astro 7 + Tailwind CSS 4 landing page. Styling convention: utilities in templates; `src/styles/global.css` holds `@theme` brand tokens and an allow-list for JS-injected / complex widgets.

**Partial glass already exists:**

| Surface | Today | Gap |
|---------|-------|-----|
| Header (scrolled) | `bg-brand-bg/90 backdrop-blur-[18px]` | Top-of-page is fully transparent; theme/lang menus are **solid** white/card |
| Theme menu btn | `.theme-menu-btn` blur in allow-list | Lang btn has no matching glass; drawer copies are transparent only |
| MobileBar | `bg-brand-bg/92 backdrop-blur-lg` | Good baseline; border/shine not unified |
| Mobile drawer | Solid `bg-white` / `dark:bg-brand-card-dark` | No frost; feels heavy vs header |
| Massage/review carousel cards | `backdrop-filter: blur(10px)` + color-mix bg | Inconsistent with pricing/about cards |
| Carousel nav pills | Solid `#fff` | No glass |
| PricingCard | `bg-white/60` | No blur; flat |
| About / Rituals cards | Lavender/surface color-mix | Opaque panels |
| Contact info card | `bg-brand-surface/80` | No blur |
| Massage main panel | color-mix in `.massage-main-panel__content` | No blur |
| Booking modal | Solid panel; `::backdrop blur(8px)` | Panel not glass; close btn flat |
| Buttons | Solid sage / white secondary | User wants glass on buttons — needs hierarchy decision |
| Footer | No surface | OK as-is (minimal chrome) |
| Hero | Gradient overlay only | Correct — readability over frost |

**Stack constraints** (from `openspec/config.yaml`):

- Do not grow allow-list for ordinary layout.
- `@apply` last resort; one global stylesheet.
- Dark mode via `html.dark` class variant.

**MWG/CSS guidance applied:**

- Layer soft shadows; `isolation: isolate` on frosted panels.
- Prefer `color-mix(in oklch, …)` for tint interpolation.
- `@supports (backdrop-filter: blur(1px))` for enhancement layer.
- Respect `prefers-reduced-motion` (already global).
- `:focus-visible` rings must remain visible on glass (outline, not only box-shadow).
- Avoid `backdrop-filter` on large full-viewport layers (perf); limit blur to chrome + cards.

### Affected Areas

- `src/styles/global.css` — `@theme` glass tokens; unify carousel card / btn / modal / theme-btn glass recipes on allow-list
- `src/components/Header.astro` — header, drawer, theme/lang menus, hamburger area
- `src/components/MobileBar.astro` — align with token system
- `src/components/Hero.astro` — secondary CTA (`btn-secondary`) glass variant
- `src/components/PricingCard.astro` — card surface
- `src/components/About.astro` — lavender panel
- `src/components/AboutStats.astro` — stat overlay card (if applicable)
- `src/components/Massages.astro` — main panel content wrapper utilities
- `src/components/Rituals.astro` — bono cards + examples panel
- `src/components/Contact.astro` — info card
- `src/components/Reviews.astro` — inherits carousel card CSS
- `src/components/BookingModal.astro` — panel, inputs, close button
- `src/layouts/Layout.astro` — optional ambient page background for glass legibility
- `openspec/config.yaml` — `feature_name_hint` at archive (not now)

### Approaches

1. **A — Glass tokens + Tailwind utilities (recommended)**
   - Add `@theme` tokens: blur steps, surface alpha, border highlight, inset shine shadow.
   - Compose in Astro: `bg-brand-glass backdrop-blur-glass border border-brand-glass-edge shadow-glass`.
   - Allow-list updates only for `.btn-brand`, `.btn-secondary`, `.massage-carousel-card`, `.review-carousel-card`, `.theme-menu-btn`, `.booking-modal` inner panel hooks.
   - Pros: Consistent serenity system; matches project conventions; easy dark/light pairs; minimal bundle.
   - Cons: Requires disciplined token naming; some duplication between utilities and allow-list.
   - Effort: Medium

2. **B — Allow-list-first `.glass-*` component classes**
   - New classes: `.glass-panel`, `.glass-card`, `.glass-btn`, applied everywhere.
   - Pros: Single class per element; DRY in templates.
   - Cons: **Violates** “do not grow allow-list for ordinary layout”; fights Tailwind-first convention.
   - Effort: Low–Medium

3. **C — Per-component one-off Tailwind (no tokens)**
   - Copy `backdrop-blur-xl bg-white/40` per file.
   - Pros: Fastest initial pass.
   - Cons: Drift across light/dark; hard to tune globally; not a “design system”.
   - Effort: Low (but high maintenance)

### Recommendation

**Approach A.** Define a **three-tier glass scale** for serenity:

| Tier | Use | Character |
|------|-----|-----------|
| **Chrome** | Header, MobileBar, drawer, floating bars | Higher blur (16–20px), lower opacity, strong edge highlight |
| **Panel** | Cards, modals, dropdown menus | Medium blur (12–16px), readable body text |
| **Control** | Secondary buttons, pills, carousel nav, inputs | Light blur (8–12px) or tinted glass; primary CTA stays **more opaque** unless user wants full glass |

**Visual language:**

- Frosted white/sage tint in light mode; frosted sage/card tint in dark.
- 1px hairline border `white/18` (light) / `white/10` (dark).
- Soft dual shadow: ambient + subtle inset top highlight (gloss).
- Page may need a **very subtle** ambient gradient behind sections so glass reads — not a redesign, just enough depth.

**Explicit exclusions:**

- Hero background image + overlay (keep readability).
- Treatment photos / portrait images (stay solid).
- Map iframe filters (unchanged).
- Footer (no panel needed).

### Risks

- **Contrast regression** on glass buttons and lavender panels — must QA light/dark + scrolled header states.
- **Performance** if blur stacks (header over drawer over backdrop) — cap blur layers; avoid blur on full-page wrappers.
- **Safari** backdrop-filter + fixed header containing-block quirks (refactor-header already documents backdrop-blur on header — retest drawer stacking).
- **Allow-list creep** — keep new named classes tied to JS widgets or multi-state recipes only.
- **i18n / a11y** — no copy changes; preserve `aria-*`, focus rings, `forced-colors` fallback (solid bg).

### Ready for proposal: **Yes** — user decisions locked (see below). Orchestrator can proceed to `sdd-propose`.

### Locked decisions (2026-08-23)

| Gate | Choice |
|------|--------|
| Primary CTA (`btn-brand`) | **Solid sage** — keep max contrast |
| Page ambient depth | **Subtle body gradient/mesh** so glass panels read |
| Frost intensity | **Subtle serenity** — blur 12–16px, softer opacity |

### Decision gates (user input)

~~1. **Primary CTA (`btn-brand`)** …~~ **Resolved: solid sage.**

~~2. **Page ambient depth** …~~ **Resolved: subtle ambient gradient on body.**

~~3. **Intensity** …~~ **Resolved: subtle serenity.**
