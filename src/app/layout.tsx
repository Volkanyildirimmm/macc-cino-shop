import type { Metadata } from "next";
import { Outfit, Inter, Kaushan_Script } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SmoothScrollInit } from "@/components/layout/SmoothScrollInit";

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

export const metadata: Metadata = {
  title: "macc-cino — Matcha Konsantre | Ceremonial Grade, Organik",
  description:
    "Profesyonel kullanım için standartlaştırılmış matcha konsantresi. Ceremonial Grade, organik, Almanya üretimi. 4 farklı boyut — 250ml, 500ml, 1000ml, 1000ml Pompalı.",
  keywords: [
    "matcha konsantre",
    "sıvı matcha",
    "ceremonial grade",
    "organik matcha",
    "matcha kafe",
    "matcha toptan",
    "white label matcha",
  ],
  openGraph: {
    title: "macc-cino — Matcha Konsantre",
    description: "Matcha — standart. ölçeklenebilir. ekonomik.",
    url: "https://macc-cino.com",
    siteName: "macc-cino",
    type: "website",
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
        <SmoothScrollInit />
        <div className="grain-overlay">
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </div>
      </body>
    </html>
  );
}
