# Deployment — GitHub Pages + Route 53

The site is a static Astro build hosted on **GitHub Pages**, served on a custom subdomain
**`caldwellsafaris.kurocode.com`**. GitHub Pages delivers through a **global CDN (Fastly)**
with free, automatic HTTPS, so international visitors are served from the edge — no separate
CDN is required.

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys automatically on
every push to `main`.

---

## Part 1 — GitHub repository & Pages

1. **Create a new repository** on GitHub, e.g. `caldwell-safari`.
   - A **public** repo is simplest (GitHub Pages is free on public repos). Pages on a *private*
     repo requires a paid GitHub plan (Pro/Team).

2. **Push this project** (run from the project root):
   ```bash
   git remote add origin https://github.com/michaelhayes1337/caldwell-safari.git
   git push -u origin main
   ```
   (The branch is already named `main`.)

3. **Enable Pages with Actions:** repo → **Settings → Pages → Build and deployment →
   Source = “GitHub Actions.”** No branch to pick — the included workflow handles build + deploy.

4. The **Deploy** workflow runs automatically on the push. Watch it under the repo’s
   **Actions** tab; the first successful run publishes the site.

5. **Custom domain:** the build ships a `CNAME` file (`public/CNAME` →
   `caldwellsafaris.kurocode.com`), so GitHub sets the custom domain automatically. You can
   confirm it under **Settings → Pages → Custom domain**.

---

## Part 2 — Route 53 DNS (your kurocode.com AWS account)

In the AWS account where `kurocode.com` is registered:

1. **Route 53 → Hosted zones → `kurocode.com` → Create record.**
2. Create the subdomain record:
   - **Record name:** `caldwellsafaris`
   - **Record type:** `CNAME`
   - **Value:** `michaelhayes1337.github.io`  ← your GitHub **username/org**, not the repo
     (e.g. `kurocode.github.io`). Include the trailing dot if the console requires it.
   - **TTL:** `300`
3. *(Recommended — prevents domain takeover)* **Verify the domain in GitHub:** GitHub →
   **Settings → Pages → “Verify” / Settings → Pages → Verified domains** gives you a TXT record
   like `_github-pages-challenge-michaelhayes1337.kurocode.com`. Add it in Route 53 as a **TXT** record,
   then click Verify.

4. Wait a few minutes for DNS to propagate. GitHub detects the domain and provisions a
   **Let’s Encrypt** certificate automatically.

5. Once the cert is issued, tick **Settings → Pages → “Enforce HTTPS.”**

You should now reach the site at **https://caldwellsafaris.kurocode.com**.

> CLI alternative for step 2 (run in the kurocode.com account; replace `ZONEID` and the GitHub
> account):
> ```bash
> aws route53 change-resource-record-sets --hosted-zone-id ZONEID --change-batch '{
>   "Changes": [{
>     "Action": "UPSERT",
>     "ResourceRecordSet": {
>       "Name": "caldwellsafaris.kurocode.com",
>       "Type": "CNAME",
>       "TTL": 300,
>       "ResourceRecords": [{ "Value": "michaelhayes1337.github.io" }]
>     }
>   }]
> }'
> ```

---

## Updating the site

Edit content/code and push to `main` — the Action rebuilds and redeploys automatically.
Content lives in `src/data/*` (pricing, gallery, contact) and `src/pages/*` (see README).

## Notes

- **CDN / performance:** GitHub Pages → Fastly gives global edge caching + HTTP/2 + free TLS.
  Lighthouse mobile scored 100 a11y/best-practices/SEO; LCP ≈ 0.7s, CLS 0.00.
- **Cache headers** are managed by GitHub Pages (not customisable). Fine for a static brochure
  site; hashed `/_astro/*` assets are still edge-cached.
- **Want your own CloudFront later?** The output is plain static files, so you can put AWS
  CloudFront in front (origin = `michaelhayes1337.github.io`, origin path = `/`, ACM cert,
  Route 53 alias) or move to S3 + CloudFront without changing the site. Not needed for launch.

---

## Pre-launch content checklist

Real data was pulled from the existing site; confirm/supply these before going fully live:

- [ ] **Social links** — `src/data/site.ts` `SOCIALS` point to platform home pages; replace
      with the real Caldwell Facebook / YouTube / Instagram profile URLs.
- [ ] **Trophy fee list** — `src/data/prices.ts` holds the published selection; confirm the full
      species list and current rates. (EUR auto-derives from USD at ×0.9 — change `money()` if
      the basis changes.)
- [ ] **Observer / firearm rates** — derived (observer $150; firearm $150, subject to caliber);
      confirm.
- [ ] **Accommodation photos** — only two suitable lodging images existed; add more
      high-resolution photos to `src/assets/images/` and list them in `src/data/gallery.ts`.
- [ ] **Hero image** — swap in a higher-resolution buffalo (or alternative wide shot) if
      available, replacing `src/assets/images/hero-buffalo.jpg`.
- [ ] **Logo** — header uses a wordmark; switch to `src/assets/images/logo.png` if preferred.

To re-pull originals from the old site: `node scripts/fetch-images.mjs` (writes to the
git-ignored `raw-images/`).
