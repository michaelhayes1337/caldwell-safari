# Caldwell Safaris Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild caldwellsafari.com as a fast, static, premium Astro site ("Bushveld Warmth" theme) that is fully responsive and ready to deploy on GitHub + Cloudflare Pages.

**Architecture:** Astro static output, zero-framework. Vanilla JS for progressive enhancement (nav, currency toggle, scroll-reveal, lightbox). `astro:assets` for image optimisation, self-hosted fonts via `@fontsource`, Astro View Transitions for snappy navigation. Design tokens in CSS custom properties.

**Tech Stack:** Astro, `@astrojs/sitemap`, `@fontsource/marcellus`, `@fontsource/mulish`, Sharp (bundled with astro:assets). Node 24 / npm.

**Verification model:** Each task's "test" is (a) `npm run build` succeeds with no errors, and (b) the dev server renders correctly. Final tasks verify responsiveness in Chrome (DevTools MCP) at 375/768/1440px and run Lighthouse (targets ≥95 all categories, LCP < 2s, CLS ≈ 0).

**Source of truth for content & data:** `docs/superpowers/specs/2026-06-09-caldwell-safaris-redesign-design.md` (Appendices A–C hold real pricing, contact and family facts).

---

### Task 0: Scaffold project & configuration

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`
- Create: `src/`, `public/` trees

- [ ] **Step 1:** Init Astro minimal (non-interactive) and add deps.

```bash
npm create astro@latest . -- --template minimal --no-install --no-git --skip-houston --typescript strict
npm install
npm install @astrojs/sitemap @fontsource/marcellus @fontsource/mulish
```

- [ ] **Step 2:** Write `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.caldwellsafari.com',
  output: 'static',
  integrations: [sitemap()],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  build: { inlineStylesheets: 'auto' },
});
```

- [ ] **Step 3:** Verify: `npm run build` → expect success, empty-ish site builds.
- [ ] **Step 4:** Commit `chore: scaffold Astro project`.

---

### Task 1: Design tokens, global styles & fonts

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`, `src/styles/motion.css`

- [ ] **Step 1:** `tokens.css` — CSS custom properties from spec §3 (colours, fluid type scale via `clamp()`, spacing scale, radii, shadows, container width, easing/duration vars).
- [ ] **Step 2:** `global.css` — modern reset, `box-sizing`, body bg `--sand`, base typography (Mulish body, Marcellus headings), link/focus-visible styles, `.container`, `.btn`/`.btn-outline`, `.kicker`/`.rule`, section spacing, `img{max-width:100%;height:auto;display:block}`.
- [ ] **Step 3:** `motion.css` — reveal base + `.is-visible` states, hero load animations, hover transitions; wrap all in `@media (prefers-reduced-motion: no-preference)`.
- [ ] **Step 4:** Import fonts + styles in BaseLayout (Task 2). Verify build.
- [ ] **Step 5:** Commit `feat: design tokens and global styles`.

---

### Task 2: Base layout, Header, Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/SocialLinks.astro`, `src/components/SeoHead.astro`
- Create: `src/data/site.ts` (nav, contact, socials constants)

- [ ] **Step 1:** `src/data/site.ts` — export `SITE` (name, tagline, url), `NAV` items, `CONTACT` (email, phone, whatsapp `https://wa.me/27762337184`, zoom), `SOCIALS`.
- [ ] **Step 2:** `SeoHead.astro` — props `{title, description, image?, type?}`; renders title/meta/canonical/OG/Twitter + JSON-LD `TravelAgency`.
- [ ] **Step 3:** `BaseLayout.astro` — `<html lang="en">`, fonts (`@fontsource/...` imports), styles import, `<ClientRouter />` (View Transitions), preconnect/preload hero, `<SeoHead>`, skip-link, `<Header>`, `<main>`/`<slot>`, `<Footer>`.
- [ ] **Step 4:** `Header.astro` — sticky nav, logo, NAV links, "Book Now" button; `data-` hook for transparent-over-hero vs solid; mobile hamburger → slide-in menu. Inline `<script>`: toggle scrolled class on scroll, open/close mobile menu, close on Esc + on view-transition.
- [ ] **Step 5:** `Footer.astro` — green band: brand, quick links, contact, `<SocialLinks>`, copyright.
- [ ] **Step 6:** Temporary `src/pages/index.astro` using BaseLayout. Verify build + dev render.
- [ ] **Step 7:** Commit `feat: base layout, header, footer`.

---

### Task 3: Reusable UI components

**Files:**
- Create: `src/components/Section.astro` (reveal wrapper, optional `variant="sand|paper|green"`), `Hero.astro`, `Card.astro`, `FeatureStrip.astro`, `CtaBand.astro`, `Button.astro`
- Create: `src/scripts/reveal.ts` (IntersectionObserver scroll-reveal, re-inits on `astro:page-load`)

- [ ] **Step 1:** `reveal.ts` — observe `[data-reveal]`, add `.is-visible`, respect reduced-motion, support `data-reveal-delay`. Hook `astro:page-load` so it works with View Transitions.
- [ ] **Step 2:** `Hero.astro` — props `{image, alt, kicker, heading, sub, primaryCta, secondaryCta}`; full-bleed `<Image>` (eager, high priority) + gradient overlay + content + scroll cue; staggered load animation classes.
- [ ] **Step 3:** `Card.astro`, `FeatureStrip.astro`, `CtaBand.astro`, `Button.astro`, `Section.astro` per spec styling.
- [ ] **Step 4:** Verify build. Commit `feat: reusable components`.

---

### Task 4: Image assets pipeline

**Files:**
- Create: `src/assets/images/` (downloaded originals), `scripts/fetch-images.mjs` (one-off downloader), `public/og-image.jpg`, `public/favicon.svg`

- [ ] **Step 1:** `scripts/fetch-images.mjs` — download the Wix CDN originals (hero, gallery, accommodation, logo) by base URL (strip the `/v1/fill/...` transform) into `src/assets/images/`. Log any failures.
- [ ] **Step 2:** Run `node scripts/fetch-images.mjs`; confirm files land; manually flag any missing/low-res for owner replacement in DEPLOYMENT.md.
- [ ] **Step 3:** Create `src/data/gallery.ts` — arrays for `hunting[]` and `accommodation[]` referencing imported assets with alt text.
- [ ] **Step 4:** Commit `feat: image assets and gallery data`.

---

### Task 5: Home page (`/`)

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1:** Compose sections per spec §5 (hero → origins teaser → the hunt (3 cards) → why-Caldwell strip → gallery teaser → pricing teaser → Zoom-consult CTA → CTA band). Use rewritten premium copy grounded in Appendix C.
- [ ] **Step 2:** All below-fold images lazy; hero eager. Add `data-reveal` to sections.
- [ ] **Step 3:** Verify build + dev render at desktop and mobile widths.
- [ ] **Step 4:** Commit `feat: home page`.

---

### Task 6: About page (`/about`)

**Files:**
- Create: `src/pages/about.astro`, `src/data/family.ts`

- [ ] **Step 1:** `family.ts` — structured Mike / Roz / Jayden copy (rewritten, warm, first-person where the source is first-person), ending ethos "hunt fair and with respect."
- [ ] **Step 2:** Build alternating image/text sections + ethos callout + CTA. Verify build.
- [ ] **Step 3:** Commit `feat: about page`.

---

### Task 7: Prices page (`/prices`) — data, currency toggle, trophy table

**Files:**
- Create: `src/data/prices.ts`, `src/pages/prices.astro`, `src/components/CurrencyToggle.astro`, `src/components/TrophyTable.astro`
- Create: `src/scripts/currency.ts`

- [ ] **Step 1:** `prices.ts` — typed datasets for USD & EUR: `dailyRates[]`, `included[]`, `excluded[]`, `trophyFees[]` (with tier support + `por: true`), `deposit`, from Appendix A. Single source; render both currencies.
- [ ] **Step 2:** `currency.ts` — toggle `data-currency` on `<body>`/root, persist to `localStorage`, default USD; update on `astro:page-load`. CSS shows/hides `[data-cur="usd|eur"]` values.
- [ ] **Step 3:** `CurrencyToggle.astro` — accessible segmented control (radio group, keyboard).
- [ ] **Step 4:** `TrophyTable.astro` — semantic table, POR badge, client-side filter input (filter rows by species name), sortable optional.
- [ ] **Step 5:** `prices.astro` — daily rates grid, included/excluded, trophy table, booking terms, CTA. Verify build + toggle works in dev.
- [ ] **Step 6:** Commit `feat: prices page with currency toggle`.

---

### Task 8: Gallery page (`/gallery`) — tabs + lightbox

**Files:**
- Create: `src/pages/gallery.astro`, `src/components/Gallery.astro`, `src/components/Lightbox.astro`
- Create: `src/scripts/gallery.ts`

- [ ] **Step 1:** `Gallery.astro` — tabbed (Hunting / Accommodation), responsive masonry via CSS columns; each item an optimised `<Image>` (lazy) in an overflow-hidden frame with hover zoom; `<button>` opens lightbox.
- [ ] **Step 2:** `Lightbox.astro` + `gallery.ts` — accessible dialog (focus trap, Esc, arrows, backdrop click), `prefers-reduced-motion` aware; re-init on `astro:page-load`.
- [ ] **Step 3:** Accommodation tab intro copy (Appendix B). Verify build + keyboard nav in dev.
- [ ] **Step 4:** Commit `feat: gallery with tabs and lightbox`.

---

### Task 9: Contact page (`/contact`)

**Files:**
- Create: `src/pages/contact.astro`

- [ ] **Step 1:** Cards/links: email (`mailto:`), phone (`tel:`) + WhatsApp (`wa.me`), Zoom consult button, socials; reassuring copy + response expectation; region/transfers note. No form.
- [ ] **Step 2:** Verify build. Commit `feat: contact page`.

---

### Task 10: SEO, 404, headers, deploy assets

**Files:**
- Create: `src/pages/404.astro`, `public/robots.txt`, `public/_headers`, `public/CNAME`
- Modify: per-page `<SeoHead>` props

- [ ] **Step 1:** Per-page titles/descriptions/OG; JSON-LD in SeoHead. `robots.txt` (allow + sitemap URL). `_headers` (immutable cache for `/_astro/*` & images, sensible HTML caching). `CNAME` = `www.caldwellsafari.com`.
- [ ] **Step 2:** Friendly `404.astro`. Verify build emits `sitemap-index.xml`.
- [ ] **Step 3:** Commit `feat: SEO, 404, caching headers`.

---

### Task 11: Responsive verification in Chrome + Lighthouse

- [ ] **Step 1:** `npm run build && npm run preview` (or `npm run dev`); open via Chrome DevTools MCP.
- [ ] **Step 2:** Resize to 375×812 (phone), 768×1024 (tablet), 1440×900 (desktop), 2560 (wide). Screenshot each page; check: no horizontal scroll, nav/menu works, hero legible, tap targets ≥44px, images crisp, currency toggle + lightbox work.
- [ ] **Step 3:** Run Lighthouse (mobile) on Home & Prices. Record scores; fix regressions (image sizes, alt text, contrast, meta) until ≥95 all categories, LCP <2s, CLS≈0.
- [ ] **Step 4:** Fix issues found; re-verify. Commit `fix: responsive + perf polish`.

---

### Task 12: Docs & finalise

**Files:**
- Create: `README.md`, `DEPLOYMENT.md`

- [ ] **Step 1:** `README.md` — what it is, dev/build commands, structure, where to edit content/prices/images.
- [ ] **Step 2:** `DEPLOYMENT.md` — GitHub repo creation, Cloudflare Pages connect (build `npm run build`, output `dist`), custom domain + DNS, optional old-path redirects, asset-replacement checklist (any flagged low-res photos).
- [ ] **Step 3:** Final `npm run build`. Commit `docs: readme and deployment guide`.

---

## Self-Review

**Spec coverage:** hero/full-bleed ✓(T3,5) · Bushveld palette+type ✓(T1) · all 5 pages ✓(T5–9) · USD/EUR toggle ✓(T7) · gallery tabs+lightbox ✓(T8) · links-only contact ✓(T9) · animations/reduced-motion ✓(T3) · perf/images/fonts ✓(T1,3,4,10) · SEO/sitemap/JSON-LD ✓(T10) · responsive Chrome verify + Lighthouse ✓(T11) · deploy docs ✓(T12). No gaps.

**Placeholder scan:** Real pricing/contact/family data sourced from spec appendices; copy is rewritten during page tasks (not "TODO"). Any genuinely missing high-res photo is explicitly flagged for owner in DEPLOYMENT.md rather than left vague.

**Type consistency:** `data/site.ts`, `data/prices.ts`, `data/family.ts`, `data/gallery.ts` are the named data modules referenced consistently across tasks; `reveal.ts`/`currency.ts`/`gallery.ts` scripts named consistently.
