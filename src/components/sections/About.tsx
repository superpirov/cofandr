import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ExpertPortrait } from "@/components/sections/ExpertPortrait";
import { about } from "@/config/content";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="relative">
            <ExpertPortrait className="aspect-[4/5] w-full lg:sticky lg:top-28" />
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading eyebrow={about.eyebrow} title={about.title} />
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-7 text-[13px] uppercase tracking-[0.14em] text-gold">
                {about.positioning}
              </p>

              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-9 rounded-[20px] border border-line bg-surface/40 p-6 sm:p-7">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dim">
                  Подтверждённые достижения
                </h3>
                <ul className="mt-5 space-y-3">
                  {about.achievements.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
                        <Check className="size-3" strokeWidth={2} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <blockquote className="mt-10 border-l border-gold/40 pl-6">
                <p className="font-serif text-[clamp(1.35rem,2.4vw,1.9rem)] italic leading-[1.35] text-fg">
                  «{about.quote}»
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.26}>
              <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
                {about.principles.map((item) => (
                  <div key={item.title}>
                    <dt className="text-[13px] font-medium">{item.title}</dt>
                    <dd className="mt-1.5 text-[13px] leading-relaxed text-dim">
                      {item.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
