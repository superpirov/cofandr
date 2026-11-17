export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  result?: string;
  avatar?: string;
  /** Ссылка на скриншот или кейс, если есть. */
  proofUrl?: string;
};

/**
 * ВАЖНО: отзывы не выдумываются. Секция показывает аккуратное пустое состояние,
 * пока массив пуст. Добавляйте только реальные отзывы с согласия авторов.
 *
 * Пример структуры:
 * {
 *   quote: "Текст отзыва",
 *   name: "Имя",
 *   role: "Ученик потока №1",
 *   result: "Собрал первый проект за 6 недель",
 *   avatar: "/images/testimonials/name.jpg",
 * }
 */
export const testimonials: Testimonial[] = [];

export const testimonialsSection = {
  eyebrow: "Результаты",
  title: "Результаты говорят сами за себя",
  description:
    "Здесь будут реальные отзывы и кейсы участников — с именами, работами и измеримыми результатами.",
};
