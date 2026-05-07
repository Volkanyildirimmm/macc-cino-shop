"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/components/cart/CartItem";
import { formatPriceSimple } from "@/lib/utils";

export default function SepetPage() {
  const { items, total } = useCart();

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: "#FAFAF7" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display font-bold text-[#1A1A1A] mb-8"
        >
          Sepetim
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="text-5xl mb-4">🛒</div>
            <p className="text-[#8A8A7A] text-lg mb-6">Sepetiniz boş</p>
            <Link
              href="/#urunler"
              className="inline-block bg-[#2D5016] hover:bg-[#3D6B1C] text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Ürünlere Git →
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white border border-[#E8E6E0] rounded-2xl px-6 divide-y divide-[#EEECE6]">
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-[#F5F3EE] border border-[#E8E6E0] rounded-2xl p-6 sticky top-24"
              >
                <h2 className="text-[#1A1A1A] font-semibold mb-4">Sipariş Özeti</h2>
                <div className="flex justify-between text-[#4A4A4A] text-sm mb-2">
                  <span>Ara Toplam</span>
                  <span>{formatPriceSimple(total())}</span>
                </div>
                <div className="flex justify-between text-[#8A8A7A] text-sm mb-4">
                  <span>Kargo</span>
                  <span>Hesaplanacak</span>
                </div>
                <div className="flex justify-between text-[#1A1A1A] font-bold text-lg border-t border-[#EEECE6] pt-4 mb-5">
                  <span>Toplam</span>
                  <span>{formatPriceSimple(total())}</span>
                </div>
                <Link
                  href="/odeme"
                  className="block w-full text-center bg-[#2D5016] hover:bg-[#3D6B1C] text-white font-bold py-4 rounded-xl transition-colors"
                >
                  Siparişi Tamamla →
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
