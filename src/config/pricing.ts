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
 * TODO: уточнить у заказчика срок доступа (accessMonths) и точный состав VIP.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "СТАНДАРТ",
    description: "Самостоятельный запуск по видеоурокам",
    price: 4900,
    currency: "RUB",
    features: [
      "6 видеоуроков: брендбук, концепция, локация, документы, оборудование, барная карта с ТТК",
      "Автоматизированные таблицы финансового учёта и анализа точки",
      "Материалы для самостоятельного запуска",
    ],
    accessLabel: "Доступ к материалам программы",
    accessMonths: 12,
  },
  {
    id: "pro",
    name: "ПРЕМИУМ",
    description: "Обучение и поддержка владельцев и управляющих",
    price: 14900,
    currency: "RUB",
    features: [
      "Всё из тарифа СТАНДАРТ",
      "Созвон с владельцами бизнеса: разбор вашего проекта или ответы на вопросы",
      "Чат с управляющими, которые ведут кофейни 7+ лет",
      "База проверенных специалистов и работа с iiko",
      "База поставщиков для всех необходимых товаров",
    ],
    accessLabel: "Доступ к материалам программы",
    accessMonths: 12,
    highlighted: true,
    badge: "Рекомендуем",
  },
  {
    id: "vip",
    name: "VIP",
    description: "С нуля до приносящей прибыль кофейни",
    price: 890000,
    currency: "RUB",
    features: [
      "Всё из тарифа ПРЕМИУМ",
      "Запуск кофейни с нуля вместе с командой",
      "Сопровождение проекта до выхода на прибыль",
    ],
    accessLabel: "Условия запуска и сопровождения",
    accessMonths: 24,
  },
];

export function getPlan(id: string): PricingPlan | undefined {
  return pricingPlans.find((plan) => plan.id === id);
}

export const pricingSection = {
  eyebrow: "Тарифы",
  title: "Выбери свой уровень участия",
  description:
    "Три формата: самостоятельно по видеоурокам, с поддержкой владельцев и управляющих или запуск кофейни вместе с командой. Оплата проходит на защищённой странице ЮKassa.",
};
