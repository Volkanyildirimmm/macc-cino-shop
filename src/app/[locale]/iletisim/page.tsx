import { type Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Contact } from "@/components/sections/Contact";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shop.macc-cino.com";

const OG_LOCALE: Record<string, string> = {
  tr: "tr_TR",
  de: "de_DE",
  en: "en_US",
};

const HTML_LANG: Record<string, string> = {
  tr: "tr-TR",
  de: "de-DE",
  en: "en-US",
};

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/iletisim` },
    openGraph: {
      title: `${t("title")} — macc-cino`,
      description: t("description"),
      url: `${SITE_URL}/${locale}/iletisim`,
      siteName: "macc-cino",
      locale: OG_LOCALE[locale] ?? "tr_TR",
      type: "website",
    },
  };
}

export default async function IletisimPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "metadata.contact" });

  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/${locale}/iletisim`,
    name: `${t("title")} — macc-cino`,
    inLanguage: HTML_LANG[locale] ?? "tr-TR",
  };

  return (
    <div className="min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
      <Contact />
    </div>
  );
}
