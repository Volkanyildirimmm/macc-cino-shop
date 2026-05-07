"use client";

import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function HowItWorks() {
  return (
    <section id="nasil-hazirlanir" className="py-24" style={{ backgroundColor: "#F5F3EE" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[#2D5016] text-xs font-semibold uppercase tracking-widest mb-3 block">
            Kullanım Kılavuzu
          </span>
          <TextReveal
            text="Nasıl Hazırlanır?"
            as="h2"
            className="text-4xl sm:text-5xl font-display font-bold text-[#1A1A1A] mb-4 justify-center"
          />
          <p className="text-[#4A4A4A] text-lg max-w-xl mx-auto">
            Üç basit adımda mükemmel matcha
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute top-14 left-[16.66%] right-[16.66%] h-px bg-[#C5D4B8]" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18, duration: 0.55 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="w-12 h-12 rounded-full bg-[#2D5016] text-white flex items-center justify-center mb-6 shadow-sm z-10 relative"
                >
                  <span className="text-lg font-bold font-display">{step.step}</span>
                </motion.div>

                <div className="bg-white border border-[#E8E6E0] rounded-2xl p-6 w-full shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                  <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#1A1A1A" }}>{step.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "#4A4A4A" }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 bg-white border border-[#E8E6E0] rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
        >
          <p className="font-medium" style={{ color: "#1A1A1A" }}>
            ⚡ Köpürtme veya süzme gerektirmez — <strong>anında hazır!</strong>
          </p>
          <p className="text-sm mt-1" style={{ color: "#4A4A4A" }}>
            Pompalı modelde: 1 pompa = 10ml = 1 porsiyon
          </p>
        </motion.div>
      </div>
    </section>
  );
}
