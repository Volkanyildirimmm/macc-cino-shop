"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { MobileMenu } from "./MobileMenu";
import { ScrollProgress } from "./ScrollProgress";

const navLinks = [
  { href: "/#urunler", label: "Ürünler" },
  { href: "/#nasil-hazirlanir", label: "Nasıl Hazırlanır?" },
  { href: "/#avantajlar", label: "Avantajlar" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const { itemCount, openCart } = useCart();
  const count = itemCount();

  const headerBg = useTransform(
    scrollYProgress,
    [0, 0.04],
    ["rgba(250,250,247,0)", "rgba(250,250,247,0.92)"]
  );
  const headerBorder = useTransform(
    scrollYProgress,
    [0, 0.04],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.06)"]
  );

  return (
    <>
      <ScrollProgress />
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[12px]"
        style={{
          backgroundColor: headerBg,
          borderBottomColor: headerBorder,
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center"
              onClick={(e) => {
                if (typeof window !== "undefined" && window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <motion.div
                className="text-2xl lg:text-3xl tracking-tight"
                style={{ fontFamily: "var(--font-logo), 'Kaushan Script', cursive" }}
                whileHover={{ scale: 1.02 }}
              >
                <span style={{ color: "#000000ff" }}>Macc</span>
                <span style={{ color: "#535151ff" }}> & </span>
                <span style={{ color: "#000000ff" }}>Cino</span>
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#1A1A1A] hover:text-[#2D5016] transition-colors duration-200 text-sm font-medium tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Cart + Mobile */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={openCart}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="relative text-[#1A1A1A] hover:text-[#2D5016] transition-colors p-2"
                aria-label="Sepeti aç"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#2D5016] text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </motion.button>

              <button
                className="lg:hidden text-[#1A1A1A] p-2"
                onClick={() => setMobileOpen(true)}
                aria-label="Menüyü aç"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
