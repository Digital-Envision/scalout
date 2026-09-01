# /offshore-team-indonesia — asset notes

Source: Figma node `2010:2` ("LandingPageB") in the Scalout Profile Website file.
The "Teams Built With Scalout" and "Why Scalout?" sections were revised by the
designer in nodes `2012:1062` and `2012:1114`; those supersede `2010:392` /
`2010:446` and are the source of truth for both sections.

## Downloaded photography

Figma serves these behind short-lived `api/mcp/asset` URLs, so each was fetched,
downscaled, and re-encoded as JPEG (quality 78) before being committed. Display
widths come from the design; files are sized for ~2× on those slots.

| File | Figma node | Used in |
|---|---|---|
| `hero-team.jpg` | 2010:45 | Hero — Indonesia team photo (1200×900) |
| `office-operations.jpg` | 2010:113 | Benefits — full-width office strip with gradient caption (1600w) |
| `team-at-work.jpg` | 2010:248 | Roles — team member at a workstation (1200w) |
| `workspace-office.jpg` | 2010:387 | Workspace mosaic, tall left tile (1000w) |
| `workspace-meeting-room.jpg` | 2010:389 | Workspace mosaic, top-right tile (1000w) |
| `workspace-team.jpg` | 2010:391 | Workspace mosaic, bottom-right tile (1000w) |
| `case-study-team.jpg` | 2012:1113 | Case study — team group photo (800w) |
| `contact-team.jpg` | 2010:650 | Closing CTA — team member on a client call (1000w) |

## Client logos (PNG, alpha preserved — do not re-encode as JPEG)

Added with the `2012:*` revision, which replaced the placeholder logo chips with
real marks. Downscaled to 320px on the long edge and shown at 112×40 (40×36 in
the case study) with `object-contain`.

| File | Figma node | Used in |
|---|---|---|
| `client-va.png` | 2012:1070, 2012:1186 | Case-study client logo **and** first "Trusted by" mark |
| `client-upscalix.png` | 2012:1187 | "Trusted by" strip |
| `client-sdt.png` | 2012:1188 | "Trusted by" strip |

`client-va.png` is byte-identical across both Figma exports, so one file serves
both slots. Only the SDT mark carries a legible wordmark; the alt text on the
other two is inferred from project context (VA For Everyone appears in the
testimonial attribution; the "UP" mark is assumed to be Upscalix). **Confirm the
company names before launch** — alt text is the only place they are stated.

`team-at-work.jpg` and `contact-team.jpg` are cropped in the design rather than
centred; the crop is reproduced with `object-position` (`center 66%` and
`center 71%` respectively).

## Not downloaded — substituted with lucide-react

Every icon in this design is a standard monochrome line glyph. Each export was
inspected and matched to its lucide equivalent by path data (not by name), which
keeps `currentColor` theming and crisp sizing, per the convention used on the
other pages:

- Hero trust row + workspace checklist → `CircleCheckBig`
- Hero floating badges → `Users`, `ShieldCheck`, `MapPin`
- Benefit cards → `Users`, `Clock`, `TrendingUp`, `Layers`
- Pillars → `Users`, `Briefcase`, `Building2`, `Settings`; separators → `ArrowRight`
- How It Works separators → `ChevronRight`
- Why Scalout cards → `MapPin`, `Briefcase`, `Layers`, `Building2`, `Settings`
- FAQ row affordance → `ChevronDown`
- Form submit → `ArrowRight`

## Genuinely unfetched — need real content before launch

None on this page. The `2012:*` revision replaced every placeholder the first
version shipped: case-study metrics are now 15 / 2 / 30%, the client logo and
"Trusted by" marks are real assets, and the testimonial is attributed copy
(Viena, OPS Manager, Vafe For Everyone).

Note the home page strip (`public/assets/home/UNFETCHED.md`) still carries five
"Client logo 1–5" placeholders; the three marks committed here could fill it.

## Authored, not from the design

The six FAQ items are shown collapsed in Figma, so no answer copy exists there.
The answers in the page were written to match the questions using this page's own
body copy and the existing FAQ answers on `/` and the previous version of this
page. They should be reviewed before launch.
