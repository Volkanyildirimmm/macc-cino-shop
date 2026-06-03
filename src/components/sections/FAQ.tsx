"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const t = useTranslations("faq");
  const [open, setOpen] = useState<number | null>(0);

  // FAQ items live in messages JSON as an array — keep the array length in
  // sync across all locale files (tr.json, de.json, en.json).
  const items = t.raw("items") as Array<{ q: string; a: string }>;

  return (
    <section
      id="sss"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "#FAFAF7" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2D5016] mb-4">
            {t("section_label")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1A1A1A] tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#F5F3EE]/50 transition-colors"
                  style={{ color: "#1A1A1A" }}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-semibold text-base sm:text-lg pr-4"
                    style={{ color: "#1A1A1A" }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#2D5016] flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 pb-5 leading-relaxed text-sm sm:text-base"
                        style={{ color: "#1A1A1A" }}
                      >
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
