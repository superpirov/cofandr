"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function HeroTitle({
  lines,
  accentIndex,
}: {
  lines: readonly string[];
  accentIndex: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.h1
      className="h-display"
      initial={reduce ? "show" : "hidden"}
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.09 } } }}
    >
      {lines.map((line, index) => (
        <motion.span
          key={line}
          className={cn(
            "block",
            index === accentIndex && "serif-accent text-gold",
          )}
          variants={{
            hidden: { opacity: 0, y: 26 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.span>
      ))}
    </motion.h1>
  );
}
