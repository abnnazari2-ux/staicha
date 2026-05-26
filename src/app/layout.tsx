import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/layout/PageTransition";
import PageLoadSequence from "@/components/layout/PageLoadSequence";
import { site } from "@/content/site";
import { JsonLd, organizationLd } from "@/lib/jsonLd";
import { readCollection } from "@/lib/cms";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F1417",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Chartered Accountants & Advisors`,
    template: `%s | ${site.name} — Chartered Accountants & Advisors`,
  },
  description: `${site.legalName}. ${site.description} ${site.tagline}`,
  keywords: [
    "chartered accountants London",
    "audit",
    "tax advisory",
    "fractional CFO",
    "R&D tax credits",
    "corporate finance",
    "Staicha",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Chartered Accountants & Advisors`,
    description: `${site.tagline} ${site.description}`,
    url: site.url,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Chartered Accountants & Advisors`,
    description: site.tagline,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const services = await readCollection("services");
  const footerServices = services.slice(0, 8).map((s) => ({ slug: s.slug, title: s.title }));
  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-bone text-ink">
        <noscript>
          <style>{`
            [data-reveal],
            [data-reveal] * {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
        <a href="#main" className="skip-link">Skip to content</a>
        <SmoothScroll />
        <CustomCursor />
        <PageLoadSequence />
        <Navigation />
        <PageTransition>
          <main id="main" className="min-h-screen">{children}</main>
        </PageTransition>
        <Footer services={footerServices} />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
