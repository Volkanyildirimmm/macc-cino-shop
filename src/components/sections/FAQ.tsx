"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Matcha konsantresi nedir?",
    a: "Matcha konsantresi, Ceremonial Grade organik matcha tozundan üretilen sıvı bir formdur. Su veya süt ile hızlıca karıştırılarak anında matcha içeceği elde edilir; köpürtme veya süzme gerektirmez.",
  },
  {
    q: "Matcha konsantresi nasıl kullanılır?",
    a: "12.5 ml (yaklaşık 2 yemek kaşığı veya 1 pompa) konsantreyi 150 ml su, süt ya da bitkisel süt ile karıştırın. Kullanmadan önce iyice çalkalayın. Anında servise hazırdır.",
  },
  {
    q: "Bir şişeden kaç porsiyon çıkar?",
    a: "250 ml şişe yaklaşık 20 porsiyon, 500 ml şişe yaklaşık 50 porsiyon, 1000 ml şişe ise yaklaşık 100 porsiyon verir. Her porsiyon 12.5 ml konsantre içerir.",
  },
  {
    q: "Matcha konsantresi nasıl saklanır?",
    a: "Açılmamış şişe oda sıcaklığında 12 ay boyunca saklanabilir. Açıldıktan sonra 2-8°C arasında buzdolabında muhafaza edin ve 4 hafta içinde tüketin.",
  },
  {
    q: "Konsantre organik ve Ceremonial Grade mi?",
    a: "Evet. macc-cino matcha konsantresi organik tarımdan elde edilen Ceremonial Grade matcha kullanır ve Almanya'da üretilir. Vegan ve glütensizdir.",
  },
  {
    q: "Pompalı model ne işe yarar?",
    a: "1000 ml Pompalı model, dahili dozajlama pompası sayesinde her basışta tam 10 ml (1 porsiyon) verir. Profesyonel kafe ve zincir restoranlarda hızlı, tutarlı servis sağlar.",
  },
  {
    q: "Toptan veya white label mümkün mü?",
    a: "Evet. Kafeler, zincir restoranlar ve perakende markaları için toptan satış ve özel etiketli (white label) üretim seçeneklerimiz mevcuttur. Teklif için iletişim formunu kullanın.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="sss"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "#FAFAF7" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#2D5016] mb-4">
            Sıkça Sorulan Sorular
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1A1A1A] tracking-tight">
            Matcha konsantresi hakkında her şey
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#F5F3EE]/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-[#1A1A1A] text-base sm:text-lg pr-4">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#2D5016] flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-[#4A4A4A] leading-relaxed text-sm sm:text-base">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
