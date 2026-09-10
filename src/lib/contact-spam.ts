/**
 * Spam guards for /api/contact — the one unauthenticated endpoint on the site
 * that sends mail on demand. Two cheap filters rather than a CAPTCHA: a
 * honeypot field paired with a fill-time floor, and a per-IP request cap.
 * Neither asks anything of a real visitor.
 */

/**
 * A field the real form renders and never fills. Named like something a form
 * filler would want to complete — a blank `companyWebsite` next to a company
 * name is bait, whereas `leave-this-empty` is a sign to skip it.
 */
export const HONEYPOT_FIELD = "companyWebsite";

/**
 * There is deliberately no "submitted too fast" trap here, and adding one back
 * would be a mistake. The only clock a page can offer is its own, anchored to
 * hydration — and on a slow device hydration finishes *after* the visitor has
 * already filled the fields, so a genuine enquiry can arrive milliseconds
 * later. No floor is low enough to be safe from that and high enough to catch
 * anything: a script posting straight at this endpoint sends no timing at all,
 * and a headless browser that renders the page trips the honeypot instead.
 * A false positive here is a real lead, discarded in silence.
 */

/**
 * Bodies larger than this are refused unread. The longest field a valid
 * enquiry carries is a 5,000-character message, so this is generous by an
 * order of magnitude; it exists because a route handler has no body limit of
 * its own and will happily buffer megabytes on a 0.5 GB instance.
 */
export const MAX_BODY_BYTES = 64 * 1024;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * The limiter lives in this process only. That means it resets on every deploy,
 * and it stops being a real cap the moment `instance_count` in .do/app.yaml
 * goes above 1 — each container would then keep its own count. Both are
 * acceptable for a contact form on a single instance; neither is acceptable
 * silently, so: if you scale the app out, this needs a shared store.
 */
const MAX_TRACKED_IPS = 5000;

/**
 * Whether the honeypot came back with something in it. A visitor cannot see
 * the field, cannot tab to it and cannot type into it, so any content at all
 * arrived from something reading the DOM rather than looking at the page.
 */
export function filledHoneypot(body: unknown): boolean {
  const value =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)[HONEYPOT_FIELD]
      : undefined;
  return typeof value === "string" && value.trim() !== "";
}

/**
 * The visitor's address as the platform saw it. A proxy appends the peer it
 * actually spoke to, so the *rightmost* entry is the one DigitalOcean's load
 * balancer wrote and everything to its left is whatever the client chose to
 * send — taking the first entry would let a caller pick their own rate-limit
 * bucket per request. This holds while DO's balancer is the only hop; put a
 * CDN in front and the rightmost entry becomes the CDN, not the visitor.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded.split(",");
    const last = hops[hops.length - 1]?.trim();
    if (last) return last;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

type Window = { count: number; resetAt: number };

const hits = new Map<string, Window>();

/**
 * Drops expired windows, and if that is not enough to stay under the cap,
 * the oldest entries by insertion order. Bounding the map matters more than
 * bounding it precisely: this runs on a 0.5 GB instance, and an unbounded Map
 * keyed on attacker-chosen addresses is its own denial of service.
 */
function evict(now: number) {
  for (const [ip, window] of hits) {
    if (window.resetAt <= now) hits.delete(ip);
  }
  for (const ip of hits.keys()) {
    if (hits.size < MAX_TRACKED_IPS) break;
    hits.delete(ip);
  }
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

/**
 * Counts one submission against `ip`, in fixed ten-minute windows. Five is far
 * more than a genuine enquiry needs while still leaving room for the form's
 * own retry path, where a visitor resends after a delivery failure.
 */
export function takeToken(ip: string, now: number = Date.now()): RateLimitResult {
  if (hits.size >= MAX_TRACKED_IPS) evict(now);

  const window = hits.get(ip);

  if (!window || window.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (window.count >= MAX_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((window.resetAt - now) / 1000)),
    };
  }

  window.count += 1;
  return { allowed: true };
}
