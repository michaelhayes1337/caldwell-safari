# Caldwell Safaris

A fast, static, premium website for **Caldwell Safaris** — a family-run, free-range
hunting outfitter in South Africa. Built with [Astro](https://astro.build/), designed in a
warm "Bushveld Warmth" theme, and deployed on **GitHub Pages** (global CDN via Fastly) at
`caldwellsafaris.kurocode.com`.

## Tech

- **Astro** (static output) — near-zero JavaScript.
- Vanilla JS progressive enhancement: sticky/mobile nav, scroll-reveal, currency toggle,
  gallery lightbox. All gated behind `prefers-reduced-motion` and a `js` class so content is
  never hidden if scripts fail.
- `astro:assets` for responsive AVIF/WebP images, self-hosted fonts (`@fontsource`),
  Astro View Transitions, `@astrojs/sitemap`.

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server with HMR  → http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the built dist/ locally
```

## Project structure

```
src/
  components/   Header, Footer, Hero, Section, Card, FeatureStrip, CtaBand,
                CurrencyToggle, TrophyTable, GalleryTabs, SeoHead, SocialLinks
  layouts/      BaseLayout.astro      (head, fonts, view-transitions, header, footer)
  pages/        index, about, prices, gallery, contact, 404
  data/         site.ts (nav/contact/socials), prices.ts, gallery.ts
  scripts/      reveal.ts, currency.ts (gallery + nav scripts live in their components)
  styles/       tokens.css (design tokens), global.css, motion.css
  assets/images/  optimised source photography
public/         favicon.svg, og-image.jpg, robots.txt, CNAME
.github/workflows/deploy.yml   build + deploy to GitHub Pages on push to main
scripts/        fetch-images.mjs  (one-off: re-download source images from the old site)
```

## Editing content

- **Text & copy:** edit the relevant page in `src/pages/`.
- **Navigation, email, phone, WhatsApp, Zoom, socials:** `src/data/site.ts`.
- **Pricing (rates, trophy fees, deposit):** `src/data/prices.ts` — a single source of truth.
  USD is stored and EUR is derived at `× 0.9` (matches the published figures). To change the
  rate or add species, edit this one file.
- **Gallery images & captions:** `src/data/gallery.ts` (drop new files in
  `src/assets/images/` and reference them here).
- **Colours / type / spacing:** `src/styles/tokens.css`.

## Notes

- Currency choice (USD/EUR) is remembered in `localStorage`.
- The brand mark in the header is a typographic wordmark; the original badge logo is available
  at `src/assets/images/logo.png` if preferred.

See **DEPLOYMENT.md** for hosting, custom domain, and a pre-launch content checklist.
