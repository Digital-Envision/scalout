import { NextResponse } from "next/server";
import { validate, type Payload } from "@/lib/contact-enquiry";
import { sendEnquiryEmail } from "@/lib/contact-email";
import { syncLeadToPulse } from "@/lib/pulse-lead";

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

  const { errors, clean } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Both run regardless of how the other fares, but only the email decides what
  // the visitor sees: once the enquiry is in the sales inbox it is not lost, so
  // a failed CRM sync is our problem to chase, not a reason to ask someone to
  // fill the form in again (and risk a duplicate email when they do).
  const [mail, pulse] = await Promise.allSettled([
    sendEnquiryEmail(clean),
    syncLeadToPulse(clean),
  ]);

  if (pulse.status === "rejected") {
    console.error(
      "[contact] Pulse sync failed — enquiry not in the CRM:",
      pulse.reason,
      clean,
    );
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
