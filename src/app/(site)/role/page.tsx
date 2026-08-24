import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bug,
  ClipboardList,
  Code2,
  Database,
  Layers,
  Monitor,
  Server,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Role Availability",
  description:
    "ScaleOut sources, employs, and manages technology professionals across a range of disciplines. The roles below reflect the categories we recruit for — descriptions are capability-focused and do not represent real-time staffing availability.",
};

type Role = {
  category: string;
  title: string;
  Icon: LucideIcon;
  description: string;
  skills: string[];
};

const roles: Role[] = [
  {
    category: "Engineering",
    title: "Backend Developer",
    Icon: Server,
    description:
      "Server-side engineers who design and build APIs, data pipelines, and application logic. ScaleOut sources across multiple backend disciplines and seniority levels.",
    skills: ["Node.js", "Python", "Go", "Java", "PostgreSQL", "REST", "GraphQL"],
  },
  {
    category: "Engineering",
    title: "Frontend Developer",
    Icon: Monitor,
    description:
      "Client-side engineers focused on building performant, accessible web interfaces. Sourced across modern JavaScript frameworks and component-driven workflows.",
    skills: ["React", "Vue", "TypeScript", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Quality Assurance",
    title: "QA Engineer",
    Icon: Bug,
    description:
      "Engineers who design and execute test strategies across manual and automated disciplines. Embedded in development teams or operating as a dedicated QA function.",
    skills: ["Selenium", "Cypress", "Playwright", "Jest", "Postman", "Test planning"],
  },
  {
    category: "Design",
    title: "UI/UX Designer",
    Icon: Layers,
    description:
      "Designers who translate product requirements into user interfaces — covering wireframes, interaction design, and design systems aligned to engineering handoff.",
    skills: ["Figma", "Prototyping", "Design systems", "Usability research", "Accessibility"],
  },
  {
    category: "Data",
    title: "Data Engineer",
    Icon: Database,
    description:
      "Engineers who build and maintain the data infrastructure underpinning analytics, reporting, and machine learning workloads.",
    skills: ["Python", "SQL", "dbt", "Airflow", "Spark", "BigQuery", "Snowflake"],
  },
  {
    category: "Engineering",
    title: "Mobile Developer",
    Icon: Code2,
    description:
      "Engineers specialising in native and cross-platform mobile application development across iOS and Android.",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "App Store deployment"],
  },
  {
    category: "Engineering",
    title: "DevOps / Platform Engineer",
    Icon: ShieldCheck,
    description:
      "Engineers who build and manage the infrastructure, CI/CD pipelines, and deployment environments your development teams rely on.",
    skills: ["AWS", "GCP", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
  },
  {
    category: "Product & Delivery",
    title: "Project / Product Manager",
    Icon: ClipboardList,
    description:
      "Professionals who manage delivery cadence, product roadmaps, and cross-functional coordination within technology teams.",
    skills: ["Agile", "Scrum", "Jira", "Roadmap planning", "Stakeholder management"],
  },
];

function RoleCard({ role }: { role: Role }) {
  const { Icon } = role;
  return (
    <article className="flex flex-col rounded-xl border border-border bg-muted p-6">
      <div className="flex items-start gap-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent">
          <Icon className="size-4 text-primary" aria-hidden />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
            {role.category}
          </p>
          <h3 className="mt-0.5 text-sm font-bold text-foreground">{role.title}</h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {role.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {role.skills.map((skill) => (
          <span
            key={skill}
            className="rounded border border-border bg-secondary/50 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function RolePage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/50">
        <div className="container-page py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            Role Availability
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            The roles we hire for.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            ScaleOut sources, employs, and manages technology professionals across a range of
            disciplines. The roles below reflect the categories we recruit for — descriptions are
            capability-focused and do not represent real-time staffing availability.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Current role categories — exact titles and seniority scoped per engagement
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <RoleCard key={role.title} role={role} />
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-6 rounded-xl border border-primary/20 bg-primary/[0.06] px-7 py-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
                Don&apos;t see your role?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The roles listed here reflect ScaleOut&apos;s primary hiring categories. If your
                requirement sits adjacent to one of these disciplines — or spans multiple roles —
                talk to our team. Engagements are scoped to your specific requirements, not a fixed
                catalogue.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact Us
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Ready to scope your team?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/70">
            Tell us the roles, seniority levels, and team size you need. We will scope an engagement
            around your specific requirements.
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
