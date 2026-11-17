import { ArrowDown, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ExpertPortrait } from "@/components/sections/ExpertPortrait";
import { HeroTitle } from "@/components/sections/HeroTitle";
import { hero } from "@/config/content";
import { site } from "@/config/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-14 pt-[112px] lg:flex lg:min-h-[94svh] lg:items-center lg:pb-20 lg:pt-[140px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[15%] -top-[20%] size-[720px] rounded-full bg-[radial-gradient(circle,rgba(199,165,107,0.11),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-5 w-px bg-white/[0.035] sm:left-8 lg:left-12"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-5 w-px bg-white/[0.035] sm:right-8 lg:right-12"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow flex flex-wrap items-center gap-3">
                <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
                {hero.eyebrow}
                <span className="text-dim">·</span>
                <span className="normal-case tracking-normal text-muted">
                  {site.expertName}
                </span>
              </p>
            </Reveal>

            <div className="mt-7">
              <HeroTitle lines={hero.title} accentIndex={hero.titleAccentIndex} />
            </div>

            <Reveal delay={0.3}>
              <p className="mt-7 max-w-[540px] text-base leading-relaxed text-muted sm:text-lg">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="#pricing" size="lg" className="w-full sm:w-auto">
                  {hero.primaryCta}
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
                <Button
                  href="#program"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {hero.secondaryCta}
                  <ArrowDown className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.46}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-dim">
                {hero.meta.map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-1 rounded-full bg-gold/70"
                    />
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-dim">
                <ShieldCheck className="size-3.5 text-gold/80" strokeWidth={1.6} />
                Оплата через ЮKassa · доступ после подтверждения платежа
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={16} className="relative">
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 hidden h-full w-full rounded-[28px] border border-gold/15 sm:block"
            />
            <ExpertPortrait
              priority
              className="aspect-[4/5] w-full max-w-[520px] lg:ml-auto"
            />
            <div className="absolute -left-2 top-1/2 hidden -translate-y-1/2 items-center gap-3 rounded-full border border-line-strong bg-bg/80 px-4 py-2.5 backdrop-blur-md sm:flex lg:-left-6">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
              <Badge variant="gold" className="border-0 bg-transparent p-0">
                {hero.badge}
              </Badge>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 lg:max-w-[520px] lg:ml-auto">
              <p className="text-[11px] uppercase tracking-[0.2em] text-dim">
                {hero.portraitCaption}
              </p>
              <p className="font-serif text-base italic text-muted">
                {site.courseName}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
