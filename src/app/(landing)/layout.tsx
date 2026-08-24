import Link from "next/link";

/**
 * Landing chrome (Figma node 2006:390 / 2006:381) — deliberately lighter than
 * the main site shell: a logo-only sticky bar and a slim legal footer, so the
 * page has no navigation competing with its CTAs.
 */
function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,0,0,0.09)] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1024px] items-center px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="ScaleOut — go to home"
        >
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            S
          </span>
          <span className="text-base font-bold tracking-[-0.4px] text-foreground">
            ScaleOut
          </span>
        </Link>
      </div>
    </header>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-[#0d1117] px-6 py-6">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center gap-3 text-xs text-[#62748e] sm:flex-row sm:justify-between">
        <p>© 2026 ScaleOut. All rights reserved.</p>
        {/* TODO: /privacy and /terms routes do not exist yet. */}
        <div className="flex items-center gap-5">
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
