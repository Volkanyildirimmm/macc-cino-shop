"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function StorageTips() {
  const t = useTranslations("storage");

  const tips = [
    { key: "shake", icon: "🔄" },
    { key: "fridge", icon: "❄️" },
    { key: "consume", icon: "⏰" },
    { key: "dilute", icon: "⚠️" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="text-[#2D5016] text-xs font-semibold uppercase tracking-widest mb-3 block">
            {t("section_label")}
          </span>
          <TextReveal
            text={t("title")}
            as="h2"
            className="text-3xl sm:text-4xl font-display font-bold text-[#1A1A1A] mb-3"
          />
          <p className="text-[#8A8A7A] text-base">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-4">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.key}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-4 bg-[#F5F3EE] border border-[#EEECE6] rounded-xl p-5 hover:border-[#C5D4B8] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8F0E0] flex items-center justify-center flex-shrink-0">
                <span className="text-lg">{tip.icon}</span>
              </div>
              <p className="text-[#4A4A4A] text-sm leading-relaxed">{t(tip.key)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
