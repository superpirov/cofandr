/**
 * Чистая логика платежей без БД и сети — её покрывают тесты в tests/payment-logic.test.ts.
 */
import type { OrderStatus } from "@/types";

export type ProviderPaymentStatus =
  | "pending"
  | "waiting_for_capture"
  | "succeeded"
  | "canceled";

export function toProviderAmount(amount: number) {
  return amount.toFixed(2);
}

/** Сумма и валюта из уведомления должны совпасть со снимком заказа. */
export function amountMatches(
  orderAmount: number,
  orderCurrency: string,
  providerAmount: string,
  providerCurrency: string,
) {
  if (orderCurrency !== providerCurrency) return false;
  const value = Number(providerAmount);
  return Number.isFinite(value) && Math.abs(value - orderAmount) < 0.005;
}

export function mapProviderStatus(status: ProviderPaymentStatus): OrderStatus {
  if (status === "succeeded") return "SUCCEEDED";
  if (status === "canceled") return "CANCELED";
  return "PENDING";
}

export function addMonths(from: Date, months: number) {
  const date = new Date(from);
  date.setMonth(date.getMonth() + months);
  return date;
}

/** Метаданные платежа должны указывать на тот же заказ, что и в БД. */
export function metadataOrderMatches(
  metadata: Record<string, unknown> | undefined,
  orderId: string,
) {
  return metadata?.orderId === orderId;
}