import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { finalCta } from "@/config/content";
import { cn } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section className="pb-20 pt-4 sm:pb-24 lg:pb-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-gold/20 bg-bg-soft px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(199,165,107,0.22),transparent_60%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-16 top-0 h-px gold-rule"
            />
            <div aria-hidden="true" className="noise absolute inset-0" />

            <div className="relative">
              <p className="eyebrow justify-center">{finalCta.eyebrow}</p>
              <h2 className="h-section mx-auto mt-6 max-w-[760px]">
                {finalCta.title.map((line, index) => (
                  <span
                    key={line}
                    className={cn(
                      "block",
                      index === finalCta.accentIndex && "serif-accent text-gold",
                    )}
                  >
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mx-auto mt-6 max-w-[480px] text-[15px] leading-relaxed text-muted sm:text-base">
                {finalCta.description}
              </p>
              <div className="mt-9 flex justify-center">
                <Button href="#pricing" size="lg">
                  {finalCta.cta}
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
