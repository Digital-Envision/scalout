import { IS_CANONICAL_ORIGIN } from "@/lib/site";

const configuredGaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const configuredClarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
const configuredGtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

/**
 * Whether to load third-party analytics at all.
 *
 * Two conditions, because a hit is only worth recording if it can be
 * attributed to the real site:
 *
 * - `IS_CANONICAL_ORIGIN` — the deploy knows its own declared origin. A Vercel
 *   preview falls back to its per-deployment URL, and its traffic is us, not
 *   visitors. The same signal already keeps previews out of the index in
 *   `robots.ts`; keeping them out of the reports follows from it.
 * - A production build. `.env` sets `NEXT_PUBLIC_SITE_URL` for local work, so
 *   the origin check alone would let `next dev` report as production traffic.
 *
 * Both resolve at build time — `NEXT_PUBLIC_` variables are inlined by
 * `next build` — so this is a compile-time switch, not a runtime one. The one
 * gap it leaves is a local `next build && next start` against a real
 * `NEXT_PUBLIC_SITE_URL`, which will report. Unset the IDs below when
 * exercising a production build locally.
 */
const reportingEnabled =
  IS_CANONICAL_ORIGIN && process.env.NODE_ENV === "production";

/**
 * The GA4 measurement ID (`G-XXXXXXXXXX`) to report against, or `undefined`
 * when analytics should not load. One value rather than an ID plus a separate
 * flag, so the call site cannot render the tag without an ID or assert its way
 * past a missing one.
 *
 * An unset ID is a supported state, not a misconfiguration: the site works
 * without it and simply reports nothing.
 */
export const GA_MEASUREMENT_ID =
  reportingEnabled && configuredGaId ? configuredGaId : undefined;

/**
 * The Microsoft Clarity project ID (a short alphanumeric string, from the
 * Clarity dashboard under Settings > Overview), or `undefined` when the tag
 * should not load. Same shape and same unset-is-fine rule as
 * `GA_MEASUREMENT_ID`, and gated on the same two conditions — session
 * recordings of our own preview deploys are noise, not data.
 */
export const CLARITY_PROJECT_ID =
  reportingEnabled && configuredClarityId ? configuredClarityId : undefined;

/**
 * The Google Tag Manager container ID (`GTM-XXXXXXX`, from the container's
 * Workspace header), or `undefined` when the container should not load. Same
 * shape and same two conditions as the IDs above.
 *
 * GTM sits alongside the two hardcoded tags rather than replacing them, so
 * nothing already reporting depends on a container being configured correctly.
 * The cost of that is double counting: add a GA4 tag inside the container while
 * `NEXT_PUBLIC_GA_ID` is still set and every pageview is sent to the property
 * twice. One path per vendor — either the tag here or the tag in the container.
 */
export const GTM_CONTAINER_ID =
  reportingEnabled && configuredGtmId ? configuredGtmId : undefined;
