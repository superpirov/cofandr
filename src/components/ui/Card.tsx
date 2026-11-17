import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "border border-line bg-surface/50",
  highlight: "border border-gold/30 bg-surface shadow-gold",
  flat: "border border-line bg-bg-soft",
  ghost: "border border-transparent bg-transparent",
} as const;

export function Card({
  children,
  className,
  variant = "default",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "rounded-[20px]",
        variants[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
