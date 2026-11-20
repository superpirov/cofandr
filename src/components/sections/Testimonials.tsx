import { Building2, MapPin, Quote, ShoppingBag } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  proofPoints,
  testimonials,
  testimonialsSection,
} from "@/config/testimonials";
import { site } from "@/config/site";

const proofIcons = [Building2, ShoppingBag, MapPin];

export function Testimonials() {
  return (
    <section id="results" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={testimonialsSection.eyebrow}
            title={testimonialsSection.title}
            description={testimonialsSection.description}
          />
        </Reveal>

        {testimonials.length > 0 ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={`${item.name}-${index}`} delay={index * 0.05}>
                <figure className="flex h-full flex-col rounded-[20px] border border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-white/20 hover:bg-surface sm:p-7">
                  <Quote className="size-5 text-gold/60" strokeWidth={1.5} />
                  <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-fg/90">
                    {item.quote}
                  </blockquote>
                  {item.result ? (
                    <p className="mt-5 text-[13px] text-gold">{item.result}</p>
                  ) : null}
                  <figcaption className="mt-6 border-t border-line pt-5">
                    <p className="text-sm font-medium">{item.name}</p>
                    {item.role ? (
                      <p className="mt-0.5 text-xs text-dim">{item.role}</p>
                    ) : null}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {proofPoints.map((point, index) => {
                const Icon = proofIcons[index] ?? MapPin;
                return (
                  <Reveal key={point.title} delay={index * 0.06}>
                    <article className="h-full rounded-[20px] border border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-white/20 hover:bg-surface sm:p-7">
                      <Icon
                        className="size-5 text-gold/80"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <h3 className="mt-5 text-lg font-medium tracking-[-0.01em]">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {point.text}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-8 max-w-[620px] text-center text-sm leading-relaxed text-dim">
                Отзывы учеников появятся после первых потоков — мы не публикуем
                выдуманные кейсы. Если вы уже запустили кофейню, поделитесь
                результатом на{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-gold underline underline-offset-4"
                >
                  {site.email}
                </a>
                .
              </p>
            </Reveal>
          </>
        )}
      </Container>
    </section>
  );
}
