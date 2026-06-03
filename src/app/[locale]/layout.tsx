import type { Metadata } from "next";
import { Outfit, Inter, Kaushan_Script } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SmoothScrollInit } from "@/components/layout/SmoothScrollInit";
import { Providers } from "../providers";
import { routing } from "@/i18n/routing";

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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shop.macc-cino.com";

const OG_LOCALE: Record<string, string> = {
  tr: "tr_TR",
  de: "de_DE",
  en: "en_US",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.root" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s | macc-cino` },
    description: t("description"),
    applicationName: "macc-cino",
    authors: [{ name: "macc-cino" }],
    creator: "macc-cino",
    publisher: "macc-cino",
    category: "food and beverage",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        tr: "/tr",
        de: "/de",
        en: "/en",
        "x-default": "/tr",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/${locale}`,
      siteName: "macc-cino",
      locale: OG_LOCALE[locale] ?? "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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
    formatDetection: { telephone: false, email: false, address: false },
  };
}

const HTML_LANG: Record<string, string> = {
  tr: "tr-TR",
  de: "de-DE",
  en: "en-US",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "metadata.root" });

  return (
    <html
      lang={HTML_LANG[locale] ?? "tr-TR"}
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
                  description: t("description"),
                  areaServed: ["DE", "TR", "AT", "CH", "GB", "US"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: `${SITE_URL}/${locale}`,
                  name: "macc-cino",
                  inLanguage: HTML_LANG[locale] ?? "tr-TR",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
              ],
            }),
          }}
        />
        <NextIntlClientProvider>
          <Providers>
            <SmoothScrollInit />
            <div className="grain-overlay">
              <Header />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
