"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";
import { formatPriceSimple } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.aside
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[60] flex flex-col shadow-2xl border-l border-[#E8E6E0]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#EEECE6]">
              <h2 className="text-[#1A1A1A] font-display text-xl font-semibold">Sepetim</h2>
              <button
                onClick={closeCart}
                className="text-[#8A8A7A] hover:text-[#1A1A1A] transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 text-center py-20"
                  >
                    <span className="text-4xl">🛒</span>
                    <p className="text-[#8A8A7A]">Sepetiniz boş</p>
                    <button
                      onClick={closeCart}
                      className="text-[#2D5016] text-sm hover:underline"
                    >
                      Ürünlere bak →
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => <CartItem key={item.product.id} item={item} />)
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#EEECE6] space-y-4 bg-[#FAFAF7]">
                <div className="flex justify-between text-[#1A1A1A]">
                  <span className="font-medium">Toplam</span>
                  <span className="font-bold text-xl">
                    {formatPriceSimple(total(), items[0]?.product.currency)}
                  </span>
                </div>
                <Link
                  href="/odeme"
                  onClick={closeCart}
                  className="block w-full bg-[#2D5016] hover:bg-[#3D6B1C] text-white font-bold py-4 rounded-xl text-center transition-colors duration-300"
                >
                  Siparişi Tamamla
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full text-[#8A8A7A] text-sm hover:text-[#2D5016] transition-colors text-center"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
