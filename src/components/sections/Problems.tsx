import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { problems } from "@/config/content";

export function Problems() {
  return (
    <section id="problems" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow={problems.eyebrow}
                title={problems.title}
                description={problems.description}
              />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {problems.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="group h-full rounded-[20px] border border-line bg-surface/40 p-6 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-surface sm:p-7">
                  <span className="font-serif text-2xl italic text-gold/60 transition-colors duration-300 group-hover:text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-lg font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
