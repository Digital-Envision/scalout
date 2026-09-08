export type SiteRoute = {
  href: string;
  /** Set when the route also belongs in the primary navigation. */
  navLabel?: string;
  /**
   * Content date, maintained by hand. Build time is not a content date:
   * stamping `new Date()` on every entry told crawlers that all seven pages
   * had been rewritten whenever a stylesheet changed, and crawlers discount a
   * `lastmod` they learn not to trust. Bump a route's date when its copy
   * actually changes.
   */
  lastModified: `${number}-${number}-${number}`;
  priority: number;
};

/**
 * Every indexable route, in one table.
 *
 * This is the single source for both the site navigation and `sitemap.xml`,
 * so a page cannot appear in one and go missing from the other — which is
 * exactly how `/contact` and the landing page fell out of the sitemap when it
 * was generated from the nav alone.
 */
export const SITE_ROUTES: SiteRoute[] = [
  { href: "/", navLabel: "Home", lastModified: "2026-09-02", priority: 1 },
  {
    href: "/service",
    navLabel: "Services",
    lastModified: "2026-09-08",
    priority: 0.8,
  },
  {
    href: "/why",
    navLabel: "Why Scalout",
    lastModified: "2026-09-01",
    priority: 0.8,
  },
  {
    href: "/about",
    navLabel: "About Us",
    lastModified: "2026-09-01",
    priority: 0.8,
  },
  {
    href: "/role",
    navLabel: "Role Availability",
    lastModified: "2026-09-02",
    priority: 0.8,
  },
  // Not in the nav — the header reaches it through its own CTA button.
  { href: "/contact", lastModified: "2026-09-02", priority: 0.7 },
  // Campaign landing page. Indexed deliberately: it targets "offshore team
  // Indonesia", so its copy has to stay distinct from /service or the two
  // compete for the same query.
  {
    href: "/offshore-team-indonesia",
    lastModified: "2026-09-01",
    priority: 0.7,
  },
];
