"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

export function PaymentButton({
  planId,
  planName,
  variant = "primary",
  className,
}: {
  planId: string;
  planName: string;
  variant?: "primary" | "secondary" | "gold";
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);
    track("select_plan", { plan: planId });

    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = (await response.json().catch(() => null)) as
        | { confirmationUrl?: string; error?: string }
        | null;

      if (!response.ok || !data?.confirmationUrl) {
        throw new Error(data?.error ?? "Не удалось создать платёж");
      }

      track("payment_started", { plan: planId });
      window.location.assign(data.confirmationUrl);
    } catch (cause) {
      track("payment_failed", { plan: planId, stage: "create" });
      setError(
        cause instanceof Error
          ? cause.message
          : "Не удалось перейти к оплате. Попробуйте ещё раз.",
      );
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <Button
        variant={variant}
        size="lg"
        loading={loading}
        onClick={handleClick}
        className="w-full"
      >
        {loading ? "Создаём платёж" : `Оплатить ${planName}`}
        {!loading ? (
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        ) : null}
      </Button>
      {error ? (
        <p
          role="alert"
          className="mt-3 text-center text-xs leading-relaxed text-danger"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
