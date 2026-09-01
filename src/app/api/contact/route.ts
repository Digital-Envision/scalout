import { NextResponse } from "next/server";

// Contact enquiry backend.
//
// Delivers submissions by email via Resend (https://resend.com) using its REST
// API over fetch — no SDK dependency. Configure via environment variables:
//   RESEND_API_KEY      required to actually send email
//   CONTACT_TO_EMAIL    inbox that receives enquiries (default hello@scaleout.sg)
//   CONTACT_FROM_EMAIL  verified sender (default onboarding@resend.dev, testing only)
//
// If RESEND_API_KEY is unset, the enquiry is validated and logged server-side
// and the endpoint still returns success (delivered: false) so the form works
// before email is configured. Swap the `deliver()` body to use any provider
// (SMTP/Nodemailer, SendGrid, a CRM webhook, a DB insert) without touching the
// form.

export const runtime = "nodejs";

type Payload = {
  fullName?: unknown;
  workEmail?: unknown;
  companyName?: unknown;
  country?: unknown;
  rolesNeeded?: unknown;
  teamSize?: unknown;
  message?: unknown;
};

type CleanEnquiry = {
  fullName: string;
  workEmail: string;
  companyName: string;
  country: string;
  /** Landing form only — optional. */
  rolesNeeded: string;
  /** Landing form only — optional. */
  teamSize: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = {
  name: 200,
  email: 320,
  company: 200,
  country: 100,
  roles: 500,
  teamSize: 100,
  message: 5000,
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: Payload): {
  errors: Record<string, string>;
  clean: CleanEnquiry;
} {
  const clean: CleanEnquiry = {
    fullName: str(body.fullName),
    workEmail: str(body.workEmail),
    companyName: str(body.companyName),
    country: str(body.country),
    rolesNeeded: str(body.rolesNeeded),
    teamSize: str(body.teamSize),
    message: str(body.message),
  };
  const errors: Record<string, string> = {};

  if (!clean.fullName) errors.fullName = "Please enter your full name.";
  if (!clean.workEmail) errors.workEmail = "Please enter your work email.";
  else if (!EMAIL_RE.test(clean.workEmail))
    errors.workEmail = "Please enter a valid email address.";
  if (!clean.companyName) errors.companyName = "Please enter your company name.";
  if (!clean.country) errors.country = "Please select a country.";

  if (clean.fullName.length > MAX.name) errors.fullName = "Name is too long.";
  if (clean.workEmail.length > MAX.email) errors.workEmail = "Email is too long.";
  if (clean.companyName.length > MAX.company)
    errors.companyName = "Company name is too long.";
  if (clean.rolesNeeded.length > MAX.roles)
    errors.rolesNeeded = "Roles list is too long.";
  if (clean.teamSize.length > MAX.teamSize)
    errors.teamSize = "Team size is too long.";
  if (clean.message.length > MAX.message)
    errors.message = "Message is too long.";

  return { errors, clean };
}

function renderEmail(e: CleanEnquiry) {
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

// Returns true if the enquiry was actually delivered to an inbox.
async function deliver(enquiry: CleanEnquiry): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@scaleout.sg";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Scalout <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set — enquiry logged but not emailed:",
      enquiry,
    );
    return false;
  }

  const { text, html } = renderEmail(enquiry);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.workEmail,
      subject: `New enquiry — ${enquiry.companyName}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail}`);
  }
  return true;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { errors, clean } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  try {
    const delivered = await deliver(clean);
    return NextResponse.json({ ok: true, delivered });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your enquiry. Please try again or email us directly." },
      { status: 502 },
    );
  }
}
