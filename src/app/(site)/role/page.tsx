import type { Metadata } from "next";
import {
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

import { Cta, CtaBand, PageHero, SectionHead } from "@/components/site-kit";

export const metadata: Metadata = {
  title: "Role Availability",
  description:
    "Scalout sources, employs, and manages technology professionals across a range of disciplines. These are the categories we recruit for, not a real-time staffing board.",
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
    title: "Backend developer",
    Icon: Server,
    description:
      "Server-side engineers who design and build APIs, data pipelines, and application logic, sourced across backend disciplines and seniority levels.",
    skills: ["Node.js", "Python", "Go", "Java", "PostgreSQL", "GraphQL"],
  },
  {
    category: "Engineering",
    title: "Frontend developer",
    Icon: Monitor,
    description:
      "Client-side engineers building performant, accessible web interfaces across modern JavaScript frameworks and component-driven workflows.",
    skills: ["React", "Vue", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Quality assurance",
    title: "QA engineer",
    Icon: Bug,
    description:
      "Engineers who design and run test strategies across manual and automated disciplines, embedded in delivery teams or as a dedicated QA function.",
    skills: ["Selenium", "Cypress", "Playwright", "Jest", "Test planning"],
  },
  {
    category: "Design",
    title: "UI/UX designer",
    Icon: Layers,
    description:
      "Designers who translate product requirements into interfaces, covering wireframes, interaction design, and design systems built for engineering handoff.",
    skills: ["Figma", "Prototyping", "Design systems", "Accessibility"],
  },
  {
    category: "Data",
    title: "Data engineer",
    Icon: Database,
    description:
      "Engineers who build and maintain the data infrastructure underpinning analytics, reporting, and machine learning workloads.",
    skills: ["Python", "SQL", "dbt", "Airflow", "Spark", "BigQuery"],
  },
  {
    category: "Engineering",
    title: "Mobile developer",
    Icon: Code2,
    description:
      "Engineers specialising in native and cross-platform mobile application development across iOS and Android.",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
  },
  {
    category: "Engineering",
    title: "DevOps / platform engineer",
    Icon: ShieldCheck,
    description:
      "Engineers who build and manage the infrastructure, CI/CD pipelines, and deployment environments your development teams rely on.",
    skills: ["AWS", "GCP", "Terraform", "Docker", "Kubernetes"],
  },
  {
    category: "Product and delivery",
    title: "Project / product manager",
    Icon: ClipboardList,
    description:
      "Professionals who manage delivery cadence, product roadmaps, and cross-functional coordination inside technology teams.",
    skills: ["Agile", "Scrum", "Jira", "Roadmap planning"],
  },
];

function RoleCard({ role }: { role: Role }) {
  const { Icon } = role;
  return (
    <article className="flex flex-col border-b border-r border-rule p-7">
      <div className="flex items-start gap-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[4px] bg-primary/10">
          <Icon className="size-4 text-primary" aria-hidden />
        </span>
        <div>
          <p className="data-label text-primary">{role.category}</p>
          <h3 className="mt-1.5 text-[15px] font-bold text-foreground">
            {role.title}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {role.description}
      </p>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {role.skills.map((skill) => (
          <li
            key={skill}
            className="tnum rounded-[3px] border border-rule bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function RolePage() {
  return (
    <>
      <PageHero
        label="Role availability"
        title="The roles we hire for."
        lede="The technology disciplines Scalout sources, employs, and manages. Exact titles and seniority are scoped per engagement."
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
        <div className="container-page py-20">
          <SectionHead
            title="Eight roles, scoped per engagement."
            body="Descriptions below are capability-focused. They describe what we recruit for rather than a live staffing board."
          />

          <div className="mt-12 grid border-l border-t border-rule sm:grid-cols-2">
            {roles.map((role) => (
              <RoleCard key={role.title} role={role} />
            ))}
          </div>

          <div className="texture-dither mt-12 flex flex-col items-start gap-6 rounded-[4px] border border-primary/20 bg-accent px-8 py-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[15px] font-bold text-foreground">
                Do not see your role?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-tint">
                These are our primary hiring categories. If your requirement
                sits next to one of them, or spans several, talk to us.
                Engagements are scoped to what you need, not to a fixed
                catalogue.
              </p>
            </div>
            <Cta href="/contact">Talk to us</Cta>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to scope your team?"
        body="Tell us the roles, seniority levels, and team size you need, and we will scope an engagement around them."
        actions={
          <>
            <Cta href="/contact" tone="invert">
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
