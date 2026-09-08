import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_PROFILES,
  SITE_URL,
} from "@/lib/site";

/**
 * Stable node identities.
 *
 * Every other node references these instead of restating the company, which is
 * what turns a pile of separate assertions into one entity an engine can
 * reason about. Without them, "a page mentions Scalout" is all the markup
 * says.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const AREA_SERVED = [
  { "@type": "Place", name: "Asia-Pacific" },
  { "@type": "Place", name: "Europe" },
  { "@type": "Place", name: "North America" },
];

/** The company, declared once. Everything else points at `ORG_ID`. */
export const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  legalName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/brand/logo.png`,
  // Deliberately the same string as the root `metadata.description` and as
  // every off-site profile. Answer engines corroborate a brand across
  // independent sources, and "Scalout" is close enough to ordinary words that
  // inconsistent wording invites hedging or conflation.
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  foundingLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressCountry: "ID" },
  },
  address: { "@type": "PostalAddress", addressCountry: "ID" },
  areaServed: AREA_SERVED,
  knowsAbout: [
    "Employer of record",
    "Technology recruitment in Indonesia",
    "Offshore engineering teams",
    "Indonesian employment compliance",
  ],
  ...(SITE_PROFILES.length > 0 ? { sameAs: SITE_PROFILES } : {}),
};

export const webSiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

type FaqEntry = { question: string; answer: string };

/** Google requires the answers to be visible on the page — they are. */
export function faqPageNode(path: string, items: readonly FaqEntry[]) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path === "/" ? "/" : path}#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

type ServiceEntry = {
  id: string;
  title: string;
  paragraphs: string[];
  inclusions: string[];
};

/**
 * One node per service, built from the array the page renders.
 *
 * `hasOfferCatalog` carries the inclusions, which is what lets an engine
 * answer "does Scalout provide office space" from a declared fact rather than
 * a guess at body copy. No prices: pricing is scoped per engagement, and an
 * `Offer` without a price is valid — an invented one is not.
 */
export function serviceNodes(services: readonly ServiceEntry[]) {
  return services.map((service) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/service#${service.id}`,
    name: service.title,
    serviceType: service.title,
    description: service.paragraphs[0],
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} — what is included`,
      itemListElement: service.inclusions.map((inclusion) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: inclusion },
      })),
    },
  }));
}

type RoleEntry = { title: string; description: string };

/**
 * The disciplines Scalout recruits for.
 *
 * Deliberately an `ItemList` and **not** `JobPosting`. The page's own copy
 * says these are the categories we recruit for, not a real-time staffing
 * board, and `JobPosting` markup on anything that is not an actual vacancy
 * violates Google's structured data policy — the penalty is removal of the
 * whole site from job results, not just this page. `JobPosting` belongs on a
 * real openings page, with real roles and `validThrough` dates.
 */
export function roleListNode(name: string, roles: readonly RoleEntry[]) {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/role#disciplines`,
    name,
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: roles.length,
    itemListElement: roles.map((role, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: role.title,
      description: role.description,
    })),
  };
}

/**
 * A page, as the thing that ties an `Intangible` to the site and the company.
 *
 * `ItemList` and `Service` are Intangibles, so `isPartOf` and `about` are not
 * valid on them — those are CreativeWork properties. A `WebPage` node is where
 * the relationship legitimately lives: it is part of the `WebSite`, it is
 * about the `Organization`, and its `mainEntity` is the list.
 */
export function webPageNode({
  path,
  name,
  mainEntityId,
}: {
  path: string;
  name: string;
  mainEntityId: string;
}) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: { "@id": mainEntityId },
  };
}

/** Wraps nodes into a single `@graph` so their `@id` references resolve. */
export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
