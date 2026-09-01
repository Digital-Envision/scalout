import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Scalout wordmark — the supplied artwork in public/assets/brand, trimmed to
// its glyphs so `height` maps directly onto the rendered lockup.
const ARTWORK = { width: 733, height: 154 };
const RATIO = ARTWORK.width / ARTWORK.height;

export function BrandMark({
  className,
  height = 24,
  invert = false,
  eager = false,
}: {
  className?: string;
  /** Rendered height in px; width follows the artwork ratio. */
  height?: number;
  /** White letterforms, for dark backgrounds. The swirl stays blue. */
  invert?: boolean;
  /** Skip lazy-loading — set for chrome that is above the fold. */
  eager?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label="Scalout — go to home"
    >
      <Image
        src={invert ? "/assets/brand/logo-invert.png" : "/assets/brand/logo.png"}
        alt=""
        width={Math.round(height * RATIO)}
        height={height}
        loading={eager ? "eager" : "lazy"}
      />
    </Link>
  );
}
