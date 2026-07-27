import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { NAV_ITEMS } from "@/lib/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_ITEMS.map((item) => ({
    url: new URL(item.href, SITE_URL).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
