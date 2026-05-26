import type { Metadata } from "next";
import { Source_Serif_4, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/layout/PageTransition";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staicha.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Staicha — Chartered Accountants & Advisors",
    template: "%s | Staicha — Chartered Accountants & Advisors",
  },
  description:
    "Staicha LLP. A London chartered accountancy and advisory firm where Big Four rigour meets boutique responsiveness. Numbers, with conviction.",
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
    siteName: "Staicha",
    title: "Staicha — Chartered Accountants & Advisors",
    description: "Numbers, with conviction. A London chartered accountancy and advisory firm.",
    url: siteUrl,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Staicha" }],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Staicha — Chartered Accountants & Advisors",
    description: "Numbers, with conviction.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-bone text-ink">
        <a href="#main" className="skip-link">Skip to content</a>
        <SmoothScroll />
        <CustomCursor />
        <Navigation />
        <PageTransition>
          <main id="main" className="min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AccountingService",
              name: "Staicha LLP",
              url: siteUrl,
              email: "contact@staicha.com",
              telephone: "+44 20 7946 0118",
              description:
                "London chartered accountancy and advisory firm. Audit, tax, corporate finance, and fractional CFO services.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "14 Throgmorton Avenue",
                addressLocality: "London",
                postalCode: "EC2N 2DL",
                addressCountry: "GB",
              },
              areaServed: "GB",
              priceRange: "£££",
            }),
          }}
        />
      </body>
    </html>
  );
}
