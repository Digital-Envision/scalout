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
| `Organization` structured data | [`src/app/layout.tsx`](src/app/layout.tsx) |
| Canonical + `og:url` + share card per page | [`src/lib/seo.ts`](src/lib/seo.ts) → `pageSeo("/path")` |
| Routes, nav labels and sitemap dates | [`src/lib/routes.ts`](src/lib/routes.ts) |
| `sitemap.xml` / `robots.txt` | [`src/app/sitemap.ts`](src/app/sitemap.ts), [`src/app/robots.ts`](src/app/robots.ts) |
| 1200×630 share card | [`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx) |
| `FAQPage` structured data | [`src/components/json-ld.tsx`](src/components/json-ld.tsx) |

Two things to know when adding a page:

- Add it to `SITE_ROUTES` and spread `pageSeo("/its-path")` into its `metadata`.
  The route table is the single source for both the nav and the sitemap, so a
  page cannot end up in one and not the other.
- `lastModified` in the route table is a **content** date, maintained by hand.
  Bump it when the copy changes, not when the styling does — crawlers discount
  a `lastmod` that moves on every deploy.

Still open: `SITE_PROFILES` in [`src/lib/site.ts`](src/lib/site.ts) is empty. Add
the LinkedIn company page URL there and it is emitted as schema.org `sameAs`,
which is what ties the site to the entity Google already knows about.

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
