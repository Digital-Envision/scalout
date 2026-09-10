import { BrandMark } from "@/components/brand-mark";

/**
 * Landing chrome (Figma nodes 2010:5 / 2010:656) — deliberately lighter than
 * the main site shell: a logo-only sticky bar and a slim footer, so the page
 * has no navigation competing with its CTAs.
 *
 * The Figma footer carries Privacy Policy and Terms of Service links. They are
 * omitted until those routes exist — this page is in the sitemap, so shipping
 * them would point crawlers at two 404s.
 */
function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,0,0,0.08)] bg-white/95 backdrop-blur-[8px]">
      <div className="mx-auto flex h-16 w-full max-w-[1024px] items-center px-6">
        <BrandMark height={24} eager />
      </div>
    </header>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#060a0f] px-6 py-6">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center gap-3 text-xs leading-4 sm:flex-row sm:justify-between">
        <BrandMark height={18} invert />
        <p className="text-[#45556c]">© 2026 Scalout. All rights reserved.</p>
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
