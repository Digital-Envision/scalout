import Link from "next/link";

import {
  DitheringShader,
  type DitheringShape,
} from "@/components/ui/dithering-shader";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Data-texture primitives shared by every (site) page.

   Radii are a flat 4px throughout, surfaces are hairline-bounded rather than
   elevated, and monospace is reserved for things a reader scans as data. The
   (landing) route group keeps its own rounder Figma-derived language.
   --------------------------------------------------------------------------- */

export const PLATE = "rounded-[4px] border border-rule bg-card";
export const PLATE_MUTED = "rounded-[4px] border border-rule bg-muted";

/* ---------- Calls to action ---------- */

/**
 * One label per intent across the whole site: "Talk to us" for contact,
 * "See our services", "View roles", "Compare providers". Tones invert between
 * light body sections and the ink grounds; the accent never changes.
 */
type CtaTone = "solid" | "line" | "invert" | "outline-ink";

const CTA_BASE =
  "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-[4px] px-5 text-sm font-semibold transition-colors active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2";

const CTA_TONES: Record<CtaTone, string> = {
  solid:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary",
  line: "border border-rule bg-card text-foreground hover:bg-secondary focus-visible:outline-primary",
  invert:
    "bg-white text-ink hover:bg-white/88 focus-visible:outline-white",
  "outline-ink":
    "border border-white/25 text-white hover:bg-white/10 focus-visible:outline-white",
};

export function Cta({
  href,
  tone = "solid",
  className,
  children,
}: {
  href: string;
  tone?: CtaTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(CTA_BASE, CTA_TONES[tone], className)}>
      {children}
    </Link>
  );
}

/* ---------- Section scaffolding ---------- */

/**
 * Section header. Deliberately a vertical stack: headline, then body at a
 * readable measure. No split header, no corner-floating explainer.
 */
export function SectionHead({
  label,
  title,
  body,
  aside,
  tone = "light",
}: {
  /** Monospace field label. Rationed to one per three sections per page. */
  label?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** Optional trailing link, kept on the baseline of the headline row. */
  aside?: React.ReactNode;
  tone?: "light" | "ink";
}) {
  return (
    <header>
      {label ? (
        <p
          className={cn(
            "data-label mb-4",
            tone === "ink" ? "text-brand-on-ink" : "text-primary",
          )}
        >
          {label}
        </p>
      ) : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2
          className={cn(
            "max-w-3xl text-[28px] font-bold leading-[1.15] tracking-tight sm:text-4xl",
            tone === "ink" ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h2>
        {aside}
      </div>
      {body ? (
        <p
          className={cn(
            "mt-5 max-w-[62ch] text-[15px] leading-relaxed",
            tone === "ink" ? "text-white/65" : "text-muted-foreground",
          )}
        >
          {body}
        </p>
      ) : null}
    </header>
  );
}

/** Inline "keep reading" link. Same arrow affordance everywhere. */
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b border-primary/25 pb-0.5 text-sm font-semibold text-primary transition-colors hover:border-primary"
    >
      {children}
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    </Link>
  );
}

/* ---------- Hero ---------- */

/**
 * The dark opening block every (site) page shares: an ordered-dither swirl
 * running on the ink ground, scrimmed back so the copy column keeps well
 * above AA. The shader is the page's motion; sections below stay still.
 */
export function PageHero({
  label,
  title,
  lede,
  actions,
  size = "page",
  shape = "swirl",
}: {
  label?: string;
  title: React.ReactNode;
  /** Keep to 20 words or fewer so the hero never pushes the CTAs off screen. */
  lede: string;
  actions?: React.ReactNode;
  size?: "page" | "home";
  shape?: DitheringShape;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Shader sits to the right on desktop so the copy column stays clean. */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[64%]">
        <DitheringShader
          shape={shape}
          type="4x4"
          colorBack="#070a10"
          colorFront="#2f6fe4"
          pxSize={4}
          speed={0.9}
          scale={1.05}
        />
      </div>

      {/* Scrims: vertical on mobile where the swirl sits behind the copy,
          horizontal on desktop where it sits beside it. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-ink from-20% via-ink/90 to-ink/62 md:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-linear-to-r from-ink from-30% via-ink/80 to-transparent md:block"
      />
      <div
        aria-hidden
        className="texture-grid-ink absolute inset-0 opacity-70"
      />

      <div
        className={cn(
          "container-page relative",
          size === "home"
            ? "pb-24 pt-20 sm:pt-24"
            : "pb-20 pt-16 sm:pb-24 sm:pt-20",
        )}
      >
        <div className={size === "home" ? "max-w-[54rem]" : "max-w-[46rem]"}>
          {label ? (
            <p className="data-label text-brand-on-ink">{label}</p>
          ) : null}
          <h1
            className={cn(
              "font-bold tracking-tight text-white",
              label ? "mt-5" : "",
              size === "home"
                ? "text-[32px] leading-[1.08] sm:text-[52px] sm:leading-[1.04]"
                : "text-[30px] leading-[1.1] sm:text-[44px] sm:leading-[1.06]",
            )}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/70">
            {lede}
          </p>
          {actions ? (
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
              {actions}
            </div>
          ) : null}
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/12" />
    </section>
  );
}

/* ---------- Ink band ---------- */

/**
 * Closing band. Same ink ground as the hero and the footer, so the page reads
 * as one dark frame around a light body rather than an alternating theme.
 */
export function CtaBand({
  title,
  body,
  actions,
}: {
  title: string;
  body: string;
  actions: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div
        aria-hidden
        className="texture-grid-ink absolute inset-0 opacity-60"
      />
      <div className="container-page relative grid gap-10 py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <h2 className="max-w-2xl text-[28px] font-bold leading-tight tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-white/60">
            {body}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          {actions}
        </div>
      </div>
    </section>
  );
}
