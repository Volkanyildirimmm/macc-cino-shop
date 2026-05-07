"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { formatPriceSimple } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputClass = "w-full bg-white border border-[#D4D2CC] text-[#1A1A1A] placeholder-[#AAAAAA] rounded-[10px] px-4 py-[14px] text-sm focus:outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016] transition-all";

export default function OdemePage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    clearCart();
    router.push("/siparis-onay");
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center" style={{ backgroundColor: "#FAFAF7" }}>
        <div className="text-center">
          <p className="text-[#8A8A7A] mb-4">Sepetiniz boş</p>
          <Link href="/#urunler" className="text-[#2D5016] hover:underline">Ürünlere dön →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: "#FAFAF7" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display font-bold text-[#1A1A1A] mb-8"
        >
          Ödeme
        </motion.h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#E8E6E0] rounded-2xl p-8"
              >
                <h2 className="text-[#1A1A1A] font-semibold text-base mb-5">İletişim Bilgileri</h2>
                <div className="space-y-4">
                  <input type="email" required placeholder="E-posta adresi" className={inputClass} />
                  <input type="tel" placeholder="Telefon (opsiyonel)" className={inputClass} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="bg-white border border-[#E8E6E0] rounded-2xl p-8"
              >
                <h2 className="text-[#1A1A1A] font-semibold text-base mb-5">Teslimat Adresi</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" required placeholder="Ad" className={inputClass} />
                    <input type="text" required placeholder="Soyad" className={inputClass} />
                  </div>
                  <input type="text" required placeholder="Adres" className={inputClass} />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" required placeholder="Posta Kodu" className={inputClass} />
                    <input type="text" required placeholder="Şehir" className={inputClass} />
                  </div>
                  <select className={inputClass}>
                    <option value="DE">Almanya</option>
                    <option value="TR">Türkiye</option>
                    <option value="AT">Avusturya</option>
                    <option value="CH">İsviçre</option>
                  </select>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="bg-white border border-[#E8E6E0] rounded-2xl p-8"
              >
                <h2 className="text-[#1A1A1A] font-semibold text-base mb-5">Ödeme</h2>
                <div className="rounded-xl p-4 text-center text-[#8A8A7A] text-sm border border-[#E0DDD6]" style={{ backgroundColor: "#F0EDE6" }}>
                  🔒 Stripe entegrasyonu — Ödeme sistemi yakında aktif
                </div>
              </motion.div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="rounded-2xl p-6 sticky top-24 border border-[#E8E6E0]"
                style={{ backgroundColor: "#F8F6F1" }}
              >
                <h2 className="text-[#1A1A1A] font-semibold mb-4">Sipariş Özeti</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-[#4A4A4A]">{item.product.title} × {item.quantity}</span>
                      <span className="text-[#1A1A1A] font-medium">{formatPriceSimple(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#EEECE6] pt-4 flex justify-between text-base font-bold">
                  <span className="text-[#1A1A1A]">Toplam</span>
                  <span className="text-[#2D5016]">{formatPriceSimple(total())}</span>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  className="w-full mt-5 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                  style={{ backgroundColor: "#2D5016" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      İşleniyor...
                    </>
                  ) : "Siparişi Onayla →"}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
