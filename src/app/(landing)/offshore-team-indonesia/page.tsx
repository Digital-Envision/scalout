import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronRight,
  CircleCheckBig,
  Clock,
  Layers,
  MapPin,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { LandingFaq, type LandingFaqItem } from "../_components/landing-faq";

export const metadata: Metadata = {
  title: "Build Your Offshore Team in Indonesia",
  description:
    "Build a dedicated team with local recruitment, employment, workspace, and operational support — all through one partner.",
};

/** Figma content column: 1023px inside a 24px gutter (node 2010:2). */
const WIDE = "mx-auto w-full max-w-[1024px]";

const CARD = "rounded-xl border border-[rgba(0,0,0,0.07)] bg-[#f9fafb]";
const ICON_TILE = "flex items-center justify-center rounded-lg bg-[#dbeafe]";
const TAG =
  "rounded-full bg-[#dbeafe] px-2.5 py-0.5 text-xs font-semibold leading-4 text-primary";

/* ---------- Hero (2010:13) ---------- */

const HERO_PROOF = [
  "Local Indonesia Operations",
  "Recruitment + EOR",
  "Workspace Available",
];

const HERO_BADGES: { icon: LucideIcon; label: string; position: string }[] = [
  {
    icon: Users,
    label: "Local Indonesia Team",
    position: "md:absolute md:-top-3 md:-right-4",
  },
  {
    icon: ShieldCheck,
    label: "Employment & Compliance Support",
    position: "md:absolute md:-bottom-3 md:-left-4",
  },
  {
    icon: MapPin,
    label: "Dedicated Workspace Available",
    position: "md:absolute md:bottom-8 md:-right-4",
  },
];

function Hero() {
  return (
    <section className="bg-[#0d1117] px-6 py-24">
      <div className={WIDE + " grid items-center gap-16 md:grid-cols-2"}>
        <div>
          <p className="text-xs font-semibold uppercase leading-4 tracking-[1.8px] text-[#51a2ff]">
            Offshore Teams in Indonesia
          </p>
          <h1 className="mt-5 text-[32px] font-bold leading-[40px] tracking-[-0.8px] text-white sm:text-[48px] sm:leading-[60px] sm:tracking-[-1.2px]">
            Build Your Offshore Team in Indonesia
          </h1>
          <p className="mt-5 max-w-[512px] text-base leading-[26px] text-[#cad5e2]">
            Build a dedicated team with local recruitment, employment,
            workspace, and operational support — all through one partner.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#contact"
              className="inline-flex h-[46px] items-center justify-center rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book a Call
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-[46px] items-center justify-center rounded-lg border border-[rgba(43,127,255,0.5)] px-7 text-sm font-semibold text-[#8ec5ff] transition-colors hover:bg-[rgba(43,127,255,0.1)]"
            >
              See How It Works
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-4 gap-y-3">
            {HERO_PROOF.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 text-xs font-semibold leading-4 text-[#90a1b9]"
              >
                <CircleCheckBig className="size-3 text-[#51a2ff]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[491/368] overflow-hidden rounded-xl">
            <Image
              src="/assets/landing/hero-team.jpg"
              alt="Scalout's Indonesia team together at a company gathering"
              fill
              preload
              sizes="(min-width: 768px) 492px, 100vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl bg-[rgba(13,17,23,0.1)]"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 md:contents">
            {HERO_BADGES.map(({ icon: Icon, label, position }) => (
              <span
                key={label}
                className={
                  "flex h-11 items-center gap-2 rounded-xl bg-white px-3.5 text-xs font-semibold leading-4 text-foreground shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] " +
                  position
                }
              >
                <span className={ICON_TILE + " size-6 rounded-md"}>
                  <Icon className="size-3 text-primary" aria-hidden />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Benefits (2010:66) ---------- */

const BENEFITS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Users,
    title: "Targeted Talent Recruitment",
    body: "Access a broad pool of professionals across customer operations, back-office, technical support, and digital roles.",
  },
  {
    icon: Clock,
    title: "Regional Time-Zone Fit",
    body: "Indonesia provides practical overlap for companies operating across Asia-Pacific.",
  },
  {
    icon: TrendingUp,
    title: "Cost-Efficient Team Building",
    body: "Create additional capacity without carrying the same operating structure as an in-house expansion.",
  },
  {
    icon: Layers,
    title: "Scalable Local Operations",
    body: "Start with a small team and expand recruitment, employment, workspace, and support as headcount grows.",
  },
];

function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={
        "text-2xl font-bold leading-8 tracking-[-0.75px] text-foreground sm:text-[30px] sm:leading-9 " +
        (className ?? "")
      }
    >
      {children}
    </h2>
  );
}

function Benefits() {
  return (
    <section className="bg-white px-6 py-20">
      <div className={WIDE}>
        <SectionHeading>Why Build Your Offshore Team in Indonesia?</SectionHeading>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, body }) => (
            <div key={title} className={CARD + " p-5"}>
              <span className={ICON_TILE + " size-9"}>
                <Icon className="size-[18px] text-primary" aria-hidden />
              </span>
              <h3 className="mt-3 text-sm font-semibold leading-5 text-foreground">
                {title}
              </h3>
              <p className="mt-1.5 text-xs leading-[19.5px] text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-10 h-[220px] overflow-hidden rounded-xl">
          <Image
            src="/assets/landing/office-operations.jpg"
            alt="Scalout team members working together in the Indonesia office"
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[rgba(13,17,23,0.6)] via-[rgba(13,17,23,0.1)] to-transparent"
          />
          <p className="absolute bottom-4 left-5 text-sm font-semibold leading-5 text-white">
            Your team supported locally by Scalout.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pillars (2010:116) ---------- */

const PILLARS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Users,
    title: "Talent",
    body: "Recruitment, screening, and team building.",
  },
  {
    icon: Briefcase,
    title: "Employment",
    body: "Employer of Record, payroll, HR administration, and compliance support.",
  },
  {
    icon: Building2,
    title: "Workspace",
    body: "Office placement, workspace, equipment, connectivity, and facilities.",
  },
  {
    icon: Settings,
    title: "Offshore Operations",
    body: "Ongoing team support, HR coordination, and scaling support.",
  },
];

function Pillars() {
  return (
    <section className="bg-secondary px-6 py-20">
      <div className={WIDE}>
        <SectionHeading className="text-center">
          Everything You Need to Build and Run a Team in Indonesia
        </SectionHeading>
        <p className="mx-auto mt-3 max-w-[576px] text-center text-sm leading-5 text-muted-foreground">
          Instead of coordinating multiple vendors, Scalout supports the full
          offshore setup through one operating partner.
        </p>

        <div className="mx-auto mt-14 flex max-w-[896px] flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-0">
          {PILLARS.map(({ icon: Icon, title, body }, index) => (
            <div key={title} className="flex flex-1 items-start">
              <div className="flex flex-1 flex-col items-center px-2 text-center">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary shadow-[0px_0px_0px_4px_var(--secondary)]">
                  <Icon className="size-5 text-white" aria-hidden />
                </span>
                <p className="mt-4 text-sm font-semibold leading-5 text-foreground">
                  {title}
                </p>
                <p className="mt-1.5 max-w-[208px] text-xs leading-[19.5px] text-muted-foreground">
                  {body}
                </p>
              </div>
              {index < PILLARS.length - 1 && (
                <ArrowRight
                  className="mt-5 hidden size-4 shrink-0 text-[#cbd5e1] sm:block"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs font-semibold leading-4 text-muted-foreground">
          One partner for the full offshore team lifecycle.
        </p>
      </div>
    </section>
  );
}

/* ---------- Roles (2010:188) ---------- */

const ROLE_GROUPS: { title: string; roles: string[] }[] = [
  {
    title: "Customer Operations",
    roles: [
      "Customer service",
      "Customer support",
      "Onboarding",
      "Relationship management",
    ],
  },
  {
    title: "Back-Office Operations",
    roles: [
      "Data processing",
      "CRM administration",
      "Document processing",
      "Operations support",
    ],
  },
  {
    title: "Technical Support",
    roles: ["IT helpdesk", "Application support", "Technical support"],
  },
  {
    title: "Specialist Teams",
    roles: ["Administration", "QA", "Marketing", "HR", "Finance"],
  },
];

function Roles() {
  return (
    <section className="bg-white px-6 py-20">
      <div className={WIDE + " grid gap-12 md:grid-cols-2"}>
        <div>
          <SectionHeading>Roles We Recruit in Indonesia</SectionHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ROLE_GROUPS.map(({ title, roles }) => (
              <div key={title} className={CARD + " p-5"}>
                <h3 className="text-sm font-semibold leading-5 text-foreground">
                  {title}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {roles.map((role) => (
                    <li key={role} className={TAG}>
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[487/366] overflow-hidden rounded-xl">
          <Image
            src="/assets/landing/team-at-work.jpg"
            alt="A Scalout team member at work in the Indonesia office"
            fill
            sizes="(min-width: 768px) 488px, 100vw"
            className="object-cover object-[center_66%]"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works (2010:249) ---------- */

const STEPS: { number: string; title: string; body: string }[] = [
  {
    number: "01",
    title: "Tell Us What You Need",
    body: "Share the roles, team size, working model, and target start date.",
  },
  {
    number: "02",
    title: "We Find the Right Talent",
    body: "Scalout supports recruitment, employment structure, and workspace requirements.",
  },
  {
    number: "03",
    title: "Your Team Starts Operating",
    body: "The client directs day-to-day work while Scalout supports the local operating environment.",
  },
  {
    number: "04",
    title: "Scale With Support",
    body: "Add talent, employment support, workspace, and operational services as the team expands.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-[#0d1117] px-6 py-20">
      <div className={WIDE}>
        <h2 className="text-center text-2xl font-bold leading-8 tracking-[-0.75px] text-white sm:text-[30px] sm:leading-9">
          How It Works
        </h2>

        <div className="mt-14 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-0">
          {STEPS.map(({ number, title, body }, index) => (
            <div key={number} className="flex flex-1 items-start">
              <div className="flex flex-1 flex-col items-center px-3 text-center">
                <span className="flex size-12 items-center justify-center rounded-full border-2 border-primary text-sm font-bold leading-5 text-white">
                  {number}
                </span>
                <h3 className="mt-4 text-sm font-semibold leading-5 text-white">
                  {title}
                </h3>
                <p className="mt-2 max-w-[208px] text-xs leading-[19.5px] text-[#90a1b9]">
                  {body}
                </p>
              </div>
              {index < STEPS.length - 1 && (
                <ChevronRight
                  className="mt-5 hidden size-[18px] shrink-0 text-[#45556c] sm:block"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Employer of Record (2010:298) ---------- */

const EOR_SERVICES = [
  "Payroll",
  "Compliance",
  "HR Administration",
  "Employment",
];

function EorParty({
  eyebrow,
  name,
}: {
  eyebrow: string;
  name: string;
}) {
  return (
    <div className="w-full rounded-xl border-2 border-[rgba(0,0,0,0.08)] bg-[#f9fafb] px-5 py-4 text-center">
      <p className="text-[10px] font-semibold uppercase leading-[15px] tracking-[1px] text-[#94a3b8]">
        {eyebrow}
      </p>
      <p className="mt-1 text-sm font-semibold leading-5 text-foreground">
        {name}
      </p>
    </div>
  );
}

function EorConnector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <span aria-hidden className="h-5 w-px bg-[#cbd5e1]" />
      <span className="rounded-full border border-[rgba(0,0,0,0.09)] bg-white px-2.5 py-0.5 text-[10px] font-semibold leading-[15px] text-muted-foreground">
        {label}
      </span>
      <span aria-hidden className="h-5 w-px bg-[#cbd5e1]" />
    </div>
  );
}

function EmployerOfRecord() {
  return (
    <section className="bg-white px-6 py-20">
      <div className={WIDE + " grid items-center gap-14 md:grid-cols-2"}>
        <div>
          <SectionHeading>
            Hire in Indonesia Without Setting Up a Local Entity
          </SectionHeading>
          <p className="mt-4 max-w-[448px] text-sm leading-[22.75px] text-muted-foreground">
            Scalout&apos;s Employer of Record support helps companies employ team
            members in Indonesia while Scalout handles the local employment
            administration, payroll, HR support, and compliance process. The
            client continues to manage the employee&apos;s day-to-day work and
            business priorities.
          </p>
          <div className="mt-6 rounded-xl border border-[rgba(0,0,0,0.06)] bg-secondary p-4">
            <p className="text-sm font-semibold leading-5 text-foreground">
              You manage the work.
            </p>
            <p className="mt-0.5 text-sm leading-5 text-muted-foreground">
              Scalout manages the employment infrastructure.
            </p>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[320px] flex-col items-center">
          <EorParty eyebrow="Your Company" name="Client" />
          <EorConnector label="Service Agreement" />
          <div className="w-full rounded-xl bg-primary px-5 py-4 text-center">
            <p className="text-[10px] font-semibold uppercase leading-[15px] tracking-[1px] text-[#8ec5ff]">
              Scalout
            </p>
            <p className="mt-1 text-sm font-semibold leading-5 text-white">
              Employer of Record
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
              {EOR_SERVICES.map((service) => (
                <li
                  key={service}
                  className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold leading-[15px] text-white"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <EorConnector label="Employment Contract" />
          <EorParty eyebrow="Indonesian Employee" name="Your Team Member" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Workspace (2010:347) ---------- */

const WORKSPACE_SUPPORT = [
  "Office locations",
  "Equipped workstations",
  "Reliable internet",
  "Meeting rooms",
  "Local operational support",
  "Flexible team capacity",
];

function Workspace() {
  return (
    <section className="bg-secondary px-6 py-20">
      <div className={WIDE + " grid gap-12 md:grid-cols-[358fr_665fr]"}>
        <div>
          <SectionHeading>Need Your Team in a Dedicated Workspace?</SectionHeading>
          <p className="mt-4 text-sm leading-[22.75px] text-muted-foreground">
            Scalout supports office placement and workplace setup so your team
            has a practical operating base in Indonesia.
          </p>
          <ul className="mt-7 space-y-3">
            {WORKSPACE_SUPPORT.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <CircleCheckBig
                  className="size-[15px] shrink-0 text-primary"
                  aria-hidden
                />
                <span className="text-sm leading-5 text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          <div className="relative row-span-2 min-h-[260px] overflow-hidden rounded-xl">
            <Image
              src="/assets/landing/workspace-office.jpg"
              alt="A team meeting in progress in the Indonesia office"
              fill
              sizes="(min-width: 768px) 327px, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src="/assets/landing/workspace-meeting-room.jpg"
              alt="Rows of equipped workstations in the Scalout office"
              fill
              sizes="(min-width: 768px) 327px, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src="/assets/landing/workspace-team.jpg"
              alt="Team members working at their desks in the Scalout office"
              fill
              sizes="(min-width: 768px) 327px, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Case study (2010:392) ---------- */

const CASE_SERVICES = [
  "Recruitment",
  "Employment",
  "Workspace",
  "Local operations",
];

const CASE_STATS = [
  { value: "15", label: "Team Members" },
  { value: "2", label: "Weeks to Launch" },
  { value: "30%", label: "Cost Saving" },
];

function CaseStudy() {
  return (
    <section className="bg-white px-6 py-20">
      <div className={WIDE}>
        <SectionHeading>Teams Built With Scalout</SectionHeading>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)]">
          <div className="grid md:grid-cols-[721fr_300fr]">
            <div className="border-b border-[rgba(0,0,0,0.08)] p-10 md:border-b-0 md:border-r">
              <span className="relative block h-9 w-28 overflow-hidden rounded-lg border border-[rgba(0,0,0,0.07)] bg-secondary">
                <Image
                  src="/assets/landing/client-va.png"
                  alt="VA For Everyone"
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </span>
              <p className="mt-6 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[1.1px] text-muted-foreground">
                Australian Professional Services Company
              </p>
              <p className="mt-2 max-w-[640px] text-lg font-semibold leading-[24.75px] text-foreground">
                Needed an offshore operations team in Indonesia without setting
                up a local entity.
              </p>
              <p className="mt-3 max-w-[512px] text-sm leading-[22.75px] text-muted-foreground">
                Scalout supported the full setup — from initial recruitment
                through to employment infrastructure and workspace placement.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {CASE_SERVICES.map((service) => (
                  <li
                    key={service}
                    className="rounded-full bg-[#dbeafe] px-3 py-1 text-xs font-semibold leading-4 text-primary"
                  >
                    {service}
                  </li>
                ))}
              </ul>
              <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-[rgba(0,0,0,0.07)] pt-6">
                {CASE_STATS.map(({ value, label }) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd>
                      <span className="block text-[30px] font-bold leading-9 text-primary">
                        {value}
                      </span>
                      <span className="mt-0.5 block text-xs font-semibold leading-4 text-muted-foreground">
                        {label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col gap-6 bg-[#f9fafb] p-10">
              <blockquote>
                <p className="text-sm italic leading-[22.75px] text-muted-foreground">
                  Scalout consistently delivers high-quality talent at a
                  competitive cost, with reliable and timely delivery that
                  supports our business needs.
                </p>
                <footer className="mt-4">
                  <p className="text-xs font-semibold leading-4 text-foreground">
                    Viena
                  </p>
                  <p className="text-xs leading-4 text-muted-foreground">
                    OPS Manager, Vafe For Everyone
                  </p>
                </footer>
              </blockquote>
              <div className="relative min-h-[140px] flex-1 overflow-hidden rounded-xl border border-[rgba(0,0,0,0.06)] bg-[#e2e8f0]">
                <Image
                  src="/assets/landing/case-study-team.jpg"
                  alt="The offshore team Scalout built for the client"
                  fill
                  sizes="(min-width: 768px) 220px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Scalout (2010:446) ---------- */

const DIFFERENTIATORS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: MapPin,
    title: "Local Indonesia Operations",
    body: "On-the-ground team for recruitment, workspace, and operations.",
  },
  {
    icon: Briefcase,
    title: "Recruitment + Employment in One Partner",
    body: "No need to coordinate separate vendors for hiring and EOR.",
  },
  {
    icon: Layers,
    title: "Flexible Team Scaling",
    body: "Start small and add headcount, services, and workspace as you grow.",
  },
  {
    icon: Building2,
    title: "Workspace Options",
    body: "Office placement and dedicated workspace support in Indonesia.",
  },
  {
    icon: Settings,
    title: "Ongoing Operational Support",
    body: "Continuous local HR coordination and team support.",
  },
];

const CLIENT_LOGOS = [
  { src: "/assets/landing/client-va.png", name: "VA For Everyone" },
  { src: "/assets/landing/client-upscalix.png", name: "Upscalix" },
  { src: "/assets/landing/client-sdt.png", name: "Surya Digital Teknologi" },
];

function WhyScalout() {
  return (
    <section className="bg-secondary px-6 py-20">
      <div className={WIDE}>
        <h2 className="text-2xl font-bold leading-8 tracking-[-0.6px] text-foreground">
          Why Scalout?
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex gap-3 rounded-xl border border-[rgba(0,0,0,0.07)] bg-white p-4"
            >
              <span className={ICON_TILE + " mt-0.5 size-8 shrink-0"}>
                <Icon className="size-[15px] text-primary" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold leading-4 text-foreground">
                  {title}
                </p>
                <p className="mt-0.5 text-xs leading-[19.5px] text-muted-foreground">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-[rgba(0,0,0,0.08)] pt-10">
          <p className="text-center text-[11px] font-semibold uppercase leading-[16.5px] tracking-[1.1px] text-[#94a3b8]">
            Trusted by teams across
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {CLIENT_LOGOS.map(({ src, name }) => (
              <span
                key={name}
                className="relative block h-10 w-28 overflow-hidden rounded-lg border border-[rgba(0,0,0,0.07)] bg-white"
              >
                <Image
                  src={src}
                  alt={name}
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ (2010:533) ---------- */

const FAQS: LandingFaqItem[] = [
  {
    question: "What is an Employer of Record?",
    answer:
      "An Employer of Record is the legal employer of your team members in Indonesia. Scalout holds the employment contracts and handles payroll, statutory contributions, HR administration, and compliance, so you can build a team locally without establishing your own entity. You continue to direct the day-to-day work.",
  },
  {
    question: "How long does recruitment typically take?",
    answer:
      "It depends on the roles, seniority, and team size. Once you share the brief — roles, team size, working model, and target start date — Scalout builds a shortlist and supports hiring through to onboarding. We give you an indicative timeline for your specific roles during the first conversation.",
  },
  {
    question: "Can we start with one employee?",
    answer:
      "Yes. The model is designed to start small and grow. You can begin with a single hire and expand recruitment, employment support, workspace, and operational services as the team scales and the business case is validated.",
  },
  {
    question: "Can we scale the team later?",
    answer:
      "Yes. Add talent, employment support, workspace, and operational services as the team expands — under the same engagement, without renegotiating from scratch.",
  },
  {
    question: "Where will the team work?",
    answer:
      "Either remotely or from a dedicated workspace, whichever suits you. Scalout supports office placement and workplace setup, including office locations, equipped workstations, reliable internet, meeting rooms, and local operational support.",
  },
  {
    question: "Who manages payroll and compliance?",
    answer:
      "Scalout does. As the Employer of Record, Scalout handles local employment administration, payroll, statutory requirements, HR support, and the ongoing compliance process, while you manage the work and business priorities.",
  },
];

function Faq() {
  return (
    <section className="bg-white px-6 py-20">
      <div className={WIDE}>
        <h2 className="text-2xl font-bold leading-8 tracking-[-0.6px] text-foreground">
          Frequently Asked Questions
        </h2>
        <LandingFaq items={FAQS} />
      </div>
    </section>
  );
}

/* ---------- Closing CTA (2010:581) ---------- */

function ClosingCta() {
  return (
    <section className="bg-[#0d1117] px-6 py-20">
      <div className={WIDE + " grid gap-12 md:grid-cols-2"}>
        <div
          id="contact"
          className="scroll-mt-20 rounded-2xl bg-white p-6 sm:p-8"
        >
          <h2 className="max-w-[424px] text-2xl font-bold leading-8 tracking-[-0.6px] text-foreground">
            Ready to Build Your Team in Indonesia?
          </h2>
          <p className="mt-2 text-sm leading-[22.75px] text-muted-foreground">
            Tell us the roles you need and we&apos;ll help you plan the right
            setup.
          </p>
          <div className="mt-7">
            <ContactForm variant="landing" submitLabel="Book a Call" />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="relative aspect-[487/366] overflow-hidden rounded-xl">
            <Image
              src="/assets/landing/contact-team.jpg"
              alt="A Scalout team member on a call with a client"
              fill
              sizes="(min-width: 768px) 488px, 100vw"
              className="object-cover object-[center_71%]"
            />
          </div>
          <div>
            <p className="text-base font-semibold leading-6 text-white">
              Talk directly with our Indonesia team.
            </p>
            <p className="mt-1 text-sm leading-5 text-[#90a1b9]">
              Based in Indonesia, ready to support your offshore setup.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OffshoreTeamIndonesiaPage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Pillars />
      <Roles />
      <HowItWorks />
      <EmployerOfRecord />
      <Workspace />
      <CaseStudy />
      <WhyScalout />
      <Faq />
      <ClosingCta />
    </>
  );
}
