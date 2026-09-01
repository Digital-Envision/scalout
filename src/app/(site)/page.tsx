import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  Check,
  Code2,
  Minus,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import {
  Cta,
  CtaBand,
  PLATE,
  PageHero,
  SectionHead,
  TextLink,
} from "@/components/site-kit";
import { FaqAccordion } from "@/app/_components/faq-accordion";

export const metadata: Metadata = {
  title: "Build Your Technology Team, Compliant from Day One",
  description:
    "Scalout gives international companies a fully managed, legally compliant path to building technology teams in Indonesia, without establishing a local entity.",
};

/* ---------- Hero ---------- */

function Hero() {
  return (
    <PageHero
      size="home"
      label="Indonesia · Southeast Asia"
      title={
        <>
          Build your technology team.
          <br />
          Compliant from day one.
        </>
      }
      lede="A fully managed, legally compliant path to building technology teams in Indonesia, without a local entity."
      actions={
        <>
          <Cta href="/contact" tone="invert">
            Talk to us
          </Cta>
          <Cta href="/service" tone="outline-ink">
            See our services
          </Cta>
        </>
      }
    />
  );
}

/* ---------- Standing ---------- */

const standing = [
  {
    title: "Indonesia-incorporated",
    body: "Scalout operates as a local entity, not a remote intermediary.",
  },
  {
    title: "Employer of record in-house",
    body: "Built and run by Scalout, with no partner network in the chain.",
  },
  {
    title: "Two operations, merged",
    body: "Formed from Surya Digital Teknologi and VA For Everyone.",
  },
];

const clients = [
  { src: "/assets/landing/client-va.png", name: "VA For Everyone" },
  { src: "/assets/landing/client-upscalix.png", name: "Upscalix" },
  { src: "/assets/landing/client-sdt.png", name: "Surya Digital Teknologi" },
];

function Standing() {
  return (
    <section className="border-b border-rule bg-card">
      <div className="container-page py-12">
        <dl className="grid gap-8 border-b border-rule pb-10 md:grid-cols-3">
          {standing.map((item) => (
            <div key={item.title}>
              <dt className="text-sm font-bold text-foreground">
                {item.title}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12">
          <p className="text-sm font-semibold text-muted-foreground">
            Trusted by
          </p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {clients.map((client) => (
              <li key={client.name} className="relative h-9 w-28">
                <Image
                  src={client.src}
                  alt={client.name}
                  fill
                  sizes="112px"
                  className="object-contain object-left opacity-70"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- The challenge ---------- */

const challenges = [
  {
    title: "Entity requirement",
    body: "Legally employing someone in another country without a local entity creates direct exposure for your company.",
  },
  {
    title: "Compliance complexity",
    body: "Employment law in Southeast Asia is jurisdiction-specific and changes regularly, adding ongoing legal overhead.",
  },
  {
    title: "Accountability gaps",
    body: "Many cross-border solutions route through partner platforms, fragmenting who is actually responsible for compliance.",
  },
  {
    title: "Competitive talent market",
    body: "Singapore's technology talent market cannot keep up with demand. Building regional capacity is strategic, not a fallback.",
  },
];

function Challenge() {
  return (
    <section className="border-b border-rule bg-background">
      <div className="container-page grid gap-12 py-20 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            title="Hiring across borders is harder than it should be."
            body="Companies building technology capacity in Indonesia reach the same decision point, usually later than they would like."
          />
        </div>
        <dl className="divide-y divide-rule border-t border-rule">
          {challenges.map((item) => (
            <div key={item.title} className="py-6 first:pt-7">
              <dt className="text-[15px] font-bold text-foreground">
                {item.title}
              </dt>
              <dd className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- Solution ---------- */

const coverage = [
  "Offshore development teams, sourced and managed for you",
  "Employer of record via Scalout's own in-house infrastructure",
  "Office space for teams that need a physical presence",
  "Recruitment and ongoing workforce management",
  "Payroll, contributions, and statutory compliance handled end to end",
  "One commercial agreement covering all of it",
];

function Solution() {
  return (
    <section className="border-b border-rule bg-background">
      <div className="container-page py-20">
        <SectionHead
          label="Our solution"
          title="Scalout resolves all of it."
          body="An Indonesia-based platform bundling everything an international company needs to build and legally employ a technology team, with Scalout as the single accountable partner."
          aside={<TextLink href="/role">View roles</TextLink>}
        />

        <ul className="mt-12 grid gap-x-12 gap-y-1 md:grid-cols-2">
          {coverage.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-t border-rule py-4"
            >
              <Check className="mt-0.5 size-[18px] shrink-0 text-primary" />
              <span className="text-[15px] leading-snug text-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <figure className="relative mt-14 h-[220px] overflow-hidden rounded-[4px] border border-rule sm:h-[280px]">
          <Image
            src="/assets/landing/office-operations.jpg"
            alt="Scalout operations team working in the Indonesia office"
            fill
            sizes="(min-width: 1104px) 1056px, 100vw"
            className="object-cover"
          />
        </figure>
      </div>
    </section>
  );
}

/* ---------- Why Scalout ---------- */

function WhyScalout() {
  return (
    <section className="border-b border-rule bg-background">
      <div className="container-page py-20">
        <SectionHead
          title="The direct path to a compliant technology team."
          aside={<TextLink href="/why">Compare providers</TextLink>}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <figure className="relative min-h-[260px] overflow-hidden rounded-[4px] border border-rule md:col-span-2 lg:row-span-2">
            <Image
              src="/assets/landing/workspace-office.jpg"
              alt="Scalout workspace in Indonesia"
              fill
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </figure>

          <article className="texture-dither rounded-[4px] border border-primary/20 bg-accent p-7 lg:col-span-2">
            <span className="flex size-9 items-center justify-center rounded-[4px] bg-primary/10">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
            </span>
            <h3 className="mt-5 text-[15px] font-bold text-foreground">
              No third-party hand-offs. Ever.
            </h3>
            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
              Our EOR system is built and operated in-house. When you engage
              Scalout, Scalout is the employer, not a subcontracted provider.
              That accountability matters when questions arise.
            </p>
          </article>

          <article className={`${PLATE} p-7`}>
            <h3 className="text-[15px] font-bold text-foreground">
              On-the-ground in Indonesia
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Our team understands local employment law and HR norms from the
              inside, not through a partner network.
            </p>
          </article>

          <article className={`${PLATE} p-7`}>
            <h3 className="text-[15px] font-bold text-foreground">
              Built for technology teams
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sourcing, evaluation, and HR processes designed for engineering
              roles rather than generalist staffing.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- EOR infrastructure ---------- */

const eorPoints = [
  {
    title: "No sub-contractors",
    body: "Scalout is the single employer of record for your team.",
  },
  {
    title: "Own infrastructure",
    body: "Our EOR system is built in-house, not resold from a platform.",
  },
  {
    title: "Indonesia-based operations",
    body: "Our team operates directly in Indonesia, with no proxy in between.",
  },
  {
    title: "Full accountability",
    body: "One partner carries the entire employment obligation.",
  },
];

function EorInfrastructure() {
  return (
    <section className="texture-dither border-b border-rule bg-accent">
      <div className="container-page grid items-start gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
        <div>
          <h2 className="max-w-[22ch] text-[28px] font-bold leading-[1.15] tracking-tight text-foreground sm:text-[34px]">
            EOR on our own infrastructure, not a partner platform.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground">
            Most providers sub-contract local employment through a network of
            country-specific partners. Scalout built and operates its own EOR
            system, so there is no intermediary in the accountability chain.
          </p>
          <div className="mt-7">
            <TextLink href="/why">Compare providers</TextLink>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {eorPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-[4px] border border-primary/15 bg-card p-5"
            >
              <p className="text-[13px] font-bold text-foreground">
                {point.title}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */

const steps = [
  {
    title: "Scope your engagement",
    body: "We start with your hiring requirements, target roles, team structure, and any compliance considerations.",
  },
  {
    title: "Build your team",
    body: "Talent is sourced, evaluated, and onboarded into Scalout's legal employment structure with compliant contracts in place.",
  },
  {
    title: "Stay in full compliance",
    body: "Payroll, statutory contributions, and compliance run continuously while your team gets on with the work.",
  },
];

function HowItWorks() {
  return (
    <section className="border-b border-rule bg-background">
      <div className="container-page py-20">
        <SectionHead label="How it works" title="Three steps to a running team." />

        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <span
            aria-hidden
            className="absolute inset-x-0 top-[3px] hidden h-px bg-rule md:block"
          />
          {steps.map((step) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden
                className="block size-[7px] rounded-[1px] bg-primary"
              />
              <h3 className="mt-5 text-[15px] font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

const services = [
  {
    icon: Code2,
    title: "Offshore development teams",
    body: "Build and scale dedicated technology teams in Indonesia, fully employed and managed by Scalout.",
    tinted: true,
  },
  {
    icon: ShieldCheck,
    title: "Employer of record",
    body: "Scalout employs your people through its own in-house EOR infrastructure, with no third parties involved.",
    tinted: false,
  },
  {
    icon: Building2,
    title: "Office placement",
    body: "Physical workspace for teams that need a local presence, coordinated with EOR under one engagement.",
    tinted: false,
  },
  {
    icon: Users,
    title: "Recruitment and workforce management",
    body: "End-to-end technology talent sourcing and ongoing workforce management inside the Scalout structure.",
    tinted: true,
  },
];

function Services() {
  return (
    <section className="border-b border-rule bg-background">
      <div className="container-page py-20">
        <SectionHead
          title="Four services, one partner."
          aside={<TextLink href="/service">See our services</TextLink>}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {services.map(({ icon: Icon, title, body, tinted }) => (
            <article
              key={title}
              className={
                tinted
                  ? "texture-dither rounded-[4px] border border-primary/20 bg-accent p-8"
                  : `${PLATE} p-8`
              }
            >
              <span className="flex size-9 items-center justify-center rounded-[4px] bg-primary/10">
                <Icon className="size-4 text-primary" aria-hidden />
              </span>
              <h3 className="mt-5 text-base font-bold text-foreground">
                {title}
              </h3>
              <p className="mt-2 max-w-[50ch] text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Who we serve ---------- */

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
    <section className="border-b border-rule bg-muted">
      <div className="container-page py-20">
        <SectionHead
          title="Built to serve international businesses."
          body="Our client base spans companies headquartered across Asia-Pacific, Europe, and North America that are building technology teams in Indonesia."
        />
        <ul className="mt-10 flex flex-wrap gap-2">
          {markets.map((market) => (
            <li
              key={market}
              className="data-label rounded-[3px] border border-rule bg-card px-3 py-2 text-foreground"
            >
              {market}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Comparison ---------- */

type Support = "yes" | "partial" | "no";

const comparisonColumns = ["Scalout", "Typical EOR platform", "Staffing agency"];

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

const supportMap = {
  yes: { Icon: Check, label: "Yes", color: "text-emerald-700" },
  partial: { Icon: Minus, label: "Partial", color: "text-amber-700" },
  no: { Icon: X, label: "No", color: "text-rose-600" },
} as const;

function SupportCell({ value }: { value: Support }) {
  const { Icon, label, color } = supportMap[value];
  return (
    <span className={`inline-flex items-center gap-1.5 ${color}`}>
      <Icon className="size-4" aria-hidden />
      <span className="text-xs font-semibold">{label}</span>
    </span>
  );
}

function Comparison() {
  return (
    <section className="border-b border-rule bg-background">
      <div className="container-page py-20">
        <SectionHead
          label="How we compare"
          title="Scalout vs. the alternatives"
          body="What Scalout covers against the typical alternatives. Individual providers vary, so it is always worth verifying directly."
        />

        <div className="mt-10 overflow-x-auto rounded-[4px] border border-rule">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-rule bg-muted">
                <th className="data-label px-6 py-4 text-muted-foreground">
                  Capability
                </th>
                {comparisonColumns.map((col, i) => (
                  <th
                    key={col}
                    className={`data-label px-6 py-4 text-center ${
                      i === 0 ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.capability}
                  className="border-b border-rule bg-card last:border-0"
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

        <p className="mt-4 max-w-[70ch] text-xs leading-relaxed text-muted-foreground">
          &quot;Partial&quot; indicates the capability exists in some form but is
          not a core or consistent offering across the category.
        </p>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function Faq() {
  return (
    <section className="bg-background">
      <div className="container-page max-w-3xl py-20">
        <SectionHead title="Common questions." />
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
      <Standing />
      <Challenge />
      <Solution />
      <WhyScalout />
      <EorInfrastructure />
      <HowItWorks />
      <Services />
      <WhoWeServe />
      <Comparison />
      <Faq />
      <CtaBand
        title="Ready to build your team?"
        body="Every engagement is custom-scoped to your roles, team size, and requirements."
        actions={
          <>
            <Cta href="/contact" tone="invert">
              Talk to us
            </Cta>
            <Cta href="/role" tone="outline-ink">
              View roles
            </Cta>
          </>
        }
      />
    </>
  );
}
