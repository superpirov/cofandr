export const site = {
  /** Рабочее название бренда. Заменить на реальное имя/логотип эксперта. */
  name: "COFANDR",
  /** TODO: заменить на реальное имя эксперта. */
  expertName: "[ИМЯ ЭКСПЕРТА]",
  expertRole: "Автор программы",
  /** TODO: положить фото в /public/images/expert.jpg (вертикальное, 4:5) и указать путь здесь. */
  expertPhoto: null as string | null,
  expertPhotoAlt: "Портрет автора программы",
  /** Монограмма для портрета-заглушки, пока нет фото. */
  monogram: "ИЭ",
  /** TODO: заменить на реальное название курса. */
  courseName: "[НАЗВАНИЕ КУРСА]",
  /** TODO: заменить на реальные контакты. */
  email: "hello@example.com",
  telegram: "https://t.me/username",
  telegramLabel: "@username",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "Авторская практическая программа: система, практика и обратная связь вместо разрозненных курсов и случайных решений.",
  nav: [
    { href: "/#about", label: "Об эксперте" },
    { href: "/#program", label: "Программа" },
    { href: "/#results", label: "Результаты" },
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

export type SiteConfig = typeof site;
