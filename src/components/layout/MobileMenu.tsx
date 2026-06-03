"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/hooks/useCart";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const { itemCount } = useCart();
  const count = itemCount();

  const links = [
    { href: "/#kategoriler", label: t("categories") },
    { href: "/kategori/[handle]", params: { handle: "matcha" }, label: t("matcha") },
    { href: "/white-label", label: t("white_label") },
    { href: "/iletisim", label: t("contact") },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            className="fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col p-8 gap-1 shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="self-end mb-6 text-[#8A8A7A] hover:text-[#1A1A1A] transition-colors"
              aria-label={tCommon("close")}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Language switcher at top so it's visible without scrolling */}
            <div className="mb-4">
              <LanguageSwitcher />
            </div>

            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  // @ts-expect-error -- next-intl Link accepts dynamic href with params
                  href={"params" in link ? { pathname: link.href, params: link.params } : link.href}
                  onClick={onClose}
                  className="block py-3 text-base font-semibold hover:text-[#2D5016] transition-colors border-b border-[#EEECE6]"
                  style={{ color: "#1A1A1A" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              className="mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="/sepet"
                onClick={onClose}
                className="flex items-center gap-3 bg-[#2D5016] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#3D6B1C] transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {t("cart")} {count > 0 && `(${count})`}
              </Link>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
