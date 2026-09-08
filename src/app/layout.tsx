import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_PROFILES,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import { JsonLd } from "@/components/json-ld";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

/** Data face: field labels, numerals, table figures. */
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // Shared to LinkedIn, WhatsApp, Slack and mail clients far more often than
  // it is found in search. `title`, `description` and `url` are deliberately
  // absent: Next fills each from the page's own resolved title, description
  // and canonical, so every route gets its own card. Pinning them here made
  // all seven share the homepage's. Every page names the card through
  // `pageSeo`; anything that doesn't (the 404) picks it up from the
  // `opengraph-image.tsx` file convention.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

/**
 * The entity behind the site. Scalout is a merger of two named Indonesian
 * businesses, and saying so here is what lets Google resolve the brand name
 * rather than guess at it.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/brand/logo.png`,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  foundingLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressCountry: "ID" },
  },
  address: { "@type": "PostalAddress", addressCountry: "ID" },
  areaServed: [
    { "@type": "Place", name: "Asia-Pacific" },
    { "@type": "Place", name: "Europe" },
    { "@type": "Place", name: "North America" },
  ],
  knowsAbout: [
    "Employer of record",
    "Technology recruitment in Indonesia",
    "Offshore engineering teams",
    "Indonesian employment compliance",
  ],
  ...(SITE_PROFILES.length > 0 ? { sameAs: SITE_PROFILES } : {}),
};

/**
 * Root layout — owns <html>/<body>, fonts and global metadata only.
 * Page chrome lives in the route-group layouts: `(site)` renders the full
 * site header/footer, `(landing)` renders its own minimal landing chrome.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased font-sans",
        jakarta.variable,
        jetbrains.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
