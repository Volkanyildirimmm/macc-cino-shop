"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CountUp } from "@/components/ui/CountUp";

const BAR_DATA = [
  { label: "Maliyetiniz/porsiyon", value: 0.45, max: 6, color: "#C5D4B8", prefix: "€" },
  { label: "Satış fiyatı/porsiyon", value: 5, max: 6, color: "#2D5016", prefix: "€" },
  { label: "Kar marjı/porsiyon", value: 4.55, max: 6, color: "#4a7c23", prefix: "€" },
];

export function Economics() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="text-[#2D5016] text-xs font-semibold uppercase tracking-widest mb-3 block">Karlılık</span>
          <TextReveal
            text="Ekonomik Avantaj"
            as="h2"
            className="text-4xl sm:text-5xl font-display font-bold text-[#1A1A1A] mb-4"
          />
          <p className="text-[#4A4A4A] text-lg max-w-xl mx-auto">
            Her şişe, yatırımınızı katlayan bir fırsata dönüşür
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bar chart */}
          <AnimatedSection>
            <div className="bg-[#F5F3EE] border border-[#EEECE6] rounded-2xl p-8 space-y-6">
              {BAR_DATA.map((bar, i) => (
                <div key={bar.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#4A4A4A] text-sm font-medium">{bar.label}</span>
                    <span className="text-[#2D3B28] text-sm font-bold">{bar.prefix}{bar.value.toFixed(2)}</span>
                  </div>
                  <div className="h-3 bg-[#E8E6E0] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: bar.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(bar.value / bar.max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection direction="left">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 100, suffix: "+", label: "Porsiyon/şişe" },
                { value: 10, suffix: "×", label: "Geri dönüş potansiyeli" },
                { value: 4, suffix: "€+", label: "Ortalama kar/içecek" },
                { value: 12, suffix: " ay", label: "Raf ömrü" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#F5F3EE] border border-[#EEECE6] rounded-2xl p-5 text-center"
                >
                  <p className="text-3xl font-bold text-[#2D5016] font-display">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[#8A8A7A] text-xs mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 bg-[#E8F0E0] border border-[#C5D4B8] rounded-2xl p-5">
              <p className="text-[#2D3B28] text-sm leading-relaxed">
                💡 <strong>Örnek:</strong> 1000ml şişe (€39.90) = 100 porsiyon.
                Müşteriye €5 satışta{" "}
                <span className="text-[#2D5016] font-bold">€500 gelir</span> —
                yatırımın ~12× getirisi.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
