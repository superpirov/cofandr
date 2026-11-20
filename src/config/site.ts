export type Founder = {
  name: string;
  role: string;
  /** Положите PNG в /public/images/founders/ — при отсутствии файла показывается монограмма. */
  photo: string;
  monogram: string;
};

export const site = {
  name: "КофеСтарт",
  courseName: "КофеСтарт",
  foundersLine: "Руслан Даудов и Валентин Сенькин",
  founders: [
    {
      name: "Руслан Даудов",
      role: "Сооснователь «КофеСтарт»",
      photo: "/images/founders/ruslan-daudov.png",
      monogram: "РД",
    },
    {
      name: "Валентин Сенькин",
      role: "Сооснователь «КофеСтарт»",
      photo: "/images/founders/valentin-senkin.png",
      monogram: "ВС",
    },
  ] satisfies Founder[],
  /** TODO: заменить на реальные контакты поддержки. */
  email: "hello@example.com",
  telegram: "https://t.me/username",
  telegramLabel: "@username",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "Практическая программа по запуску кофейни от владельцев 8+ действующих точек: концепция, локация, документы, оборудование, барная карта и финансовая модель.",
  nav: [
    { href: "/#about", label: "Основатели" },
    { href: "/#program", label: "Программа" },
    { href: "/#results", label: "Опыт" },
    { href: "/#pricing", label: "Тарифы" },
    { href: "/#faq", label: "FAQ" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Политика конфиденциальности" },
    { href: "/legal/offer", label: "Публичная оферта" },
    { href: "/legal/personal-data", label: "Обработка персональных данных" },
  ],
  /** TODO: заполнить реальными реквизитами продавца. */
  seller: {
    name: "[ИП ФАМИЛИЯ ИМЯ ОТЧЕСТВО]",
    inn: "[ИНН]",
    ogrnip: "[ОГРНИП]",
    address: "[ЮРИДИЧЕСКИЙ АДРЕС]",
    email: "hello@example.com",
  },
} as const;
