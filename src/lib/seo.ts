import type { Metadata } from "next";

import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/**
 * The share card, described once.
 *
 * `opengraph-image.tsx` renders it and reads its dimensions from here, and
 * `pageSeo` points at it, so the two cannot disagree. It has to be named
 * explicitly rather than left to Next's file convention: a page that declares
 * its own `openGraph` replaces the root object wholesale — Next merges
 * metadata shallowly — and the convention's image goes with it.
 *
 * Bump `?v=` when the card's design changes: social platforms cache by URL,
 * and the file convention's own cache-busting hash is not reachable from here.
 */
export const OG_IMAGE = {
  url: "/opengraph-image?v=1",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: ${SITE_TAGLINE}`,
} as const;

/**
 * Per-page canonical, Open Graph URL and card.
 *
 * `og:url` earns its place alongside `rel=canonical`: LinkedIn and Facebook
 * key their share objects on it, not on the canonical link, so without it
 * every UTM variant of a campaign link becomes a separate object with its own
 * like and share counts.
 *
 * `title` and `description` stay out — Next fills those from the page's own
 * resolved values. Paths are relative; `metadataBase` resolves them.
 */
export function pageSeo(
  path: string,
): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      images: [OG_IMAGE],
    },
  };
}
