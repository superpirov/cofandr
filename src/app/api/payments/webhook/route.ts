import { NextResponse } from "next/server";
import { notificationSchema } from "@/lib/validation";
import { syncProviderPayment } from "@/lib/payments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Уведомления ЮKassa. Телу не доверяем: статус всегда перезапрашиваем через API.
 * Обработка идемпотентна — повторное уведомление не продлевает доступ.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = notificationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid notification" }, { status: 400 });
  }

  try {
    await syncProviderPayment(parsed.data.object.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    // 500 → ЮKassa повторит уведомление позже.
    console.error("[api/payments/webhook]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
