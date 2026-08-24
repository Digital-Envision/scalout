import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  Minus,
  X,
  MapPin,
  ShieldCheck,
  Code2,
  Building2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/app/_components/faq-accordion";

export const metadata: Metadata = {
  title: "Build Your Technology Team, Compliant from Day One",
  description:
    "ScaleOut gives international companies a fully managed, legally compliant path to building technology teams in Indonesia — without establishing a local entity.",
};

/* ---------- Shared building blocks ---------- */

function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.13em] ${className}`}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-[35px]">
      {children}
    </h2>
  );
}

const cardClass = "rounded-xl border border-border bg-muted/60 p-6";

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="bg-background">
      <div className="container-page flex flex-col items-center pt-24 pb-20 text-center sm:pt-28">
        <Eyebrow className="text-primary">Indonesia · Southeast Asia</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.06] tracking-tight text-foreground sm:text-[56px]">
          Build Your Technology Team.{" "}
          <span className="text-primary">Compliant from Day One.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          ScaleOut gives international companies a fully managed, legally
          compliant path to building technology teams in Indonesia — without
          establishing a local entity.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" className="h-10 gap-2 px-5 text-sm">
            Talk to Our Team
            <ArrowRight className="size-4" />
          </Button>
          <Button variant="outline" size="lg" className="h-10 px-5 text-sm">
            Explore Our Services
          </Button>
        </div>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5">
          <span className="size-1.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">
            Formed from the merger of two Indonesia-based operations ·
            Indonesia-incorporated · In-house EOR
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------- By the numbers ---------- */

const stats = [
  "Employees managed",
  "Years of experience",
  "Client companies",
  "Technology roles filled",
];

const clientLogos = [
  "Client logo 1",
  "Client logo 2",
  "Client logo 3",
  "Client logo 4",
  "Client logo 5",
];

function ByTheNumbers() {
  return (
    <section className="border-y border-border bg-muted/60">
      <div className="container-page py-14 text-center">
        <Eyebrow className="text-muted-foreground">By the numbers</Eyebrow>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((label) => (
            <div key={label} className="flex flex-col items-center">
              <p className="text-3xl font-extrabold tracking-tight text-primary">
                —
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {label}
              </p>
              <p className="mt-0.5 text-[10px] italic text-muted-foreground/60">
                placeholder
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Eyebrow className="text-muted-foreground">Trusted by</Eyebrow>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {clientLogos.map((logo) => (
              <div
                key={logo}
                className="flex h-10 w-28 items-center justify-center rounded-md border border-dashed border-border bg-card"
              >
                <span className="text-[10px] italic text-muted-foreground/50">
                  {logo}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[10px] italic text-muted-foreground/50">
            Replace with real client logos before launch
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- The Challenge ---------- */

const challenges = [
  {
    title: "Entity requirement",
    body: "Legally employing someone in another country without a local entity creates direct exposure for your company.",
  },
  {
    title: "Compliance complexity",
    body: "Employment law requirements in Southeast Asia are jurisdiction-specific and change regularly, adding ongoing legal overhead.",
  },
  {
    title: "Accountability gaps",
    body: "Many cross-border employment solutions route through partner platforms, fragmenting who is actually responsible for compliance.",
  },
  {
    title: "Competitive talent market",
    body: "Singapore's technology talent market cannot keep up with demand. Building capacity in the region is a strategic necessity, not a fallback.",
  },
];

function Challenge() {
  return (
    <section className="border-b border-border bg-muted/60">
      <div className="container-page py-20">
        <Eyebrow className="text-primary">The Challenge</Eyebrow>
        <SectionHeading>
          Hiring technology talent across borders is harder than it should be.
        </SectionHeading>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          International companies building technology capacity in Indonesia often
          reach the same decision point. What follows is a set of problems most
          companies underestimate until they are already in the middle of them.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {challenges.map((item) => (
            <div key={item.title} className={cardClass}>
              <p className="text-sm font-bold text-foreground">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Our Solution ---------- */

const coverage = [
  "Offshore development teams, sourced and managed for you",
  "Employer of Record via ScaleOut's own in-house infrastructure",
  "Office space for teams that need a physical presence",
  "Recruitment and ongoing workforce management",
  "Payroll, contributions, and statutory compliance handled end to end",
  "Everything under a single commercial agreement — one partner, one contract",
];

function Solution() {
  return (
    <section className="bg-background">
      <div className="container-page grid gap-16 py-20 lg:grid-cols-2">
        <div>
          <Eyebrow className="text-primary">Our Solution</Eyebrow>
          <SectionHeading>ScaleOut resolves all of it.</SectionHeading>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            ScaleOut is an Indonesia-based platform that bundles everything an
            international company needs to build and legally employ a technology
            team — handled under one commercial agreement, with ScaleOut as the
            single accountable partner throughout.
          </p>
        </div>
        <div>
          <Eyebrow className="text-muted-foreground">What&apos;s covered</Eyebrow>
          <ul className="mt-5 space-y-3">
            {coverage.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 size-[18px] shrink-0 text-primary" />
                <span className="text-sm leading-snug text-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">
              Looking for specific roles?
            </p>
            <Button variant="outline" className="mt-3 h-10 gap-2 px-5 text-sm">
              View Available Roles
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why ScaleOut ---------- */

const reasons = [
  {
    icon: MapPin,
    title: "On-the-ground expertise in Indonesia.",
    body: "ScaleOut operates directly in Indonesia. Our team understands local employment law, statutory requirements, and HR norms from the inside — not through a partner network or remote interpretation.",
  },
  {
    icon: ShieldCheck,
    title: "No third-party hand-offs. Ever.",
    body: "Our EOR system is built and operated in-house. When you engage ScaleOut, ScaleOut is the employer — not a subcontracted provider. That accountability matters when questions arise.",
  },
  {
    icon: Code2,
    title: "Built for tech teams, not generalist hiring.",
    body: "We do not operate a generalist staffing model. Our sourcing, evaluation, and ongoing HR processes are designed specifically for technology roles and the people who fill them.",
  },
];

function WhyScaleOut() {
  return (
    <section className="border-b border-border bg-muted/60">
      <div className="container-page py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow className="text-primary">Why ScaleOut</Eyebrow>
            <SectionHeading>
              The direct path to a compliant technology team.
            </SectionHeading>
          </div>
          <button className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-primary">
            See the full comparison
            <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div key={title} className={cardClass}>
              <div className="flex size-8 items-center justify-center rounded-lg bg-accent">
                <Icon className="size-4 text-primary" />
              </div>
              <p className="mt-4 text-sm font-bold text-foreground">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Who We Serve ---------- */

const markets = [
  "Singapore",
  "Australia",
  "United Kingdom",
  "United States",
  "Japan",
  "South Korea",
  "European Union",
  "New Zealand",
];

function WhoWeServe() {
  return (
    <section className="bg-background">
      <div className="container-page py-20">
        <Eyebrow className="text-primary">Who We Serve</Eyebrow>
        <SectionHeading>Built to serve international businesses.</SectionHeading>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          ScaleOut&apos;s client base spans companies headquartered across
          Asia-Pacific, Europe, and North America that are building or expanding
          their technology teams in Indonesia.
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          {markets.map((market) => (
            <span
              key={market}
              className="rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-semibold text-foreground"
            >
              {market}
            </span>
          ))}
        </div>
        <div className="mt-12 rounded-xl border border-dashed border-border bg-muted/30 px-8 py-10">
          <Eyebrow className="text-muted-foreground">Client testimonials</Eyebrow>
          <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
            Client testimonials will appear here once available. No testimonials
            have been fabricated or included as placeholders — this section will
            be populated with real client feedback before launch.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */

const steps = [
  {
    num: "01",
    title: "Scope Your Engagement",
    body: "We start by understanding your hiring requirements, target roles, team structure, and any compliance considerations.",
  },
  {
    num: "02",
    title: "Build Your Team",
    body: "Talent is sourced, evaluated, and onboarded into ScaleOut's legal employment structure with compliant contracts in place.",
  },
  {
    num: "03",
    title: "Stay in Full Compliance",
    body: "Payroll, statutory contributions, and compliance run continuously. Your team is operational; we manage the employment infrastructure.",
  },
];

function HowItWorks() {
  return (
    <section className="border-b border-border bg-muted/60">
      <div className="container-page py-20">
        <Eyebrow className="text-primary">How It Works</Eyebrow>
        <SectionHeading>Three steps to a running team.</SectionHeading>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-5">
              <span className="font-mono text-[11px] font-black tracking-wider text-primary/30">
                {step.num}
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- EOR infrastructure ---------- */

const eorPoints = [
  {
    title: "No sub-contractors",
    body: "ScaleOut is the single employer of record for your team.",
  },
  {
    title: "Own infrastructure",
    body: "Our EOR system is built in-house, not resold from a platform.",
  },
  {
    title: "Indonesia-based operations",
    body: "Our team operates directly in Indonesia — no proxy intermediary.",
  },
  {
    title: "Full accountability",
    body: "One partner carries the entire employment obligation.",
  },
];

function EorInfrastructure() {
  return (
    <section className="border-y border-primary/15 bg-primary/[0.04]">
      <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            EOR built on our own infrastructure — not a partner platform.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Most employer-of-record providers sub-contract local employment
            through a network of country-specific partners. ScaleOut built and
            operates its own EOR system. When you engage ScaleOut, ScaleOut is
            the employer — fully and directly — with no intermediary in the
            accountability chain.
          </p>
          <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            See how we compare
            <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {eorPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-xl border border-border bg-muted/60 p-4"
            >
              <p className="text-xs font-bold text-foreground">{point.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Our Services ---------- */

const services = [
  {
    icon: Code2,
    kicker: "Offshore Development",
    title: "Offshore Development Teams",
    body: "Build and scale dedicated technology teams in Indonesia, fully employed and managed by ScaleOut.",
  },
  {
    icon: ShieldCheck,
    kicker: "Employer of Record",
    title: "Employer of Record (EOR)",
    body: "ScaleOut employs your people through its own in-house EOR infrastructure — full accountability, no third parties.",
  },
  {
    icon: Building2,
    kicker: "Office Placement",
    title: "Office Placement",
    body: "Physical workspace for teams that need a local presence, coordinated with EOR under one engagement.",
  },
  {
    icon: Users,
    kicker: "Recruitment",
    title: "Recruitment & Workforce Management",
    body: "End-to-end technology talent sourcing and ongoing workforce management within the ScaleOut structure.",
  },
];

function Services() {
  return (
    <section className="bg-background">
      <div className="container-page py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow className="text-primary">Our Services</Eyebrow>
            <SectionHeading>Four services, one partner.</SectionHeading>
          </div>
          <button className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-primary">
            See all services
            <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, kicker, title, body }) => (
            <div key={title} className={cardClass}>
              <div className="flex size-9 items-center justify-center rounded-lg bg-accent">
                <Icon className="size-4 text-primary" />
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
                {kicker}
              </p>
              <p className="mt-1.5 text-sm font-bold text-foreground">
                {title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Comparison table ---------- */

type Support = "yes" | "partial" | "no";

const comparisonColumns = ["ScaleOut", "Typical EOR Platform", "Staffing Agency"];

const comparisonRows: {
  capability: string;
  values: [Support, Support, Support];
}[] = [
  { capability: "Developer team sourcing", values: ["yes", "partial", "yes"] },
  { capability: "EOR and payroll management", values: ["yes", "yes", "no"] },
  { capability: "Office space placement", values: ["yes", "no", "no"] },
  { capability: "Recruitment support", values: ["yes", "partial", "yes"] },
  { capability: "Own EOR infrastructure", values: ["yes", "partial", "no"] },
  { capability: "Custom, scoped pricing", values: ["yes", "no", "partial"] },
  {
    capability: "Indonesia-specific expertise",
    values: ["yes", "partial", "partial"],
  },
];

function SupportCell({ value }: { value: Support }) {
  const map = {
    yes: { Icon: Check, label: "Yes", color: "text-[#009966]" },
    partial: { Icon: Minus, label: "Partial", color: "text-[#e17100]" },
    no: { Icon: X, label: "No", color: "text-[#ff637e]" },
  } as const;
  const { Icon, label, color } = map[value];
  return (
    <span className={`inline-flex items-center gap-1.5 ${color}`}>
      <Icon className="size-4" />
      <span className="text-xs font-semibold">{label}</span>
    </span>
  );
}

function Comparison() {
  return (
    <section className="border-y border-border bg-muted/60">
      <div className="container-page py-20">
        <Eyebrow className="text-primary">How We Compare</Eyebrow>
        <SectionHeading>ScaleOut vs. the alternatives</SectionHeading>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A direct comparison of what ScaleOut covers versus typical
          alternatives. Individual providers vary — always verify directly.
        </p>
        <div className="mt-10 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-muted/60">
                <th className="px-6 py-4 text-sm font-semibold text-foreground">
                  Capability
                </th>
                {comparisonColumns.map((col, i) => (
                  <th
                    key={col}
                    className={`px-6 py-4 text-center text-sm ${
                      i === 0
                        ? "font-bold text-primary"
                        : "font-semibold text-muted-foreground"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr
                  key={row.capability}
                  className={`border-b border-border last:border-0 ${
                    idx % 2 === 1 ? "bg-muted/25" : "bg-card"
                  }`}
                >
                  <td className="px-6 py-3.5 text-sm text-foreground">
                    {row.capability}
                  </td>
                  {row.values.map((value, i) => (
                    <td key={i} className="px-6 py-3.5 text-center">
                      <SupportCell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          &quot;Partial&quot; indicates the capability exists in some form but is
          not a core or consistent offering across the category.
        </p>
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */

function CtaBand() {
  return (
    <section className="bg-primary">
      <div className="container-page flex flex-col items-center py-16 text-center">
        <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
          Ready to build your team?
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/70">
          Every ScaleOut engagement is custom-scoped to your roles, team size,
          and requirements. Talk to our team to get started.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-8 h-10 gap-2 border-white/30 bg-transparent px-5 text-sm text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
        >
          Talk to Our Team
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function Faq() {
  return (
    <section className="bg-background">
      <div className="container-page max-w-3xl py-20">
        <Eyebrow className="text-primary">FAQ</Eyebrow>
        <SectionHeading>Common questions.</SectionHeading>
        <FaqAccordion />
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function HomePage() {
  return (
    <>
      <Hero />
      <ByTheNumbers />
      <Challenge />
      <Solution />
      <WhyScaleOut />
      <WhoWeServe />
      <HowItWorks />
      <EorInfrastructure />
      <Services />
      <Comparison />
      <CtaBand />
      <Faq />
    </>
  );
}
