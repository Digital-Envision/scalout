import { createHmac, randomUUID } from "node:crypto";
import { splitName, type CleanEnquiry } from "./contact-enquiry";

/**
 * Mirrors a website enquiry into Pulse as a CRM Deal.
 *
 * Pulse exposes POST /public/leads for exactly this. The request is
 * authenticated with an HMAC-SHA256 of the raw body under PULSE_SYNC_SECRET,
 * sent in X-Pulse-Signature; Pulse recomputes it over the bytes it received,
 * so the signature and the body must be the same string — hence building the
 * JSON once and reusing it for both.
 *
 * `leadId` is Pulse's idempotency key: it is stored as deals.external_lead_id
 * under a unique index, so a retry of the same submission resolves to the
 * original deal instead of creating a second one.
 */

type PulseLeadResult = { received: boolean; processed: boolean; dealId: string };

/**
 * Pulse has no country field, and Roles/Team/Message are all free text that
 * belongs on the deal, so they are folded into one `notes` block. Labelled
 * lines keep it readable for whoever picks the deal up.
 */
function buildNotes(enquiry: CleanEnquiry): string {
  const sections: string[] = [];
  if (enquiry.country) sections.push(`Country: ${enquiry.country}`);
  if (enquiry.rolesNeeded) sections.push(`Roles needed: ${enquiry.rolesNeeded}`);
  if (enquiry.teamSize) sections.push(`Team size: ${enquiry.teamSize}`);
  if (enquiry.message) sections.push(`Message:\n${enquiry.message}`);
  return sections.join("\n\n");
}

/**
 * Returns null when Pulse is not configured, so a deployment without the
 * integration still accepts enquiries. Throws when it is configured but the
 * call fails — the caller decides whether that should reach the visitor.
 */
export async function syncLeadToPulse(
  enquiry: CleanEnquiry,
): Promise<PulseLeadResult | null> {
  const apiUrl = process.env.PULSE_API_URL;
  const secret = process.env.PULSE_SYNC_SECRET;

  if (!apiUrl || !secret) {
    console.warn(
      "[contact] PULSE_API_URL/PULSE_SYNC_SECRET not set — no CRM deal created.",
    );
    return null;
  }

  const { firstName, lastName } = splitName(enquiry.fullName);
  const body = JSON.stringify({
    leadId: randomUUID(),
    firstName,
    lastName,
    email: enquiry.workEmail,
    companyName: enquiry.companyName,
    source: enquiry.source,
    notes: buildNotes(enquiry),
  });
  const signature = createHmac("sha256", secret).update(body).digest("hex");

  const res = await fetch(`${apiUrl.replace(/\/$/, "")}/public/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Pulse-Signature": signature,
    },
    body,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Pulse responded ${res.status}: ${detail}`);
  }
  return (await res.json()) as PulseLeadResult;
}
