import { SITE_ROUTES } from "@/lib/routes";

export type NavItem = {
  label: string;
  href: string;
};

/**
 * Primary navigation, mirroring the Figma pages; labels match the design.
 * Derived from the route table so the nav and the sitemap cannot drift.
 */
export const NAV_ITEMS: NavItem[] = SITE_ROUTES.flatMap((route) =>
  route.navLabel ? [{ label: route.navLabel, href: route.href }] : [],
);

export const CONTACT_HREF = "/contact";
