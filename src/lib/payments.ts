import "server-only";
import { prisma } from "@/lib/db";
import { getPlan } from "@/config/pricing";
import { site } from "@/config/site";
import {
  createYooKassaPayment,
  getYooKassaPayment,
  isYooKassaConfigured,
  type YooKassaPayment,
} from "@/lib/yookassa";
import {
  addMonths,
  amountMatches,
  mapProviderStatus,
  metadataOrderMatches,
} from "@/lib/payment-logic";
import type { OrderStatus, PublicOrderStatus } from "@/types";

export class PaymentError extends Error {
  constructor(
    public code: "PLAN_NOT_FOUND" | "PROVIDER_UNAVAILABLE" | "PROVIDER_ERROR",
    message: string,
  ) {
    super(message);
    this.name = "PaymentError";
  }
}

export async function createPaymentForPlan(planId: string) {
  const plan = getPlan(planId);
  if (!plan) {
    throw new PaymentError("PLAN_NOT_FOUND", "Тариф не найден");
  }
  if (!isYooKassaConfigured()) {
    throw new PaymentError("PROVIDER_UNAVAILABLE", "Оплата временно недоступна");
  }

  const order = await prisma.order.create({
    data: {
      planId: plan.id,
      amount: plan.price,
      currency: plan.currency,
    },
  });

  const idempotenceKey = `order-${order.id}`;

  try {
    const provider = await createYooKassaPayment({
      amount: order.amount,
      currency: order.currency,
      description: `${site.name}: доступ к программе ${plan.name}`.slice(0, 128),
      orderId: order.id,
      returnUrl: `${site.url}/success?orderId=${order.id}`,
      idempotenceKey,
    });

    const confirmationUrl = provider.confirmation?.confirmation_url;
    if (!confirmationUrl) {
      throw new Error("YooKassa did not return a confirmation url");
    }
    if (
      !amountMatches(
        order.amount,
        order.currency,
        provider.amount.value,
        provider.amount.currency,
      )
    ) {
      throw new Error("YooKassa amount mismatch on create");
    }

    await prisma.payment.create({
      data: {
        orderId: order.id,
        providerPaymentId: provider.id,
        status: "PENDING",
        confirmationUrl,
        idempotenceKey,
      },
    });

    return { confirmationUrl, orderId: order.id };
  } catch (error) {
    console.error("[payments] create failed", error);
    await prisma.order
      .update({ where: { id: order.id }, data: { status: "FAILED" } })
      .catch(() => undefined);
    throw new PaymentError("PROVIDER_ERROR", "Не удалось создать платёж");
  }
}

/**
 * Единственная точка изменения статуса заказа по данным провайдера.
 * Идемпотентна: повторный вызов не продлевает доступ и не меняет сумму.
 */
async function applyProviderPayment(provider: YooKassaPayment) {
  const payment = await prisma.payment.findUnique({
    where: { providerPaymentId: provider.id },
    include: { order: true },
  });

  if (!payment) {
    console.warn("[payments] unknown provider payment", provider.id);
    return null;
  }

  if (!metadataOrderMatches(provider.metadata, payment.orderId)) {
    console.error("[payments] metadata order mismatch", provider.id);
    return payment.order;
  }

  if (
    !amountMatches(
      payment.order.amount,
      payment.order.currency,
      provider.amount.value,
      provider.amount.currency,
    )
  ) {
    console.error("[payments] amount mismatch", provider.id);
    return payment.order;
  }

  const mapped = mapProviderStatus(provider.status);

  if (mapped === "SUCCEEDED") {
    const plan = getPlan(payment.order.planId);
    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: "SUCCEEDED" },
      });
      await tx.order.updateMany({
        where: { id: payment.orderId, status: { not: "SUCCEEDED" } },
        data: { status: "SUCCEEDED" },
      });
      await tx.entitlement.upsert({
        where: { orderId: payment.orderId },
        create: {
          orderId: payment.orderId,
          planId: payment.order.planId,
          expiresAt: addMonths(new Date(), plan?.accessMonths ?? 6),
        },
        update: {},
      });
    });
  } else if (mapped === "CANCELED") {
    await prisma.$transaction([
      prisma.payment.updateMany({
        where: { id: payment.id, status: { not: "SUCCEEDED" } },
        data: { status: "CANCELED" },
      }),
      prisma.order.updateMany({
        where: { id: payment.orderId, status: "PENDING" },
        data: { status: "CANCELED" },
      }),
    ]);
  } else {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "PENDING",
        confirmationUrl:
          provider.confirmation?.confirmation_url ?? payment.confirmationUrl,
      },
    });
  }

  return prisma.order.findUnique({ where: { id: payment.orderId } });
}

/** Вебхук: статус всегда перезапрашивается у ЮKassa, телу уведомления не доверяем. */
export async function syncProviderPayment(providerPaymentId: string) {
  if (!isYooKassaConfigured()) {
    throw new PaymentError("PROVIDER_UNAVAILABLE", "Оплата временно недоступна");
  }
  const provider = await getYooKassaPayment(providerPaymentId);
  const order = await applyProviderPayment(provider);
  return order?.status ?? null;
}

export async function getOrderStatus(
  orderId: string,
): Promise<PublicOrderStatus | null> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      payments: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  if (!order) return null;

  let status: OrderStatus = order.status;
  const payment = order.payments[0];

  if (order.status === "PENDING" && payment && isYooKassaConfigured()) {
    try {
      const provider = await getYooKassaPayment(payment.providerPaymentId);
      const updated = await applyProviderPayment(provider);
      if (updated) status = updated.status;
    } catch (error) {
      // Не роняем страницу: показываем «проверяем оплату» и позволяем повторить запрос.
      console.error("[payments] status sync failed", error);
    }
  }

  return {
    status,
    planName: getPlan(order.planId)?.name ?? order.planId,
    amount: order.amount,
    currency: order.currency,
  };
}
