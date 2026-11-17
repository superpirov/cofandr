import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-gold text-[#0b0b0d] hover:bg-gold-hover shadow-[0_18px_50px_-24px_rgba(199,165,107,0.7)]",
  secondary:
    "border border-line-strong bg-white/[0.02] text-fg hover:bg-white/[0.06] hover:border-white/25",
  gold: "border border-gold/45 bg-gold/[0.06] text-gold hover:bg-gold/[0.12] hover:border-gold/70",
  ghost: "text-muted hover:text-fg",
} as const;

const sizes = {
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-7 text-[15px]",
} as const;

type CommonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  className?: string;
};

type ButtonProps = CommonProps & {
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  "aria-label"?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  href,
  disabled,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "group inline-flex select-none items-center justify-center gap-2 rounded-[12px] font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,transform,opacity] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    // Link keeps internal URLs working under a basePath (GitHub Pages).
    return href.startsWith("/") ? (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    ) : (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {children}
    </button>
  );
}
