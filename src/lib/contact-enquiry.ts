/**
 * The shape of a contact enquiry once it has been validated, plus the
 * validation itself. Shared by the API route, the email sender and the Pulse
 * sync so all three agree on what a submission contains.
 */

/**
 * Which form a submission came from. These slugs are a contract with Pulse —
 * they must stay in sync with SCALOUT_LEAD_PAGES in the Pulse backend's
 * create-public-lead.dto.ts, which rejects anything it does not recognise.
 */
export const ENQUIRY_SOURCES = [
  "scalout-contact",
  "scalout-offshore-team-indonesia",
] as const;

export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];

export type Payload = {
  fullName?: unknown;
  workEmail?: unknown;
  companyName?: unknown;
  country?: unknown;
  rolesNeeded?: unknown;
  teamSize?: unknown;
  message?: unknown;
  source?: unknown;
};

export type CleanEnquiry = {
  fullName: string;
  workEmail: string;
  companyName: string;
  country: string;
  /** Landing form only — optional. */
  rolesNeeded: string;
  /** Landing form only — optional. */
  teamSize: string;
  message: string;
  source: EnquirySource;
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

function isSource(value: unknown): value is EnquirySource {
  return ENQUIRY_SOURCES.includes(value as EnquirySource);
}

export function validate(body: Payload): {
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
    // The source only picks a label and pipeline in Pulse, so an unrecognised
    // value is not worth failing a real enquiry over — fall back to the
    // general contact form rather than rejecting the submission.
    source: isSource(body.source) ? body.source : "scalout-contact",
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

/**
 * Splits the single Full Name field into the first/last pair Pulse's contact
 * record expects. Everything after the first space is the surname, so
 * "Ana Maria Lopez" keeps "Maria Lopez" together rather than dropping it.
 */
export function splitName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}
