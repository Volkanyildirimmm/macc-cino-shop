"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const inputClass = "w-full bg-white border border-[#D4D2CC] text-[#1A1A1A] placeholder-[#AAAAAA] rounded-[10px] px-4 py-[14px] text-sm focus:outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016] transition-all";
const selectClass = "w-full bg-white border border-[#D4D2CC] text-[#1A1A1A] rounded-[10px] px-4 py-[14px] text-sm focus:outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016] transition-all";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  }

  return (
    <section id="iletisim" className="py-24" style={{ backgroundColor: "#F5F3EE" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="text-[#2D5016] text-xs font-semibold uppercase tracking-widest mb-3 block">Teklif İste</span>
          <TextReveal
            text="Bizimle İletişime Geçin"
            as="h2"
            className="text-4xl sm:text-5xl font-display font-bold text-[#1A1A1A] mb-4 justify-center"
          />
          <p className="text-[#4A4A4A] text-lg max-w-xl mx-auto">
            Toplu sipariş veya genel sorularınız için formu doldurun
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <AnimatedSection className="lg:col-span-3">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-[#E8E6E0] rounded-2xl p-12 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-[#1A1A1A] font-display font-bold text-xl mb-2">Mesajınız İletildi!</h3>
                <p className="text-[#4A4A4A]">En kısa sürede size geri döneceğiz.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-[#E8E6E0] rounded-2xl p-8 space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#2D3B28] text-xs font-semibold mb-1.5 uppercase tracking-wider">Firma Adı</label>
                    <input type="text" required placeholder="ABC Kafe" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[#2D3B28] text-xs font-semibold mb-1.5 uppercase tracking-wider">İsim Soyisim</label>
                    <input type="text" required placeholder="Ali Yılmaz" className={inputClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#2D3B28] text-xs font-semibold mb-1.5 uppercase tracking-wider">E-posta</label>
                    <input type="email" required placeholder="ali@kafe.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[#2D3B28] text-xs font-semibold mb-1.5 uppercase tracking-wider">Telefon</label>
                    <input type="tel" placeholder="+49 123 456 7890" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2D3B28] text-xs font-semibold mb-1.5 uppercase tracking-wider">İlgilendiğiniz Ürün</label>
                  <select className={selectClass}>
                    <option value="">Seçiniz...</option>
                    <option>250ml — Başlangıç Boyutu</option>
                    <option>500ml — Standart Boyut</option>
                    <option>1000ml — Büyük Boy</option>
                    <option>1000ml Pompalı — Profesyonel</option>
                    <option>White Label / Özel Üretim</option>
                    <option>Toplu Sipariş</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#2D3B28] text-xs font-semibold mb-1.5 uppercase tracking-wider">Mesajınız</label>
                  <textarea
                    rows={4}
                    placeholder="Aylık tahmini kullanım, özel istekler..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  className="w-full font-bold py-4 rounded-xl text-white transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  style={{ backgroundColor: loading ? "#3D6B1C" : "#2D5016" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Gönderiliyor...
                    </>
                  ) : "Teklif İste →"}
                </motion.button>
              </form>
            )}
          </AnimatedSection>

          {/* Contact info */}
          <AnimatedSection direction="left" className="lg:col-span-2 space-y-5">
            <div className="bg-white border border-[#E8E6E0] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h3 className="text-[#1A1A1A] font-semibold mb-4">İletişim Bilgileri</h3>
              <div className="space-y-3">
                {[
                  { icon: "📧", text: "info@macc-cino.com" },
                  { icon: "🌐", text: "macc-cino.com" },
                  { icon: "📦", text: "Almanya'dan dünya geneline" },
                ].map((item) => (
                  <p key={item.text} className="text-[#4A4A4A] text-sm flex items-center gap-3">
                    <span>{item.icon}</span> {item.text}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#E8E6E0] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h3 className="text-[#1A1A1A] font-semibold mb-4">Güven Rozetleri</h3>
              <div className="space-y-2">
                {[
                  "🇩🇪 Almanya'da üretilmektedir",
                  "🌱 Organik sertifikalı",
                  "🔒 Güvenli ödeme",
                  "🚚 Hızlı Avrupa içi kargo",
                  "↩️ 30 gün iade garantisi",
                ].map((badge) => (
                  <p key={badge} className="text-[#4A4A4A] text-sm">{badge}</p>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
