"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { FAQS } from "./faq-data";

/**
 * Hairline-divided disclosure list. Only the chevron animates (a transform);
 * the panel toggles instantly, so there is no height animation to jank or to
 * fight `prefers-reduced-motion`.
 */
export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 border-t border-rule">
      {FAQS.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={item.question} className="border-b border-rule">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-primary"
              >
                <span
                  className={cn(
                    "text-[15px] font-semibold",
                    isOpen ? "text-primary" : "text-foreground",
                  )}
                >
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180 text-primary",
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
              className="-mt-1 pb-6"
            >
              <p className="max-w-[68ch] text-[15px] leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
