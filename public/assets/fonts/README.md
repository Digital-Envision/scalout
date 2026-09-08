# OG render fonts

Static instances of [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
(SIL Open Font License 1.1), pulled from Google Fonts on 2026-09-08.

| File | Weight | Used for |
|---|---|---|
| `PlusJakartaSans-ExtraBold.ttf` | 800 | The headline on the Open Graph card |
| `PlusJakartaSans-Medium.ttf` | 500 | Label and footer rows on the same card |

## Why these exist as files

The site itself loads Plus Jakarta Sans through `next/font/google` in
`src/app/layout.tsx` — nothing on a rendered page uses these.

`src/app/opengraph-image.tsx` renders through Satori, which needs font *bytes*
at render time and cannot reach into the `next/font` cache. Without them the
card falls back to `next/og`'s bundled Geist Regular, which has no bold weight,
so the headline renders at the wrong weight in the wrong typeface.

They live under `public/` because the Dockerfile copies that directory into the
runtime image. The card is prerendered at build time today, so only the build
needs them — but a future change that makes it dynamic would otherwise fail in
production and nowhere else.
