import { NextResponse } from "next/server";
import { orderIdSchema } from "@/lib/validation";
import { getOrderStatus } from "@/lib/payments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const orderId = new URL(request.url).searchParams.get("orderId");
  const parsed = orderIdSchema.safeParse(orderId);

  if (!parsed.success) {
    return NextResponse.json({ error: "Некорректный номер заказа" }, { status: 400 });
  }

  try {
    const status = await getOrderStatus(parsed.data);
    if (!status) {
      return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
    }
    return NextResponse.json(status, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[api/payments/status]", error);
    return NextResponse.json(
      { error: "Не удалось проверить оплату" },
      { status: 500 },
    );
  }
}
