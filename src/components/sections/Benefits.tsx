"use client";

import { motion } from "framer-motion";
import { BENEFITS } from "@/lib/constants";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CountUp } from "@/components/ui/CountUp";
import { Zap, CheckCircle2, TrendingUp, UserCheck, Clock, Leaf } from "lucide-react";

const getIcon = (title: string) => {
  switch (title) {
    case "Hızlı Hazırlık": return <Zap className="w-6 h-6 text-[#2D5016]" />;
    case "Tutarlı Kalite": return <CheckCircle2 className="w-6 h-6 text-[#2D5016]" />;
    case "Hesaplanabilir Maliyet": return <TrendingUp className="w-6 h-6 text-[#2D5016]" />;
    case "Barista Gerektirmez": return <UserCheck className="w-6 h-6 text-[#2D5016]" />;
    case "Uzun Raf Ömrü": return <Clock className="w-6 h-6 text-[#2D5016]" />;
    case "Organik & Ceremonial Grade": return <Leaf className="w-6 h-6 text-[#2D5016]" />;
    default: return <CheckCircle2 className="w-6 h-6 text-[#2D5016]" />;
  }
};

export function Benefits() {
  return (
    <section id="avantajlar" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="text-[#2D5016] text-xs font-semibold uppercase tracking-widest mb-3 block">Avantajlar</span>
          <TextReveal
            text="Neden Macc-Cino?"
            as="h2"
            className="text-4xl sm:text-5xl font-display font-bold mb-4 text-[#1A1A1A] justify-center"
          />
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#4A4A4A" }}>
            Geleneksel matcha hazırlığına kıyasla tüm fark
          </p>
        </AnimatedSection>

        {/* Big stat */}
        <AnimatedSection className="text-center mb-14">
          <div className="inline-flex flex-col items-center bg-[#F5F3EE] border border-[#EEECE6] rounded-3xl px-12 py-8">
            <p className="text-5xl sm:text-6xl font-bold font-display" style={{ color: "#1A1A1A" }}>
              1 şişe ={" "}
              <span style={{ color: "#2D5016" }}>
                <CountUp target={100} />
              </span>
            </p>
            <p className="text-xl mt-2" style={{ color: "#4A4A4A" }}>porsiyon</p>
            <p className="text-sm mt-3 max-w-xs" style={{ color: "#8A8A7A" }}>
              Piyasa satış fiyatı 4–6€/içecek — yüksek kar marjı potansiyeli
            </p>
          </div>
        </AnimatedSection>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="bg-white border border-[#E8E6E0] rounded-2xl p-6 hover:border-[#C5D4B8] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E6E0] shadow-sm flex items-center justify-center mb-4">
                {getIcon(benefit.title)}
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: "#1A1A1A" }}>{benefit.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
