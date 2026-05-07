"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { NUTRITION_DATA, INGREDIENTS, INGREDIENTS_NOTE } from "@/lib/constants";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

type Mode = "100ml" | "serving";

export function Nutrition() {
  const [mode, setMode] = useState<Mode>("100ml");
  const data = mode === "100ml" ? NUTRITION_DATA.per100ml : NUTRITION_DATA.perServing;

  const rows = [
    { label: "Enerji", value: `${data.energy_kj} kJ / ${data.energy_kcal} kcal` },
    { label: "Yağ", value: `${data.fat} g` },
    { label: "— Doymuş Yağ", value: `${data.saturated_fat} g`, sub: true },
    { label: "Karbonhidrat", value: `${data.carbs} g` },
    { label: "— Şeker", value: `${data.sugar} g`, sub: true },
    { label: "Protein", value: `${data.protein} g` },
    { label: "Tuz", value: `${data.salt} g` },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: "#F5F3EE" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="text-[#2D5016] text-xs font-semibold uppercase tracking-widest mb-3 block">Şeffaflık</span>
          <TextReveal
            text="İçindekiler & Besin Değerleri"
            as="h2"
            className="text-4xl sm:text-5xl font-display font-bold text-[#1A1A1A] mb-4"
          />
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {["🌱 Organik", "🌿 Vegan", "🌾 Glutensiz", "🇩🇪 Almanya Üretimi"].map((badge) => (
              <span key={badge} className="bg-white border border-[#E8E6E0] text-[#4A4A4A] text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                {badge}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Ingredients */}
        <AnimatedSection className="bg-white border border-[#E8E6E0] rounded-2xl p-6 mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <h3 className="text-[#1A1A1A] font-semibold mb-2">İçindekiler</h3>
          <p className="text-[#4A4A4A] text-sm leading-relaxed">{INGREDIENTS}</p>
          <p className="text-[#8A8A7A] text-xs mt-1 italic">{INGREDIENTS_NOTE}</p>
        </AnimatedSection>

        {/* Nutrition table */}
        <AnimatedSection delay={0.1}>
          <div className="bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between p-5 border-b border-[#EEECE6]">
              <h3 className="text-[#1A1A1A] font-semibold">Besin Değerleri</h3>
              <div className="flex bg-[#F5F3EE] rounded-full p-1 gap-1">
                {(["100ml", "serving"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      mode === m
                        ? "bg-[#2D5016] text-white shadow-sm"
                        : "text-[#4A4A4A] hover:text-[#2D5016]"
                    }`}
                  >
                    {m === "100ml" ? "100ml" : "Porsiyon (12.5ml)"}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {rows.map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex justify-between px-5 py-3 border-b border-[#EEECE6] last:border-0 hover:bg-[#FAFAF7] transition-colors ${row.sub ? "pl-10" : ""}`}
                  >
                    <span className={`text-sm ${row.sub ? "text-[#8A8A7A]" : "text-[#4A4A4A]"}`}>{row.label}</span>
                    <span className="text-sm font-medium text-[#1A1A1A]">{row.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
