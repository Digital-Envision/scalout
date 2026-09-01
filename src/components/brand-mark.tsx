import Link from "next/link";
import { cn } from "@/lib/utils";

// Scalout wordmark: a rounded "SO" badge + "Scalout" text. No image asset —
// this is reproduced from the Figma design as markup.
export function BrandMark({
  className,
  textClassName,
}: {
  className?: string;
  textClassName?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5", className)}
      aria-label="Scalout — go to home"
    >
      <span className="flex size-7 items-center justify-center rounded-[4px] bg-primary text-[10px] font-extrabold tracking-[-0.25px] text-primary-foreground">
        SO
      </span>
      <span
        className={cn(
          "text-[17px] font-bold tracking-[-0.425px] text-foreground",
          textClassName,
        )}
      >
        Scalout
      </span>
    </Link>
  );
}
