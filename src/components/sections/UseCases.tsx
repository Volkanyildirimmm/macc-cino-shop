"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const VISUAL_USE_CASES = [
  {
    title: "Kafeler & Restoranlar",
    description: "Hızlı servis, tutarlı kalite, yüksek kar marjı",
    image: "/images/usecase-cafe.png",
  },
  {
    title: "Kurumsal Ofisler",
    description: "Çalışan memnuniyeti, kolay self-servis",
    image: "/images/usecase-office.png",
  },
  {
    title: "Fitness & Sağlık Merkezleri",
    description: "Doğal enerji, düşük kalori, sağlıklı alternatif",
    image: "/images/usecase-fitness.png",
  },
  {
    title: "Zincir Restoranlar",
    description: "Standart süreçler, ölçeklenebilir operasyon",
    image: "/images/usecase-chain.png",
  },
];

export function UseCases() {
  return (
    <section className="py-24" style={{ backgroundColor: "#F5F3EE" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[#2D5016] text-xs font-semibold uppercase tracking-widest mb-3 block">
            Hedef Kitle
          </span>
          <TextReveal
            text="Kimler İçin?"
            as="h2"
            className="text-4xl sm:text-5xl font-display font-bold text-[#1A1A1A] mb-4 justify-center"
          />
          <p className="text-[#4A4A4A] text-lg max-w-xl mx-auto">
            Her sektörden profesyonel kullanıcılar için çözüm
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {VISUAL_USE_CASES.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group relative bg-white rounded-3xl overflow-hidden border border-[#E8E6E0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#C5D4B8] transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                <Image
                  src={useCase.image}
                  alt={useCase.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content Container */}
              <div className="p-6 sm:p-8 bg-white relative z-20">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1A1A] mb-2 group-hover:text-[#2D5016] transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-[#4A4A4A] text-base leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
