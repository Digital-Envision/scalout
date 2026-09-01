import type { Metadata } from "next";
import {
  Building2,
  Check,
  Code2,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Cta, CtaBand, PageHero, TextLink } from "@/components/site-kit";
import { CONTACT_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Everything international companies need to build and legally employ technology teams: sourcing engineers, providing workspace, and managing employment compliance throughout.",
};

type Service = {
  id: string;
  short: string;
  title: string;
  icon: LucideIcon;
  illustration: string;
  paragraphs: string[];
  inclusions: string[];
};

const services: Service[] = [
  {
    id: "offshore-development-teams",
    short: "Offshore development teams",
    title: "Offshore development teams",
    icon: Code2,
    illustration: "/assets/service/offshore-teams.svg",
    paragraphs: [
      "Scalout builds and manages dedicated technology teams in Indonesia for companies headquartered in Singapore and internationally. From sourcing engineers to managing compliance, we handle the full employment cycle so your offshore team operates as an extension of your business.",
      "Each engagement is scoped to your technical requirements: stack, seniority, and team size, with no minimum headcount and no lock-in beyond what your contract specifies.",
    ],
    inclusions: [
      "Team setup and technical role scoping",
      "Technology talent sourcing across engineering disciplines",
      "Structured evaluation and candidate presentation",
      "Onboarding into Scalout's legal employment structure",
      "Ongoing team management and HR support",
      "Payroll, statutory contributions, and compliance end to end",
    ],
  },
  {
    id: "employer-of-record",
    short: "Employer of record",
    title: "Employer of record",
    icon: ShieldCheck,
    illustration: "/assets/service/employer-of-record.svg",
    paragraphs: [
      "Our employer-of-record service runs on its own in-house infrastructure, not through a third-party platform or partner network. Scalout is the legal employer of record for your team members, carrying all employer obligations under applicable local law.",
      "That structure means your company has no direct employment exposure in Indonesia. Scalout handles contracts, statutory compliance, payroll, and ongoing HR administration under a single commercial agreement with you.",
    ],
    inclusions: [
      "Scalout as the legal employer, with no intermediary",
      "Compliant employment contracts under applicable local law",
      "Statutory registration and all employer obligations managed",
      "Monthly payroll with deductions and contributions handled",
      "Benefits administration and leave management",
      "Ongoing compliance monitoring and regulatory updates",
    ],
  },
  {
    id: "office-placement",
    short: "Office placement",
    title: "Office placement",
    icon: Building2,
    illustration: "/assets/service/office-placement.svg",
    paragraphs: [
      "For teams that require a physical presence in Indonesia, Scalout provides access to ready-to-use workspace as part of the engagement. Office placement is coordinated alongside EOR and payroll, so your team has somewhere to work from the start.",
      "The service is available as a standalone arrangement or bundled with our development team and EOR services, depending on what your team needs.",
    ],
    inclusions: [
      "Access to physical workspace in Indonesia",
      "Flexible space options matched to team size",
      "Ready-configured office facilities",
      "IT infrastructure and connectivity included",
      "Administrative and facilities support on site",
      "Coordinated with EOR and payroll under one engagement",
    ],
  },
  {
    id: "recruitment",
    short: "Recruitment",
    title: "Recruitment and workforce management",
    icon: Users,
    illustration: "/assets/service/recruitment-workforce.svg",
    paragraphs: [
      "Scalout runs a structured recruitment process focused exclusively on technology roles: software engineers, product managers, QA specialists, data practitioners, and related positions. We manage the process from brief through offer, then stay involved as the employment relationship continues.",
      "Workforce management covers the ongoing HR and operational layer: headcount planning, probation oversight, performance process support, and workforce changes, all within the Scalout employment structure.",
    ],
    inclusions: [
      "Role scoping and technical brief development",
      "Sourcing across technology-focused talent channels",
      "Screening against technical and cultural requirements",
      "Candidate presentation with structured assessment summaries",
      "Offer management and contract coordination",
      "Onboarding and probation period oversight",
      "Ongoing workforce planning and headcount management",
    ],
  },
];

function ServiceBlock({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article id={service.id} className="scroll-mt-28 py-16 first:pt-0">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
        <div>
          <span className="flex size-10 items-center justify-center rounded-[4px] bg-primary/10">
            <Icon className="size-5 text-primary" aria-hidden />
          </span>
          <h2 className="mt-6 text-[26px] font-bold leading-tight tracking-tight text-foreground sm:text-[32px]">
            {service.title}
          </h2>
          {service.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-8">
            <Cta href={CONTACT_HREF} tone="line">
              Talk to us
            </Cta>
          </div>
        </div>

        <div>
          <div className="texture-dither flex h-[168px] items-center justify-center rounded-[4px] border border-rule bg-accent">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.illustration}
              alt=""
              width={220}
              height={140}
              className="h-[140px] w-[220px] opacity-90"
            />
          </div>
          <p className="mt-7 text-[13px] font-bold text-foreground">
            What is included
          </p>
          <ul className="mt-3 border-t border-rule">
            {service.inclusions.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 border-b border-rule py-2.5 text-[13px] leading-snug text-muted-foreground"
              >
                <Check
                  className="mt-px size-3.5 shrink-0 text-primary"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function ServicePage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Four services, one partner."
        lede="Everything you need to build and legally employ a technology team in Indonesia, under one agreement."
        actions={
          <>
            <Cta href={CONTACT_HREF} tone="invert">
              Talk to us
            </Cta>
            <Cta href="/role" tone="outline-ink">
              View roles
            </Cta>
          </>
        }
      />

      <section className="bg-background">
        <div className="container-page grid gap-14 py-20 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:gap-16">
          <nav
            aria-label="Services on this page"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-[13px] font-bold text-foreground">
              On this page
            </p>
            <ul className="mt-4 border-t border-rule">
              {services.map((service) => (
                <li key={service.id} className="border-b border-rule">
                  <a
                    href={`#${service.id}`}
                    className="block py-3 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-primary"
                  >
                    {service.short}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <TextLink href="/why">Compare providers</TextLink>
            </div>
          </nav>

          <div className="divide-y divide-rule">
            {services.map((service) => (
              <ServiceBlock key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which service fits?"
        body="Most engagements combine two or more. Our team will help you identify the right structure, with no commitment required."
        actions={
          <>
            <Cta href={CONTACT_HREF} tone="invert">
              Talk to us
            </Cta>
            <Cta href="/why" tone="outline-ink">
              Compare providers
            </Cta>
          </>
        }
      />
    </>
  );
}
