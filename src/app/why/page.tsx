import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleCheck, CircleX, Minus } from "lucide-react";

export const metadata: Metadata = {
  title: "Why ScaleOut",
  description:
    "International companies hiring technology talent in Indonesia typically face two paths: establish a local entity, or engage a staffing agency. ScaleOut is built to be neither.",
};

type Difference = {
  number: string;
  title: string;
  body: string;
};

const differences: Difference[] = [
  {
    number: "01",
    title: "In-House Employer of Record",
    body: "ScaleOut employs your people directly through its own EOR infrastructure — no third-party employment provider, no intermediary liability. One accountable partner from contract to payroll.",
  },
  {
    number: "02",
    title: "Indonesia-Specialist Operations",
    body: "ScaleOut was built specifically to serve international companies hiring in Indonesia. Our on-the-ground knowledge of local employment law, statutory requirements, and HR norms is integral to the service — not bolted on.",
  },
  {
    number: "03",
    title: "Developer-Focused Talent Sourcing",
    body: "We source and place technology professionals only. Our process is designed around engineering, product, and data roles — not generalised staffing. That specialisation reflects in the quality of candidates we present.",
  },
  {
    number: "04",
    title: "Office Space Included",
    body: "For teams that need a local presence, ScaleOut can provide access to physical workspace in Indonesia. This is part of the engagement — not a separate contract with a third party.",
  },
  {
    number: "05",
    title: "End-to-End Engagement",
    body: "ScaleOut manages the full employment lifecycle — sourcing, onboarding, payroll, compliance, and ongoing HR administration. Every stage is handled under one engagement, with one point of accountability.",
  },
  {
    number: "06",
    title: "Indonesia Operations Base",
    body: "Our operations are based in Indonesia. Our on-the-ground presence means we understand local employment law, statutory requirements, and talent markets from the inside — giving clients a direct operational partner, not a remote intermediary.",
  },
];

type Level = "yes" | "partial" | "no";

type ComparisonRow = {
  capability: string;
  scaleout: Level;
  eor: Level;
  staffing: Level;
};

const comparisonRows: ComparisonRow[] = [
  { capability: "Developer team sourcing", scaleout: "yes", eor: "partial", staffing: "yes" },
  { capability: "EOR and payroll management", scaleout: "yes", eor: "yes", staffing: "no" },
  { capability: "Office space placement", scaleout: "yes", eor: "no", staffing: "no" },
  { capability: "Recruitment support", scaleout: "yes", eor: "partial", staffing: "yes" },
  { capability: "Own EOR infrastructure", scaleout: "yes", eor: "partial", staffing: "no" },
  { capability: "Custom, scoped pricing", scaleout: "yes", eor: "no", staffing: "partial" },
  { capability: "Indonesia-specific expertise", scaleout: "yes", eor: "partial", staffing: "partial" },
];

const levelConfig: Record<
  Level,
  { label: string; className: string; Icon: typeof CircleCheck }
> = {
  yes: { label: "Yes", className: "text-emerald-600", Icon: CircleCheck },
  partial: { label: "Partial", className: "text-amber-600", Icon: Minus },
  no: { label: "No", className: "text-rose-500", Icon: CircleX },
};

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
      {/* Page hero — node 2:1576 */}
      <section className="border-b border-border bg-muted/50">
        <div className="container-page py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            Our Difference
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Why International Companies Choose ScaleOut
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            International companies hiring technology talent in Indonesia typically face two paths:
            establish a local entity — costly and time-consuming — or engage a staffing agency that
            places people but carries no employment obligation. ScaleOut is built to be neither.
          </p>
        </div>
      </section>

      {/* Six differences — node 2:1590 */}
      <section className="bg-background">
        <div className="container-page py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differences.map((item) => (
              <article
                key={item.number}
                className="rounded-xl border border-border bg-muted p-7"
              >
                <p className="font-mono text-[11px] font-bold tracking-[0.1em] text-primary/40">
                  {item.number}
                </p>
                <h3 className="mt-4 text-sm font-bold text-foreground">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table — node 2:1666 */}
      <section className="border-y border-border bg-muted/40">
        <div className="container-page py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            How We Compare
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            ScaleOut vs. the alternatives
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            This table reflects the typical capabilities of each model. Individual providers vary —
            it is always worth verifying directly.
          </p>

          <div className="mt-10 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Capability</th>
                  <th className="px-4 py-4 text-center font-bold text-primary">ScaleOut</th>
                  <th className="px-4 py-4 text-center font-semibold text-muted-foreground">
                    Typical EOR Platform
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-muted-foreground">
                    Staffing Agency
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.capability}
                    className={`border-b border-border last:border-b-0 ${
                      index % 2 === 0 ? "bg-background" : "bg-muted/30"
                    }`}
                  >
                    <td className="px-6 py-3.5 text-left font-normal text-foreground">
                      {row.capability}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <CellIndicator level={row.scaleout} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <CellIndicator level={row.eor} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <CellIndicator level={row.staffing} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs leading-normal text-muted-foreground">
            &quot;Partial&quot; indicates the capability exists in some form but is not a core or
            consistent offering across the category.
          </p>
        </div>
      </section>

      {/* CTA — node 2:1897 */}
      <section className="bg-primary">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Ready to see the difference?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/70">
            Every engagement is scoped to your specific team, roles, and requirements. Talk to our
            team or explore the full range of services first.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-card px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-card/90"
            >
              Contact Us
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/service"
              className="inline-flex items-center justify-center rounded-md border border-primary-foreground/30 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              See Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
