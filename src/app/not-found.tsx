import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Cta, PageHero } from "@/components/site-kit";
import { CONTACT_HREF, NAV_ITEMS } from "@/lib/nav";

/**
 * The 404 every unmatched URL lands on.
 *
 * This file has to sit at the app root — that is the only `not-found` Next
 * routes an unmatched URL to — which puts it outside the `(site)` group and
 * so outside its header and footer. Both are rendered here by hand, matching
 * `(site)/layout.tsx`, because the point of the page is to give a mistyped
 * link a way back into the site rather than a dead end.
 *
 * No `metadata` export: Next supports one on `global-not-found` only, and it
 * already injects `noindex` on anything answering 404.
 */
export default function NotFound() {
  const destinations = [...NAV_ITEMS, { label: "Talk to us", href: CONTACT_HREF }];

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          label="404"
          title="That page isn't here."
          lede="The address may be mistyped, or the page may have moved. Everything else is where you left it."
          actions={
            <>
              <Cta href="/" tone="invert">
                Back to home
              </Cta>
              <Cta href={CONTACT_HREF} tone="outline-ink">
                Talk to us
              </Cta>
            </>
          }
        />

        {/* Same ruled grid as the rest of the site: the destinations read as
            one field rather than a stack of loose links. */}
        <section className="bg-background">
          <div className="container-page py-20">
            <p className="data-label text-primary">Where to next</p>
            <ul className="mt-8 grid border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((item) => (
                <li key={item.href} className="border-b border-r border-rule">
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between gap-4 p-7 transition-colors hover:bg-muted"
                  >
                    <span className="text-[15px] font-bold text-foreground">
                      {item.label}
                    </span>
                    <span
                      aria-hidden
                      className="text-primary transition-transform group-hover:translate-x-0.5"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
