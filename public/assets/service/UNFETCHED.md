# Service page — asset notes

## No image assets

The four side-rail illustrations exported from Figma (`offshore-teams.svg`,
`employer-of-record.svg`, `office-placement.svg`, `recruitment-workforce.svg`)
were removed. They were pale `#E2E8F0` placeholder diagrams that rendered at
roughly the contrast of the page background, two of them were near-identical
hub-and-spoke node graphs, and all four carried `alt=""` — decoration with no
information in it.

They are replaced by `src/app/(site)/_components/service-plates.tsx`: four
diagrams drawn in the (site) data-texture language (hairline rules, JetBrains
Mono field labels, the single brand accent). Each carries something the prose
does not — the engagement spec, the employment chain, the workspace in plan,
and the recruitment process. Being JSX rather than assets, they theme with the
tokens and add nothing to the page weight.

## Photography

The "On the ground" band above the closing CTA uses
`/assets/landing/office-floor.jpg` — see that folder's notes.

## lucide-react (unchanged)

Service badge icons (20px): Code2, ShieldCheck, Building2, Users.
"What is included" checks: Check. Both give `currentColor` theming.
