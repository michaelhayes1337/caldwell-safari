# Caldwell Safaris — Website Modernisation Design Spec

**Date:** 2026-06-09
**Author:** Michael Hayes (with Claude)
**Status:** Approved direction; design decisions delegated to implementer

---

## 1. Overview & Goals

Rebuild [caldwellsafari.com](https://www.caldwellsafari.com/) — currently a dated Wix
brochure site — as a **fast, static, premium-feeling** website that keeps its authentic
African **free-range hunting safari** identity while feeling modern, sleek and snappy.

**Primary goals**

1. Premium, modern look & feel that still reads as authentic African safari (warm, earthy,
   family-run — not cold corporate luxury).
2. Fully responsive: large monitors, laptops, tablets, phones.
3. Static output, hosted free on GitHub + Cloudflare, fast for visitors **worldwide**.
4. Clean, tasteful animations; everything fast and snappy.
5. Keep the existing page structure and conversion paths (enquire / book / Zoom consult).

**Success criteria**

- Lighthouse (mobile) ≥ 95 Performance, ≥ 95 Accessibility, ≥ 95 Best Practices, ≥ 95 SEO.
- Largest Contentful Paint < 2.0s on a simulated mobile connection.
- Zero layout shift (CLS ≈ 0); no horizontal scroll at any viewport 320px → 2560px.
- Verified visually in Chrome at phone / tablet / desktop sizes before sign-off.

---

## 2. Brand & Positioning

Caldwell Safaris is a **family-run, free-range hunting outfitter** in South Africa, founded
by Mike Caldwell (qualified PH & outfitter, 1993; respected "Big 5" outfitter) and now
carried forward by his son Jayden Caldwell. The whole brand voice is built on **ethics and
respect** — Jayden's mantra, *"hunt fair and with respect,"* is the emotional core.

**Tone of voice:** warm, honest, grounded, a little reverent about the wild. Premium through
restraint and craft, not flashiness. First-person family storytelling where it fits.

**Audience:** international hunters (US & EU primary — hence USD/EUR pricing) planning a
guided African plains-game / big-game / bow-hunting safari, who value authenticity, ethics
and a personal, stress-free booking experience.

---

## 3. Visual System — "Bushveld Warmth"

### Colour tokens
| Token | Hex | Use |
|---|---|---|
| `--sand` | `#F5EEE1` | Primary light background |
| `--paper` | `#FAF6EE` | Raised surfaces / cards |
| `--ochre` | `#C9A66B` | Primary accent, CTAs, rules |
| `--ochre-deep` | `#B08A4A` | Accent hover / borders on light |
| `--bark` | `#8A6A3B` | Secondary accent, labels |
| `--bushveld` | `#4A5D3A` | Deep green — footer, nav button, dark sections |
| `--bushveld-deep`| `#3A4A2D` | Footer base / overlays |
| `--ink` | `#2A2520` | Primary text on light |
| `--ink-soft` | `#5B5043` | Secondary / body text |
| `--cream` | `#FBF4E6` | Text on dark/green/image |

Contrast checked for WCAG AA: ochre `#C9A66B` always pairs with dark text `#2A2520` (buttons);
green `#4A5D3A` and dark overlays pair with `--cream`.

### Typography
- **Display / headings:** Marcellus (classical serif — elegant, safari-lodge feel).
- **Body / UI:** Mulish (warm, highly legible humanist sans).
- **Self-hosted** via `@fontsource` (no render-blocking third-party requests; better privacy
  & global speed). Only the weights used are shipped, `font-display: swap`.
- **Fluid type scale** with `clamp()` (mobile→desktop), e.g. hero `clamp(2.4rem, 6vw, 4.5rem)`.

### Spacing, layout & shape
- Mobile-first. Content max-width ~1200px; full-bleed media sections allowed to go edge-to-edge.
- Generous vertical rhythm (`section` padding scales with viewport).
- Soft radii (8–14px), restrained shadows, hairline ochre rules as a recurring motif.
- An optional subtle paper/grain texture on sand backgrounds (very low opacity) for warmth.

### Motion principles
Tasteful, fast, purposeful. All motion respects `prefers-reduced-motion`.
- Hero: gentle Ken-Burns scale on the background image + staggered fade-up of kicker →
  headline → subhead → CTAs on load.
- Scroll-reveal: fade + 16–24px translate-up as sections/cards enter the viewport
  (IntersectionObserver), small stagger across grids.
- Sticky nav: transparent over the hero, transitions to solid sand (with shadow) once scrolled.
- Hover: cards lift slightly; images zoom **within** their frame (overflow hidden); buttons
  shift accent.
- Cross-page nav uses Astro **View Transitions** for a snappy, SPA-like cross-fade.
- Durations 200–600ms, easing `cubic-bezier(.2,.7,.2,1)`; nothing slow or bouncy.

---

## 4. Information Architecture

Mirror the existing structure (familiar, SEO-preserving). Routes:

| Page | Route | Notes |
|---|---|---|
| Home | `/` | Full-bleed cinematic hero + overview of everything |
| About | `/about` | The Caldwell story & ethos |
| Prices | `/prices` | Single page with **USD ⇄ EUR currency toggle** (replaces two separate pages) |
| Gallery | `/gallery` | Tabbed: **Hunting** + **Accommodation**, lightbox |
| Contact | `/contact` | Email, WhatsApp/phone, Zoom consult, socials, location |

Global: sticky header nav + prominent footer. 404 page. `robots.txt`, `sitemap.xml`.

> Decision: collapse `prices-in-usd` / `prices-in-euro` into one `/prices` page with a
> client-side currency toggle — less duplication, better UX. 301-friendly: keep anchor links
> working; old paths can be redirected at the Cloudflare layer if they were indexed.

---

## 5. Page-by-page Content & Layout

### Home (`/`)
1. **Hero** — full-bleed landscape photo, transparent nav, kicker "Free-range hunting · South
   Africa", headline ("The wild, the way it was meant to be."), one-line subhead, two CTAs
   (`Plan Your Safari` solid ochre → Contact, `View Pricing` outline → Prices), scroll cue.
2. **Intro / origins teaser** — short warm paragraph (rewritten welcome) + "Read our story"
   → About. Paired with a portrait/bush image.
3. **The hunt** — three cards: Plains Game, Big Game ("Big 5" heritage), Bow Hunting. Icon +
   image + short copy each.
4. **Why Caldwell** — feature strip: Free-range land · Family-run since 1993 · Ethical, fair
   chase · All licenses & permits handled · Airport transfers & full catering.
5. **Gallery teaser** — 4–6 image mosaic → Gallery.
6. **Pricing teaser** — headline rate ("From $250 pp/day, fully catered") + inclusions snapshot
   → Prices.
7. **Consultation CTA** — the Zoom-consult value prop ("Booking a safari can feel daunting…")
   with a `Book a Zoom consult` button.
8. **Final CTA band** (green) + footer.

### About (`/about`)
- Section header + intro.
- **Mike Caldwell** — rewritten origin story (1993 founding, plains game → Big 5, Mozambique
  & Zimbabwe), portrait.
- **The family** — Roz, and the values passed to Jayden, Tristen & Tannah.
- **Jayden Caldwell** — "the future," the mother's tale + Jayden's own first-person statement,
  ending on *"hunt fair and with respect."*
- Ethos callout (free-range, fair chase, conservation/respect).
- CTA to Contact.

### Prices (`/prices`)
- **Currency toggle** USD ⇄ EUR (no reload; remembers choice in `localStorage`).
- **Daily rates** card grid: 1×1, 2×1, Hunting observer, Firearm rental (subject to caliber),
  Self-catering 1×1.
- **What's included / excluded** two-column list.
- **Trophy fees** searchable/sortable table (species + fee; tiered Kudu; "POR" badge for
  Buffalo/Hippo/large Kudu). Built from real data (see Appendix A).
- **Booking terms** ($3,000 / €2,700 deposit; non-refundable but transferable; balance at end).
- CTA: enquire / Zoom consult.

Real figures (USD): 1×1 $350, 2×1 $250, firearm $150 (subject to caliber), self-catering $150;
deposit $3,000. (EUR): 1×1 €315, 2×1 €225, observer €135, self-catering €135; deposit €2,700.

### Gallery (`/gallery`)
- Tabs: **Hunting** / **Accommodation**.
- Responsive CSS columns / grid masonry; lazy-loaded optimised images; accessible lightbox
  (keyboard + focus trap + `Esc`), `prefers-reduced-motion` aware.
- Accommodation tab gets a short intro (1900s farmhouse, wraparound veranda, oregon pine
  floors, firepit/braai, fenced grounds, wilderness views) + images.

### Contact (`/contact`)
- Links only (no backend): email `caldwellsafari@gmail.com`, phone/WhatsApp `+27 76 233 7184`
  (click-to-call + `wa.me` link), **Zoom consultation** button, Facebook / YouTube / Instagram.
- Short reassuring copy + response expectation.
- Location (region, near Johannesburg transfers). Optional lightweight static map image or
  embed placeholder (no heavy third-party JS by default).

---

## 6. Technical Architecture

**Framework:** Astro (latest). Static output (`output: 'static'`). No UI framework — Astro
components + a little vanilla JS (progressive enhancement). Astro ships ~zero JS by default.

**Project structure**
```
src/
  components/   Header, Footer, Hero, SectionReveal, Card, CurrencyToggle,
                TrophyTable, Gallery, Lightbox, CTA, SeoHead, SocialLinks
  layouts/      BaseLayout.astro  (head, fonts, view-transitions, header, footer)
  pages/        index, about, prices, gallery, contact, 404
  content/      copy/data as typed content collections or simple TS data modules
                (prices.ts, trophies.ts, gallery.ts, family.ts)
  styles/       tokens.css (CSS custom properties), global.css, motion.css
  assets/       images/ (source images → processed by astro:assets)
public/         favicon, og image, robots.txt, _headers, CNAME
```

**Key libraries / integrations**
- `astro:assets` (`<Image>` / `<Picture>`) for responsive `srcset`, AVIF/WebP, intrinsic
  dimensions (prevents CLS), lazy by default; hero image `loading="eager"` + `fetchpriority="high"`.
- `@astrojs/sitemap` for `sitemap.xml`; manual `robots.txt`.
- `@fontsource/marcellus`, `@fontsource/mulish` (self-hosted fonts).
- Vanilla JS only: nav scroll state + mobile menu, currency toggle, scroll-reveal
  (IntersectionObserver), gallery lightbox. Tiny, deferred, no framework runtime.
- Astro **View Transitions** (`<ClientRouter />`) for cross-page transitions.

**Data:** pricing & trophy fees live in typed data modules so they're trivial to update;
the currency toggle switches between the USD and EUR datasets.

---

## 7. Performance & Global Delivery

- **Images:** all processed to AVIF + WebP with responsive `srcset`; sized to actual layout;
  hero preloaded; everything below the fold lazy-loaded; explicit width/height for zero CLS.
  Source images pulled from the existing Wix CDN originals and committed to `src/assets`.
- **Fonts:** self-hosted, subset to used weights, `font-display: swap`, preloaded.
- **CSS/JS:** Astro inlines critical CSS and code-splits; minimal JS, deferred.
- **Hosting:** **Cloudflare Pages connected to the GitHub repo** (recommended over GitHub
  Pages): global edge CDN, automatic builds on push, preview deploys per branch, free TLS,
  HTTP/3 + Brotli automatically, easy custom domain.
- **Caching:** `public/_headers` — long-lived immutable caching for hashed assets, sensible
  defaults for HTML. Optional Cloudflare "Polish"/auto-minify left to platform defaults.
- **Domain:** point `caldwellsafari.com` (and `www`) at Cloudflare Pages; keep `www`↔apex
  canonical consistent (CNAME file / Pages custom domain).

---

## 8. Accessibility & SEO

- Semantic landmarks (`header/nav/main/section/footer`), logical heading order, skip-link.
- All images have meaningful `alt`; decorative images `alt=""`.
- Visible focus states; full keyboard support for menu, currency toggle, lightbox.
- Colour contrast AA verified; motion gated by `prefers-reduced-motion`.
- Per-page `<title>`, meta description, canonical, Open Graph + Twitter cards, social share
  image. JSON-LD structured data: `TravelAgency`/`LocalBusiness` (name, area served, contact,
  socials). Sitemap + robots.

---

## 9. Deployment Plan

1. Build Astro site; verify `npm run build` produces clean `dist/`.
2. Push to a new GitHub repo (e.g. `caldwell-safari`).
3. Create a Cloudflare Pages project from the repo — build command `npm run build`,
   output dir `dist`.
4. Add custom domain `caldwellsafari.com` + `www` in Cloudflare Pages; set DNS.
5. (Optional) Cloudflare redirects for old indexed paths (`/prices-in-usd` → `/prices`, etc.).
6. Verify live: Lighthouse, responsive check, broken-link scan.

> The build & repo are produced now; the Cloudflare/GitHub connection and DNS cut-over are
> account actions the owner performs (documented in a `DEPLOYMENT.md`).

---

## 10. Assets & Content

- **Images:** reuse existing photography (downloaded from Wix CDN originals), web-optimised by
  Astro. Where a needed shot is missing (e.g. a strong wide hero), use the best available and
  flag for replacement with a high-res original from the owner.
- **Copy:** rewritten to the premium, warm tone described in §2, grounded in the real family
  story, rates and accommodation details captured in the appendices.
- **Logo:** existing Caldwell Safaris logo (PNG from Wix); re-export crisp on transparent bg.

---

## 11. Out of Scope (now) / Future

- Contact/enquiry **form** and booking calendar (explicitly deferred — links only for v1).
- CMS / blog. Multi-language. Online payments.
- These can be layered on later (Cloudflare Forms / Pages Functions, a "Field Journal" blog,
  Calendly embed) without re-architecting.

---

## Appendix A — Real pricing data (source of truth)

**Daily rates**
| Item | USD (pp/day) | EUR (pp/day) |
|---|---|---|
| 1 hunter × 1 guide | $350 | €315 |
| 2 hunters × 1 guide | $250 | €225 |
| Hunting observer | enquire | €135 |
| Firearm rental (subject to caliber) | $150 | enquire |
| Self-catering (1×1) | $150 | €135 |

**Included:** transfers to/from Johannesburg airport · accommodation, full catering & daily
laundry · licensed professional hunter, skinners & camp staff · all licenses & permits.
**Excluded:** 15% VAT · international airfare · accommodation beyond the contracted period ·
gratuities, personal expenses, phone calls · rifles & ammunition · dipping, shipping & crating
of trophies.

**Trophy fees (sample — USD):** Baboon $400 · Common Blesbuck $550 · White Blesbuck $1,000 ·
Bushbuck $1,450 · Caracal $2,000 · Cape Eland $3,500 · Giraffe $3,500 · Lechwe $3,000 ·
Kudu <55″ $3,500 / 55–60″ $4,250 / >60″ POR · Crocodile $5,500. **POR:** Buffalo, Hippopotamus,
large Kudu. **(EUR sample):** Baboon €360 · Impala €495 · Bushbuck €1,305 · Kudu €3,150–€3,825
(>60″ POR) · Crocodile €4,950 · Buffalo & Hippo POR.

**Booking terms:** deposit $3,000 / €2,700 to confirm; non-refundable but transferable to the
following year; balance of trophy fees & daily rate payable at the end of the safari.

> Note: trophy-fee lists above are partial (as published on the current site). The full species
> list should be confirmed with the owner before launch; the data module is structured to hold
> the complete list.

## Appendix B — Contact & accommodation facts

- **Email:** caldwellsafari@gmail.com · **Phone/WhatsApp:** +27 76 233 7184
- **Socials:** Facebook, YouTube, Instagram · **Zoom** consultations offered.
- **Accommodation:** early-1900s farmhouse — wraparound veranda, original oregon pine flooring,
  fully equipped kitchen, shower room (two showers), separate toilet & basin, two double
  bedrooms, a room with four single beds; a converted barn (kitchen/lounge/sleeping) with
  outdoor ablutions; two additional chalets; outdoor bar + large firepit for bonfires & braais;
  wood-fired water boilers; securely fenced grounds with uninterrupted wilderness views.

## Appendix C — Family facts (for copy)

- **Mike Caldwell:** learned to hunt young with father Trevor in the Eastern Transvaal (now
  Mpumalanga); plains game across Southern Africa; qualified PH & outfitter 1993 → Caldwell
  Safaris founded; expanded to Mozambique & Northern Zimbabwe; respected "Big 5" outfitter;
  married to **Roz** ~32 years; children **Jayden, Tristen, Tannah**.
- **Jayden Caldwell:** raised in the bushveld on his father's hunts; first animal at 10;
  apprentice PH at 16 under Mike; now a full PH carrying the legacy; mantra **"hunt fair and
  with respect."**
