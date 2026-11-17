import { NextResponse } from "next/server";
import { createPaymentSchema } from "@/lib/validation";
import { createPaymentForPlan, PaymentError } from "@/lib/payments";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  if (!rateLimit(`create:${clientIp(request)}`)) {
    return NextResponse.json(
      { error: "Слишком много попыток. Попробуйте через несколько минут." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = createPaymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Выберите тариф" }, { status: 400 });
  }

  try {
    const result = await createPaymentForPlan(parsed.data.planId);
    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof PaymentError) {
      const status = error.code === "PLAN_NOT_FOUND" ? 400 : 503;
      return NextResponse.json({ error: error.message }, { status });
    }
    console.error("[api/payments/create]", error);
    return NextResponse.json(
      { error: "Не удалось создать платёж. Попробуйте позже." },
      { status: 500 },
    );
  }
}
