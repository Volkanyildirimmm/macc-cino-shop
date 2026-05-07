"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { type ProductData } from "@/lib/constants";
import { formatPriceSimple } from "@/lib/utils";
import { AddToCart } from "./AddToCart";
import { ProBadge } from "./ProBadge";

interface ProductCardProps {
  product: ProductData;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full flex flex-col bg-white rounded-2xl border border-[#E8E6E0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#C5D4B8] transition-all duration-300 overflow-hidden"
      >
        {/* Product Image */}
        <Link href={`/urunler/${product.handle}`} className="block relative">
          <div className="relative h-52 flex items-center justify-center" style={{ backgroundColor: "#F0EDE6" }}>
            {product.badge && (
              <div className="absolute top-3 right-3 z-10">
                <ProBadge />
              </div>
            )}

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-40 w-32"
            >
              <Image
                src="/images/matcha-bottle-hero.png"
                alt={product.title}
                fill
                className="object-contain drop-shadow-lg"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </motion.div>

            <div
              className="absolute bottom-3 left-3 backdrop-blur-sm text-xs px-2.5 py-1 rounded-full border font-medium"
              style={{
                backgroundColor: "rgba(255,255,255,0.8)",
                color: "#2D3B28",
                borderColor: "#E8E6E0",
              }}
            >
              {product.volume}ml
            </div>
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#8A8A7A" }}>{product.subtitle}</p>
            <Link href={`/urunler/${product.handle}`}>
              <h3 className="font-display font-semibold text-lg leading-tight hover:text-[#2D5016] transition-colors" style={{ color: "#1A1A1A" }}>
                {product.title}
              </h3>
            </Link>
            <p className="text-sm mt-2 leading-relaxed line-clamp-2" style={{ color: "#4A4A4A" }}>
              {product.description}
            </p>
          </div>

          {/* Portions badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#F5F3EE] border border-[#EEECE6] text-[#4A4A4A] text-xs font-medium px-3 py-1.5 rounded-full">
              ~{product.portions} porsiyon
            </span>
            {product.hasPump && (
              <span className="text-xs" style={{ color: "#8A8A7A" }}>1 pompa = 10ml</span>
            )}
          </div>

          {/* Price + CTA */}
          <div className="mt-auto space-y-3 pt-2 border-t border-[#EEECE6]">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
                {formatPriceSimple(product.price)}
              </span>
              <span className="text-xs" style={{ color: "#8A8A7A" }}>
                ~{formatPriceSimple(Math.round(product.price / product.portions))}/porsiyon
              </span>
            </div>
            <AddToCart product={product} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
