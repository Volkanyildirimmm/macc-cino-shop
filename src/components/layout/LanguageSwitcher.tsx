"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { motion } from "framer-motion";

type Locale = (typeof routing.locales)[number];

const LABELS: Record<Locale, string> = {
  tr: "TR",
  de: "DE",
  en: "EN",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    // next-intl rewrites the pathname for the new locale (including localized
    // segments) and writes NEXT_LOCALE cookie so the choice persists.
    router.replace(
      // @ts-expect-error -- params is a generic Record; next-intl accepts it for dynamic routes
      { pathname, params },
      { locale: next }
    );
  };

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="flex items-center gap-0.5 text-[11px] font-semibold bg-[#F0EDE6]/60 rounded-full p-0.5"
    >
      {routing.locales.map((l) => (
        <motion.button
          key={l}
          onClick={() => switchLocale(l)}
          whileTap={{ scale: 0.94 }}
          className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${
            locale === l
              ? "bg-[#2D5016] text-white shadow-sm"
              : "text-[#1A1A1A] hover:bg-white"
          }`}
          aria-current={locale === l ? "true" : undefined}
        >
          {LABELS[l as Locale]}
        </motion.button>
      ))}
    </div>
  );
}
