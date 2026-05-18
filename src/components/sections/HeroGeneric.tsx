"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroGeneric() {
  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16"
      style={{ background: "linear-gradient(180deg, #F0EDE6 0%, #FAFAF7 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-[-10%] w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "#C5D4B8" }}
        />
        <div
          className="absolute bottom-1/4 right-[-10%] w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "#D4B86A" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2D5016] mb-6">
            Yurt Dışından Özel Seçim
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold tracking-tight mb-6"
            style={{ color: "#1A1A1A" }}
          >
            Kaliteyi
            <br />
            <span className="text-[#2D5016]">Sofranıza</span> Getiriyoruz
          </h1>
          <p className="text-base sm:text-lg text-[#4A4A4A] max-w-2xl mx-auto mb-10">
            Dünya'nın dört bir yanından özenle seçilmiş ürünler.
            Profesyonel kullanım için tasarlanmış, ekonomik ve ölçeklenebilir çözümler.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="#kategoriler"
              className="inline-flex items-center gap-2 bg-[#2D5016] hover:bg-[#3D6B1C] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200"
            >
              Kategorileri Keşfet
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-white border border-[#E8E6E0] hover:border-[#2D5016] text-[#1A1A1A] font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200"
            >
              İletişim
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
