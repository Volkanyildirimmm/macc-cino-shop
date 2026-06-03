"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function UseCases() {
  const t = useTranslations("use_cases");

  const cases = [
    { key: "cafe", image: "/images/usecase-cafe.png" },
    { key: "office", image: "/images/usecase-office.png" },
    { key: "fitness", image: "/images/usecase-fitness.png" },
    { key: "chain", image: "/images/usecase-chain.png" },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: "#F5F3EE" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[#2D5016] text-xs font-semibold uppercase tracking-widest mb-3 block">
            {t("section_label")}
          </span>
          <TextReveal
            text={t("title")}
            as="h2"
            className="text-4xl sm:text-5xl font-display font-bold text-[#1A1A1A] mb-4 justify-center"
          />
          <p className="text-[#4A4A4A] text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cases.map(({ key, image }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group relative bg-white rounded-3xl overflow-hidden border border-[#E8E6E0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#C5D4B8] transition-all duration-300"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                <Image
                  src={image}
                  alt={t(`${key}_title`)}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-6 sm:p-8 bg-white relative z-20">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1A1A] mb-2 group-hover:text-[#2D5016] transition-colors">
                  {t(`${key}_title`)}
                </h3>
                <p className="text-[#4A4A4A] text-base leading-relaxed">
                  {t(`${key}_description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
