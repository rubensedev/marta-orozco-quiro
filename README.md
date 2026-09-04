# Marta Orozco | Quiromasajista

Landing page built with Astro for Marta Orozco, a professional quiromasajista based in Sevilla.

## Stack

- Astro 7
- Tailwind CSS 4 via Vite plugin
- Static single-page site in Spanish

Styling uses Tailwind utilities in `.astro` templates plus leftover CSS in `src/styles/global.css`. Sass is gone.

## Requirements

- Node.js `>=22.12.0`

## Scripts

- `npm run dev` - start the local Astro dev server
- `npm run build` - build the production site
- `npm run preview` - preview the production build locally
- `npm run astro` - run the Astro CLI directly

## Project structure

```text
src/
  components/
    About.astro
    BookingModal.astro
    Contact.astro
    Footer.astro
    Header.astro
    Hero.astro
    Massages.astro
    MobileBar.astro
    PageScripts.astro
    PricingCard.astro
    Rituals.astro
  data/
    site.ts
  layouts/
    Layout.astro
  pages/
    index.astro
  styles/
    global.css
```

## Site sections

The home page is assembled in `src/pages/index.astro` and includes:

- Hero
- About
- Massages
- Rituals / bonos
- Contact
- Footer, mobile action bar, booking modal, and page scripts

## Content and configuration

- Main site content and metadata live in `src/data/site.ts`
- Global layout and head metadata live in `src/layouts/Layout.astro`
- Global styles live in `src/styles/global.css`
- The migration reference used for the Astro rebuild is documented in `astro-migration-context.md`

## Development notes

- The page is configured as a single-page marketing site in Spanish.
- The layout includes Google Fonts, Font Awesome, and an inline theme script for dark mode initialization.
- Booking options, pricing tiers, and ritual data are generated from `src/data/site.ts`.

## Deploy / SEO

Production origin is **`https://martaorozcoquiro.netlify.app`**. There is no custom domain; that Netlify hostname is intentional, not temporary.

Keep these in sync with that origin:

- `astro.config.mjs` — `site`
- `public/robots.txt` — sitemap URL
- `src/layouts/Layout.astro` — canonical and Open Graph URLs
- `src/components/SeoJsonLd.astro` — JSON-LD absolute URLs

If a custom domain is added later, update `site`, robots, redirects, Search Console, and schema/OG in one coordinated change. Do not treat a future domain as already in place.
