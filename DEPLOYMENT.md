# Deployment — GitHub + Cloudflare Pages

The site builds to a static `dist/` folder, so it can be hosted free on Cloudflare Pages with
a global edge CDN (fast worldwide), automatic HTTPS, HTTP/3 and Brotli, and automatic
rebuilds on every push.

## 1. Push to GitHub

```bash
# from the project root (already a git repo)
git remote add origin https://github.com/<your-account>/caldwell-safari.git
git branch -M main
git push -u origin main
```

## 2. Create the Cloudflare Pages project

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select the `caldwell-safari` repository.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** set env var `NODE_VERSION = 20` (or newer) if needed.
4. Deploy. Every push to `main` rebuilds; pull requests get preview URLs.

## 3. Custom domain

1. In the Pages project → **Custom domains** → add `www.caldwellsafari.com` and
   `caldwellsafari.com`.
2. Cloudflare will create the DNS records (point the domain's nameservers at Cloudflare if not
   already). The repo includes a `public/CNAME` (`www.caldwellsafari.com`) and the site is
   configured with `site: https://www.caldwellsafari.com` in `astro.config.mjs` — keep these in
   sync if you change the canonical host.
3. Decide on apex vs www as canonical and set a redirect for the other (Cloudflare → Rules →
   Redirect Rules).

## 4. Preserve old URLs (SEO)

The old Wix site used a few paths that may be indexed. Add **Redirect Rules** (301) in
Cloudflare, or a `public/_redirects` file, mapping:

| Old path | New path |
|---|---|
| `/prices-in-usd` | `/prices` |
| `/prices-in-euro` | `/prices` |
| `/hunting-gallery` | `/gallery` |
| `/accomodation` | `/gallery` |

`/about` and `/contact` already match.

`public/_redirects` example:
```
/prices-in-usd    /prices    301
/prices-in-euro   /prices    301
/hunting-gallery  /gallery   301
/accomodation     /gallery   301
```

## 5. Caching & headers

`public/_headers` is already configured: immutable long-cache for hashed `/_astro/*` build
assets and images, plus security headers. Cloudflare auto-minifies and compresses.

---

## Pre-launch content checklist

These items use real data pulled from the existing site, but a few should be confirmed or
supplied by the owner before going live:

- [ ] **Social links** — `src/data/site.ts` `SOCIALS` currently point to the platform home
      pages. Replace with the real Caldwell Facebook / YouTube / Instagram profile URLs.
- [ ] **Trophy fee list** — `src/data/prices.ts` holds a representative selection taken from
      the current site. Confirm the full species list and current rates. (EUR is auto-derived
      from USD at ×0.9, matching the published figures — change the factor in `money()` if the
      exchange basis changes.)
- [ ] **Observer / firearm rates** — the USD page listed these as "enquire"; values shown are
      derived from the EUR figures (observer $150, firearm $150 subject to caliber). Confirm.
- [ ] **Accommodation photos** — only two suitable lodging images existed on the old site.
      Supply a few more high-resolution photos of the farmhouse, chalets, veranda, firepit and
      views; add them to `src/assets/images/` and list them in `src/data/gallery.ts`.
- [ ] **Hero image** — a dramatic cape-buffalo photo is used. Swap in a higher-resolution
      original (or an alternative wide landscape) if available; replace
      `src/assets/images/hero-buffalo.jpg`.
- [ ] **Logo** — header uses a typographic wordmark; switch to the badge logo
      (`src/assets/images/logo.png`) if preferred.

To re-download originals from the old site at any time: `node scripts/fetch-images.mjs`
(writes to `raw-images/`, which is git-ignored).

## Verified

Lighthouse (mobile): Accessibility 100, Best Practices 100, SEO 100. Performance: LCP ≈ 0.7s,
CLS 0.00 (throttled Fast 4G / 4× CPU). No horizontal overflow from 320px to desktop.
