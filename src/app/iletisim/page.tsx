import { type Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shop.macc-cino.com";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "macc-cino ile iletişime geçin. Toplu sipariş, white label ve genel sorular için bize ulaşın.",
  alternates: { canonical: "/iletisim" },
  openGraph: {
    title: "İletişim — macc-cino",
    description: "Toplu sipariş, white label ve genel sorular için bize ulaşın.",
    url: `${SITE_URL}/iletisim`,
    siteName: "macc-cino",
    locale: "tr_TR",
    type: "website",
  },
};

const contactLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/iletisim`,
  name: "İletişim — macc-cino",
  inLanguage: "tr-TR",
};

export default function IletisimPage() {
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
