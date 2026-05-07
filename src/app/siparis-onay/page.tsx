"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SiparisOnayPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-16" style={{ backgroundColor: "#FAFAF7" }}>
      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-6xl mb-6 inline-block"
        >
          ✅
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-4xl font-display font-bold text-[#1A1A1A] mb-4"
        >
          Siparişiniz Alındı!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[#4A4A4A] text-lg mb-8 leading-relaxed"
        >
          Siparişiniz için teşekkür ederiz. Onay e-postası kısa süre içinde gönderilecektir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white border border-[#E8E6E0] rounded-2xl p-6 mb-8 text-left space-y-3"
        >
          <h2 className="text-[#1A1A1A] font-semibold">Sonraki Adımlar</h2>
          {[
            "📧 Onay e-postasını kontrol edin",
            "📦 Siparişiniz 2-5 iş günü içinde kargoya verilecek",
            "🚚 Kargo takip numarası e-posta ile iletilecek",
          ].map((step) => (
            <p key={step} className="text-[#4A4A4A] text-sm">{step}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="bg-[#2D5016] hover:bg-[#3D6B1C] text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/#urunler"
            className="border border-[#2D5016] text-[#2D5016] hover:bg-[#E8F0E0] font-medium px-8 py-3 rounded-xl transition-colors"
          >
            Alışverişe Devam Et
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
