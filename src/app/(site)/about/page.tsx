import type { Metadata } from "next";
import Image from "next/image";
import { Check, Eye, Handshake, MapPin, ShieldCheck } from "lucide-react";

import {
  Cta,
  CtaBand,
  PageHero,
  SectionHead,
  TextLink,
} from "@/components/site-kit";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Scalout is the result of merging two Indonesia-based businesses, Surya Digital Teknologi and VA For Everyone, into a single platform for international companies building technology teams.",
};

const coverage = [
  {
    lead: "Employer of record via own infrastructure",
    rest: "Scalout is the legal employer, with no third-party provider in the chain.",
  },
  {
    lead: "Developer teams sourced and managed",
    rest: "End-to-end talent acquisition and ongoing team management for technology roles.",
  },
  {
    lead: "Office space",
    rest: "Physical workspace for teams that need a local presence.",
  },
  {
    lead: "Recruitment support",
    rest: "Structured sourcing, screening, and placement aligned to your technical brief.",
  },
  {
    lead: "Transparent pricing",
    rest: "Custom to your team size and scope, with no hidden fees.",
  },
];

const founders = [
  {
    name: "Surya Digital Teknologi",
    paragraphs: [
      "Surya Digital Teknologi was established in Indonesia around technology staffing and employment services for clients operating across borders. Its foundation was giving international companies compliant, structured access to technology talent in Indonesia, handling the employment, payroll, and HR layers that most cross-border arrangements leave unresolved.",
      "Its approach centred on direct accountability: rather than passing employment to a local partner, SDT structured itself as the employer of record for the teams it placed. That model, and the in-house infrastructure behind it, is what Scalout inherited at the point of merger.",
    ],
  },
  {
    name: "VA For Everyone",
    paragraphs: [
      "VA For Everyone was built in Indonesia around the operational demands of distributed work, giving companies structured access to remote professionals and the administrative infrastructure to employ and manage them compliantly across jurisdictions.",
      "VAFE developed its capabilities in cross-border HR administration, distributed team coordination, and the employment compliance layer that underpins sustained remote work. Those capabilities, particularly around ongoing workforce management, contributed directly to Scalout's ability to manage technology teams at scale.",
    ],
  },
];

const values = [
  {
    Icon: Eye,
    title: "Transparency",
    body: "We are clear about what we do, what we do not do, and how our services are priced. Clients always know exactly what they are engaging.",
  },
  {
    Icon: Handshake,
    title: "Partnership",
    body: "Engagements are designed to grow with your team. As headcount scales, the model scales with it, without renegotiating from scratch.",
  },
  {
    Icon: MapPin,
    title: "Local expertise",
    body: "Our operational roots are in Indonesia. That knowledge of local employment law and HR practice is a core part of what we offer.",
  },
  {
    Icon: ShieldCheck,
    title: "Accountability",
    body: "We do not pass responsibility to partners or subcontractors. When Scalout employs your team, Scalout is fully accountable.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="Built to make cross-border hiring straightforward."
        lede="Two Indonesia-based businesses, merged into one platform for companies building and legally employing technology teams."
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

      <section className="border-b border-rule bg-background">
        <div className="container-page grid gap-14 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              title="Removing the friction from cross-border team building."
              body="Building a technology team across borders should be a strategic advantage, not a legal obstacle course. Scalout exists to remove that friction, giving companies a compliant path to hiring without the overhead of entity establishment."
            />
            <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
              Our approach rests on full accountability. Scalout employs the
              people, manages the compliance, and operates its own in-house EOR
              infrastructure, so there are no hand-offs and no ambiguity about
              who is responsible.
            </p>
            <div className="mt-8">
              <TextLink href="/service">See our services</TextLink>
            </div>
          </div>

          <div>
            <p className="text-[13px] font-bold text-foreground">
              What Scalout covers
            </p>
            <ul className="mt-4 border-t border-rule">
              {coverage.map((item) => (
                <li
                  key={item.lead}
                  className="flex gap-3 border-b border-rule py-4"
                >
                  <Check
                    className="mt-0.5 size-[18px] shrink-0 text-primary"
                    aria-hidden
                  />
                  <p className="text-sm leading-snug text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {item.lead}.
                    </span>{" "}
                    {item.rest}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-muted">
        <div className="container-page py-20">
          <SectionHead
            label="Our origin"
            title="Where Scalout came from."
            body="Scalout was not built from scratch. Two Indonesia-based businesses, each with its own depth in technology staffing, remote employment, and cross-border HR operations, became one brand with a shared purpose."
          />

          <figure className="relative mt-12 h-[200px] overflow-hidden rounded-[4px] border border-rule sm:h-[260px]">
            <Image
              src="/assets/landing/case-study-team.jpg"
              alt="The Scalout team in Indonesia"
              fill
              sizes="(min-width: 1104px) 1056px, 100vw"
              className="object-cover"
            />
          </figure>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {founders.map((founder) => (
              <article
                key={founder.name}
                className="rounded-[4px] border border-rule bg-card p-7"
              >
                <h3 className="text-base font-bold text-foreground">
                  {founder.name}
                </h3>
                <div className="mt-4 space-y-3">
                  {founder.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values as a ledger: icon, name, meaning, one rule between each. */}
      <section className="bg-background">
        <div className="container-page py-20">
          <SectionHead title="What we stand for." />
          <dl className="mt-12 border-t border-rule">
            {values.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="grid gap-x-8 gap-y-2 border-b border-rule py-7 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
              >
                <dt className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-primary/10">
                    <Icon className="size-4 text-primary" aria-hidden />
                  </span>
                  <span className="text-[15px] font-bold text-foreground">
                    {title}
                  </span>
                </dt>
                <dd className="max-w-[66ch] text-[15px] leading-relaxed text-muted-foreground">
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        title="Let us tell you more."
        body="Our team is happy to walk through how Scalout works and whether it fits your company."
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
