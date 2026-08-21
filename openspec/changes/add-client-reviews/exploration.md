# Exploration: add-client-reviews

## Exploration: Client reviews section (infinite carousel)

### Current State

Homepage is a single Astro page (`src/pages/index.astro`) ordered:

`Hero → About → Massages → Rituals → Contact`

Navigation comes from `navItems` in `src/data/site.ts` (`SOBRE MÍ`, `MASAJES`, `BONOS`, `CONTACTO`). `Header.astro` maps the same list for desktop nav and mobile drawer — adding one item is enough for both.

Section titles use centered `SectionHeading.astro` (serif uppercase lavender title + hairline + optional description). Rituals/Contact follow that pattern.

**Massage carousel (reuse target):**

- Markup/CSS: `.massage-carousel` in `Massages.astro` + `global.css` (allow-listed leftover CSS).
- Track: horizontal `overflow-x: auto`, scroll-snap, grab cursor, hidden scrollbar.
- Visible cards via `--massage-visible` (1.15 → 2.15 → 3.15 → **4** at ≥1100px).
- JS (inline in `Massages.astro`): pointer drag (threshold 8px), `scrollTrackBy(±1)` by slide width+gap, `updateNavButtons()` **disables** prev at start / next at end (finite).
- No autoplay today.
- Card interaction is massage-specific (select treatment → main panel swap). Reviews will **not** need that coupling — only track/nav/drag/loop.

Brand tokens (`@theme` in `global.css`): sage/lavender/muted; amber already used for theme icons (`text-amber-500`). No dedicated “star yellow” token — Tailwind amber is fine for 5 stars.

Treatments/rituals available for `treatmentName`: Relajante, Detox, Descontracturante, Cráneo Facial, Ritual Desconexión Total, Ritual Cuerpo Ligero.

### Affected Areas

- `src/data/site.ts` — `navItems`, `reviewsContent`, `reviews[]` (+ types)
- `src/components/Reviews.astro` — new section (`id="testimonios"`)
- `src/pages/index.astro` — insert after `<Rituals />`, before `<Contact />`
- `src/styles/global.css` — shared carousel / infinite modifier if extracted
- `src/components/Massages.astro` — only if carousel JS/CSS is parameterized/extracted
- `src/components/Header.astro` — unchanged (consumes `navItems`)
- `src/components/SectionHeading.astro` — reuse as-is unless split intro forces local heading

### Approaches

1. **Parameterized shared carousel (recommended)** — Extract track/nav/drag init into a small shared helper (inline module or duplicated init driven by `data-carousel-infinite`). Reviews: clone slide set + seamless scroll jump; never disable arrows. Massages: `infinite: false` keeps current end-stop disable.
   - Pros: One interaction language; matches locked decision; massage UX unchanged; lower long-term drift.
   - Cons: Touching Massages + global.css; careful testing of jump/snap; PR size risk.
   - Effort: Medium

2. **Copy-paste reviews-only infinite carousel** — Duplicate CSS/JS in `Reviews.astro` with loop logic; leave Massages untouched.
   - Pros: Fastest; zero massage regression risk.
   - Cons: Two carousels to maintain; diverges from “shared/parameterized reuse preferred”.
   - Effort: Low–Medium

3. **CSS marquee / auto-scroll loop** — Continuous translate animation.
   - Pros: Visually “endless” with little JS.
   - Cons: Conflicts with locked no-autoplay + manual/drag; a11y/reduced-motion harder; not true drag carousel.
   - Effort: Low (wrong fit)

### Recommendation

Use **Approach 1**: shared/parameterized carousel behavior.

**Infinite technique:** render N slides, clone one full set (or prefix+suffix), on scroll near edges jump `scrollLeft` by exact set width with snap temporarily off. Prev/next always enabled when overflow exists. No autoplay timers.

**CSS:** Prefer generalizing class names (`site-carousel` / dual-class) or a thin `data-infinite` modifier on existing `.massage-carousel*` track/nav/viewport rules; keep massage **card** styles separate from review cards (Tailwind for review card chrome).

**Layout:** Centered `SectionHeading` for title+intro is acceptable and matches site; if mock wants left column copy + right carousel, keep heading centered and put short body beside/above carousel with Tailwind — avoid growing leftover CSS for ordinary layout.

**Stars:** five `fa-solid fa-star` with `text-amber-400` (or similar); decorative `aria-hidden` + visually hidden “5 de 5” if needed.

**Nav order:** insert `{ href: "#testimonios", label: "TESTIMONIOS" }` before Contact.

### Risks

- Shared refactor accidentally changes massage finite end-stops.
- Visible jump on loop if set width miscalculated (gaps, padding, clones).
- Invented testimonials may need later swap for real quotes.
- Review budget (~400 lines) if extracting carousel + new section + data in one PR — consider chaining data/section vs abstraction.

### Ready for Proposal

**Yes** — clarifying questions locked; explore complete; recommend `sdd-propose` next (finalize proposal language if needed, then spec/design/tasks). Do **not** implement UI yet.

---

## Technical findings — infinite reuse

| Concern | Massage today | Reviews need |
|---------|---------------|--------------|
| End behavior | `disabled` at edges | Never hard-stop |
| Card role | `role="option"` + panel switch | Static quote card |
| Drag | Pointer capture after threshold | Same |
| Autoplay | None | None |
| Visible count | `--massage-visible` → 4 | Reuse same vars / shared track |

Shared surface should be **viewport + track + nav + drag + scroll-by-step + (optional) loop**, not treatment selection.

---

## Draft mocks for `site.ts` (≥8)

Suggested shape:

```ts
export type Review = {
  id: string;
  name: string;
  stars: 5;
  quote: string;
  treatmentName: string;
};
```

| id | name | treatmentName | quote |
|----|------|---------------|-------|
| review-01 | Laura M. | Relajante | Salí como nueva. Noté el cuerpo blandito y la cabeza en silencio por primera vez en semanas. |
| review-02 | Carmen R. | Descontracturante | Tenía la espalda hecha un nudo y me fui caminando ligera. Marta tiene unas manos mágicas. |
| review-03 | Ana S. | Detox | Piernas ligeras, sensación de frescura y una calma que me acompañó todo el día. Recomendadísimo. |
| review-04 | Patricia G. | Cráneo Facial | Se me disolvió la tensión de mandíbula y cuello. Salí con la cara relajada y una sonrisa fácil. |
| review-05 | Elena V. | Ritual Desconexión Total | Una desconexión total de verdad. Cerré los ojos y el mundo se quedó fuera. Volveré seguro. |
| review-06 | Lucía P. | Relajante | Ambiente cálido, trato cercano y un masaje que me dejó flotando. Justo lo que necesitaba. |
| review-07 | Marta H. | Ritual Cuerpo Ligero | Me sentí liviana y con energía suave, sin agobio. Ideal cuando el cuerpo pide reset. |
| review-08 | Sofía N. | Descontracturante | Después de horas frente al ordenador, este masaje me devolvió el cuello. Super contenta. |
| review-09 | Irene C. | Detox | Relajada, renovada y con ganas de cuidarme más. La sesión se me hizo un suspiro. |

Intro content:

```ts
export const reviewsContent = {
  heading: "¿Tienes dudas?",
  description:
    "Desde 2021 he acompañado a más de 1.500 personas en su camino hacia el bienestar. Estas voces cuentan cómo se sintieron después de la sesión — por si te ayuda a dar el paso.",
};
```

---

## Recommended file touch list (apply phase)

1. `src/data/site.ts` — types, `reviewsContent`, `reviews`, `navItems`
2. `src/components/Reviews.astro` — new
3. `src/pages/index.astro` — mount order
4. `src/styles/global.css` — shared/infinite carousel bits only as needed
5. `src/components/Massages.astro` — only if wiring shared init / class rename
6. Optional: `src/scripts/horizontal-carousel.ts` (or similar) if extraction is cleaner than dual inline scripts

Non-goals for apply: Header rewrite, SectionHeading redesign, booking CTA in section, massage infinite mode.
