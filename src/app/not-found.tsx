import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="pb-24 pt-36 lg:pt-44">
      <Container>
        <div className="mx-auto max-w-[520px] text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="h-section mt-5">Страница не найдена</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Возможно, ссылка устарела. Вернитесь на главную — там программа,
            тарифы и ответы на вопросы.
          </p>
          <div className="mt-8">
            <Button href="/">На главную</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
