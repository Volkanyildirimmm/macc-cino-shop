"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#2D5016] origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
