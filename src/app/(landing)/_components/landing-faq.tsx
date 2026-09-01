"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type LandingFaqItem = { question: string; answer: string };

/**
 * Landing FAQ (Figma node 2010:533) — a two-column grid of collapsed cards.
 * `items-start` keeps each card at its own height so opening one does not
 * stretch its row neighbour.
 */
export function LandingFaq({ items }: { items: LandingFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 grid items-start gap-3 md:grid-cols-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `landing-faq-panel-${index}`;
        const buttonId = `landing-faq-button-${index}`;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-[rgba(0,0,0,0.07)] bg-[#f9fafb]"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold leading-5 text-foreground">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "mt-0.5 size-[15px] shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5"
            >
              <p className="text-sm leading-[22.75px] text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
