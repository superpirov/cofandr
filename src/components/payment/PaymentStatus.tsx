"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Clock,
  Copy,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { formatPrice } from "@/lib/utils";
import { track } from "@/lib/analytics";

type ProviderStatus = "PENDING" | "SUCCEEDED" | "CANCELED" | "FAILED";
type OrderInfo = {
  status: ProviderStatus;
  planName: string;
  amount: number;
  currency: string;
};

type View = "checking" | "pending" | "succeeded" | "canceled" | "error";

const MAX_ATTEMPTS = 8;

export function PaymentStatus({ orderId }: { orderId: string }) {
  const [view, setView] = useState<View>("checking");
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [copied, setCopied] = useState(false);
  const tracked = useRef(false);

  useEffect(() => {
    let active = true;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function check() {
      attempts += 1;
      try {
        const response = await fetch(
          `/api/payments/status?orderId=${encodeURIComponent(orderId)}`,
          { cache: "no-store" },
        );
        const data = (await response.json().catch(() => null)) as
          | (OrderInfo & { error?: string })
          | null;

        if (!active) return;

        if (response.status === 404) {
          setView("error");
          return;
        }
        if (!response.ok || !data) {
          setView(attempts < MAX_ATTEMPTS ? "checking" : "error");
        } else {
          setOrder(data);
          if (data.status === "SUCCEEDED") {
            setView("succeeded");
            if (!tracked.current) {
              tracked.current = true;
              track("payment_succeeded", { plan: data.planName });
            }
            return;
          }
          if (data.status === "CANCELED" || data.status === "FAILED") {
            setView("canceled");
            if (!tracked.current) {
              tracked.current = true;
              track("payment_failed", { plan: data.planName, stage: "status" });
            }
            return;
          }
          setView(attempts >= MAX_ATTEMPTS ? "pending" : "checking");
        }
      } catch {
        if (active) setView(attempts >= MAX_ATTEMPTS ? "error" : "checking");
      }

      if (active && attempts < MAX_ATTEMPTS) {
        timer = setTimeout(check, 2500);
      }
    }

    check();
    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [orderId, attempt]);

  async function copyOrderId() {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const summary = order ? (
    <div className="mx-auto mt-8 w-full max-w-[360px] rounded-[16px] border border-line bg-surface/40 px-5 py-4 text-sm">
      <div className="flex items-center justify-between gap-4">
        <span className="text-dim">Тариф</span>
        <span className="font-medium">{order.planName}</span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-4">
        <span className="text-dim">Сумма</span>
        <span className="font-medium">
          {formatPrice(order.amount, order.currency)}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-4">
        <span className="text-dim">Заказ</span>
        <button
          type="button"
          onClick={copyOrderId}
          className="inline-flex items-center gap-1.5 font-mono text-[12px] text-muted transition-colors hover:text-gold"
        >
          {copied ? "Скопировано" : orderId.slice(0, 12)}
          <Copy className="size-3" strokeWidth={1.6} />
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div className="mx-auto max-w-[620px] text-center">
      {view === "checking" || view === "pending" ? (
        <>
          <span className="mx-auto grid size-16 place-items-center rounded-full border border-gold/25 bg-gold/[0.06]">
            {view === "checking" ? (
              <Loader2 className="size-6 animate-spin text-gold" strokeWidth={1.6} />
            ) : (
              <Clock className="size-6 text-gold" strokeWidth={1.6} />
            )}
          </span>
          <h1 className="h-section mt-7">
            {view === "checking" ? "Проверяем оплату" : "Платёж обрабатывается"}
          </h1>
          <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-relaxed text-muted">
            {view === "checking"
              ? "Обычно это занимает несколько секунд. Не закрывайте страницу — статус обновится автоматически."
              : "Банк ещё подтверждает платёж. Это может занять до нескольких минут. Обновите статус чуть позже."}
          </p>
          {view === "pending" ? (
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button onClick={() => setAttempt((value) => value + 1)}>
                Проверить снова
              </Button>
              <Button href="/" variant="ghost">
                На главную
              </Button>
            </div>
          ) : null}
          {summary}
        </>
      ) : null}

      {view === "succeeded" ? (
        <>
          <span className="mx-auto grid size-16 place-items-center rounded-full border border-success/30 bg-success/10">
            <Check className="size-7 text-success" strokeWidth={2} />
          </span>
          <h1 className="h-section mt-7">Оплата подтверждена</h1>
          <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-relaxed text-muted">
            Доступ к тарифу {order?.planName ?? ""} активирован. Чтобы получить
            материалы и инструкцию, напишите в поддержку и укажите номер заказа.
          </p>
          {summary}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={site.telegram} variant="primary">
              Написать в поддержку
            </Button>
            <Button href="/" variant="secondary">
              <ArrowLeft className="size-4" />
              На главную
            </Button>
          </div>
          <p className="mt-6 text-xs text-dim">
            Поддержка: {site.email} · {site.telegramLabel}
          </p>
        </>
      ) : null}

      {view === "canceled" ? (
        <>
          <span className="mx-auto grid size-16 place-items-center rounded-full border border-danger/30 bg-danger/10">
            <X className="size-7 text-danger" strokeWidth={2} />
          </span>
          <h1 className="h-section mt-7">Оплата не завершена</h1>
          <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-relaxed text-muted">
            Платёж был отменён или отклонён банком. Средства не списаны. Можно
            попробовать снова или выбрать другой тариф.
          </p>
          {summary}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/#pricing">Вернуться к тарифам</Button>
            <Button href={site.telegram} variant="secondary">
              Написать в поддержку
            </Button>
          </div>
        </>
      ) : null}

      {view === "error" ? (
        <>
          <span className="mx-auto grid size-16 place-items-center rounded-full border border-line-strong bg-surface">
            <AlertTriangle className="size-6 text-muted" strokeWidth={1.6} />
          </span>
          <h1 className="h-section mt-7">Не удалось проверить оплату</h1>
          <p className="mx-auto mt-4 max-w-[460px] text-[15px] leading-relaxed text-muted">
            Если деньги списались — не переживайте, платёж сохранён. Напишите в
            поддержку с номером заказа, мы проверим вручную.
          </p>
          {summary}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => setAttempt((value) => value + 1)}>
              Проверить ещё раз
            </Button>
            <Button href={site.telegram} variant="secondary">
              Поддержка
            </Button>
          </div>
          <p className="mt-6 text-xs text-dim">
            <Link href="/" className="underline underline-offset-4 hover:text-gold">
              Вернуться на главную
            </Link>
          </p>
        </>
      ) : null}
    </div>
  );
}
