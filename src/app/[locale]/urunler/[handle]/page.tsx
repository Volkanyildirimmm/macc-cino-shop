import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HANDLE_META, PRODUCTS, localizeProductData } from "@/lib/constants";
import { fetchProductByHandle } from "@/lib/medusa-fetch";
import { adaptMedusaProduct } from "@/lib/product-adapter";
import { ProductDetailPage } from "@/components/product/ProductDetail";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shop.macc-cino.com";

const OG_LOCALE: Record<string, string> = {
  tr: "tr_TR",
  de: "de_DE",
  en: "en_US",
};

interface Props {
  params: Promise<{ locale: string; handle: string }>;
}

export async function generateStaticParams() {
  // Pre-render product pages for every (locale, handle) combination so
  // static generation works across the multi-locale tree.
  return routing.locales.flatMap((locale) =>
    Object.keys(HANDLE_META).map((handle) => ({ locale, handle }))
  );
}

async function loadProduct(handle: string, locale: string) {
  const medusa = await fetchProductByHandle(handle);
  if (medusa) {
    const adapted = adaptMedusaProduct(medusa, locale);
    if (adapted) return adapted;
  }
  const fallback = PRODUCTS.find((p) => p.handle === handle) ?? null;
  return fallback ? localizeProductData(fallback, locale) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, handle } = await params;
  const product = await loadProduct(handle, locale);
  if (!product) return {};

  const url = `${SITE_URL}/${locale}/urunler/${product.handle}`;
  const idx = PRODUCTS.findIndex((p) => p.handle === product.handle);
  const image = `/images/product-${(idx >= 0 ? idx : 0) + 1}.jpeg`;
  const title = product.title;

  return {
    title,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: product.description,
      url,
      siteName: "macc-cino",
      locale: OG_LOCALE[locale] ?? "tr_TR",
      type: "website",
      images: [{ url: image, width: 1200, height: 1200, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, handle } = await params;
  setRequestLocale(locale);
  const product = await loadProduct(handle, locale);
  if (!product) notFound();

  const idx = PRODUCTS.findIndex((p) => p.handle === product.handle);
  const url = `${SITE_URL}/${locale}/urunler/${product.handle}`;
  const image = `${SITE_URL}/images/product-${(idx >= 0 ? idx : 0) + 1}.jpeg`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.sku,
    image,
    brand: { "@type": "Brand", name: "macc-cino" },
    category: "Matcha Konsantre",
    countryOfOrigin: "DE",
    weight: { "@type": "QuantitativeValue", value: product.weight, unitCode: "GRM" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Hacim", value: `${product.volume}ml` },
      { "@type": "PropertyValue", name: "Porsiyon", value: product.portions },
      { "@type": "PropertyValue", name: "Kalite", value: "Ceremonial Grade" },
    ],
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: product.currency,
      price: (product.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "macc-cino" },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/${locale}/#urunler` },
      { "@type": "ListItem", position: 3, name: product.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ProductDetailPage product={product} />
    </>
  );
}
