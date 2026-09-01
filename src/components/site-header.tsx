"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS, CONTACT_HREF } from "@/lib/nav";
import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

// Sticky site header reproduced from the Figma design (node 2:956).
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-white/92 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <BrandMark eager />

        {/* Desktop nav */}
        <nav className="hidden items-center self-stretch md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3.5 py-5 text-[13px] font-semibold transition-colors",
                "after:absolute after:inset-x-3.5 after:bottom-0 after:h-[2px] after:transition-colors",
                isActive(item.href)
                  ? "text-foreground after:bg-primary"
                  : "text-muted-foreground after:bg-transparent hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={CONTACT_HREF}
            className="ml-4 rounded-[4px] bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:translate-y-px"
          >
            Talk to us
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-[4px] text-foreground md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-rule bg-white md:hidden">
          <div className="container-page flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-l-2 px-3 py-2.5 text-sm font-semibold",
                  isActive(item.href)
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={CONTACT_HREF}
              onClick={() => setOpen(false)}
              className="mt-3 rounded-[4px] bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Talk to us
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
