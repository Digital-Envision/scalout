/**
 * The four side-rail plates on /service.
 *
 * These replace the placeholder illustration exports. Each one carries
 * information the prose does not: the shape of an engagement, who the legal
 * employer is, what the workspace looks like in plan, and where a hire sits in
 * the process. Drawn in the (site) data-texture language rather than shipped as
 * assets, so they theme with the tokens and cost nothing to load.
 *
 * Body text inside a plate sits on --accent, so it uses --on-tint rather than
 * --muted-foreground (see the note in globals.css).
 */

function Plate({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="texture-dither rounded-[4px] border border-rule bg-accent p-5">
      <figcaption className="data-label text-primary">{label}</figcaption>
      <div className="mt-4">{children}</div>
    </figure>
  );
}

/* ---------- Offshore development teams ---------- */

const engagementSpec: [string, string][] = [
  ["Stack", "You define"],
  ["Seniority", "You define"],
  ["Headcount", "No minimum"],
  ["Employer", "Scalout"],
  ["Lock-in", "Per contract"],
];

export function EngagementSpecPlate() {
  return (
    <Plate label="Engagement spec">
      <dl className="border-t border-rule">
        {engagementSpec.map(([term, value]) => (
          <div
            key={term}
            className="flex items-baseline justify-between gap-3 border-b border-rule py-2"
          >
            <dt className="text-[12px] leading-snug text-on-tint">{term}</dt>
            <dd className="tnum text-[12px] font-semibold leading-snug text-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </Plate>
  );
}

/* ---------- Employer of record ---------- */

function ChainNode({
  children,
  badge,
  accent = false,
}: {
  children: React.ReactNode;
  badge?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-[4px] border border-primary bg-primary px-3 py-2"
          : "rounded-[4px] border border-rule bg-card px-3 py-2"
      }
    >
      <p
        className={`text-[12px] font-semibold leading-snug ${
          accent ? "text-white" : "text-foreground"
        }`}
      >
        {children}
      </p>
      {badge ? (
        <p className="data-label mt-1 text-white/70">{badge}</p>
      ) : null}
    </div>
  );
}

function ChainLink({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 py-1 pl-4">
      <span aria-hidden className="block h-6 w-px bg-primary/40" />
      <span className="font-mono text-[10px] leading-tight tracking-wide text-on-tint">
        {children}
      </span>
    </div>
  );
}

export function EmploymentChainPlate() {
  return (
    <Plate label="Employment chain">
      <ChainNode>Your company</ChainNode>
      <ChainLink>commercial agreement</ChainLink>
      <ChainNode accent badge="Legal employer">
        Scalout Indonesia
      </ChainNode>
      <ChainLink>employment contract</ChainLink>
      <ChainNode>Team member</ChainNode>
      <p className="mt-4 text-[11px] leading-snug text-on-tint">
        No third-party platform or partner sits between the two agreements.
      </p>
    </Plate>
  );
}

/* ---------- Office placement ---------- */

/** Three shared desk runs and two enclosed rooms, drawn in plan. */
const benchRows = [18, 55, 92];
const seatOffsets = [10, 34, 58, 82, 106];

export function WorkspacePlanPlate() {
  return (
    <Plate label="Workspace, plan view">
      <svg
        viewBox="0 0 248 128"
        className="h-auto w-full text-primary"
        role="img"
        aria-label="Plan view of a shared workspace: three desk runs and two enclosed rooms."
      >
        <rect
          x={0.5}
          y={0.5}
          width={247}
          height={127}
          rx={3}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.3}
        />

        {benchRows.map((y) => (
          <g key={y}>
            <rect
              x={16}
              y={y}
              width={126}
              height={18}
              rx={2}
              fill="currentColor"
              fillOpacity={0.14}
              stroke="currentColor"
              strokeOpacity={0.45}
            />
            {seatOffsets.map((dx) => (
              <circle
                key={dx}
                cx={16 + dx + 6}
                cy={y - 6}
                r={3}
                fill="currentColor"
                fillOpacity={0.4}
              />
            ))}
          </g>
        ))}

        <rect
          x={156}
          y={18}
          width={76}
          height={44}
          rx={2}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.45}
        />
        <ellipse
          cx={194}
          cy={40}
          rx={16}
          ry={9}
          fill="currentColor"
          fillOpacity={0.14}
          stroke="currentColor"
          strokeOpacity={0.4}
        />

        <rect
          x={156}
          y={74}
          width={76}
          height={36}
          rx={2}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.45}
        />
        <line
          x1={156}
          y1={92}
          x2={232}
          y2={92}
          stroke="currentColor"
          strokeOpacity={0.22}
          strokeDasharray="3 3"
        />
      </svg>
      <p className="mt-4 text-[11px] leading-snug text-on-tint">
        Space is matched to team size, so the plan changes with headcount.
      </p>
    </Plate>
  );
}

/* ---------- Recruitment and workforce management ---------- */

const stages = [
  "Brief",
  "Source",
  "Screen",
  "Present",
  "Offer",
  "Onboard",
] as const;

export function ProcessPlate() {
  return (
    <Plate label="Process">
      <ol className="relative">
        <span
          aria-hidden
          className="absolute bottom-3 left-[3.5px] top-3 w-px bg-primary/30"
        />
        {stages.map((stage, index) => (
          <li key={stage} className="relative flex items-center gap-3 py-[3px] pl-5">
            <span
              aria-hidden
              className={`absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full border border-primary ${
                index === 0 || index === stages.length - 1
                  ? "bg-primary"
                  : "bg-accent"
              }`}
            />
            <span className="tnum text-[10px] font-semibold text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[12px] leading-snug text-foreground">
              {stage}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[11px] leading-snug text-on-tint">
        Then ongoing workforce management, for as long as the employment runs.
      </p>
    </Plate>
  );
}
