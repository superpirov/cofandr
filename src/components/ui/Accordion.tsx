"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  trigger: ReactNode;
  content: ReactNode;
};

export function Accordion({
  items,
  defaultOpenId,
  className,
  itemClassName,
  triggerClassName,
}: {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
  const reduce = useReducedMotion();

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className={cn("border-b border-line", itemClassName)}>
            <h3>
              <button
                type="button"
                id={`accordion-trigger-${item.id}`}
                aria-expanded={open}
                aria-controls={`accordion-panel-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
                className={cn(
                  "flex w-full items-center gap-5 py-6 text-left transition-colors duration-300 hover:text-gold sm:py-7",
                  triggerClassName,
                )}
              >
                <span className="min-w-0 flex-1">{item.trigger}</span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: open ? 135 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-muted"
                >
                  <Plus className="size-4" strokeWidth={1.5} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="panel"
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{
                    duration: reduce ? 0 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pr-12">{item.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
