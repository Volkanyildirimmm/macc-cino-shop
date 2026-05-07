"use client";

import { motion } from "framer-motion";

export function ProBadge() {
  return (
    <motion.span
      className="inline-flex items-center gap-1 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
      style={{ backgroundColor: "#C5A55A" }}
      animate={{ boxShadow: ["0 0 0px rgba(197,165,90,0)", "0 0 12px rgba(197,165,90,0.5)", "0 0 0px rgba(197,165,90,0)"] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    >
      PRO
    </motion.span>
  );
}
