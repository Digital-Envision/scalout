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
