# Brand assets

Supplied by Andreas on 2026-09-01. These replaced the placeholder lockup (a blue
rounded "SO"/"S" badge next to the word "Scalout" as text) everywhere it appeared.

| File | Size | Purpose |
|---|---|---|
| `logo.png` | 733×154 | Wordmark, near-black letterforms (`#121212`) + blue swirl. Light backgrounds. |
| `logo-invert.png` | 733×154 | Same lockup, white letterforms + blue swirl. Dark backgrounds. |
| `favicon.png` | 128×128 | The swirl mark on its own. Source for the app icons — not referenced by any component. |

Both wordmarks arrived on a padded 746×250 canvas and were cropped to their alpha
bounding box, so the `height` passed to `BrandMark` maps directly onto the
rendered lockup instead of onto invisible padding. `favicon.png` arrived at
124×128 and was padded to a 128×128 square so it cannot render squashed.

## Where they are used

`src/components/brand-mark.tsx` is the single component; `height` and `invert`
are the only knobs.

| Placement | Height | Variant |
|---|---|---|
| Site header — all 6 main pages | 24px | `logo` |
| Site footer — all 6 main pages | 26px | `logo` |
| Landing header | 24px | `logo` |
| Landing footer (`#060a0f`) | 18px | `logo-invert` |

## App icons

Generated from `favicon.png` with Pillow, written to `src/app/` where Next's
file conventions pick them up automatically — no `<link>` tags are hand-written.

- `favicon.ico` — multi-size (16/32/48), for legacy `/favicon.ico` requests
- `icon.png` — 256×256, transparent; what modern browsers use
- `apple-icon.png` — 180×180 on a white plate with Apple's ~18% safe-area
  padding, since iOS composites transparent icons onto black

Regenerate them from `favicon.png` if the mark ever changes; don't hand-edit the
files in `src/app/`.
