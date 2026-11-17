import "server-only";
import { toProviderAmount } from "@/lib/payment-logic";

const API_URL = "https://api.yookassa.ru/v3";

export type YooKassaPayment = {
  id: string;
  status: "pending" | "waiting_for_capture" | "succeeded" | "canceled";
  amount: { value: string; currency: string };
  confirmation?: { type: string; confirmation_url?: string };
  metadata?: Record<string, string>;
  created_at: string;
  paid: boolean;
};

type CreatePaymentInput = {
  amount: number;
  currency: string;
  description: string;
  orderId: string;
  returnUrl: string;
  idempotenceKey: string;
};

function credentials() {
  const shopId = process.env.YOOKASSA_SHOP_ID?.trim();
  const secretKey = process.env.YOOKASSA_SECRET_KEY?.trim();
  if (!shopId || !secretKey) return null;
  return { shopId, secretKey };
}

export function isYooKassaConfigured() {
  return credentials() !== null;
}

function authHeader(shopId: string, secretKey: string) {
  return `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString("base64")}`;
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const creds = credentials();
  if (!creds) throw new Error("YooKassa credentials are not configured");

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(creds.shopId, creds.secretKey),
      ...init.headers,
    },
    cache: "no-store",
  });

  const body = await response.text();
  if (!response.ok) {
    console.error("[yookassa] request failed", response.status, body.slice(0, 500));
    throw new Error(`YooKassa API error ${response.status}`);
  }

  try {
    return JSON.parse(body) as T;
  } catch {
    throw new Error("YooKassa returned invalid JSON");
  }
}

export async function createYooKassaPayment(input: CreatePaymentInput) {
  return request<YooKassaPayment>("/payments", {
    method: "POST",
    headers: { "Idempotence-Key": input.idempotenceKey },
    body: JSON.stringify({
      amount: {
        value: toProviderAmount(input.amount),
        currency: input.currency,
      },
      capture: true,
      description: input.description,
      confirmation: {
        type: "redirect",
        return_url: input.returnUrl,
      },
      metadata: { orderId: input.orderId },
    }),
  });
}

export async function getYooKassaPayment(paymentId: string) {
  return request<YooKassaPayment>(`/payments/${encodeURIComponent(paymentId)}`, {
    method: "GET",
  });
}
