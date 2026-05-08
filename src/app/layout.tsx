import type { Metadata } from "next";
import { Outfit, Inter, Kaushan_Script } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SmoothScrollInit } from "@/components/layout/SmoothScrollInit";
import { Providers } from "./providers";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const kaushanScript = Kaushan_Script({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: "400",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shop.macc-cino.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "macc-cino — Matcha Konsantre | Ceremonial Grade, Organik",
    template: "%s | macc-cino",
  },
  description:
    "Profesyonel kullanım için standartlaştırılmış matcha konsantresi. Ceremonial Grade, organik, Almanya üretimi. 4 farklı boyut — 250ml, 500ml, 1000ml, 1000ml Pompalı.",
  keywords: [
    "matcha konsantre",
    "sıvı matcha",
    "ceremonial grade matcha",
    "organik matcha",
    "matcha kafe",
    "matcha toptan",
    "white label matcha",
    "matcha şurubu",
    "horeca matcha",
  ],
  applicationName: "macc-cino",
  authors: [{ name: "macc-cino" }],
  creator: "macc-cino",
  publisher: "macc-cino",
  category: "food and beverage",
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "macc-cino — Matcha Konsantre",
    description:
      "Matcha — standart. ölçeklenebilir. ekonomik. Profesyonel kullanım için sıvı matcha konsantresi.",
    url: SITE_URL,
    siteName: "macc-cino",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "macc-cino — Matcha Konsantre",
    description: "Matcha — standart. ölçeklenebilir. ekonomik.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${outfit.variable} ${inter.variable} ${kaushanScript.variable}`}
    >
      <body className="bg-base text-text-primary font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "macc-cino",
                  url: SITE_URL,
                  logo: `${SITE_URL}/images/matcha-bottle-hero.png`,
                  description:
                    "Profesyonel kullanım için standartlaştırılmış matcha konsantresi. Ceremonial Grade, organik, Almanya üretimi.",
                  slogan: "Matcha — standart. ölçeklenebilir. ekonomik.",
                  areaServed: ["DE", "TR", "AT", "CH"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "macc-cino",
                  inLanguage: "tr-TR",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
              ],
            }),
          }}
        />
        <Providers>
          <SmoothScrollInit />
          <div className="grain-overlay">
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
