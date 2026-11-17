import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { benefits } from "@/config/content";
import { cn } from "@/lib/utils";

export function Benefits() {
  const [featured, ...rest] = benefits.items;

  return (
    <section id="benefits" className="relative py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/25 to-transparent"
      />
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={benefits.eyebrow}
            title={benefits.title}
            description={benefits.description}
            className="max-w-[760px]"
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <Reveal delay={0.05} className="sm:col-span-2 lg:col-span-3 lg:row-span-2">
            <article className="flex h-full flex-col justify-between rounded-[20px] border border-gold/25 bg-[linear-gradient(160deg,rgba(199,165,107,0.09),rgba(21,21,27,0.6)_45%)] p-7 sm:p-9">
              <div>
                <span className="eyebrow">{featured.detail}</span>
                <h3 className="mt-6 max-w-[420px] text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.025em]">
                  {featured.title}
                </h3>
                <p className="mt-5 max-w-[440px] text-sm leading-relaxed text-muted sm:text-[15px]">
                  {featured.text}
                </p>
              </div>
              <div className="mt-10 flex items-center gap-3 text-[13px] text-gold">
                <span className="h-px w-10 bg-gold/50" />
                Каждый шаг ведёт к следующему
              </div>
            </article>
          </Reveal>

          {rest.map((item, index) => (
            <Reveal
              key={item.title}
              delay={0.08 + index * 0.05}
              className={cn(
                "sm:col-span-1 lg:col-span-3",
                index < 2 && "lg:col-span-3",
              )}
            >
              <article className="group flex h-full items-start gap-4 rounded-[20px] border border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-white/20 hover:bg-surface">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
                  <Check className="size-3.5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="text-[15px] font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
