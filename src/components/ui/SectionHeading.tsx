import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
          {eyebrow}
        </p>
      ) : null}
      <Tag className={cn("h-section text-fg", titleClassName)}>{title}</Tag>
      {description ? (
        <p
          className={cn(
            "max-w-[600px] text-[15px] leading-relaxed text-muted sm:text-base",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
