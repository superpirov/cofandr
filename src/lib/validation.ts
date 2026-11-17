import { z } from "zod";

export const createPaymentSchema = z.object({
  planId: z
    .string({ error: "Не указан тариф" })
    .trim()
    .min(1)
    .max(32)
    .regex(/^[a-z0-9-]+$/, "Некорректный тариф"),
});

export const orderIdSchema = z
  .string()
  .trim()
  .min(10)
  .max(40)
  .regex(/^[a-z0-9]+$/i, "Некорректный номер заказа");

/** Уведомление ЮKassa: проверяем только структуру. Статус всегда перепроверяем через API. */
export const notificationSchema = z.object({
  type: z.string().min(1),
  event: z.string().min(1),
  object: z
    .object({
      id: z.string().min(1),
      status: z.string().min(1),
    })
    .passthrough(),
});

export type Notification = z.infer<typeof notificationSchema>;
