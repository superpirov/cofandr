import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { PaymentButton } from "@/components/payment/PaymentButton";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { pricingPlans, pricingSection } from "@/config/pricing";
import { cn, formatPrice } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-24 lg:py-32">
      <ViewTracker sectionId="pricing" event="pricing_view" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[900px] max-w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(199,165,107,0.07),transparent_65%)]"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={pricingSection.eyebrow}
            title={pricingSection.title}
            description={pricingSection.description}
          />
        </Reveal>

        <div className="mt-12 grid items-stretch gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Reveal
              key={plan.id}
              delay={index * 0.07}
              className={cn(
                "h-full",
                plan.id === "vip" && "md:col-span-2 lg:col-span-1",
              )}
            >
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-[24px] border p-6 sm:p-7",
                  plan.highlighted
                    ? "border-gold/40 bg-surface shadow-gold"
                    : "border-line bg-surface/40",
                )}
              >
                {plan.badge ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="recommended">{plan.badge}</Badge>
                  </div>
                ) : null}

                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.22em]">
                    {plan.name}
                  </h3>
                  {plan.id === "vip" ? (
                    <span
                      aria-hidden="true"
                      className="size-1.5 rotate-45 bg-gold"
                    />
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>

                <div className="mt-7 flex flex-wrap items-end gap-3">
                  <span className="text-[clamp(1.9rem,3vw,2.5rem)] font-medium leading-none tracking-[-0.04em]">
                    {formatPrice(plan.price, plan.currency)}
                  </span>
                  {plan.oldPrice ? (
                    <span className="pb-1 text-sm text-dim line-through">
                      {formatPrice(plan.oldPrice, plan.currency)}
                    </span>
                  ) : null}
                </div>

                <div className="mt-6 h-px bg-line" />

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-gold"
                        strokeWidth={1.8}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 flex items-center gap-2 text-xs text-dim">
                  <Clock className="size-3.5" strokeWidth={1.6} />
                  {plan.accessLabel}
                </p>

                <PaymentButton
                  planId={plan.id}
                  planName={plan.name}
                  variant={
                    plan.highlighted
                      ? "primary"
                      : plan.id === "vip"
                        ? "gold"
                        : "secondary"
                  }
                  className="mt-5"
                />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-[640px] text-center text-xs leading-relaxed text-dim">
            Оплата проходит на защищённой странице ЮKassa. Нажимая кнопку, вы
            принимаете условия{" "}
            <Link
              href="/legal/offer"
              className="text-muted underline underline-offset-4 hover:text-gold"
            >
              публичной оферты
            </Link>{" "}
            и{" "}
            <Link
              href="/legal/privacy"
              className="text-muted underline underline-offset-4 hover:text-gold"
            >
              политики конфиденциальности
            </Link>
            . Данные банковской карты не передаются сайту.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
