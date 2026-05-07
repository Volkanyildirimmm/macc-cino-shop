"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function WhiteLabel() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "#1A2E12" }}>
      {/* Subtle blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Label animation */}
          <AnimatedSection direction="right">
            <div className="relative h-80 flex items-center justify-center">
              {/* Empty bottle */}
              <motion.div
                className="absolute"
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <BottleWithLabel labeled={false} />
              </motion.div>

              {/* Branded bottle */}
              <motion.div
                className="absolute"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
              >
                <BottleWithLabel labeled={true} />
              </motion.div>

              <motion.div
                className="absolute bottom-4 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.6 }}
              >
                <p className="text-white/40 text-xs">Boş etiket → Markanız</p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right: Info */}
          <div>
            <AnimatedSection>
              <span className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4 block">B2B</span>
              <TextReveal
                text="Kendi Markanızı Oluşturun"
                as="h2"
                className="text-4xl sm:text-5xl font-display font-bold text-white mb-6"
              />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                White label partnerlik programımızla kendi markanız altında
                premium matcha konsantresi satın. Almanya'nın kalitesi,
                sizin isminizle.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: "🏭", title: "Almanya Üretimi", desc: "Sertifikalı tesisler" },
                  { icon: "🚀", title: "2–4 Hafta", desc: "İlk teslimat" },
                  { icon: "📈", title: "Ölçeklenebilir", desc: "MOQ'dan enterprise'a" },
                  { icon: "🎨", title: "Özel Etiket", desc: "Tasarımınızla üretim" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white/[0.07] border border-white/10 rounded-xl p-4"
                  >
                    <span className="text-xl block mb-2">{item.icon}</span>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-white/50 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-xl text-white transition-colors duration-300"
                  style={{ backgroundColor: "#C5A55A" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A8893E")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C5A55A")}
                >
                  White Label Teklif Al →
                </Link>
                <Link
                  href="/white-label"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 hover:bg-white/10 font-medium px-8 py-4 rounded-xl transition-colors duration-300"
                >
                  Daha Fazla Bilgi
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottleWithLabel({ labeled }: { labeled: boolean }) {
  return (
    <svg width="120" height="220" viewBox="0 0 120 220" fill="none">
      <rect x="48" y="6" width="24" height="16" rx="5" fill="#1e3a0f" />
      <rect x="44" y="19" width="32" height="8" rx="3" fill="#1a3309" />
      <rect x="42" y="27" width="36" height="16" rx="4" fill="#2D5016" />
      <rect x="14" y="43" width="92" height="160" rx="22" fill="#2D5016" />
      <rect x="18" y="80" width="84" height="120" rx="17" fill="#4a7c23" opacity="0.6" />
      {labeled ? (
        <>
          <rect x="18" y="90" width="84" height="65" rx="5" fill="#C5A55A" opacity="0.85" />
          <text x="60" y="115" textAnchor="middle" fill="#1e3a0f" fontSize="9" fontWeight="bold">KAFE MATCHA</text>
          <text x="60" y="128" textAnchor="middle" fill="#1e3a0f" fontSize="7">Premium Matcha Konsantresi</text>
          <rect x="28" y="136" width="64" height="2" rx="1" fill="#1e3a0f" opacity="0.25" />
          <text x="60" y="148" textAnchor="middle" fill="#1e3a0f" fontSize="6">1000ml · Ceremonial Grade</text>
        </>
      ) : (
        <rect x="18" y="90" width="84" height="65" rx="5" fill="white" opacity="0.06" stroke="white" strokeWidth="1" strokeDasharray="4 2" />
      )}
      <rect x="18" y="47" width="14" height="52" rx="7" fill="white" opacity="0.07" />
      <ellipse cx="60" cy="200" rx="42" ry="6" fill="#1e3a0f" />
    </svg>
  );
}
