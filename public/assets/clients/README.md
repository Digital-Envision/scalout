# Client logos

Copied verbatim from the VA For Everyone landing project
(`sdt/vafe-landing`, `public/images/lp/clients/`), where they were already the
production client wall. Nothing was re-encoded — the files are byte-identical to
their source, so any future correction should be made there and re-copied.

Fourteen marks, each a uniform **260×140 WebP with a transparent canvas** and the
mark padded inside. That padding is why the display slot is 130×70 and not a
squat 112×40 strip: at 40px tall, `object-contain` fits the *canvas*, and the
mark itself lands around 28px and stops being readable.

| File | Client |
|---|---|
| `ddsn-interactive.webp` | DDSN Interactive |
| `mineral-link.webp` | Mineral Link |
| `it-connexion.webp` | IT Connexion |
| `rocket-lab.webp` | Rocket Lab |
| `dify.webp` | Dify |
| `emcfg.webp` | EMCFG |
| `goalmaker.webp` | Goalmaker Software Solutions |
| `conveyed.webp` | Conveyed |
| `well-balment.webp` | Well Balment |
| `exterior-clean.webp` | Exterior Clean |
| `review-maker-pro.webp` | Review Maker Pro |
| `futurefy.webp` | Futurefy |
| `brava.webp` | Brava — Women in Business |
| `aleksandra-co.webp` | aleksandra + co Buyers' Agency |

The names are the alt text carried over from `vafe-landing`'s own
`ClientLogos.tsx`, not inferred from the artwork.

## Where they are used

`src/components/client-marquee.tsx` is the single component. It holds the list,
the row split, and both variants:

| Route group | Variant | Slot |
|---|---|---|
| `(site)` — home, Standing section | `site` | Flat 130×70, no chrome, full-bleed past the content column |
| `(landing)` — `/offshore-team-indonesia` | `landing` | 130×70 inside a `rounded-lg` white tile, matching that page's card language |

Row one runs left, row two runs right, both pause on hover and sit still under
`prefers-reduced-motion`. The rows are ordered longest engagement first, as
`vafe-landing` had them — not alphabetically.

`loading="eager"` is deliberate. A lazily-loaded image inside a moving track
never intersects the viewport until it is already sliding past, so it arrives
blank and pops in. Fourteen files at roughly 3 KB each is the cheaper trade.
