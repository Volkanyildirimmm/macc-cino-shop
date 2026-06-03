import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/constants";
import { routing } from "@/i18n/routing";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shop.macc-cino.com";

// Localized slugs that mirror routing.pathnames.
// Kept in sync manually — sitemap is the only place we need the actual URL
// strings without the next-intl Link helper.
const LOCALIZED_PATHS = {
  iletisim: { tr: "iletisim", de: "kontakt", en: "contact" },
  kategoriPrefix: { tr: "kategori", de: "kategorie", en: "category" },
  urunlerPrefix: { tr: "urunler", de: "produkte", en: "products" },
} as const;

type Locale = (typeof routing.locales)[number];

function buildAlternates(path: (locale: Locale) => string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}/${l}${path(l)}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${path(routing.defaultLocale)}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Home + contact for each locale
  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: buildAlternates(() => ""),
    });

    const contactSlug = LOCALIZED_PATHS.iletisim[locale];
    entries.push({
      url: `${SITE_URL}/${locale}/${contactSlug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: buildAlternates(
        (l) => `/${LOCALIZED_PATHS.iletisim[l]}`
      ),
    });
  }

  // Matcha category for each locale
  for (const locale of routing.locales) {
    const catSlug = LOCALIZED_PATHS.kategoriPrefix[locale];
    entries.push({
      url: `${SITE_URL}/${locale}/${catSlug}/matcha`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: buildAlternates(
        (l) => `/${LOCALIZED_PATHS.kategoriPrefix[l]}/matcha`
      ),
    });
  }

  // Products for each locale
  for (const locale of routing.locales) {
    const prodSlug = LOCALIZED_PATHS.urunlerPrefix[locale];
    for (const p of PRODUCTS) {
      entries.push({
        url: `${SITE_URL}/${locale}/${prodSlug}/${p.handle}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: buildAlternates(
          (l) => `/${LOCALIZED_PATHS.urunlerPrefix[l]}/${p.handle}`
        ),
      });
    }
  }

  return entries;
}
