"use client";

import { useEffect } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Cta, CtaButton, PageHero } from "@/components/site-kit";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Root error boundary.
 *
 * It wraps every route group, so when a page throws it replaces the group's
 * layout along with the page — the header and footer are rendered here for
 * the same reason as in `not-found.tsx`.
 *
 * A server error reaches the client as a generic message plus a digest, so
 * there is nothing useful to show the visitor beyond that digest: it is the
 * one string that matches this render to a line in the App Platform logs, so
 * it is worth putting on screen for them to quote.
 */
export default function AppError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          label="Error"
          title="Something went wrong on our side."
          lede="The page failed to load. Trying again often clears it — if it doesn't, tell us and we'll look."
          actions={
            <>
              <CtaButton tone="invert" onClick={() => unstable_retry()}>
                Try again
              </CtaButton>
              <Cta href="/" tone="outline-ink">
                Back to home
              </Cta>
            </>
          }
        />

        <section className="bg-background">
          <div className="container-page py-20">
            <p className="data-label text-primary">If it keeps happening</p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
              Email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              with what you were doing
              {error.digest ? " and the reference below" : ""}. It goes to a
              person, not a queue.
            </p>
            {error.digest ? (
              <p className="mt-6 font-mono text-xs text-muted-foreground">
                Reference{" "}
                <span className="rounded-[2px] border border-rule bg-muted px-1.5 py-0.5 text-foreground">
                  {error.digest}
                </span>
              </p>
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
