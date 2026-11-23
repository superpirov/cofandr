# КофеСтарт — premium dark landing page с оплатой ЮKassa

Одностраничный сайт программы «КофеСтарт» по запуску кофейни: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion, Prisma + PostgreSQL, реальная интеграция ЮKassa (создание платежа, вебхук, проверка статуса, выдача entitlement).

Дизайн: Dark Luxury / Modern Editorial. Все данные вынесены в `src/config`, цены считаются только на сервере.

---

## 1. Быстрый старт

```bash
npm install
cp .env.example .env      # Windows: copy .env.example .env
# заполнить DATABASE_URL и ключи ЮKassa
npx prisma db push        # создать таблицы
npm run dev
```

Откройте http://localhost:3000.

Требования: Node.js 20+ (проверено на 24), PostgreSQL 15+.

Локальная база в Docker:

```bash
docker run --name cofandr-db -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres:17
# DATABASE_URL="postgresql://postgres:postgres@localhost:5433/cofandr?schema=public"
```

`npm install` автоматически выполняет `prisma generate` (postinstall). Если Prisma Client не сгенерировался — `npm run db:generate`.

### Скрипты

| Команда | Что делает |
|---|---|
| `npm run dev` | dev-сервер |
| `npm run build` | `prisma generate` + production build |
| `npm start` | production-сервер |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript без emit |
| `npm test` | unit-тесты чистой логики платежей |
| `npm run db:push` | применить схему к БД |
| `npm run db:studio` | Prisma Studio |

---

## 2. Переменные окружения

| Переменная | Обязательна | Назначение |
|---|---|---|
| `DATABASE_URL` | да | PostgreSQL connection string |
| `NEXT_PUBLIC_SITE_URL` | да | публичный адрес без слэша на конце; canonical, OG, `return_url` |
| `YOOKASSA_SHOP_ID` | да (для оплаты) | shopId магазина ЮKassa |
| `YOOKASSA_SECRET_KEY` | да (для оплаты) | секретный ключ; только на сервере |

Секреты не попадают в клиентский бандл: `src/lib/yookassa.ts` помечен `server-only`. Без ключей сайт работает, но создание платежа возвращает «Оплата временно недоступна».

---

## 3. Настройка ЮKassa

1. Создайте магазин в [личном кабинете ЮKassa](https://yookassa.ru/my) и получите `shopId` + секретный ключ (тестовый магазин — вкладка «Тестовый магазин»).
2. Заполните `YOOKASSA_SHOP_ID` и `YOOKASSA_SECRET_KEY` в `.env`.
3. В личном кабинете: **Интеграция → HTTP-уведомления** → URL `https://<ваш-домен>/api/payments/webhook`, события `payment.succeeded` и `payment.canceled`.
4. Задайте `NEXT_PUBLIC_SITE_URL` = реальный HTTPS-домен. `return_url` формируется из него: `https://<домен>/success?orderId=...`.
5. Проверьте тестовую оплату тестовой картой из [документации](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing). После успешной оплаты заказ станет `SUCCEEDED`, появится `Entitlement`.

### Как устроен платёж

```
Кнопка тарифа
  → POST /api/payments/create { planId }
      → цена и валюта берутся из src/config/pricing.ts (браузеру не доверяем)
      → Order (PENDING) + Payment через API ЮKassa (Idempotence-Key = order-<id>)
      → confirmation_url
  → редирект на страницу ЮKassa
  → возврат на /success?orderId=...
  → /api/payments/status опрашивает ЮKassa и синхронизирует заказ
  → webhook /api/payments/webhook делает то же самое независимо от возврата пользователя
```

Webhook:

- принимает уведомление, валидирует структуру (Zod);
- **не доверяет телу**: перезапрашивает платёж через API ЮKassa;
- сверяет `metadata.orderId`, сумму и валюту со снимком заказа;
- идемпотентен: `Entitlement` создаётся один раз (`orderId @unique`), повторное событие не продлевает доступ;
- при ошибке отвечает 500, чтобы ЮKassa повторила доставку.

Статусы: `PENDING` / `SUCCEEDED` / `CANCELED` (у провайдера `pending` и `waiting_for_capture` считаются `PENDING`). Страница `/success` не считает оплату успешной по факту возврата — только после проверки через API.

### Важно перед production

- **Чеки (54-ФЗ).** Если у магазина включена онлайн-касса, ЮKassa требует `receipt` в запросе платежа. Сейчас чек не передаётся: добавьте сбор email/телефона и объект `receipt` в `createYooKassaPayment` (`src/lib/yookassa.ts`), если это применимо к вашему магазину.
- **Доставка доступа.** В v1 создаётся `Entitlement`, но нет LMS и email-рассылки. Страница успеха просит покупателя написать в поддержку с номером заказа. Подключите email/GetCourse/Telegram-бот и отправку ссылки по событию `SUCCEEDED` (точка расширения — `applyProviderPayment` в `src/lib/payments.ts`).
- **Rate limit** создания платежей — in-memory (см. `src/lib/rate-limit.ts`). На serverless счётчик на инстанс; при нагрузке вынесите в Redis.
- **Проверка IP вебхука** не включена: подлинность подтверждается перезапросом платежа через API. Дополнительно можно ограничить по IP ЮKassa на уровне WAF.
- Юридические документы и реквизиты — шаблоны с плейсхолдерами, перед запуском нужна проверка юристом.

---

## 4. Где менять контент

| Файл | Что внутри |
|---|---|
| `src/config/site.ts` | имя бренда, основатели и фото, контакты, навигация, реквизиты |
| `src/config/content.ts` | hero, цифры, проблемы, преимущества, блок «Об эксперте», финальный CTA |
| `src/config/pricing.ts` | тарифы и цены — **единственный источник цен** |
| `src/config/program.ts` | модули, уроки, результаты модулей |
| `src/config/testimonials.ts` | отзывы (по умолчанию пусто — секция показывает честное пустое состояние) |
| `src/config/faq.ts` | вопросы и ответы |
| `src/config/legal.ts` | политика, оферта, согласие на обработку данных |

Все демонстрационные значения помечены `TODO` / `[КВАДРАТНЫМИ СКОБКАМИ]`. Тарифы: СТАНДАРТ 4 900 ₽, ПРЕМИУМ 14 900 ₽, VIP 890 000 ₽ — из брифа заказчика. Срок доступа и точный состав VIP нужно подтвердить. Отзывы, количество учеников и достижения не выдумывались.

### Фото основателей

1. `public/images/founders/ruslan-daudov.png` — Руслан Даудов (светло-голубая рубашка).
2. `public/images/founders/valentin-senkin.png` — Валентин Сенькин (очки).

Пути заданы в `site.founders`. Фото на белом фоне выводятся с `mix-blend-multiply`, поэтому белый растворяется в кремовой карточке. Если файла нет, `FounderCard` показывает монограмму — сборка не падает.

### Аналитика

`src/lib/analytics.ts` пушит события в `window.dataLayer` (GTM/Метрика подключаются отдельно, после согласования). События: `program_view`, `pricing_view`, `select_plan`, `payment_started`, `payment_succeeded`, `payment_failed`. Персональные и платёжные данные не отправляются.

---

## 5. Структура

```text
src/
  app/
    page.tsx            # лендинг, 10 секций
    layout.tsx          # шрифты, metadata, header/footer
    success/            # проверка оплаты
    payment/failed/     # неуспешная оплата
    legal/[slug]/       # документы
    api/payments/
      create/route.ts
      webhook/route.ts
      status/route.ts
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  components/
    layout/             # Header, Footer, Container
    sections/           # Hero … FinalCTA, FounderCard
    ui/                 # Button, Card, Badge, Accordion, SectionHeading, Reveal
    payment/            # PaymentButton, PaymentStatus
    analytics/          # ViewTracker
  config/               # весь контент и цены
  lib/                  # db, payments, yookassa, validation, rate-limit, analytics
  styles/tokens.css     # design tokens
prisma/schema.prisma
tests/payment-logic.test.ts
```

### Что сознательно не реализовано в v1

- Личный кабинет, LMS, регистрация, история покупок — архитектура (`Entitlement`) готова к расширению.
- Модальные окна и toast-уведомления не добавлялись: в сценариях нет подтверждающих действий, ошибки оплаты показываются inline рядом с кнопкой (лучше для конверсии).
- Playwright не подключён (тяжёлые браузеры). Критические сценарии описаны чек-листом ниже; unit-тесты покрывают расчёт суммы, статусы, идемпотентность и return_url.
- Email-доставка доступа и фискальные чеки — см. раздел «Важно перед production».

---

## 6. Тестирование

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Unit-тесты (`tests/payment-logic.test.ts`): сумма в формате провайдера, сверка суммы/валюты, маппинг статусов, метаданные заказа, расчёт срока доступа.

### Ручной QA-чек-лист оплаты

1. Создание платежа для каждого тарифа → редирект на ЮKassa.
2. Успешная тестовая оплата → `/success` показывает «Оплата подтверждена», в БД заказ `SUCCEEDED`, entitlement создан.
3. Отмена на странице ЮKassa → возврат, статус «не завершена», заказ `CANCELED`.
4. Повторный webhook того же платежа → статус не меняется, второй entitlement не появляется.
5. Подмена суммы/валюты в уведомлении → заказ не получает `SUCCEEDED` (проверка в `applyProviderPayment`).
6. Возврат на `/success` без `orderId` → «Заказ не найден».
7. Без ключей ЮKassa → понятная ошибка «Оплата временно недоступна», заказ `FAILED`.
8. Проверка вёрстки: 320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920 px, без горизонтального скролла.
9. Проверка навигации, аккордеонов (клавиатура + Escape в мобильном меню), reduced motion.
10. Lighthouse на production-сборке: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+ (цель, не гарантия).

---

## 7. Деплой (Vercel + managed PostgreSQL)

1. Создайте БД (Neon, Supabase, RDS) и примените схему: `DATABASE_URL=... npx prisma migrate deploy` (или `db push` для первого запуска; для production лучше `prisma migrate dev` локально → `migrate deploy` на сервере).
2. Импортируйте репозиторий в Vercel, задайте env-переменные из `.env.example`.
3. Build command: `npm run build` (уже включает `prisma generate`).
4. Укажите `NEXT_PUBLIC_SITE_URL` = production-домен, добавьте webhook URL в ЮKassa.
5. Проверьте тестовую оплату на production и только затем переключите магазин в боевой режим.

`/api/*` работают на Node runtime. HTTPS обязателен.

### GitHub Pages — только витрина

GitHub Pages отдаёт статические файлы и не запускает Node.js, поэтому API оплаты, Prisma и вебхук ЮKassa там работать не могут. В репозитории есть отдельная сборка-витрина: `.github/workflows/pages.yml` выкладывает лендинг на `https://superpirov.github.io/cofandr/` без приёма оплаты (кнопки тарифов показывают «Демо-стенд»).

Включение: **Settings → Pages → Build and deployment → Source: GitHub Actions**, затем запустите workflow «Deploy static preview to GitHub Pages» (или сделайте push в `main`).

- `NEXT_BASE_PATH=/cofandr` должен совпадать с именем репозитория; для своего домена уберите его в workflow и в `next.config.ts`.
- Статическая сборка использует `STATIC_EXPORT=1` и `NEXT_PUBLIC_STATIC_DEMO=1`; обычный `npm run build` для Vercel/сервера не меняется.
- Для реальных продаж используйте Vercel/Node-хостинг: витрина на Pages оплату не принимает.

### Свой файловый хостинг (public_html)

В репозитории лежат исходники, а не готовый сайт — `index.html` создаётся при сборке, поэтому в корне GitHub его нет. Для обычного хостинга без Node.js:

```bash
# без basePath, домен в корне
STATIC_EXPORT=1 NEXT_PUBLIC_STATIC_DEMO=1 NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru npx next build
```

Залейте **содержимое** `out/` в `public_html` (index.html должен оказаться в корне домена), папки `_next`, `images`, `legal` — рядом с ним. Оплата в такой сборке — «Демо-стенд».

---

## 8. Чек-лист материалов от заказчика

- [x] Название программы («КофеСтарт»), УТП, основатели, фото, реальные цифры (7+ лет, 8+ точек)
- [x] Структура модулей и состав тарифов
- [ ] Срок доступа к материалам и точный объём VIP-сопровождения
- [ ] Реальные отзывы/кейсы с согласием авторов
- [ ] Реквизиты продавца (ИП/ООО, ИНН, ОГРНИП, адрес)
- [ ] Email и Telegram поддержки
- [ ] Домен и доступы к ЮKassa (shopId, секретный ключ)
- [ ] Решение по доставке доступа (LMS / GetCourse / email)
- [ ] Юридическая проверка оферты, политики и согласия
