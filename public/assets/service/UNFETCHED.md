# Service page — asset notes

## Downloaded (composited SVG exports, one per ServiceBlock illustration)
- `offshore-teams.svg` — Offshore Development Teams network diagram (node 2:1014)
- `employer-of-record.svg` — EOR shield illustration (node 2:1128)
- `office-placement.svg` — Office Placement building illustration (node 2:1226)
- `recruitment-workforce.svg` — Recruitment & Workforce org-node illustration (node 2:1339)

Each export originally contained an opaque `#F5F5F5` full-bleed background rect
(an export artifact from the Figma Icon frame); it was stripped so the
illustration blends into the card's `bg-secondary/30` background as in the design.

## Not downloaded — intentionally substituted with lucide-react (common glyphs)
These are simple, standard line icons; per conventions lucide is used where it
clearly matches, giving `currentColor` theming (brand blue) and crisp sizing:
- Service badge icons (20px): Code2 (Offshore), ShieldCheck (EOR),
  Building2 (Office Placement), Users (Recruitment).
- "What's Included" list checks (16px): CircleCheck.
- Button trailing arrows (16px): ArrowRight.

No assets failed to fetch.
