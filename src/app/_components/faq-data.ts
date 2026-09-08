export type FaqItem = { question: string; answer: string };

/**
 * Lives apart from the accordion so the page can emit `FAQPage` JSON-LD from
 * the same array it renders. Structured data that drifts from the visible
 * answers is a Google penalty, not a missing feature.
 */
export const FAQS: FaqItem[] = [
  {
    question: "Do I need to set up a company in Indonesia to work with Scalout?",
    answer:
      "No. Scalout is the legal employer of record through its own Indonesian infrastructure, so you can build and employ a team in Indonesia without establishing a local entity. You contract with Scalout under a single commercial agreement, and we handle the local employment relationship end to end.",
  },
  {
    question: "Is Scalout's EOR system in-house or provided by a third party?",
    answer:
      "It is fully in-house. Scalout is the employer of record for your team members and carries all employer obligations directly. There is no third-party employment provider or intermediary in the chain, which means one accountable partner from contract to payroll.",
  },
  {
    question: "What types of technology roles can Scalout support?",
    answer:
      "We focus exclusively on technology roles: software engineers (backend, frontend, and mobile), QA engineers, DevOps and platform engineers, data engineers, UI/UX designers, and product or project managers. Exact titles and seniority are scoped to each engagement.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Pricing is custom rather than published. It depends on team size, role mix, and the scope of services you need, covering EOR, sourcing, office space, and so on. Talk to our team and we will put together a tailored proposal, with no fixed rates and no hidden fees.",
  },
  {
    question: "Can Scalout work with companies not headquartered in Singapore?",
    answer:
      "Yes. While many of our clients operate from Singapore, Scalout works with international companies wherever they are based, across Asia-Pacific, Europe, and North America. Our operations are timezone-flexible and set up for cross-border engagements.",
  },
  {
    question: "Does Scalout support office space as part of the engagement?",
    answer:
      "Yes. For teams that need a physical presence in Indonesia, Scalout can provide ready-to-use workspace as part of the engagement, coordinated alongside EOR and payroll, so there is no separate lease or facilities contract to negotiate.",
  },
  {
    question: "What happens if an employment relationship needs to end?",
    answer:
      "As the legal employer, Scalout manages offboarding in full compliance with Indonesian employment law, including notice periods, final settlements, and statutory requirements. We handle the process end to end so it is managed correctly and with minimal disruption to your team.",
  },
];
