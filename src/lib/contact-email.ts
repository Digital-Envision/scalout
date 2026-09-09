import type { CleanEnquiry } from "./contact-enquiry";

/**
 * Emails an enquiry to the sales inbox via SMTP2GO's HTTP API.
 *
 * The HTTP API is used rather than SMTP because the route runs as a serverless
 * function, where opening an outbound SMTP connection is slow and unreliable.
 * It also keeps this dependency-free — `fetch` is all it takes.
 */

const SMTP2GO_ENDPOINT = "https://api.smtp2go.com/v3/email/send";

export function renderEmail(e: CleanEnquiry) {
  const lines = [
    `Name:    ${e.fullName}`,
    `Email:   ${e.workEmail}`,
    `Company: ${e.companyName}`,
    `Country: ${e.country}`,
    `Roles:   ${e.rolesNeeded || "(none)"}`,
    `Team:    ${e.teamSize || "(none)"}`,
    "",
    "Message:",
    e.message || "(none)",
  ];
  const text = lines.join("\n");
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `
    <h2>New enquiry from the Scalout website</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">
      <tr><td><strong>Name</strong></td><td>${esc(e.fullName)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${esc(e.workEmail)}</td></tr>
      <tr><td><strong>Company</strong></td><td>${esc(e.companyName)}</td></tr>
      <tr><td><strong>Country</strong></td><td>${esc(e.country)}</td></tr>
      <tr><td><strong>Roles needed</strong></td><td>${esc(e.rolesNeeded) || "(none)"}</td></tr>
      <tr><td><strong>Team size</strong></td><td>${esc(e.teamSize) || "(none)"}</td></tr>
    </table>
    <p><strong>Message</strong></p>
    <p style="white-space:pre-wrap;font-family:sans-serif">${esc(e.message) || "(none)"}</p>
  `;
  return { text, html };
}

/**
 * Returns false (rather than throwing) when SMTP2GO is not configured, so a
 * deployment without credentials still accepts and logs enquiries. Throws when
 * SMTP2GO is configured but rejects the send — that is a real failure the
 * caller must surface.
 */
export async function sendEnquiryEmail(
  enquiry: CleanEnquiry,
): Promise<boolean> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@scalout.com";
  const sender = process.env.CONTACT_FROM_EMAIL ?? "Scalout <hello@scalout.com>";

  if (!apiKey) {
    // Deliberately metadata only. An unconfigured key is a deployment fault, and
    // the answer to it is to configure the key — not to accumulate names, work
    // emails and message bodies in stderr where nobody is watching for them.
    console.warn("[contact] SMTP2GO_API_KEY not set — enquiry accepted but not emailed", {
      company: enquiry.companyName,
      source: enquiry.source,
    });
    return false;
  }

  const { text, html } = renderEmail(enquiry);
  const res = await fetch(SMTP2GO_ENDPOINT, {
    method: "POST",
    headers: {
      "X-Smtp2go-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender,
      to: [to],
      subject: `New enquiry — ${enquiry.companyName}`,
      text_body: text,
      html_body: html,
      // SMTP2GO has no dedicated reply-to field; it is set as a custom header.
      custom_headers: [{ header: "Reply-To", value: enquiry.workEmail }],
    }),
  });

  const detail = await res.text().catch(() => "");
  if (!res.ok) {
    throw new Error(`SMTP2GO responded ${res.status}: ${detail}`);
  }

  // SMTP2GO answers 200 even when it accepted nothing — a rejected recipient
  // or an unverified sender comes back as succeeded:0 with the reason in
  // `data.failures`. Treating that as success would silently drop enquiries.
  let parsed: { data?: { succeeded?: number; email_id?: string } } = {};
  try {
    parsed = JSON.parse(detail) as typeof parsed;
  } catch {
    throw new Error(`SMTP2GO returned a non-JSON body: ${detail}`);
  }
  if (!parsed.data?.succeeded) {
    throw new Error(`SMTP2GO accepted no recipients: ${detail}`);
  }

  // Record the id so "did this enquiry ever arrive?" can be traced in SMTP2GO's
  // own logs, past what we keep here.
  console.info(`[contact] emailed enquiry, SMTP2GO id ${parsed.data.email_id}`);
  return true;
}
