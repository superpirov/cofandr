import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/config/faq";
import { site } from "@/config/site";

export function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow={faq.eyebrow}
                title={faq.title}
                description={faq.description}
              />
              <p className="mt-8 text-sm text-dim">
                Не нашли ответ?{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-gold underline underline-offset-4"
                >
                  {site.email}
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Accordion
              items={faq.items.map((item, index) => ({
                id: `faq-${index}`,
                trigger: (
                  <span className="text-[15px] font-medium leading-snug tracking-[-0.01em] sm:text-base">
                    {item.question}
                  </span>
                ),
                content: (
                  <p className="max-w-[620px] text-sm leading-relaxed text-muted">
                    {item.answer}
                  </p>
                ),
              }))}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
