import Link from "next/link";

/**
 * Landing chrome (Figma nodes 2010:5 / 2010:656) — deliberately lighter than
 * the main site shell: a logo-only sticky bar and a slim legal footer, so the
 * page has no navigation competing with its CTAs.
 */
function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,0,0,0.08)] bg-white/95 backdrop-blur-[8px]">
      <div className="mx-auto flex h-16 w-full max-w-[1024px] items-center px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Scalout — go to home"
        >
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-sm font-bold leading-[14px] text-primary-foreground">
            S
          </span>
          <span className="text-base font-bold leading-6 tracking-[-0.4px] text-foreground">
            Scalout
          </span>
        </Link>
      </div>
    </header>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#060a0f] px-6 py-6">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center gap-3 text-xs leading-4 sm:flex-row sm:justify-between">
        <span className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded bg-primary text-[10px] font-bold leading-[13.333px] text-primary-foreground">
            S
          </span>
          <span className="font-semibold text-[#62748e]">Scalout</span>
        </span>
        <p className="text-[#45556c]">© 2026 Scalout. All rights reserved.</p>
        {/* TODO: /privacy and /terms routes do not exist yet. */}
        <div className="flex items-center gap-5 text-[#45556c]">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </>
  );
}
