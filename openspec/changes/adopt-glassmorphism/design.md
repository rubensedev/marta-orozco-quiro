# Design: Adopt Glassmorphism

**C:** `@theme` glass tokens + Tailwind tier utilities in `.astro`; allow-list updates for widget recipes only. Capability: `glass-design-system`.

## Architecture Decisions

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Tokens vs `.glass-*` BEM | BEM grows allow-list | **@theme tokens + utilities** |
| Primary CTA glass | Aesthetic vs contrast | **Solid sage** (user locked) |
| Body ambient | Flat vs depth | **Fixed subtle gradient** on `body` |
| Blur intensity | Subtle vs iOS-heavy | **12–16px** (user locked) |
| `@supports` fallback | Baseline vs legacy | **Semi-opaque tint** without blur |

## Token Sketch (`@theme`)

```css
--blur-glass-chrome: 18px;
--blur-glass-panel: 14px;
--blur-glass-control: 10px;
--color-glass-surface-light: color-mix(in oklch, white 62%, var(--color-brand-bg));
--color-glass-surface-dark: color-mix(in oklch, var(--color-brand-card-dark) 72%, transparent);
--color-glass-edge-light: rgba(255, 255, 255, 0.22);
--color-glass-edge-dark: rgba(255, 255, 255, 0.1);
--shadow-glass: 0 8px 32px rgba(31, 45, 32, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.35);
```

Expose as utilities: `backdrop-blur-glass-chrome`, `bg-glass-surface`, `border-glass-edge`, `shadow-glass` (Tailwind v4 `@theme` naming).

## Tier Mapping

| Component | Tier | Notes |
|-----------|------|-------|
| `Header.astro` header bar | Chrome | Unify scrolled + default; keep transparent-at-top |
| `#mobileMenu` drawer | Chrome | Replace solid white/card |
| Theme/lang menus | Panel | Dropdown frost |
| `MobileBar.astro` | Chrome | Match header tokens |
| `PricingCard`, About, Contact, Rituals panels | Panel | Utilities on article wrappers |
| `.massage-main-panel__content` | Panel | Update allow-list color-mix → glass |
| Carousel cards/nav | Control/Panel | Tune existing allow-list blur/border |
| `BookingModal` article | Panel | Glass panel; backdrop stays |
| `.btn-secondary` | Control | Frosted outline; `.btn-brand` unchanged |
| `Layout.astro` body | Ambient | Multi-stop oklch gradient, fixed, low contrast |

## Data Flow

No JS/data changes. CSS-only visual pass:

```
@theme tokens → global.css allow-list widgets
             → Tailwind utilities on .astro markup
html.dark    → dark token pair via custom variant
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/styles/global.css` | Modify | Glass tokens; `@supports`; widget glass recipes |
| `src/layouts/Layout.astro` | Modify | Body ambient gradient |
| `src/components/Header.astro` | Modify | Chrome + menus + drawer |
| `src/components/MobileBar.astro` | Modify | Chrome tokens |
| `src/components/Hero.astro` | Modify | `btn-secondary` only |
| `src/components/PricingCard.astro` | Modify | Panel utilities |
| `src/components/About.astro` | Modify | Panel utilities |
| `src/components/Massages.astro` | Modify | Main panel wrapper utilities |
| `src/components/Rituals.astro` | Modify | Panel utilities |
| `src/components/Contact.astro` | Modify | Info card panel |
| `src/components/BookingModal.astro` | Modify | Panel + inputs + close btn |

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit/E2E | N/A | No test runner |
| Visual QA | All tiers | Light/dark; mobile/md/lg; scrolled header; drawer+modal; ES+EN pages; reduced-motion |

## Threat Matrix

N/A — styling-only; no routing, shell, subprocess, or process integration.

## Migration / Rollout

Apply on `feat/adopt-glassmorphism`. Suggested slices: (1) tokens + body + global.css widgets (2) Header/MobileBar/Hero (3) section cards (4) modal + QA. Rollback: revert branch.

## Open Questions

- [ ] None — user locked CTA, ambient, intensity
