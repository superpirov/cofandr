import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PaymentStatus } from "@/components/payment/PaymentStatus";
import { Button } from "@/components/ui/Button";
import { orderIdSchema } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Проверка оплаты",
  robots: { index: false, follow: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId;
  const parsed = orderIdSchema.safeParse(raw);

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 lg:pb-32 lg:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] max-w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(199,165,107,0.10),transparent_65%)]"
      />
      <Container className="relative">
        {parsed.success ? (
          <PaymentStatus orderId={parsed.data} />
        ) : (
          <div className="mx-auto max-w-[560px] text-center">
            <h1 className="h-section">Заказ не найден</h1>
            <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-relaxed text-muted">
              В ссылке нет номера заказа. Откройте письмо или страницу оплаты
              ещё раз, либо напишите в поддержку.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/#pricing">К тарифам</Button>
              <Link
                href="/"
                className="text-sm text-muted underline underline-offset-4 transition-colors hover:text-gold"
              >
                На главную
              </Link>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
