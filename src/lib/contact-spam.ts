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
 * Nobody types a name, an email, a company and a country in under three
 * seconds. The form measures this itself, from mount to submit, so the number
 * never crosses a clock boundary — comparing a browser timestamp against the
 * server's would make every visitor with a skewed clock a suspect.
 */
const MIN_FILL_MS = 3000;

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

type Signal = "honeypot" | "too-fast";

function field(body: unknown, key: string): unknown {
  return typeof body === "object" && body !== null
    ? (body as Record<string, unknown>)[key]
    : undefined;
}

/**
 * Which automation signal a submission tripped, or null if it looks human.
 * Returning the reason rather than a boolean is what lets the route log it —
 * without that you cannot tell later whether the timing floor is catching bots
 * or catching people who paste their details in fast.
 */
export function automationSignal(body: unknown): Signal | null {
  const honeypot = field(body, HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") return "honeypot";

  // An absent or malformed elapsed time is not evidence of anything: an old
  // cached page, or a client we did not write, would both omit it. Only a
  // number we can read and that is implausibly small counts against a caller.
  const elapsed = field(body, "elapsedMs");
  if (typeof elapsed === "number" && Number.isFinite(elapsed) && elapsed >= 0) {
    if (elapsed < MIN_FILL_MS) return "too-fast";
  }

  return null;
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
