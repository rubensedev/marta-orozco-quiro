# Marta Orozco | Quiromasajista

Landing page built with Astro for Marta Orozco, a professional quiromasajista based in Sevilla.

## Stack

- Astro 7
- Tailwind CSS 4 via Vite plugin
- Static bilingual site: `/` (Spanish) and `/en/` (English)

Styling uses Tailwind utilities in `.astro` templates plus leftover CSS in `src/styles/global.css`. Sass is gone.

## Requirements

- Node.js `>=22.12.0`

## Scripts

- `npm run dev` - start the local Astro dev server
- `npm run build` - build the production site
- `npm run check` - run `astro check` (TypeScript / Astro diagnostics)
- `npm run preview` - preview the production build locally
- `npm run astro` - run the Astro CLI directly

## Project structure

```text
src/
  components/          # Shared page sections and UI shell
  data/
    site/              # Locale copy (es.ts, en.ts) + shared.ts
  layouts/
    Layout.astro
  pages/
    index.astro        # Spanish home (/)
    en/
      index.astro      # English home (/en/)
  styles/
    global.css
```

## Site sections

Each locale home page composes the shared shell and includes:

- Hero
- About
- Massages
- Rituals / bonos
- FAQ, reviews
- Contact
- Footer, mobile action bar, booking modal, and page scripts

## Content and configuration

- Locale copy and metadata live in `src/data/site/` (`es.ts`, `en.ts`, `shared.ts`)
- Global layout and head metadata live in `src/layouts/Layout.astro`
- Global styles live in `src/styles/global.css`
- The migration reference used for the Astro rebuild is documented in `astro-migration-context.md`

## Development notes

- Routes are locale URLs (`/` and `/en/`), not a client-only language swap.
- The layout self-hosts Noto fonts via `@fontsource`, loads Font Awesome from CDN, and uses an inline theme script for dark mode initialization.
- Booking options, pricing tiers, and ritual data are built from `src/data/site/`.

## Deploy / SEO

Production origin is **`https://martaorozcoquiro.netlify.app`**. There is no custom domain; that Netlify hostname is intentional, not temporary. See [issue #4](https://github.com/rubensedev/marta-orozco-quiro/issues/4) for the decision and custom-domain migration notes.

Keep these in sync with that origin:

- `astro.config.mjs` — `site`
- `public/robots.txt` — sitemap URL
- `src/layouts/Layout.astro` — canonical and Open Graph / Twitter URLs
- `src/components/SeoJsonLd.astro` — JSON-LD absolute URLs

### Netlify build and caching

Configured in `netlify.toml`:

- Build: `npm run build` → publish `dist`
- HTTP → HTTPS redirect for the Netlify host
- `/_astro/*` and `/assets/*`: `Cache-Control: public, max-age=31536000, immutable` (hashed / static assets)
- HTML (`/*`): security headers only — **no** long-lived `Cache-Control`, so pages stay fresh after deploys

If a custom domain is added later, update `site`, robots, redirects, Search Console, and schema/OG in one coordinated change. Do not treat a future domain as already in place.
