const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/*
 * Vercel exposes these at build time. VERCEL_URL is the deployment-specific
 * host, with no protocol. Neither is a NEXT_PUBLIC_ variable, which is fine —
 * this module is imported only by server code (layout, sitemap, robots,
 * opengraph-image, and the schema/seo helpers those pull in).
 */
const vercelEnv = process.env.VERCEL_ENV;
const vercelUrl = process.env.VERCEL_URL;
const previewUrl =
  vercelEnv && vercelEnv !== "production" && vercelUrl
    ? `https://${vercelUrl}`
    : undefined;

/**
 * A `NEXT_PUBLIC_` variable is inlined during `next build`, so an unset value
 * does not fail at runtime — it bakes `http://localhost:3000` into the
 * prerendered `robots.txt` and `sitemap.xml` and hands them to Google on a
 * green build. Fail the build instead: this is the one misconfiguration whose
 * damage lands outside the app.
 *
 * A Vercel preview is the exception, not a loophole. It has a real origin of
 * its own, nobody has to configure it per branch, and `robots.ts` serves a
 * blanket disallow whenever we are on a fallback origin — so a preview cannot
 * be indexed under the wrong host. A production deploy still has to say what
 * it is.
 */
if (!configuredUrl && !previewUrl && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be set for production builds. Without it the " +
      "sitemap and robots.txt are prerendered with localhost URLs.",
  );
}

export const SITE_URL = configuredUrl ?? previewUrl ?? "http://localhost:3000";

/**
 * Whether `SITE_URL` is the site's real, declared origin rather than a preview
 * or localhost fallback. `robots.ts` keys indexing off this.
 */
export const IS_CANONICAL_ORIGIN = Boolean(configuredUrl);

export const SITE_NAME = "Scalout";

export const SITE_TAGLINE = "Build Your Technology Team, Compliant from Day One";

/**
 * The canonical one-liner. Reuse it **verbatim** everywhere the company is
 * described: the root `metadata.description`, the `Organization` and `WebSite`
 * schema nodes, the LinkedIn company page, the Google Business Profile, and
 * any directory listing.
 *
 * This is not pedantry. Answer engines resolve a brand by corroborating it
 * across independent sources, and "Scalout" sits close enough to ordinary
 * words that differing descriptions invite an engine to hedge or to conflate
 * us with something else. Same wording, same legal name, same address, every
 * time.
 */
export const SITE_DESCRIPTION =
  "Scalout helps international companies build and legally employ technology teams in Southeast Asia. Fully managed employment, compliant from day one.";

export const CONTACT_EMAIL = "hello@scalout.com";

/**
 * Public profiles that verifiably belong to Scalout, emitted as schema.org
 * `sameAs`. This is the half of brand corroboration that is explicit rather
 * than inferred: it names the off-site profiles carrying the same description
 * and asserts they are the same entity.
 *
 * Add the LinkedIn company page, the Google Business Profile, and any
 * directory listing you control. Left empty until the real URLs are
 * confirmed — a wrong `sameAs` is worse than none, because it asserts an
 * identity that isn't ours.
 */
export const SITE_PROFILES: string[] = [];
