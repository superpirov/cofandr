"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-line bg-bg/70 backdrop-blur-[16px]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="relative flex h-[76px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-gold" />
          <span className="text-[13px] font-semibold tracking-[0.2em]">
            {site.name}
          </span>
          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-line-strong sm:block"
          />
          <span className="hidden text-[11px] uppercase tracking-[0.18em] text-dim sm:block">
            Авторская программа
          </span>
        </Link>

        <nav
          aria-label="Основная навигация"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-muted transition-colors duration-200 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="/#pricing">
              Выбрать тариф
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-[12px] border border-line text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[76px] z-40 overflow-y-auto border-t border-line bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              aria-label="Мобильная навигация"
              className="px-5 pb-12 pt-4 sm:px-8"
            >
              {site.nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-5 text-2xl tracking-[-0.02em]"
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 text-dim" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8">
                <Button
                  href="/#pricing"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Выбрать тариф
                  <ArrowUpRight className="size-4" />
                </Button>
                <p className="mt-6 text-sm text-dim">
                  {site.email}
                  <br />
                  <a href={site.telegram} className="text-muted hover:text-gold">
                    {site.telegramLabel}
                  </a>
                </p>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
