import type { Metadata } from "next";
import { Check, Minus, X } from "lucide-react";

import {
  Cta,
  CtaBand,
  PageHero,
  SectionHead,
} from "@/components/site-kit";

export const metadata: Metadata = {
  title: "Why Scalout",
  description:
    "Companies hiring technology talent in Indonesia usually face two paths: establish a local entity, or engage a staffing agency. Scalout is built to be neither.",
};

const differences = [
  {
    title: "In-house employer of record",
    body: "Scalout employs your people directly through its own EOR infrastructure. No third-party provider, no intermediary liability, one accountable partner from contract to payroll.",
  },
  {
    title: "Indonesia-specialist operations",
    body: "Scalout was built specifically to serve international companies hiring in Indonesia. On-the-ground knowledge of employment law, statutory requirements, and HR norms is integral to the service, not bolted on.",
  },
  {
    title: "Developer-focused sourcing",
    body: "We source and place technology professionals only. Our process is designed around engineering, product, and data roles rather than generalised staffing, and that shows in the candidates we present.",
  },
  {
    title: "Office space included",
    body: "For teams that need a local presence, Scalout provides access to physical workspace in Indonesia as part of the engagement, not a separate contract with a third party.",
  },
  {
    title: "End-to-end engagement",
    body: "Sourcing, onboarding, payroll, compliance, and ongoing HR administration are handled under one engagement, with one point of accountability throughout.",
  },
  {
    title: "Indonesia operations base",
    body: "Our operations are based in Indonesia. That presence means we read local employment law, statutory requirements, and talent markets from the inside rather than at a distance.",
  },
];

type Level = "yes" | "partial" | "no";

const comparisonRows: {
  capability: string;
  values: [Level, Level, Level];
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

const columns = ["Scalout", "Typical EOR platform", "Staffing agency"];

const levelConfig = {
  yes: { label: "Yes", className: "text-emerald-700", Icon: Check },
  partial: { label: "Partial", className: "text-amber-700", Icon: Minus },
  no: { label: "No", className: "text-rose-600", Icon: X },
} as const;

function CellIndicator({ level }: { level: Level }) {
  const { label, className, Icon } = levelConfig[level];
  return (
    <span
      className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold ${className}`}
    >
      <Icon className="size-4" aria-hidden />
      {label}
    </span>
  );
}

export default function WhyPage() {
  return (
    <>
      <PageHero
        label="Our difference"
        title="Why international companies choose Scalout."
        lede="Two usual paths: set up a local entity, or hire an agency that carries no employment obligation. Scalout is neither."
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

      {/* Ruled matrix: the differences read as one field of related facts
          rather than six floating cards. */}
      <section className="border-b border-rule bg-background">
        <div className="container-page py-20">
          <SectionHead title="Six things that set the model apart." />
          <div className="mt-12 grid border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
            {differences.map((item) => (
              <article
                key={item.title}
                className="border-b border-r border-rule p-7"
              >
                <h3 className="text-[15px] font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted">
        <div className="container-page py-20">
          <SectionHead
            label="How we compare"
            title="Scalout vs. the alternatives"
            body="The typical capabilities of each model. Individual providers vary, so it is always worth verifying directly."
          />

          <div className="mt-10 overflow-x-auto rounded-[4px] border border-rule bg-card">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-rule bg-muted">
                  <th className="data-label px-6 py-4 text-left text-muted-foreground">
                    Capability
                  </th>
                  {columns.map((col, i) => (
                    <th
                      key={col}
                      className={`data-label px-4 py-4 text-center ${
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
                    className="border-b border-rule last:border-b-0"
                  >
                    <td className="px-6 py-3.5 text-left text-foreground">
                      {row.capability}
                    </td>
                    {row.values.map((level, i) => (
                      <td key={i} className="px-4 py-3.5 text-center">
                        <CellIndicator level={level} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 max-w-[70ch] text-xs leading-relaxed text-muted-foreground">
            &quot;Partial&quot; indicates the capability exists in some form but
            is not a core or consistent offering across the category.
          </p>
        </div>
      </section>

      <CtaBand
        title="Ready to see the difference?"
        body="Every engagement is scoped to your specific team, roles, and requirements."
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
    </>
  );
}
