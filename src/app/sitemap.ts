import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SITE_ROUTES } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_ROUTES.map((route) => ({
    url: new URL(route.href, SITE_URL).toString(),
    lastModified: route.lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
