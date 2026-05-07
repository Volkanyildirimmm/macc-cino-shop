"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  staggerDelay?: number;
}

export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  staggerDelay = 0.08,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn("flex flex-wrap gap-x-[0.25em]", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * staggerDelay, duration: 0.5, ease: "easeOut" }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
