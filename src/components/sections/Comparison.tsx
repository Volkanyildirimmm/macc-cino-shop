"use client";

import { motion } from "framer-motion";
import { COMPARISON_ROWS, PRODUCTS } from "@/lib/constants";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Comparison() {
  const columns = PRODUCTS.map((p) => ({
    title: `${p.volume}ml${p.hasPump ? " Pompalı" : ""}`,
    isPro: !!p.badge,
  }));

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="text-[#2D5016] text-xs font-semibold uppercase tracking-widest mb-3 block">
            Karşılaştırma
          </span>
          <TextReveal
            text="Hangi Boy Sana Uygun?"
            as="h2"
            className="text-4xl sm:text-5xl font-display font-bold text-[#1A1A1A] mb-4 justify-center"
          />
        </AnimatedSection>

        <div className="overflow-x-auto rounded-2xl border border-[#E8E6E0] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr style={{ backgroundColor: "#F5F3EE" }}>
                <th className="text-left py-5 px-6 text-xs font-semibold uppercase tracking-wider w-36 border-b border-[#EEECE6]" style={{ color: "#8A8A7A" }}></th>
                {columns.map((col, i) => (
                  <th key={i} className="py-5 px-4 text-center border-b border-[#EEECE6]">
                    <p
                      className="font-display font-bold text-base"
                      style={{ color: col.isPro ? "#2D5016" : "#1A1A1A" }}
                    >
                      {col.title}
                    </p>
                    {col.isPro && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block"
                        style={{ backgroundColor: "#C5A55A", color: "#FFFFFF" }}
                      >
                        Önerilen
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, ri) => (
                <motion.tr
                  key={row.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ri * 0.07 }}
                  className="border-b border-[#EEECE6] last:border-0 hover:bg-[#FAFAF7] transition-colors group"
                >
                  <td className="py-4 px-6 text-sm font-medium" style={{ color: "#8A8A7A" }}>
                    {row.label}
                  </td>
                  {row.values.map((val, ci) => (
                    <td
                      key={ci}
                      className="py-4 px-4 text-center text-sm font-medium"
                      style={{ color: columns[ci].isPro ? "#2D5016" : "#1A1A1A" }}
                    >
                      {val}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
