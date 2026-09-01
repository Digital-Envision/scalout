import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

type FooterLink = { label: string; href: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Role Availability", href: "/role" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Services", href: "/service" },
      { label: "Why Scalout", href: "/why" },
    ],
  },
];

// Site footer reproduced from the Figma design (node 2:887).
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-[252px]">
            <BrandMark height={26} />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Helping international companies build and legally employ technology
              teams in Southeast Asia.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
              Contact
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Get in Touch
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@scalout.com"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  hello@scalout.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Scalout. All rights reserved.</p>
          <p>Indonesia Operations Hub</p>
        </div>
      </div>
    </footer>
  );
}
