"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { type ProductData } from "@/lib/constants";
import { NUTRITION_DATA, INGREDIENTS, INGREDIENTS_NOTE } from "@/lib/constants";
import { formatPriceSimple } from "@/lib/utils";
import { AddToCart } from "./AddToCart";
import { ProBadge } from "./ProBadge";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function ProductDetailPage({ product }: { product: ProductData }) {
  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "#FAFAF7" }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-2 text-sm" style={{ color: "#8A8A7A" }}>
          <Link href="/" className="hover:text-[#2D5016] transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/#urunler" className="hover:text-[#2D5016] transition-colors">Ürünler</Link>
          <span>/</span>
          <span style={{ color: "#4A4A4A" }}>{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-24"
          >
            <div
              className="aspect-square max-w-md mx-auto rounded-3xl flex items-center justify-center relative overflow-hidden border border-[#E8E6E0]"
              style={{ backgroundColor: "#F0EDE6" }}
            >
              {product.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <ProBadge />
                </div>
              )}

              {/* Subtle circles */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-72 h-72 rounded-full border border-[#2D5016]" />
                <div className="absolute w-52 h-52 rounded-full border border-[#2D5016]" />
              </div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 h-[70%] w-[60%]"
              >
                <Image
                  src="/images/matcha-bottle-hero.png"
                  alt={`${product.title} ${product.volume}ml — ${product.portions} porsiyon Ceremonial Grade organik matcha konsantresi`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              <div
                className="absolute bottom-4 left-4 backdrop-blur-sm text-xs px-3 py-1.5 rounded-full border font-medium"
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  color: "#2D3B28",
                  borderColor: "#E8E6E0",
                }}
              >
                {product.volume}ml · ~{product.portions} porsiyon
              </div>
            </div>
          </motion.div>

          {/* Right: Info */}
          <div className="space-y-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8A8A7A" }}>{product.subtitle}</p>
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3" style={{ color: "#1A1A1A" }}>{product.title}</h1>
              {product.badge && <div className="mb-4"><ProBadge /></div>}
              <p className="text-lg leading-relaxed" style={{ color: "#4A4A4A" }}>{product.description}</p>
            </AnimatedSection>

            {/* Pricing */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white border border-[#E8E6E0] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="flex items-baseline justify-between mb-5">
                  <span className="text-4xl font-bold" style={{ color: "#1A1A1A" }}>{formatPriceSimple(product.price)}</span>
                  <span className="text-sm" style={{ color: "#8A8A7A" }}>
                    ~{formatPriceSimple(Math.round(product.price / product.portions))}/porsiyon
                  </span>
                </div>
                <div className="space-y-3">
                  <AddToCart product={product} />
                  <Link
                    href="/iletisim"
                    className="block w-full text-center border border-[#2D5016] text-[#2D5016] hover:bg-[#E8F0E0] py-3 rounded-xl text-sm font-medium transition-colors"
                  >
                    Toplu Sipariş / Teklif İste
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Details grid */}
            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "SKU", value: product.sku },
                  { label: "Hacim", value: `${product.volume}ml` },
                  { label: "Porsiyon", value: `~${product.portions}` },
                  { label: "Ağırlık", value: `${product.weight}g` },
                  { label: "Üretim", value: "Almanya" },
                  { label: "Raf Ömrü", value: "12 ay" },
                ].map((item) => (
                  <div key={item.label} className="bg-[#F5F3EE] border border-[#EEECE6] rounded-xl p-3 text-center">
                    <p className="text-xs" style={{ color: "#8A8A7A" }}>{item.label}</p>
                    <p className="font-semibold text-sm mt-0.5" style={{ color: "#1A1A1A" }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {product.hasPump && (
              <AnimatedSection delay={0.2} className="bg-[#FAFAF7] border border-[#E8E6E0] rounded-2xl p-5 shadow-sm">
                <p className="font-semibold mb-1" style={{ color: "#1A1A1A" }}>⚡ Pompa Dozajlama Sistemi</p>
                <p className="text-sm" style={{ color: "#4A4A4A" }}>1 pompa = {product.pumpDosage}ml = 1 porsiyon. Hassas ve hızlı servis.</p>
              </AnimatedSection>
            )}

            <AnimatedSection delay={0.25}>
              <div className="border-t border-[#EEECE6] pt-5">
                <h3 className="font-semibold mb-2" style={{ color: "#1A1A1A" }}>İçindekiler</h3>
                <p className="text-sm" style={{ color: "#4A4A4A" }}>{INGREDIENTS}</p>
                <p className="text-xs mt-1 italic" style={{ color: "#8A8A7A" }}>{INGREDIENTS_NOTE}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="border-t border-[#EEECE6] pt-5">
                <h3 className="font-semibold mb-3" style={{ color: "#1A1A1A" }}>Besin Değerleri (100ml)</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Enerji", value: `${NUTRITION_DATA.per100ml.energy_kcal} kcal` },
                    { label: "Protein", value: `${NUTRITION_DATA.per100ml.protein} g` },
                    { label: "Karbonhidrat", value: `${NUTRITION_DATA.per100ml.carbs} g` },
                    { label: "Yağ", value: `${NUTRITION_DATA.per100ml.fat} g` },
                  ].map((n) => (
                    <div key={n.label} className="flex justify-between bg-[#F5F3EE] px-3 py-2 rounded-lg border border-[#EEECE6]">
                      <span className="text-sm" style={{ color: "#8A8A7A" }}>{n.label}</span>
                      <span className="font-medium text-sm" style={{ color: "#1A1A1A" }}>{n.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
