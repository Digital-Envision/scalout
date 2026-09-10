import { NextResponse } from "next/server";
import { validate, type Payload } from "@/lib/contact-enquiry";
import { sendEnquiryEmail } from "@/lib/contact-email";
import { syncLeadToPulse } from "@/lib/pulse-lead";
import { automationSignal, clientIp, takeToken } from "@/lib/contact-spam";

export const runtime = "nodejs";

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

  // Before validation, so that a flood costs a header read and a map lookup
  // rather than the full parse-and-check path.
  const ip = clientIp(request.headers);
  const limit = takeToken(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many enquiries from this connection. Please wait a few minutes, or email us directly at hello@scalout.com.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  const signal = automationSignal(body);
  if (signal) {
    // The company name, so a discard is recoverable: if this ever fires on a
    // real visitor they get a success screen and nobody gets the lead, and the
    // only way to answer "we filled in your form last week" is a log to search.
    // Stripped of control characters and truncated for the same reason
    // everything else here is — an unvalidated string must not shape a log line.
    const company =
      typeof body.companyName === "string"
        ? body.companyName.replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, 80)
        : "";
    // One formatted string rather than a metadata object: Next's own logger
    // prints a second console argument as "{}", and a log nobody can read is
    // not a recovery path.
    console.warn(
      `[contact] discarded an automated submission (${signal}) from ${company || "an unnamed company"}`,
    );
    // Deliberately the success response, with nothing sent. A bot that gets a
    // clean 200 has no signal to tune against; a 403 tells it exactly which
    // field to leave alone next time.
    return NextResponse.json({ ok: true, delivered: true });
  }

  const { errors, clean } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const [mail, pulse] = await Promise.allSettled([
    sendEnquiryEmail(clean),
    syncLeadToPulse(clean),
  ]);

  if (pulse.status === "rejected") {
    console.error("[contact] Pulse sync failed — enquiry not in the CRM", {
      company: clean.companyName,
      source: clean.source,
      reason: String(pulse.reason),
    });
  }

  if (mail.status === "rejected") {
    console.error("[contact] delivery failed:", mail.reason);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Could not send your enquiry. Please try again or email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: mail.value });
}
