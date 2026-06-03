import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "de", "en"],
  defaultLocale: "tr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/iletisim": {
      tr: "/iletisim",
      de: "/kontakt",
      en: "/contact",
    },
    "/sepet": {
      tr: "/sepet",
      de: "/warenkorb",
      en: "/cart",
    },
    "/odeme": {
      tr: "/odeme",
      de: "/kasse",
      en: "/checkout",
    },
    "/siparis-onay": {
      tr: "/siparis-onay",
      de: "/bestellbestaetigung",
      en: "/order-confirmation",
    },
    "/white-label": "/white-label",
    "/kategori/[handle]": {
      tr: "/kategori/[handle]",
      de: "/kategorie/[handle]",
      en: "/category/[handle]",
    },
    "/urunler/[handle]": {
      tr: "/urunler/[handle]",
      de: "/produkte/[handle]",
      en: "/products/[handle]",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
