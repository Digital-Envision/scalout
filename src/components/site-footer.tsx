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

/**
 * Ink footer. Together with the hero and the closing band it frames the light
 * body, so the dark ground reads as page structure rather than a theme flip.
 */
export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-ink">
      <div aria-hidden className="texture-grid-ink absolute inset-0 opacity-50" />
      <div className="container-page relative py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-[252px]">
            <BrandMark height={26} invert />
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              Helping international companies build and legally employ
              technology teams in Southeast Asia.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="data-label text-white/60">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="data-label text-white/60">Contact</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
                >
                  Talk to us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@scalout.com"
                  className="text-sm text-white/55 transition-colors hover:text-white"
                >
                  hello@scalout.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Scalout. All rights reserved.</p>
          <p>Indonesia operations hub</p>
        </div>
      </div>
    </footer>
  );
}
