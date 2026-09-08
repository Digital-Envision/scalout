import type { MetadataRoute } from "next";
import { IS_CANONICAL_ORIGIN, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  /*
   * Preview deployments and local builds run on a fallback origin. Serving
   * them a blanket disallow is what makes that fallback safe: the whole point
   * of the guard in `site.ts` is that the wrong origin must never reach an
   * index, and Vercel's own noindex header is not something to rely on
   * silently.
   */
  if (!IS_CANONICAL_ORIGIN) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    /*
     * AI crawlers are allowed, deliberately.
     *
     * The wildcard admits GPTBot, ClaudeBot, PerplexityBot, Google-Extended
     * and CCBot along with everyone else. For a firm that wants to be named
     * when someone asks an assistant who handles employer-of-record work in
     * Indonesia, that is the answer we want — so it is written down here
     * rather than left as an accident of the default.
     *
     * Before "tightening" this, know what each agent costs. Google-Extended
     * governs AI Overviews and Gemini grounding only; it has no effect on
     * ordinary Search ranking, so blocking it as a reflex removes us from AI
     * answers and gains nothing in return.
     *
     * /api/contact only answers POST, so there is nothing there to index and
     * no reason to spend anyone's crawl budget finding that out.
     */
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
