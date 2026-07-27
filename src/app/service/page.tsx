import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CircleCheck,
  Code2,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { CONTACT_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Services",
  description:
    "ScaleOut covers everything international companies need to build and legally employ technology teams — from sourcing engineers to providing workspace, with employment compliance managed throughout.",
};

type Service = {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  illustration: string;
  paragraphs: string[];
  inclusions: string[];
};

const services: Service[] = [
  {
    eyebrow: "Offshore Development Teams",
    title: "Offshore Development Teams",
    icon: Code2,
    illustration: "/assets/service/offshore-teams.svg",
    paragraphs: [
      "ScaleOut builds and manages dedicated technology teams in Indonesia for companies headquartered in Singapore and internationally. From sourcing engineers to managing compliance, we handle the full employment cycle so your offshore team operates as a seamless extension of your business.",
      "Each engagement is scoped to your technical requirements — stack, seniority, and team size — with no minimum headcount and no lock-in beyond what your contract specifies.",
    ],
    inclusions: [
      "Team setup and technical role scoping",
      "Technology talent sourcing across engineering disciplines",
      "Structured evaluation and candidate presentation",
      "Onboarding into ScaleOut's legal employment structure",
      "Ongoing team management and HR support",
      "Payroll, statutory contributions, and compliance managed end to end",
    ],
  },
  {
    eyebrow: "Employer of Record",
    title: "Employer of Record (EOR)",
    icon: ShieldCheck,
    illustration: "/assets/service/employer-of-record.svg",
    paragraphs: [
      "ScaleOut's Employer of Record service runs on its own in-house infrastructure — not through a third-party platform or partner network. ScaleOut is the legal employer of record for your team members, carrying all employer obligations under applicable local law.",
      "This structure means your company has no direct employment exposure in Indonesia. ScaleOut handles contracts, statutory compliance, payroll, and ongoing HR administration, all under a single commercial agreement with you.",
    ],
    inclusions: [
      "ScaleOut as the legal employer — no third-party intermediary",
      "Compliant employment contracts under applicable local law",
      "Statutory registration and all employer obligations managed",
      "Monthly payroll processing with deductions and contributions handled",
      "Benefits administration and leave management",
      "Ongoing compliance monitoring and regulatory updates",
    ],
  },
  {
    eyebrow: "Office Placement",
    title: "Office Placement",
    icon: Building2,
    illustration: "/assets/service/office-placement.svg",
    paragraphs: [
      "For teams that require a physical presence in Indonesia, ScaleOut provides access to ready-to-use workspace as part of the engagement. Office placement is coordinated alongside EOR and payroll — your team has somewhere to work from the start, without you negotiating a separate lease or facilities contract.",
      "This service is available as a standalone arrangement or bundled with ScaleOut's development team and EOR services, depending on your team's requirements.",
    ],
    inclusions: [
      "Access to physical workspace in Indonesia",
      "Flexible space options matched to team size",
      "Ready-configured office facilities",
      "IT infrastructure and connectivity included",
      "Administrative and facilities support on-site",
      "Coordinated with EOR and payroll under one engagement",
    ],
  },
  {
    eyebrow: "Recruitment & Workforce Management",
    title: "Recruitment & Workforce Management",
    icon: Users,
    illustration: "/assets/service/recruitment-workforce.svg",
    paragraphs: [
      "ScaleOut runs a structured recruitment process focused exclusively on technology roles — software engineers, product managers, QA specialists, data practitioners, and related positions. We manage the process from brief through offer, then stay involved as the employment relationship continues.",
      "Workforce management covers the ongoing HR and operational layer: headcount planning, probation oversight, performance process support, and workforce changes — all within the ScaleOut employment structure.",
    ],
    inclusions: [
      "Role scoping and technical brief development",
      "Sourcing across technology-focused talent channels",
      "Screening against technical and cultural requirements",
      "Candidate presentation with structured assessment summaries",
      "Offer management and employment contract coordination",
      "Onboarding and probation period oversight",
      "Ongoing workforce planning and headcount management",
    ],
  },
];

function ServiceIntro({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div>
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/8">
        <Icon className="size-5 text-primary" />
      </div>
      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
        {service.eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        {service.title}
      </h2>
      {service.paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="mt-4 text-sm leading-relaxed text-muted-foreground"
        >
          {paragraph}
        </p>
      ))}
      <Link
        href={CONTACT_HREF}
        className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Talk to our team
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function ServiceInclusions({ service }: { service: Service }) {
  return (
    <div className="rounded-2xl border border-border bg-muted p-7">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        What&apos;s Included
      </p>
      <ul className="mt-5 space-y-3">
        {service.inclusions.map((item) => (
          <li key={item} className="flex gap-3">
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            <span className="text-sm leading-tight text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicePage() {
  return (
    <>
      {/* PageHero — 2:996 */}
      <section className="border-b border-border bg-secondary/50">
        <div className="container-page py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            Our Services
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Four services, one partner.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            ScaleOut covers everything international companies need to build and
            legally employ technology teams — from sourcing engineers to
            providing workspace, with employment compliance managed throughout.
          </p>
        </div>
      </section>

      {/* ServiceBlocks — 2:1010, 2:1124, 2:1222, 2:1335 */}
      {services.map((service, index) => {
        const reversed = index % 2 === 1;
        return (
          <section key={service.title} className="bg-background py-20">
            <div className="container-page">
              <div className="flex min-h-[245px] items-center justify-center rounded-2xl border border-border bg-secondary/30 px-6 py-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.illustration}
                  alt=""
                  width={280}
                  height={180}
                  className="h-[180px] w-[280px] opacity-80"
                />
              </div>
              <div className="mt-10 grid gap-14 md:grid-cols-2">
                <div className={reversed ? "md:order-2" : undefined}>
                  <ServiceIntro service={service} />
                </div>
                <div className={reversed ? "md:order-1" : undefined}>
                  <ServiceInclusions service={service} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Closing CTA — 2:1450 */}
      <section className="bg-primary">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Not sure which service fits?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/70">
            Most engagements combine two or more services. Our team will help you
            identify the right structure for your situation — no commitment
            required.
          </p>
          <div className="mt-8">
            <Link
              href={CONTACT_HREF}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Us
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
