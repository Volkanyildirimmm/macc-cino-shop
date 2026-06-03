"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const inputClass = "w-full bg-white border border-[#D4D2CC] text-[#1A1A1A] placeholder-[#AAAAAA] rounded-[10px] px-4 py-[14px] text-sm focus:outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016] transition-all";

export function Contact() {
  const t = useTranslations("contact");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          data.error === "invalid_email" ? t("form_error_email") : t("form_error")
        );
        return;
      }
      setSent(true);
    } catch {
      setError(t("form_error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="iletisim" className="py-24" style={{ backgroundColor: "#F5F3EE" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="text-[#2D5016] text-xs font-semibold uppercase tracking-widest mb-3 block">
            {t("section_label")}
          </span>
          <TextReveal
            text={t("title")}
            as="h2"
            className="text-4xl sm:text-5xl font-display font-bold text-[#1A1A1A] mb-4 justify-center"
          />
          <p className="text-[#4A4A4A] text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <AnimatedSection className="lg:col-span-3">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-[#E8E6E0] rounded-2xl p-12 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="text-5xl mb-4">✅</div>
                <p className="text-[#4A4A4A]">{t("form_success")}</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-[#E8E6E0] rounded-2xl p-8 space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#2D3B28] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                      {t("form_company")}
                    </label>
                    <input
                      name="company"
                      type="text"
                      placeholder={t("form_company_placeholder")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[#2D3B28] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                      {t("form_name")}
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder={t("form_name_placeholder")}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#2D3B28] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                      {t("form_email")}
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={t("form_email_placeholder")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[#2D3B28] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                      {t("form_phone")}
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder={t("form_phone_placeholder")}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2D3B28] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    {t("form_message")}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={t("form_message_placeholder")}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm" role="alert">
                    {error}
                  </p>
                )}

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
                      {t("form_submitting")}
                    </>
                  ) : (
                    t("form_submit")
                  )}
                </motion.button>
              </form>
            )}
          </AnimatedSection>

          <AnimatedSection direction="left" className="lg:col-span-2 space-y-5">
            <div className="bg-white border border-[#E8E6E0] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h3 className="text-[#1A1A1A] font-semibold mb-4">macc-cino</h3>
              <div className="space-y-3">
                <p className="text-[#4A4A4A] text-sm flex items-center gap-3">
                  <span>📧</span> info@macc-cino.com
                </p>
                <p className="text-[#4A4A4A] text-sm flex items-center gap-3">
                  <span>🌐</span> macc-cino.com
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
