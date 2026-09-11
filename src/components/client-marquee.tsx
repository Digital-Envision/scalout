import type { CSSProperties } from "react";

import Image from "next/image";

/* ---------------------------------------------------------------------------
   Client logo marquee
   ---------------------------------------------------------------------------
   The "Trusted by" strip on both route groups. Fourteen marks is more than a
   static row can hold at a legible size, so the wall scrolls: two rows moving
   in opposite directions, paused on hover and frozen flat under
   prefers-reduced-motion.

   The rows are split the way the VA For Everyone site ordered them — longest
   engagements first — rather than alphabetically.
   --------------------------------------------------------------------------- */

type ClientLogo = { src: string; name: string };

const CLIENT_ROW_ONE: ClientLogo[] = [
  { src: "/assets/clients/ddsn-interactive.webp", name: "DDSN Interactive" },
  { src: "/assets/clients/mineral-link.webp", name: "Mineral Link" },
  { src: "/assets/clients/it-connexion.webp", name: "IT Connexion" },
  { src: "/assets/clients/rocket-lab.webp", name: "Rocket Lab" },
  { src: "/assets/clients/dify.webp", name: "Dify" },
  { src: "/assets/clients/emcfg.webp", name: "EMCFG" },
  { src: "/assets/clients/goalmaker.webp", name: "Goalmaker Software Solutions" },
  { src: "/assets/clients/conveyed.webp", name: "Conveyed" },
];

const CLIENT_ROW_TWO: ClientLogo[] = [
  { src: "/assets/clients/well-balment.webp", name: "Well Balment" },
  { src: "/assets/clients/exterior-clean.webp", name: "Exterior Clean" },
  { src: "/assets/clients/review-maker-pro.webp", name: "Review Maker Pro" },
  { src: "/assets/clients/futurefy.webp", name: "Futurefy" },
  { src: "/assets/clients/brava.webp", name: "Brava — Women in Business" },
  {
    src: "/assets/clients/aleksandra-co.webp",
    name: "aleksandra + co Buyers' Agency",
  },
];

/* Widest viewport the track has to fill before it can loop seamlessly. The
   track is repeated until it covers this, then shifted by exactly one copy. */
const COVERAGE = 4000;

type Variant = "site" | "landing";

/* The logo files are a uniform 260x140 canvas with the mark padded inside, so
   the slot keeps that aspect at half scale (130x70). A shorter slot would
   letterbox on height and shrink every mark to something unreadable.

   SLOT_W must match the `w-[130px]` below — the copy count derives from it. */
const SLOT_W = 130;

/* Trailing gap per variant, likewise mirroring the gap classes below. */
const GAP: Record<Variant, number> = { site: 40, landing: 16 };

function MarqueeRow({
  logos,
  variant,
  direction,
}: {
  logos: ClientLogo[];
  variant: Variant;
  direction: "ltr" | "rtl";
}) {
  const copies =
    Math.ceil(COVERAGE / (logos.length * (SLOT_W + GAP[variant]))) + 1;

  const slot =
    "flex h-[70px] w-[130px] shrink-0 items-center justify-center" +
    (variant === "landing"
      ? " rounded-lg border border-[rgba(0,0,0,0.07)] bg-white"
      : "");

  const copy = (index: number) => (
    <ul
      key={index}
      className={`flex shrink-0 items-center ${variant === "site" ? "gap-10 pr-10" : "gap-4 pr-4"}`}
      /* Only the first copy is read out; the rest are visual padding. */
      aria-hidden={index > 0 || undefined}
    >
      {logos.map((logo) => (
        <li key={logo.name} className={slot}>
          <Image
            src={logo.src}
            alt={index === 0 ? logo.name : ""}
            width={260}
            height={140}
            /* The slot is the fixed box; object-contain letterboxes each mark
               inside it, so mixed logo proportions stay optically level. */
            className="h-full w-full object-contain"
            /* Lazy loading and a moving track fight each other: an offscreen
               slot never intersects, so it arrives blank and pops in mid-scroll.
               Fourteen files at ~3 KB apiece is cheaper than that. */
            loading="eager"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group overflow-hidden">
      <div
        className={`flex w-max motion-reduce:animate-none ${
          direction === "ltr"
            ? "animate-logo-marquee-ltr"
            : "animate-logo-marquee-rtl"
        } group-hover:[animation-play-state:paused]`}
        style={{ "--marquee-shift": `-${100 / copies}%` } as CSSProperties}
      >
        {Array.from({ length: copies }, (_, i) => copy(i))}
      </div>
    </div>
  );
}

/** Both rows, edge to edge, faded out at the gutters. */
export function ClientMarquee({ variant }: { variant: Variant }) {
  return (
    <div
      className={`flex flex-col [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] ${
        variant === "site" ? "gap-8" : "gap-4"
      }`}
    >
      <MarqueeRow logos={CLIENT_ROW_ONE} variant={variant} direction="ltr" />
      <MarqueeRow logos={CLIENT_ROW_TWO} variant={variant} direction="rtl" />
    </div>
  );
}
