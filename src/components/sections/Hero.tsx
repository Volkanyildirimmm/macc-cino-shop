"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Droplet, Settings2, Scale, Sparkles, Zap, Coffee } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function FloatingParticle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-[#2D5016]"
      style={{ left: `${x}%`, top: `${y}%`, opacity: 0.15 }}
      animate={{ y: [0, -30, 0], opacity: [0, 0.2, 0] }}
      transition={{ duration: 5 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  y: 10 + Math.random() * 80,
  delay: i * 0.5,
}));

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F0EDE6 0%, #FAFAF7 100%)" }}
    >
      {/* Blob decorations */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 30%, rgba(45,80,22,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-1/3 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 20% 90%, rgba(45,80,22,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #2D5016 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <FloatingParticle key={p.id} x={p.x} y={p.y} delay={p.delay} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 bg-white border border-[#E8E6E0] text-[#4A4A4A] text-xs font-medium px-4 py-2 rounded-full mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5016] animate-pulse" />
                Ceremonial Grade · Organik · Almanya Üretimi
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <TextReveal
                text="Matcha: Japonyanın Yeşil Enerjisi"
                as="h1"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-[#1A1A1A] leading-tight tracking-tight mb-6 justify-center lg:justify-start"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-[#4A4A4A] text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10"
            >
              Profesyonel kullanım için standartlaştırılmış matcha konsantresi.{" "}
              <span className="text-[#2D5016] font-medium">Standart. Ölçeklenebilir. Ekonomik.</span>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <MagneticButton
                onClick={() => document.getElementById("urunler")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#2D5016] hover:bg-[#3D6B1C] text-white font-semibold px-8 py-4 rounded-xl text-base shadow-sm transition-colors duration-300"
              >
                Ürünleri Keşfet →
              </MagneticButton>

              <MagneticButton
                onClick={() => document.getElementById("nasil-hazirlanir")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#1A1A1A] hover:bg-[#333333] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors duration-300"
              >
                Nasıl Yapılır?
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-14 flex flex-wrap gap-8 justify-center lg:justify-start"
            >
              {[
                { value: "100+", label: "Porsiyon / şişe" },
                { value: "4×", label: "Daha hızlı" },
                { value: "12 ay", label: "Raf ömrü" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-[#1A1A1A] font-display">{stat.value}</p>
                  <p className="text-[#8A8A7A] text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Product Image + Feature badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center lg:justify-center"
          >
            {/* Bottle + desktop floating badges */}
            <div className="relative flex items-center justify-center w-full">
              {/* Glow */}
              <div className="absolute w-60 h-60 lg:w-80 lg:h-80 rounded-full bg-[#2D5016] opacity-[0.05] blur-3xl" />

              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Image
                  src="/images/matcha-bottle-hero.png"
                  alt="Macc&Cino Matcha Konsantre 1000ml"
                  width={320}
                  height={480}
                  className="drop-shadow-2xl w-48 sm:w-64 lg:w-80 h-auto"
                  priority
                  style={{ objectFit: "contain" }}
                />
              </motion.div>

              {/* Desktop-only floating badges (absolute positioned) */}
              <motion.div
                className="hidden lg:flex absolute top-4 left-0 bg-white/90 backdrop-blur-sm border border-[#E8E6E0] rounded-xl px-3 py-2 shadow-sm text-xs text-[#2D3B28] font-medium items-center gap-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                <Droplet className="w-3.5 h-3.5 text-[#2D5016]" /> Karıştırma yok
              </motion.div>

              <motion.div
                className="hidden lg:flex absolute top-24 -left-12 bg-white/90 backdrop-blur-sm border border-[#E8E6E0] rounded-xl px-3 py-2 shadow-sm text-xs text-[#2D3B28] font-medium items-center gap-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <Settings2 className="w-3.5 h-3.5 text-[#2D5016]" /> Ekipman gerektirmez
              </motion.div>

              <motion.div
                className="hidden lg:flex absolute bottom-32 -left-8 bg-white/90 backdrop-blur-sm border border-[#E8E6E0] rounded-xl px-3 py-2 shadow-sm text-xs text-[#2D3B28] font-medium items-center gap-2"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <Scale className="w-3.5 h-3.5 text-[#2D5016]" /> Mükemmel dozaj
              </motion.div>

              <motion.div
                className="hidden lg:flex absolute top-10 right-0 bg-white/90 backdrop-blur-sm border border-[#E8E6E0] rounded-xl px-3 py-2 shadow-sm text-xs text-[#2D3B28] font-medium items-center gap-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2D5016]" /> Topaklanma yok
              </motion.div>

              <motion.div
                className="hidden lg:flex absolute top-36 -right-10 bg-white/90 backdrop-blur-sm border border-[#E8E6E0] rounded-xl px-3 py-2 shadow-sm text-xs text-[#2D3B28] font-medium items-center gap-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              >
                <Zap className="w-3.5 h-3.5 text-[#2D5016]" /> Hazır karışım
              </motion.div>

              <motion.div
                className="hidden lg:flex absolute bottom-20 -right-4 bg-white/90 backdrop-blur-sm border border-[#E8E6E0] rounded-xl px-3 py-2 shadow-sm text-xs text-[#2D3B28] font-medium items-center gap-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <Coffee className="w-3.5 h-3.5 text-[#2D5016]" /> Barista gerektirmez
              </motion.div>
            </div>

            {/* Mobile/tablet feature grid (visible below lg) */}
            <div className="grid grid-cols-2 gap-2 mt-8 w-full max-w-md lg:hidden">
              {[
                { Icon: Droplet, label: "Karıştırma yok" },
                { Icon: Settings2, label: "Ekipman gerektirmez" },
                { Icon: Scale, label: "Mükemmel dozaj" },
                { Icon: Sparkles, label: "Topaklanma yok" },
                { Icon: Zap, label: "Hazır karışım" },
                { Icon: Coffee, label: "Barista gerektirmez" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="bg-white/90 backdrop-blur-sm border border-[#E8E6E0] rounded-xl px-3 py-2 shadow-sm text-xs text-[#2D3B28] font-medium flex items-center gap-2"
                >
                  <Icon className="w-3.5 h-3.5 text-[#2D5016] flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[#8A8A7A] text-xs tracking-widest uppercase">Kaydır</span>
        <svg className="w-4 h-4 text-[#8A8A7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
