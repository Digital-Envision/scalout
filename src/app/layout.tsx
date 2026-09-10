import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import { graph, organizationNode, webSiteNode } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { GoogleAnalytics } from "@next/third-parties/google";

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
        {/* The entity behind the site, and the site itself. Every other
            node on every other page references these by `@id`. */}
        <JsonLd data={graph(organizationNode, webSiteNode)} />
        {children}
      </body>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
