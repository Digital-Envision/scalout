# Scalout — Company Profile Website

Next.js 16 (App Router, React 19, Tailwind v4) company profile site.

## Pages

| Route      | Page    | Figma node |
| ---------- | ------- | ---------- |
| `/`        | Home    | `2:2`      |
| `/service` | Service | `2:988`    |
| `/why`     | Why     | `2:1568`   |
| `/about`   | About   | `2:2019`   |
| `/role`    | Role    | `2:2344`   |
| `/contact` | Contact | `2:2819`   |

> The pages currently render scaffold placeholders. They are implemented from
> the Figma design (`figma-design-to-code`) once the Figma file is shared with
> the Figma account connected to the MCP.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (Turbopack)
npm start        # serve the production build
```

`npm run build` requires `NEXT_PUBLIC_SITE_URL` and fails without it. That is
deliberate: it is a `NEXT_PUBLIC_` variable, so it is inlined during the build,
and an unset value would silently prerender `robots.txt` and `sitemap.xml` with
`http://localhost:3000` URLs on an otherwise green build.

```bash
NEXT_PUBLIC_SITE_URL=https://scalout.com npm run build
```

## Contact form

The contact form posts to a route handler at [`/api/contact`](src/app/api/contact/route.ts),
which validates server-side and emails the enquiry via [Resend](https://resend.com)
(REST API, no SDK dependency). Configure with env vars (see [`.env.example`](.env.example)):

```bash
cp .env.example .env.local   # then fill in RESEND_API_KEY
```

- `RESEND_API_KEY` — without it, submissions are still validated and accepted
  (logged server-side, `delivered: false`) so the form works before email is set up.
- `CONTACT_TO_EMAIL` — inbox that receives enquiries.
- `CONTACT_FROM_EMAIL` — a sender on a domain verified in Resend (for production).

To use a different backend (SMTP/Nodemailer, SendGrid, a CRM webhook, a DB insert),
swap the `deliver()` function in the route handler — the form contract is unchanged.

## SEO

Metadata is code, and all of it is prerendered — a wrong value stays wrong until
the next deploy.

| Concern | Where |
|---|---|
| Title template, description, Open Graph and Twitter defaults | [`src/app/layout.tsx`](src/app/layout.tsx) |
| Canonical + `og:url` + share card per page | [`src/lib/seo.ts`](src/lib/seo.ts) → `pageSeo("/path")` |
| Routes, nav labels and sitemap dates | [`src/lib/routes.ts`](src/lib/routes.ts) |
| `sitemap.xml` / `robots.txt` | [`src/app/sitemap.ts`](src/app/sitemap.ts), [`src/app/robots.ts`](src/app/robots.ts) |
| 1200×630 share card | [`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx) |
| All structured data | [`src/lib/schema.ts`](src/lib/schema.ts), rendered by [`src/components/json-ld.tsx`](src/components/json-ld.tsx) |

Two things to know when adding a page:

- Add it to `SITE_ROUTES` and spread `pageSeo("/its-path")` into its `metadata`.
  The route table is the single source for both the nav and the sitemap, so a
  page cannot end up in one and not the other.
- `lastModified` in the route table is a **content** date, maintained by hand.
  Bump it when the copy changes, not when the styling does — crawlers discount
  a `lastmod` that moves on every deploy.

### Structured data

One entity graph, not a pile of loose assertions. The root layout emits
`Organization` and `WebSite`; every page-level node references the
`Organization` by `@id` rather than restating the company.

| Node | Page | Built from |
|---|---|---|
| `Organization`, `WebSite` | every page (root layout) | `src/lib/site.ts` constants |
| `FAQPage` | `/`, `/offshore-team-indonesia` | the arrays the accordions render |
| `Service` ×4 | `/service` | the page's own `services` array |
| `ItemList` | `/role` | the page's own `roles` array |

Every node is derived from the array the page already renders, so the markup
cannot drift from the visible copy — which is a Google penalty, not a cosmetic
problem.

**`/role` uses `ItemList`, never `JobPosting`.** The page lists disciplines
Scalout recruits for, not open vacancies, and its own copy says so.
`JobPosting` markup on non-vacancies violates Google's structured data policy,
and the penalty is removal of the whole site from job results. `JobPosting`
belongs on a real openings page with real roles and `validThrough` dates.

### Saying the same thing everywhere

Answer engines resolve a brand by corroborating it across independent sources,
and "Scalout" is close enough to ordinary words that inconsistent descriptions
invite hedging or conflation. `SITE_DESCRIPTION` in
[`src/lib/site.ts`](src/lib/site.ts) is the canonical one-liner — reuse it
verbatim on LinkedIn, the Google Business Profile and any directory listing,
with the same legal name and address.

Then list those profiles in `SITE_PROFILES`; they are emitted as schema.org
`sameAs`, which makes the corroboration explicit rather than inferred. **It is
currently empty** — the real LinkedIn company URL still needs adding.

### AI crawlers

Allowed, deliberately, and [`src/app/robots.ts`](src/app/robots.ts) says why.
Read the comment there before tightening it: `Google-Extended` governs AI
Overviews and Gemini grounding only, so blocking it removes the site from AI
answers without affecting Search ranking at all.

## Deployment

### Demo — Vercel

Zero-config: import the repo at vercel.com and deploy. Framework auto-detects as
Next.js.

> **ToS note:** Vercel's free **Hobby** plan is for *non-commercial* use. A
> company profile is commercial, so Hobby is only appropriate for a throwaway
> preview. For anything the company keeps online, use the **Pro** plan.

### Production — DigitalOcean

The app builds to a standalone server (`output: "standalone"` in
`next.config.ts`), so it runs anywhere Node or Docker runs.

**App Platform (from GitHub):**

```bash
# edit .do/app.yaml -> set github.repo and github.branch first
doctl apps create --spec .do/app.yaml
```

**Docker (Droplet or App Platform Dockerfile source):**

```bash
docker build -t scalout-web .
docker run -p 8080:8080 scalout-web
```
