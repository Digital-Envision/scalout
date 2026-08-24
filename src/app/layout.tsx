import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ScaleOut — Build Your Technology Team, Compliant from Day One",
    template: "%s · ScaleOut",
  },
  description:
    "ScaleOut helps international companies build and legally employ technology teams in Southeast Asia — fully managed employment, compliant from day one.",
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
      className={cn("h-full antialiased font-sans", jakarta.variable)}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
