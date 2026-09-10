import { IS_CANONICAL_ORIGIN } from "@/lib/site";

const configuredId = process.env.NEXT_PUBLIC_GA_ID?.trim();

/**
 * Whether to load `gtag.js` at all.
 *
 * Three conditions, because a hit is only worth recording if it can be
 * attributed to the real site:
 *
 * - An ID is configured. Unset is a supported state, not a misconfiguration:
 *   the site works without it and simply reports nothing.
 * - `IS_CANONICAL_ORIGIN` — the deploy knows its own declared origin. A Vercel
 *   preview falls back to its per-deployment URL, and its traffic is us, not
 *   visitors. The same signal already keeps previews out of the index in
 *   `robots.ts`; keeping them out of the reports follows from it.
 * - A production build. `.env` sets `NEXT_PUBLIC_SITE_URL` for local work, so
 *   the origin check alone would let `next dev` report as production traffic.
 *
 * All three resolve at build time — `NEXT_PUBLIC_` variables are inlined by
 * `next build` — so this is a compile-time switch, not a runtime one. The one
 * gap it leaves is a local `next build && next start` against a real
 * `NEXT_PUBLIC_SITE_URL`, which will report. Unset `NEXT_PUBLIC_GA_ID` when
 * exercising a production build locally.
 */
const enabled =
  Boolean(configuredId) &&
  IS_CANONICAL_ORIGIN &&
  process.env.NODE_ENV === "production";

/**
 * The GA4 measurement ID (`G-XXXXXXXXXX`) to report against, or `undefined`
 * when analytics should not load. One value rather than an ID plus a separate
 * flag, so the call site cannot render the tag without an ID or assert its way
 * past a missing one.
 */
export const GA_MEASUREMENT_ID = enabled ? configuredId : undefined;
