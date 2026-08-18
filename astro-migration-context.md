# Astro Migration Context — web-marta-orozco

Full reference for an agent building the Astro project from scratch.

---

## 1. Project overview

**Site:** Marta Orozco — Quiromasajista Profesional  
**Language:** Spanish  
**Type:** Single-page marketing/landing site  
**Location:** Sevilla, Spain  
**Meta description:** "Marta Orozco, quiromasajista profesional. Masajes relajantes, detox, descontracturantes y rituales de bienestar en Sevilla."  
**Page title:** `Marta Orozco | Quiromasajista`  

---

## 2. Tech stack (current → target)

| Aspect | Current | Target |
|---|---|---|
| Framework | Vanilla HTML | Astro (latest) |
| Styling | Tailwind CSS v3 + custom CSS | Tailwind CSS v4 (`@astrojs/tailwind`) |
| JS | Vanilla IIFE modules (`pricing.js`, `main.js`) | Inline `<script>` blocks in Astro components |
| Build | Tailwind CLI only | Astro build (`astro build`) |
| Icons | Font Awesome 6 via CDN | Keep CDN link in `<head>` |
| Fonts | Google Fonts via CDN | Keep CDN link in `<head>` |

---

## 3. Design system

### 3.1 Color palette (brand tokens)

```js
// tailwind.config.js theme.extend.colors.brand
{
  bg:             "#FDF0E8",      // warm off-white (light bg)
  surface:        "#E8E4DC",      // slightly darker surface
  bgDark:         "#1a231b",      // dark mode bg
  cardDark:       "#243028",      // dark mode card
  sage:           "#2C3E2D",      // primary CTA, active pills, borders
  sageHover:      "#3d5340",
  sageLight:      "rgba(44,62,45,0.41)",
  sageBright:     "#8caa8e",      // dark mode sage accent
  sageDark:       "#1f2d20",
  lavender:       "#4B39B5",      // bono pills, prices, savings badge
  lavenderLight:  "rgba(75,57,181,0.41)",
  lavenderBright: "#8b7fe8",      // dark mode lavender
  lavenderDark:   "#2e2470",
  textDark:       "#2C3E2D",
  textLight:      "#FDF0E8",
  muted:          "#6b6863",
}
```

### 3.2 Typography

- **Body:** `Noto Sans` (weights 300, 400, 500, 600, 700) — sans-serif
- **Headings (h1, h2, h3):** `Noto Serif` (weights 300, 400, 500, 600, 700) — serif
- **Google Fonts URL:**
  ```
  https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&family=Noto+Serif:wght@300;400;500;600;700&display=swap
  ```
- Both font families are registered in Tailwind as `font-sans` and `font-serif` respectively.
- `font-size-adjust: from-font` is applied to body and headings in `styles.css`.

### 3.3 Dark mode

- Implemented with `darkMode: "class"` (Tailwind) — the `dark` class lives on `<html>`.
- Theme preference stored in `localStorage` key `"marta-orozco-theme"`.
- Three options: `"light"`, `"dark"`, `"system"` (default).
- Anti-flash inline script must run in `<head>` **before any CSS renders**:

```html
<script>
  (function () {
    var saved = localStorage.getItem("marta-orozco-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var useDark =
      saved === "dark" || (saved !== "light" && (saved === "system" || !saved) && prefersDark);
    if (useDark) {
      document.documentElement.classList.add("dark");
    }
  })();
</script>
```

### 3.4 CSS variables (`:root`)

These are defined in `css/styles.css` and must be preserved in the Astro project's global styles:

```css
:root {
  --brand-bg: #fdf0e8;
  --brand-surface: #e8e4dc;
  --brand-bg-dark: #1a231b;
  --brand-card-dark: #243028;
  --brand-sage: #2c3e2d;
  --brand-sage-hover: #3d5340;
  --brand-sage-light: rgba(44, 62, 45, 0.41);
  --brand-sage-bright: #8caa8e;
  --brand-sage-dark: #1f2d20;
  --brand-lavender: #4b39b5;
  --brand-lavender-light: rgba(75, 57, 181, 0.41);
  --brand-lavender-bright: #8b7fe8;
  --brand-lavender-dark: #2e2470;
  --brand-text-dark: #2c3e2d;
  --brand-text-light: #fdf0e8;
  --brand-muted: #6b6863;
}
```

---

## 4. External dependencies (CDN)

Both must be in the `<head>` layout:

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&family=Noto+Serif:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

<!-- Font Awesome 6 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
```

---

## 5. Page structure & sections

The entire site is a **single page** with these anchor-linked sections:

| Section | `id` | Nav label |
|---|---|---|
| Hero | `#inicio` (on `<main>`) | — |
| About | `#sobre-mi` | SOBRE MÍ |
| Massages & Pricing | `#masajes` | MASAJES |
| Rituals & Bonos | `#bonos` | BONOS |
| Contact | `#contacto` | CONTACTO |

### Suggested Astro component tree

```
src/
├── layouts/
│   └── Layout.astro          # <html>, <head>, anti-flash script, global CSS, footer
├── pages/
│   └── index.astro           # assembles all sections
└── components/
    ├── Header.astro           # sticky nav, theme selector, mobile menu, "Reservar Ahora" btn
    ├── Hero.astro             # hero section with bg image
    ├── About.astro            # "Sobre mí" section
    ├── Massages.astro         # pricing cards grid (calls PricingCard)
    ├── PricingCard.astro      # single massage card with pricing widget mount point
    ├── Rituals.astro          # Rituales + Bonos section
    ├── Contact.astro          # contact/location section
    ├── Footer.astro           # copyright footer
    ├── MobileBar.astro        # fixed bottom bar (mobile only)
    └── BookingModal.astro     # booking modal overlay + form
```

---

## 6. Section-by-section content

### 6.1 Header

- Sticky, `z-40`, backdrop blur, `bg-brand-bg/90 dark:bg-brand-bgDark/90`.
- Logo: `assets/images/logo.svg` — in dark mode, CSS applies `filter: brightness(0) invert(1); opacity: 0.95` via `.site-logo`.
- Desktop nav (hidden on `< lg`): SOBRE MÍ · MASAJES · BONOS · CONTACTO
- Theme selector button (`id="themeMenuBtn"`) opens a dropdown (`id="themeMenu"`) with three options: Claro / Oscuro / Dispositivo.
- "Reservar Ahora" button (hidden on `< md`): opens booking modal (`data-open-booking`).
- Mobile hamburger (`id="mobileMenuBtn"`) toggles `id="mobileMenu"` dropdown with nav links + "Reservar Ahora" button.

### 6.2 Hero

- Full-section, `min-h-[75vh]`, centered content over background image.
- Image: `assets/images/hero.webp` — `fetchpriority="high"`, opacity 70% light / 50% dark, `scale-105`.
- Gradient overlay: `from-brand-bg/45 via-brand-bg/30 to-brand-bg` (light) / dark equivalent.
- **H1:** "Espacio de calma, salud y equilibrio corporal" — `font-light`, serif, `text-4xl sm:text-6xl md:text-7xl`.
- **Subtitle:** "Tratamientos de quiromasaje diseñados para aliviar tensiones físicas, activar tu energía vital y restablecer la paz en tu día a día."
- Two CTAs:
  - "Reservar Cita" → opens booking modal (`data-open-booking`)
  - "Ver Masajes y Precios" → `href="#masajes"` anchor scroll

### 6.3 About (Sobre Mí)

- 12-col grid, text card on left (7 cols), portrait image on right (5 cols).
- Card bg: `brand-lavenderLight dark:bg-brand-lavenderDark/50`, `rounded-3xl`.
- Label: "SOBRE MÍ" (small caps, lavender)
- **H2:** "Marta Orozco"
- Subtitle: "Quiromasajista Profesional"
- Two paragraphs of bio text:
  1. "Siempre me han interesado las técnicas manuales, considerándolas un catalizador muy potente que nos enraíza directamente con energías primigenias, activando un estado de conciencia muy útil en nuestro día a día."
  2. "Es por eso que, como quiromasajista, he encontrado una fórmula muy orgánica de entretejer esas energías con diferentes técnicas de masaje, ofreciéndote sesiones personalizadas en función de tus necesidades."
- Portrait image: `assets/images/about.webp` — `aspect-[4/5]`, `rounded-[3rem]`, `border-4 border-white dark:border-stone-800`.

### 6.4 Massages & Pricing

- Section heading: "MASAJES" — `font-light`, `uppercase`, with a `w-12 h-0.5 bg-brand-sage` divider.
- Subtitle: "Elige duración y tipo de compra para ver tu precio. Compara el ahorro con bonos de 5 o 10 sesiones."
- Four massage cards, alternating image left/right layout:

| Card | Image | Layout | Title | Description |
|---|---|---|---|---|
| Relajante | `relajante.webp` | image left | RELAJANTE | Ideal para reducir el estrés, mejorar el descanso y regalarte un momento para ti. |
| Detox | `detox.webp` | image right (`sm:flex-row-reverse`) | DETOX | Favorece la circulación, alivia la sensación de piernas pesadas y aporta una profunda ligereza. |
| Descontracturante | `descontracturante.webp` | image left | DESCONTRACTURANTE | Pensado para aliviar contracturas, tensión muscular y molestias derivadas del trabajo o el deporte. |
| Cráneo Facial | `craneofacial.webp` | image right | CRÁNEO FACIAL | Libera la tensión del rostro, mandíbula y cuello. Relaja, rejuvenece y aporta bienestar. |

Each card has:
- `data-pricing-card="{id}"` attribute (ids: `relajante`, `detox`, `descontracturante`, `craneo-facial`)
- `data-pricing-align="start"` on the right-layout cards (Detox, Cráneo Facial)
- `data-pricing-display` slot — filled by JS with price HTML
- `data-pricing-mount` slot — filled by JS with duration/bono pill widgets
- "Reservar {Name}" button with `data-open-booking` and `data-treatment="{Booking value}"`

### 6.5 Rituals & Bonos

- Section heading: "RITUALES Y BONOS" — divider uses `bg-brand-lavender`.
- Subtitle: "Rituales completos para una renovación profunda o paquetes de bonos con descuento especial."

**Two ritual cards** (2-col grid, lavender bg):

| Ritual | Icon | Duration | Price | data-treatment |
|---|---|---|---|---|
| RITUAL DESCONEXIÓN TOTAL | `fa-solid fa-spa` | 80 min | 55 € | `Ritual Desconexión Total` |
| RITUAL CUERPO LIGERO | `fa-solid fa-feather-pointed` | 80 min | 60 € | `Ritual Cuerpo Ligero` |

Ritual Desconexión description: "Combina técnicas relajantes y/o descontracturantes con un trabajo específico en hombros, cuello, rostro y cráneo."  
Ritual Cuerpo Ligero description: "Tratamiento diseñado para aliviar la pesadez y recuperar el bienestar general. Se combina un masaje relajante y/o descontracturante con técnicas circulatorias."

**Bonos panel** (below rituals):
- Title: "BONOS"
- Two columns: **5 SESIONES → 10% DESCUENTO** | **10 SESIONES → 15% DESCUENTO**
- Each has a circular badge: `w-20 h-20 rounded-full bg-brand-lavender text-white font-bold text-lg`.
- `id="bonoExamples"` div — filled by JS with savings examples.
- "Preguntar por Bonos" button → opens booking modal with WhatsApp icon.

### 6.6 Contact

- 12-col grid: info left (5 cols), image+map right (7 cols).
- **H2:** "UBICACIÓN Y CONTACTO"
- Label: "Citas y Horario" (sage uppercase)
- Schedule: Jueves de 15:00 a 20:00 (with clock icon `fa-regular fa-clock`)
- Note: "*Citas bajo reserva previa para garantizar tu atención personalizada."
- Address: C. Esperanza Elena Caro, 2, 1°A4 / 41002 Sevilla (with `fa-solid fa-location-dot`)
- "RESERVAR AHORA" button → opens booking modal.
- Social links: Instagram `https://www.instagram.com/martaorozco.quiro` + WhatsApp (`data-whatsapp-direct`).
- Phone displayed: **+34 601 585 508** (WhatsApp number: `34601585508`)
- Right column: contact photo (`assets/images/contact.webp`) + Google Maps iframe (grayscale + dark:invert).
  - Map src: `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sCalle+Esperanza+Elena+Caro+2,+41002+Sevilla,+Espa%C3%B1a`

### 6.7 Footer

- Logo centered (`assets/images/logo.svg`).
- Copyright: `© {year} Marta Orozco Quiromasajista. Todos los derechos reservados.`
- Year updated dynamically via JS.

### 6.8 Mobile bottom bar (fixed, `lg:hidden`)

- Fixed bottom, `z-30`, backdrop blur.
- Left: label "Reservar Cita" + phone number (`data-whatsapp-direct` link).
- Right: "Reservar Ahora" button → opens booking modal.

---

## 7. Booking modal

- `id="bookingModal"`, `role="dialog"`, `aria-modal="true"`.
- Overlay: `bg-black/60 backdrop-blur-sm`, closes on backdrop click or `Escape`.
- Title: "RESERVAR TRATAMIENTO", eyebrow: "Cita Directa".
- Form fields:
  1. **Tratamiento Deseado** (`select`, id `modalTreatment`) — options: Masaje Relajante, Masaje Detox, Masaje Descontracturante, Masaje Cráneo Facial, Ritual Desconexión Total (80 min - 55€), Ritual Cuerpo Ligero (80 min - 60€)
  2. **Duración Preferida** (`select`, id `modalDuration`) — hidden for rituals, options populated dynamically by JS: 30 minutos / 50 minutos / 80 minutos
  3. **Tipo de Compra** (`select`, id `modalPurchaseType`) — hidden for rituals: Sesión suelta / Bono 5 sesiones (−10%) / Bono 10 sesiones (−15%)
  4. **Precio estimado** (read-only display, id `modalPriceEstimate`) — shown/updated dynamically
  5. **Tu Nombre** (text input, autocomplete `name`)
  6. **Preferencia de Fecha/Hora** (text input, placeholder "Ej. Jueves 17:00", helper: "Disponibilidad solo jueves de 15:00 a 20:00.")
- Submit → opens WhatsApp with pre-filled message (see §9).
- When opened from a pricing card "Reservar" button, pre-fills treatment, duration, and bono type from card state.

---

## 8. Pricing data (full)

### Bono tiers

```js
const BONO_TIERS = [
  { id: "single",  sessions: 1,  discount: 0,    label: "Sesión suelta",      shortLabel: "1 sesión" },
  { id: "bono5",   sessions: 5,  discount: 0.10, label: "Bono 5 sesiones",    shortLabel: "Bono 5 (−10%)" },
  { id: "bono10",  sessions: 10, discount: 0.15, label: "Bono 10 sesiones",   shortLabel: "Bono 10 (−15%)" },
];
```

### Treatment prices

```js
const TREATMENTS = {
  relajante:        { id: "relajante",        bookingValue: "Masaje Relajante",         durations: [{ min: 30, price: 20 }, { min: 50, price: 30 }, { min: 80, price: 45 }] },
  detox:            { id: "detox",            bookingValue: "Masaje Detox",             durations: [{ min: 50, price: 40 }, { min: 80, price: 55 }] },
  descontracturante:{ id: "descontracturante",bookingValue: "Masaje Descontracturante", durations: [{ min: 30, price: 25 }, { min: 50, price: 35 }, { min: 80, price: 50 }] },
  "craneo-facial":  { id: "craneo-facial",    bookingValue: "Masaje Cráneo Facial",     durations: [{ min: 30, price: 20 }] },
};
```

### Ritual prices (fixed, no duration/bono selection)

```js
{ id: "ritual-desconexion",    bookingValue: "Ritual Desconexión Total", durations: [{ min: 80, price: 55 }] },
{ id: "ritual-cuerpo-ligero",  bookingValue: "Ritual Cuerpo Ligero",     durations: [{ min: 80, price: 60 }] },
```

### Quote calculation

```
fullTotal      = unitPrice × sessions
discountedTotal= round(fullTotal × (1 - discount))
perSession     = round(discountedTotal / sessions)  [sessions > 1]
savings        = fullTotal - discountedTotal
```

### Bono examples rendered in `#bonoExamples`

```js
const BONO_EXAMPLES = [
  { treatmentId: "relajante",         durationMin: 50, bonoId: "bono5"  },
  { treatmentId: "descontracturante", durationMin: 50, bonoId: "bono10" },
];
```

---

## 9. JavaScript behaviour (port faithfully)

### Theme system (`main.js`)

- Storage key: `"marta-orozco-theme"`, values: `"light" | "dark" | "system"`.
- `applyThemePreference(preference)` → resolves system, toggles `dark` on `<html>`, updates icon + menu checkmarks.
- Icon classes per preference:
  - `light`: `fa-solid fa-sun text-amber-500`
  - `dark`: `fa-solid fa-moon text-indigo-400`
  - `system`: `fa-solid fa-circle-half-stroke text-slate-600 dark:text-amber-300`
- Listens to `prefers-color-scheme` media change — re-applies if preference is `"system"`.
- Theme menu closes on outside click or `Escape`.

### Booking modal (`main.js`)

- Any `[data-open-booking]` click → `openBookingModal(treatmentName, pricingContext)`.
- Pre-fills treatment select by matching `data-treatment` attribute.
- For rituals: hides duration/bono selects, hard-codes 80 min.
- For regular massages: populates duration options from pricing data for that treatment.
- `syncBookingFieldVisibility()` shows/hides duration and purchase-type fields based on treatment type.
- `updateModalPriceEstimate()` computes and displays price estimate live.
- Backdrop click and `Escape` key → close modal.
- WhatsApp number: `34601585508`
- Inquiry message (direct links): `"Hola Marta! Me gustaría reservar una cita. ¿Tienes disponibilidad?"`

### WhatsApp booking message format

```
Hola Marta! Me gustaría reservar una cita.

• *Tratamiento:* {treatment}
• *Duración:* {duration}
• *Tipo de compra:* {purchaseTypeLabel}
• *Precio estimado:* {estimate}   ← only if shown
• *Nombre:* {name}
• *Preferencia de Fecha/Hora:* {date}
```

URL: `https://wa.me/34601585508?text={encodeURIComponent(message)}`

### Pricing widgets (`pricing.js`)

- `initPricingWidgets()` — finds all `[data-pricing-card]` elements, injects pill widgets into `[data-pricing-mount]`.
- Duration pills: one per `treatment.durations` entry, first active by default.
- Bono pills: one per BONO_TIER, first active by default. Bono pills for active bono use lavender color.
- On pill click → updates `dataset.selectedDuration` / `dataset.selectedBono` on card, re-renders `[data-pricing-display]`.
- Price display HTML classes: `.pricing-compare`, `.pricing-compare-figures`, `.pricing-amount`, `.pricing-single`, `.pricing-original`, `.pricing-discounted`, `.pricing-per-session`, `.pricing-savings-highlight`, `.bono-savings-badge`.
- `renderBonoExamples(container)` → renders two example rows in `#bonoExamples`.

### Mobile nav (`main.js`)

- Hamburger toggles `hidden` class on `#mobileMenu`, updates `aria-expanded`.
- `[data-close-mobile-nav]` links close the mobile nav on click.
- `[data-open-booking-close-nav]` closes nav then opens booking modal.

---

## 10. Assets

All assets live in `assets/images/` (move to Astro's `public/assets/images/`):

| File | Usage |
|---|---|
| `logo.svg` | Header + footer logo (inverted in dark mode) |
| `logo.ico` | Favicon |
| `hero.webp` | Hero section background |
| `about.webp` | Portrait in "Sobre Mí" section |
| `relajante.webp` | Masaje Relajante card image |
| `detox.webp` | Masaje Detox card image |
| `descontracturante.webp` | Masaje Descontracturante card image |
| `craneofacial.webp` | Masaje Cráneo Facial card image |
| `contact.webp` | Contact section photo |

---

## 11. Custom CSS classes to preserve

These are defined in `styles.css` and used across the markup. The Astro project must include all of them in a global stylesheet:

| Class / selector | Purpose |
|---|---|
| `.site-logo` | Logo sizing + dark mode invert filter |
| `.btn-brand` | Primary CTA button style |
| `.booking-required` | Required field asterisk (lavender) |
| `.booking-form-helper`, `.booking-field-helper` | Form helper text styles |
| `.booking-field-group[hidden]` | Force-hides field groups |
| `#bookingForm :user-invalid` | Red border on invalid fields |
| `.theme-menu-option[aria-checked="true"]` | Bold active theme option |
| `.pricing-pill` | Duration/bono pill base style |
| `.pricing-pill-active` | Active pill (sage bg) |
| `.pricing-pill-bono.pricing-pill-active` | Active bono pill (lavender bg) |
| `.pricing-compare` | Price display flex container |
| `.pricing-compare-figures` | Figures row (original + discounted) |
| `.pricing-original` | Struck-through original price |
| `.pricing-discounted` | Large discounted price (lavender) |
| `.pricing-single` | Single-session price (sage) |
| `.pricing-per-session` | Per-session line |
| `.pricing-savings-highlight` | Animated savings badge (lavender pill) |
| `.bono-savings-badge` | Savings badge in bono examples |
| `@keyframes pricing-savings-in` | Fade-in animation for savings badge |
| `@media (prefers-reduced-motion)` | Disables savings animation |

---

## 12. Accessibility notes

- `<html lang="es" class="scroll-smooth">`
- All images have descriptive `alt` attributes.
- `aria-live="polite" aria-atomic="true"` on `[data-pricing-display]` slots.
- Booking modal: `role="dialog" aria-modal="true" aria-labelledby="bookingModalTitle"`.
- Theme menu: `role="menu"`, options use `role="menuitemradio"` + `aria-checked`.
- Duration/bono pill groups: `role="radiogroup"` + `aria-label`.
- `body` gets `overflow-hidden` while booking modal is open.
- Focus returns to `themeMenuBtn` when theme menu closed via `Escape`.

---

## 13. Body classes

```html
<body class="bg-brand-bg text-brand-textDark dark:bg-brand-bgDark dark:text-brand-textLight transition-colors duration-300 antialiased pb-20 lg:pb-0">
```

The `pb-20` bottom padding accounts for the fixed mobile bottom bar (hidden at `lg`).

---

## 14. Key implementation notes for Astro

1. **Anti-flash script** must be in the `<head>` as `is:inline` in the Layout — do NOT defer or move it.
2. **`pricing.js`** should be loaded before `main.js` since `main.js` reads `window.MartaPricing`. In Astro, put all pricing logic inside a single `<script>` in `index.astro` or a dedicated client script, keeping the module structure.
3. **Tailwind config** — port the `brand` color tokens and font families from `tailwind.config.js` to the Astro Tailwind config.
4. **`darkMode: "class"`** must be set in Tailwind config.
5. Assets go in `public/assets/images/` so paths remain `assets/images/...` unchanged.
6. **Year in footer** — update via `<script>document.getElementById('year').textContent = new Date().getFullYear()</script>` or use Astro's `new Date().getFullYear()` directly at build time.
7. The `openspec/` folder is project documentation only — do not port it to Astro.
