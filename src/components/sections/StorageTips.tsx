"use client";

import { motion } from "framer-motion";
import { STORAGE_TIPS } from "@/lib/constants";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function StorageTips() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <TextReveal
            text="Saklama & Kullanım"
            as="h2"
            className="text-3xl sm:text-4xl font-display font-bold text-[#1A1A1A] mb-3"
          />
          <p className="text-[#8A8A7A] text-base">En iyi sonuç için dikkat edilmesi gerekenler</p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-4">
          {STORAGE_TIPS.map((tip, i) => (
            <motion.div
              key={tip.text}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-4 bg-[#F5F3EE] border border-[#EEECE6] rounded-xl p-5 hover:border-[#C5D4B8] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8F0E0] flex items-center justify-center flex-shrink-0">
                <span className="text-lg">{tip.icon}</span>
              </div>
              <p className="text-[#4A4A4A] text-sm leading-relaxed">{tip.text}</p>
            </motion.div>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="mt-8 text-center">
          <p className="text-[#8A8A7A] text-xs">
            Açılmamış: 12 ay oda sıcaklığında · Açıldıktan sonra: 4 hafta (2–8°C)
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
