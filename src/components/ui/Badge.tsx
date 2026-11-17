import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  recommended: "border-gold/40 bg-gold/[0.1] text-gold",
  neutral: "border-line bg-white/[0.03] text-muted",
  gold: "border-gold/30 text-gold",
} as const;

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
