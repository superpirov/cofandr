export type PricingPlan = {
  id: "basic" | "pro" | "vip";
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  currency: "RUB";
  features: string[];
  accessLabel: string;
  accessMonths: number;
  highlighted?: boolean;
  badge?: string;
};

/**
 * Единственный источник цен. Сервер берёт стоимость ТОЛЬКО отсюда,
 * данные из браузера (цена, сумма) не используются.
 *
 * TODO: цены и состав тарифов — демонстрационные. Согласовать с заказчиком.
 * oldPrice добавлять только при реальной действующей акции.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "BASIC",
    description: "Самостоятельное обучение",
    price: 9900,
    currency: "RUB",
    features: [
      "Доступ ко всем модулям программы",
      "Практические материалы и шаблоны",
      "Записи и обновления курса",
    ],
    accessLabel: "6 месяцев доступа",
    accessMonths: 6,
  },
  {
    id: "pro",
    name: "PRO",
    description: "Расширенный формат обучения",
    price: 19900,
    currency: "RUB",
    features: [
      "Всё из BASIC",
      "Проверка практических работ",
      "Групповые встречи и разборы",
      "Закрытое сообщество участников",
    ],
    accessLabel: "12 месяцев доступа",
    accessMonths: 12,
    highlighted: true,
    badge: "Рекомендуем",
  },
  {
    id: "vip",
    name: "VIP",
    description: "Максимальное сопровождение",
    price: 49900,
    currency: "RUB",
    features: [
      "Всё из PRO",
      "Личные консультации с автором",
      "Индивидуальная обратная связь",
      "Приоритетная поддержка",
    ],
    accessLabel: "12 месяцев доступа",
    accessMonths: 12,
  },
];

export function getPlan(id: string): PricingPlan | undefined {
  return pricingPlans.find((plan) => plan.id === id);
}

export const pricingSection = {
  eyebrow: "Тарифы",
  title: "Выбери свой уровень участия",
  description:
    "Три формата обучения — в зависимости от твоих задач и желаемого уровня поддержки. Оплата проходит на защищённой странице ЮKassa.",
};
