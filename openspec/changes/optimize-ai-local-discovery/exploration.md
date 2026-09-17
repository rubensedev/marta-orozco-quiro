# Exploration: optimize-ai-local-discovery

**Change**: `optimize-ai-local-discovery`  
**Source**: AI search audit → `/cursor/stores/bc-c7d72091-1e98-4baa-90e1-54bf6d53fcea/docs/ai-search-optimization-audit.md`  
**Rubric**: [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)  
**Branch**: `feat-fixes-and-improvements`  
**Goal**: Improve odds that AI chats / Google generative Search surface this site and/or GBP for “masaje Sevilla” / “massage Seville”.

### Current state (audit snapshot)

- **Strong:** SSG HTML, canonical + hreflang, robots allow, sitemap, FAQ + HealthAndBeautyBusiness JSON-LD graph (`SeoJsonLd.astro`), visible NAP, Place ID `hasMap`, bilingual `/` + `/en/`.
- **GBP:** User short link `maps.app.goo.gl/nS9Yng5LUJSzkG467` and site `HdZVpzvzBEGV6GAZ8` both resolve to **Marta Orozco Quiromasaje** (same feature id / coords).
- **Weak:** Business name drift (GBP **Quiromasaje** vs site ES **Quiromasajista** vs EN **Massage Therapist**); treatment/FAQ copy often commodity; thank-you URLs indexed + in sitemap; uniqueness depth low for local AI grounding; GBP website/categories/reviews only owner-confirmable.

### Affected areas (likely)

- `src/data/site/shared.ts` — `businessInfo.name`, `mapsUrl`, `googleReviewsUrl`
- `src/components/SeoJsonLd.astro` — name/`sameAs` follow shared data (no new AEO hacks)
- `src/data/site/es.ts` / `en.ts` — unique local blocks, optional H1/hero tighten
- Thank-you routes + `Layout` `robots` + `astro.config.mjs` sitemap filter
- Possibly `Reviews` / copy only if switching to real Google excerpts (P2)

### Approaches

| ID | Approach | Pros | Cons | Effort |
|----|----------|------|------|--------|
| A | **Name + Maps URL align only** | Fast entity match web↔GBP | Won’t fix thin content | Low |
| B | **A + thank-you noindex/sitemap exclude** | Removes junk URLs | Doesn’t win local answers alone | Low |
| C | **B + 1–2 unique ES-first local content blocks** (session flow / centro Sevilla) | Matches Google “non-commodity” guidance | Needs Marta-accurate copy | Medium |
| D | New service landing pages per massage type | More URLs | Scaled-content risk; guide discourages query farming | Avoid unless real unique depth |

**Preferred direction for proposal:** **C** (A+B+targeted unique content). Skip llms.txt / chunking / AggregateRating unless review policy locked.

### Out of exploration

- Implementing fixes (apply phase later)
- GBP admin edits (Ruben) — document as external tasks
- Custom domain migration
- Opening a PR as part of this init

### Open questions (blocking before apply)

- Confirm canonical public name: keep GBP **Quiromasaje** and align site, or rename GBP?
- Which Maps short link is canonical for the site (`nS9Y…` vs `HdZV…`)?
- Is Netlify hostname permanent for GBP website field?
- Any real Google review quotes approved for on-site use?
