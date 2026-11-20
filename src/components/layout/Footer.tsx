import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { site } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-soft/40">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span aria-hidden="true" className="size-2 rounded-full bg-gold" />
              <span className="text-[13px] font-semibold tracking-[0.2em]">
                {site.name}
              </span>
            </Link>
            <p className="mt-5 max-w-[300px] text-sm leading-relaxed text-muted">
              «КофеСтарт» — практическая программа по запуску кофейни от
              владельцев 8+ действующих точек.
            </p>
            <div className="mt-6 flex flex-col gap-1 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="text-fg transition-colors hover:text-gold"
              >
                {site.email}
              </a>
              <a
                href={site.telegram}
                className="text-muted transition-colors hover:text-gold"
              >
                Telegram · {site.telegramLabel}
              </a>
            </div>
          </div>

          <nav aria-label="Навигация в подвале">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dim">
              Разделы
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Правовая информация">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dim">
              Документы
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {site.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#pricing"
                  className="text-muted transition-colors hover:text-fg"
                >
                  Оплата и возврат
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dim">
              Продавец
            </h2>
            <address className="mt-5 space-y-2 text-sm not-italic leading-relaxed text-muted">
              <p className="text-fg">{site.seller.name}</p>
              <p>ИНН {site.seller.inn}</p>
              <p>ОГРНИП {site.seller.ogrnip}</p>
              <p>{site.seller.address}</p>
              <p>
                <a
                  href={`mailto:${site.seller.email}`}
                  className="transition-colors hover:text-gold"
                >
                  {site.seller.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Все права защищены.
          </p>
          <p>
            Оплата через ЮKassa. Данные банковских карт не хранятся на сайте.
          </p>
        </div>
      </Container>
    </footer>
  );
}
