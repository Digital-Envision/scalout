import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  CircleCheckBig,
  Clock,
  Layers,
  Settings,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { LandingFaq, type LandingFaqItem } from "../_components/landing-faq";

export const metadata: Metadata = {
  title: "Build Your Offshore Team in Indonesia",
  description:
    "Build a dedicated team in Indonesia with local recruitment, employment, workspace, and operational support, all through one partner.",
};

/* Content column widths follow the design: 1024px for the grid sections,
   768px for the prose and form sections. */
const WIDE = "mx-auto w-full max-w-[1024px]";
const NARROW = "mx-auto w-full max-w-[768px]";

const BENEFITS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Users,
    title: "Large Talent Market",
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

const ROLE_GROUPS: { title: string; roles: string[] }[] = [
  {
    title: "Customer Operations",
    roles: [
      "Customer service",
      "Email/chat support",
      "Onboarding",
      "Retention support",
    ],
  },
  {
    title: "Back-Office Operations",
    roles: [
      "Order processing",
      "CRM administration",
      "Document/data processing",
      "Operations support",
    ],
  },
  {
    title: "Technical Support",
    roles: [
      "L1 help desk",
      "SaaS/product support",
      "Application support",
      "Ticket management",
    ],
  },
  {
    title: "Specialist Teams",
    roles: [
      "Software development",
      "QA",
      "DevOps",
      "Data",
      "Design",
      "Finance/operations roles",
    ],
  },
];

const STEPS: { number: string; title: string; body: string }[] = [
  {
    number: "01",
    title: "Tell Us What You Need",
    body: "Share the roles, team size, working model, and target start date.",
  },
  {
    number: "02",
    title: "We Build the Setup",
    body: "ScaleOut supports recruitment, employment structure, and workspace requirements.",
  },
  {
    number: "03",
    title: "Your Team Starts Operating",
    body: "The client directs day-to-day work while ScaleOut supports the local operating environment.",
  },
  {
    number: "04",
    title: "Scale as You Grow",
    body: "Add talent, employment support, workspace, and operational services as the team expands.",
  },
];

const WORKSPACE_SUPPORT = [
  "Office / workspace sourcing",
  "Dedicated desks or team areas",
  "Equipment and basic workplace setup",
  "Internet / connectivity coordination",
  "Facilities and local workplace support",
];

const DIFFERENTIATORS = [
  "One local operating partner instead of separate recruitment, EOR, office, and support vendors.",
  "Flexible model — start with a small team and expand as the business case is validated.",
  "Built for companies that want an offshore team, not just a single outsourced task.",
];

/* NOTE: the Figma frame shows the FAQ rows collapsed, so the answers below were
   authored from this page's own copy rather than taken from the design. */
const FAQS: LandingFaqItem[] = [
  {
    question: "Can I hire in Indonesia without setting up a local company?",
    answer:
      "Yes. ScaleOut's Employer of Record support lets you employ team members in Indonesia without establishing a local entity. ScaleOut handles the local employment administration, payroll, HR support, and compliance process, while you continue to manage the day-to-day work and business priorities.",
  },
  {
    question: "Can ScaleOut recruit the team as well?",
    answer:
      "Yes. Recruitment, screening, and team building are part of the talent side of the engagement. You share the roles, team size, working model, and target start date, and ScaleOut builds the shortlist and supports hiring through to onboarding.",
  },
  {
    question: "Can ScaleOut provide office space for the team?",
    answer:
      "Yes. ScaleOut supports office placement and workplace setup, including workspace sourcing, dedicated desks or team areas, equipment, connectivity coordination, and ongoing facilities support, so your team has a practical operating base in Indonesia.",
  },
  {
    question: "Who manages the team day to day?",
    answer:
      "You do. The client directs day-to-day work and priorities, while ScaleOut supports the local operating environment — employment administration, workspace, HR coordination, and ongoing team support.",
  },
  {
    question: "Can we start with a small team?",
    answer:
      "Yes. The model is designed to start small and grow. You can begin with a handful of roles and expand recruitment, employment support, workspace, and operational services as the team scales and the business case is validated.",
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
        "text-2xl leading-8 sm:text-[30px] sm:leading-9 font-bold tracking-[-0.75px] text-foreground " +
        (className ?? "")
      }
    >
      {children}
    </h2>
  );
}

function Hero() {
  return (
    <section className="bg-[#0d1117] px-6 py-24">
      <div className={NARROW + " text-center"}>
        <p className="text-xs font-semibold uppercase leading-4 tracking-[1.8px] text-[#51a2ff]">
          Offshore Teams in Indonesia
        </p>
        <h1 className="mt-5 text-[32px] font-bold leading-[40px] tracking-[-0.8px] text-white sm:text-[48px] sm:leading-[60px] sm:tracking-[-1.2px]">
          Build Your Offshore Team in Indonesia
        </h1>
        <p className="mx-auto mt-6 max-w-[576px] text-lg leading-[29.25px] text-[#cad5e2]">
          Build a dedicated team with local recruitment, employment, workspace,
          and operational support, all through one partner.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#contact"
            className="inline-flex h-[46px] items-center justify-center rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Talk to Our Team
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex h-[46px] items-center justify-center rounded-lg border-[0.8px] border-[rgba(43,127,255,0.6)] px-7 text-sm font-semibold text-[#8ec5ff] transition-colors hover:bg-[rgba(43,127,255,0.1)]"
          >
            See How It Works
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-[#90a1b9]">
          {["Talent", "EOR", "Workspace", "Offshore Operations"].map(
            (label, index) => (
              <span key={label} className="flex items-center gap-3">
                {index > 0 && (
                  <span className="text-base text-[#45556c]" aria-hidden>
                    ·
                  </span>
                )}
                {label}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="bg-white px-6 py-20">
      <div className={WIDE}>
        <SectionHeading className="text-center">
          Why Build Your Offshore Team in Indonesia?
        </SectionHeading>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {BENEFITS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border-[0.8px] border-[rgba(0,0,0,0.09)] bg-[#f9fafb] p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-[#dbeafe]">
                <Icon className="size-5 text-primary" aria-hidden />
              </span>
              <h3 className="mt-4 text-sm font-semibold leading-5 text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-[22.75px] text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="bg-secondary px-6 py-20">
      <div className={WIDE}>
        <SectionHeading className="text-center">
          Everything You Need to Build and Run a Team in Indonesia
        </SectionHeading>
        <p className="mx-auto mt-3 max-w-[672px] text-center text-sm leading-[22.75px] text-muted-foreground">
          Instead of coordinating multiple vendors, ScaleOut supports the full
          offshore setup through one operating partner.
        </p>

        <div className="relative mt-12">
          {/* Connector line runs between the first and last step markers. */}
          <span
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-[22px] hidden h-px bg-[#cbd5e1] md:block"
          />
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="relative flex flex-col items-center px-4 text-center"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-primary">
                  <Icon className="size-5 text-white" aria-hidden />
                </span>
                <p className="mt-4 text-sm font-semibold leading-5 text-foreground">
                  {title}
                </p>
                <p className="mt-1.5 max-w-[224px] text-xs leading-[19.5px] text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Roles() {
  return (
    <section className="bg-white px-6 py-20">
      <div className={WIDE}>
        <SectionHeading className="text-center">
          Roles We Recruit in Indonesia
        </SectionHeading>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {ROLE_GROUPS.map(({ title, roles }) => (
            <div
              key={title}
              className="rounded-xl border-[0.8px] border-[rgba(0,0,0,0.09)] bg-[#f9fafb] p-6"
            >
              <h3 className="text-sm font-semibold leading-5 text-foreground">
                {title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {roles.map((role) => (
                  <li
                    key={role}
                    className="rounded-full bg-[#dbeafe] px-2.5 py-1 text-xs font-semibold leading-4 text-primary"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-[#0d1117] px-6 py-20">
      <div className={WIDE}>
        <h2 className="text-center text-2xl font-bold leading-8 tracking-[-0.75px] text-white sm:text-[30px] sm:leading-9">
          How It Works
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {STEPS.map(({ number, title, body }) => (
            <div key={number}>
              <p className="text-[48px] font-bold leading-[48px] text-primary">
                {number}
              </p>
              <h3 className="mt-4 text-sm font-semibold leading-5 text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-[22.75px] text-[#90a1b9]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmployerOfRecord() {
  return (
    <section className="bg-white px-6 py-16">
      <div className={NARROW}>
        <SectionHeading>
          Hire in Indonesia Without Setting Up a Local Entity
        </SectionHeading>
        <p className="mt-4 max-w-[672px] text-sm leading-[22.75px] text-muted-foreground">
          ScaleOut&apos;s Employer of Record support helps companies employ team
          members in Indonesia while ScaleOut handles the local employment
          administration, payroll, HR support, and compliance process. The client
          continues to manage the employee&apos;s day-to-day work and business
          priorities.
        </p>
      </div>
    </section>
  );
}

function Workspace() {
  return (
    <section className="bg-secondary px-6 py-16">
      <div className={NARROW}>
        <SectionHeading>Need Your Team in a Dedicated Workspace?</SectionHeading>
        <p className="mt-4 text-sm leading-[22.75px] text-muted-foreground">
          ScaleOut supports office placement and workplace setup so your team has
          a practical operating base in Indonesia.
        </p>
        <ul className="mt-7 space-y-3">
          {WORKSPACE_SUPPORT.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <CircleCheckBig className="size-4 shrink-0 text-primary" aria-hidden />
              <span className="text-sm leading-5 text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WhyScaleOut() {
  return (
    <section className="bg-white px-6 py-16">
      <div className={NARROW}>
        <h2 className="text-xl font-bold leading-7 tracking-[-0.5px] text-foreground">
          Why ScaleOut?
        </h2>
        <div className="mt-8 space-y-5">
          {DIFFERENTIATORS.map((item) => (
            <div key={item} className="flex items-start gap-4">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#dbeafe]">
                <CircleCheckBig className="size-3 text-primary" aria-hidden />
              </span>
              <p className="text-sm leading-[22.75px] text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqAndCta() {
  return (
    <section className="bg-secondary px-6 py-20">
      <div className={NARROW}>
        <h2 className="text-2xl font-bold leading-8 tracking-[-0.6px] text-foreground">
          Frequently Asked Questions
        </h2>
        <LandingFaq items={FAQS} />

        <div
          id="contact"
          className="mt-16 scroll-mt-20 rounded-2xl border-[0.8px] border-[rgba(0,0,0,0.09)] bg-white p-6 sm:p-10"
        >
          <h2 className="text-2xl font-bold leading-8 tracking-[-0.6px] text-foreground">
            Ready to Build Your Team in Indonesia?
          </h2>
          <p className="mt-2 text-sm leading-[22.75px] text-muted-foreground">
            Start with the talent you need today and scale the employment,
            workspace, and offshore support around them.
          </p>
          <div className="mt-8">
            <ContactForm variant="landing" submitLabel="Talk to Our Team" />
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
      <WhyScaleOut />
      <FaqAndCta />
    </>
  );
}
