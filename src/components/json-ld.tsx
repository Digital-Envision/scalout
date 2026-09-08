/**
 * Structured data for crawlers. Rendered inline rather than through
 * `<Script>` so it is present in the prerendered HTML, which is what Google's
 * parser reads.
 *
 * The nodes themselves live in `src/lib/schema.ts`.
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
