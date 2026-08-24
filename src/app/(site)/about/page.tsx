import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Eye,
  Handshake,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ScaleOut is the result of merging two Indonesia-based businesses — Surya Digital Teknologi and VA For Everyone — into a single platform for international companies that need to build and legally employ technology teams.",
};

type Coverage = {
  lead: string;
  rest: string;
};

const coverage: Coverage[] = [
  {
    lead: "Employer of Record via own infrastructure",
    rest: " — ScaleOut is the legal employer — no third-party provider in the chain.",
  },
  {
    lead: "Developer teams sourced and managed",
    rest: " — End-to-end talent acquisition and ongoing team management for technology roles.",
  },
  {
    lead: "Office space",
    rest: " — Physical workspace solutions for teams that need a local presence.",
  },
  {
    lead: "Recruitment support",
    rest: " — Structured sourcing, screening, and placement aligned to your technical brief.",
  },
  {
    lead: "Transparent pricing",
    rest: " — Custom to your team size and scope — no hidden fees, no surprise charges.",
  },
];

type Founder = {
  label: string;
  name: string;
  paragraphs: string[];
};

const founders: Founder[] = [
  {
    label: "Founding Company",
    name: "Surya Digital Teknologi (SDT)",
    paragraphs: [
      "Surya Digital Teknologi was established in Indonesia with a focus on technology staffing and employment services for clients operating across borders. Its operational foundation was built around providing international companies with compliant, structured access to technology talent in Indonesia — handling the employment, payroll, and HR administration layers that most cross-border hiring arrangements leave unresolved.",
      "SDT's approach centred on direct accountability: rather than acting as an intermediary that passes employment to a local partner, SDT structured itself as the employer of record for the teams it placed. This model, and the in-house infrastructure built to support it, became a core part of what ScaleOut inherited at the point of merger.",
    ],
  },
  {
    label: "Founding Company",
    name: "VA For Everyone (VAFE)",
    paragraphs: [
      "VA For Everyone was built in Indonesia around the operational demands of distributed and remote work — providing companies with structured access to remote professionals and the administrative infrastructure to employ and manage them compliantly across jurisdictions.",
      "VAFE developed its capabilities in cross-border HR administration, distributed team coordination, and the employment compliance layer that underpins sustained remote work relationships. These operational capabilities — particularly around ongoing workforce management and employment administration — contributed directly to ScaleOut's ability to manage technology teams at scale.",
    ],
  },
];

type Value = {
  Icon: typeof Eye;
  title: string;
  body: string;
};

const values: Value[] = [
  {
    Icon: Eye,
    title: "Transparency",
    body: "We are clear about what we do, what we do not do, and how our services are priced. Clients always know exactly what they are engaging.",
  },
  {
    Icon: Handshake,
    title: "Partnership",
    body: "We design engagements to grow with your team. As your headcount scales, ScaleOut's model scales with it — no renegotiating from scratch.",
  },
  {
    Icon: MapPin,
    title: "Local Expertise",
    body: "Our operational roots are in Indonesia. That on-the-ground knowledge of local employment law and HR practice is a core part of what we offer.",
  },
  {
    Icon: ShieldCheck,
    title: "Accountability",
    body: "We do not pass responsibility to partners or subcontractors. When ScaleOut employs your team, ScaleOut is fully accountable for the employment relationship.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/50">
        <div className="container-page py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            About Us
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Built to make cross-border hiring straightforward.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            ScaleOut is the result of merging two Indonesia-based businesses — Surya Digital
            Teknologi and VA For Everyone — into a single platform for international companies
            that need to build and legally employ technology teams.
          </p>
        </div>
      </section>

      {/* Mission + coverage */}
      <section className="bg-background">
        <div className="container-page py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                Our Mission
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                Removing the friction from cross-border team building.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Building a technology team across borders should be a strategic advantage, not a
                legal obstacle course. ScaleOut was created to remove that friction — giving
                international companies a compliant, structured path to hiring without the overhead
                of entity establishment.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Our approach is built on full accountability: ScaleOut employs the people, manages
                the compliance, and operates through its own in-house EOR infrastructure — so there
                are no third-party hand-offs, no gaps in coverage, and no ambiguity about who is
                responsible.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                What ScaleOut covers
              </p>
              <ul className="mt-5 space-y-4">
                {coverage.map((item) => (
                  <li key={item.lead} className="flex gap-3">
                    <CircleCheck
                      className="mt-0.5 size-[18px] shrink-0 text-primary"
                      aria-hidden
                    />
                    <p className="text-sm leading-tight text-muted-foreground">
                      <span className="font-semibold text-foreground">{item.lead}</span>
                      {item.rest}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container-page py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            Our Origin
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            Where ScaleOut came from.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            ScaleOut was not built from scratch. It was formed through the combination of two
            Indonesia-based businesses that had each independently developed deep expertise in
            technology staffing, remote employment, and cross-border HR operations. Together, they
            became a single brand with a shared purpose: helping international clients build
            compliant technology teams without the complexity of setting up overseas entities.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {founders.map((founder) => (
              <article
                key={founder.name}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="border-b border-border bg-primary/[0.05] px-6 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                    {founder.label}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-foreground">{founder.name}</h3>
                </div>
                <div className="space-y-3 px-6 py-5">
                  {founder.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background">
        <div className="container-page py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            What We Stand For
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Our values.</h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, body }) => (
              <article key={title} className="rounded-xl border border-border bg-card p-7">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/[0.08]">
                  <Icon className="size-4 text-primary" aria-hidden />
                </span>
                <h3 className="mt-4 text-sm font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">Let us tell you more.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/70">
            Our team is happy to walk through how ScaleOut works and whether it is the right fit for
            your company.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Talk to Our Team
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
