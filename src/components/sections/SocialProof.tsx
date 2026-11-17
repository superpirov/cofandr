import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/config/content";
import { cn } from "@/lib/utils";

export function SocialProof() {
  return (
    <section aria-label="Ключевые показатели программы" className="border-y border-line">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.06}
              y={12}
              className={cn(
                "px-4 py-8 sm:px-6 sm:py-10",
                index % 2 === 1 && "border-l border-line",
                index < 2 && "border-b border-line lg:border-b-0",
                index > 0 && "lg:border-l lg:border-line",
              )}
            >
              <dt className="text-[13px] text-muted">{stat.label}</dt>
              <dd className="mt-3 flex items-baseline gap-2">
                <span className="text-[clamp(2.25rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.04em]">
                  {stat.value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-dim">
                  {stat.note}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
