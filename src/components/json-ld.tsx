/**
 * Structured data for crawlers. Rendered inline rather than through
 * `<Script>` so it is present in the prerendered HTML, which is what Google's
 * parser reads.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escaping `<` keeps a stray "</script>" inside any string from closing
      // the element early. Payloads are authored in this repo, but the guard
      // costs nothing and survives the next person adding a field.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

type FaqEntry = { question: string; answer: string };

/** Google requires the answers to be visible on the page — they are. */
export function faqPageSchema(items: readonly FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
