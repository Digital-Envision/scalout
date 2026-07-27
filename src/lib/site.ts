// Central site config. Set NEXT_PUBLIC_SITE_URL in the deploy environment
// (e.g. https://scalout.com) so canonical URLs, sitemap, and OG tags resolve.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Scalout";
