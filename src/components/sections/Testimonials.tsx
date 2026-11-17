import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials, testimonialsSection } from "@/config/testimonials";
import { site } from "@/config/site";
import { Quote } from "lucide-react";

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
          <Reveal delay={0.08}>
            <div className="relative mt-12 overflow-hidden rounded-[28px] border border-line bg-surface/40 px-6 py-14 text-center sm:px-12 sm:py-20">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(199,165,107,0.09),transparent_65%)]"
              />
              <Quote
                className="relative mx-auto size-7 text-gold/50"
                strokeWidth={1.2}
              />
              <p className="relative mx-auto mt-6 max-w-[560px] text-lg leading-relaxed text-fg/90 sm:text-xl">
                Мы не публикуем выдуманные отзывы. Здесь появятся реальные
                кейсы участников — с именами, работами и результатами.
              </p>
              <p className="relative mx-auto mt-5 max-w-[480px] text-sm leading-relaxed text-dim">
                Уже прошёл программу? Поделись результатом на{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-gold underline underline-offset-4"
                >
                  {site.email}
                </a>{" "}
                — мы опубликуем историю с твоего согласия.
              </p>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
