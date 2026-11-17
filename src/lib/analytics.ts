/**
 * Тонкий слой аналитики. Провайдер подключается после согласования с заказчиком:
 * достаточно добавить GTM/Метрику, которая читает window.dataLayer.
 * Персональные и платёжные данные сюда не передаются.
 */
export type AnalyticsEvent =
  | "hero_cta_click"
  | "program_view"
  | "pricing_view"
  | "select_plan"
  | "payment_started"
  | "payment_succeeded"
  | "payment_failed";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...props });
}
