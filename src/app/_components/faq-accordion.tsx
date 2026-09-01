"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = { question: string; answer: string };

// Questions are verbatim from the Figma FAQ (node 2:813); the design frame only
// includes the collapsed questions, so answers are written to match the site's
// messaging (in-house EOR, Indonesia operations, custom pricing, tech-only roles).
const FAQS: FaqItem[] = [
  {
    question: "Do I need to set up a company in Indonesia to work with Scalout?",
    answer:
      "No. Scalout is the legal employer of record through its own Indonesian infrastructure, so you can build and employ a team in Indonesia without establishing a local entity. You contract with Scalout under a single commercial agreement, and we handle the local employment relationship end to end.",
  },
  {
    question: "Is Scalout's EOR system in-house or provided by a third party?",
    answer:
      "It is fully in-house. Scalout is the employer of record for your team members and carries all employer obligations directly — there is no third-party employment provider or intermediary in the chain. That means one accountable partner from contract to payroll.",
  },
  {
    question: "What types of technology roles can Scalout support?",
    answer:
      "We focus exclusively on technology roles: software engineers (backend, frontend, and mobile), QA engineers, DevOps and platform engineers, data engineers, UI/UX designers, and product or project managers. Exact titles and seniority are scoped to each engagement.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Pricing is custom rather than published. It depends on team size, role mix, and the scope of services you need — EOR, sourcing, office space, and so on. Talk to our team and we will put together a tailored proposal, with no fixed rates and no hidden fees.",
  },
  {
    question: "Can Scalout work with companies not headquartered in Singapore?",
    answer:
      "Yes. While many of our clients operate from Singapore, Scalout works with international companies wherever they are based — across Asia-Pacific, Europe, and North America. Our operations are timezone-flexible and set up for cross-border engagements.",
  },
  {
    question: "Does Scalout support office space as part of the engagement?",
    answer:
      "Yes. For teams that need a physical presence in Indonesia, Scalout can provide ready-to-use workspace as part of the engagement — coordinated alongside EOR and payroll, so there is no separate lease or facilities contract to negotiate.",
  },
  {
    question: "What happens if an employment relationship needs to end?",
    answer:
      "As the legal employer, Scalout manages offboarding in full compliance with Indonesian employment law, including notice periods, final settlements, and statutory requirements. We handle the process end to end so it is managed correctly and with minimal disruption to your team.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 space-y-2.5">
      {FAQS.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-lg border border-border bg-muted/60"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="text-sm font-semibold text-foreground">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
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
              className="px-6 pb-5 -mt-1"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
