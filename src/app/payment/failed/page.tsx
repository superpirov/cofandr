import type { Metadata } from "next";
import { X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Оплата не завершена",
  robots: { index: false, follow: false },
};

export default function PaymentFailedPage() {
  return (
    <section className="pb-20 pt-32 sm:pb-28 lg:pb-32 lg:pt-40">
      <Container>
        <div className="mx-auto max-w-[560px] text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full border border-danger/30 bg-danger/10">
            <X className="size-7 text-danger" strokeWidth={2} />
          </span>
          <h1 className="h-section mt-7">Не удалось завершить оплату</h1>
          <p className="mx-auto mt-4 max-w-[460px] text-[15px] leading-relaxed text-muted">
            Платёж не прошёл, средства не списаны. Обычно помогает повторить
            попытку или использовать другую карту. Если ошибка повторяется —
            напишите в поддержку.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/#pricing">Попробовать снова</Button>
            <Button href={site.telegram} variant="secondary">
              Написать в поддержку
            </Button>
          </div>
          <p className="mt-6 text-xs text-dim">
            {site.email} · {site.telegramLabel}
          </p>
        </div>
      </Container>
    </section>
  );
}
