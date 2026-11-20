import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { program } from "@/config/program";

export function Program() {
  return (
    <section id="program" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow={program.eyebrow}
                title={program.title}
                description={program.description}
              />
              <div className="mt-8 hidden lg:block">
                <Button href="#pricing" variant="gold">
                  Выбрать тариф
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion
              defaultOpenId={program.modules[0].number}
              items={program.modules.map((module) => ({
                id: module.number,
                trigger: (
                  <span className="flex items-center gap-5 sm:gap-8">
                    <span className="w-9 shrink-0 font-serif text-2xl italic text-gold/55 sm:w-12 sm:text-4xl">
                      {module.number}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-lg font-medium tracking-[-0.015em] sm:text-2xl">
                        {module.title}
                      </span>
                      <span className="mt-1.5 block text-[11px] uppercase tracking-[0.14em] text-dim">
                        Практический модуль
                      </span>
                    </span>
                  </span>
                ),
                content: (
                  <div className="sm:pl-[80px]">
                    <p className="max-w-[520px] text-sm leading-relaxed text-muted">
                      {module.summary}
                    </p>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {module.lessons.map((lesson) => (
                        <li
                          key={lesson}
                          className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[7px] h-px w-3 shrink-0 bg-gold/60"
                          />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-[14px] border border-gold/20 bg-gold/[0.04] p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                        Результат модуля
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-fg/90">
                        {module.outcome}
                      </p>
                    </div>
                  </div>
                ),
              }))}
            />
            <div className="mt-4 rounded-[20px] border border-gold/20 bg-gold/[0.04] p-6 sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                Дополнительно
              </p>
              <p className="mt-3 text-[15px] font-medium">
                {program.bonus.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {program.bonus.text}
              </p>
            </div>
            <div className="mt-8 lg:hidden">
              <Button href="#pricing" variant="gold" className="w-full sm:w-auto">
                Выбрать тариф
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
