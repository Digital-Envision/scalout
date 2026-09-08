const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

/**
 * A `NEXT_PUBLIC_` variable is inlined during `next build`, so an unset value
 * does not fail at runtime — it bakes `http://localhost:3000` into the
 * prerendered `robots.txt` and `sitemap.xml` and hands them to Google on a
 * green build. Fail the build instead: this is the one misconfiguration whose
 * damage lands outside the app.
 */
if (!configuredUrl && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be set for production builds. Without it the " +
      "sitemap and robots.txt are prerendered with localhost URLs.",
  );
}

export const SITE_URL = configuredUrl ?? "http://localhost:3000";

export const SITE_NAME = "Scalout";

export const SITE_TAGLINE = "Build Your Technology Team, Compliant from Day One";

export const SITE_DESCRIPTION =
  "Scalout helps international companies build and legally employ technology teams in Southeast Asia. Fully managed employment, compliant from day one.";

export const CONTACT_EMAIL = "hello@scalout.com";

/**
 * Public profiles that verifiably belong to Scalout, used as schema.org
 * `sameAs` to tie the site to the entity Google already knows about. Left
 * empty until the real URLs are confirmed — a wrong `sameAs` is worse than
 * none, because it asserts an identity that isn't ours.
 */
export const SITE_PROFILES: string[] = [];
