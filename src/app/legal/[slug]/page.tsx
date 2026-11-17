import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { legalDocuments, getLegalDocument } from "@/config/legal";

export function generateStaticParams() {
  return legalDocuments.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) return { title: "Документ не найден" };
  return {
    title: doc.title,
    description: doc.intro.slice(0, 160),
    alternates: { canonical: `/legal/${doc.slug}` },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) notFound();

  const others = legalDocuments.filter((item) => item.slug !== doc.slug);

  return (
    <article className="pb-20 pt-32 sm:pb-24 lg:pb-28 lg:pt-40">
      <Container>
        <div className="mx-auto max-w-[760px]">
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-gold"
          >
            ← На главную
          </Link>
          <p className="eyebrow mt-8">Правовая информация</p>
          <h1 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            {doc.title}
          </h1>
          <p className="mt-4 text-xs text-dim">Редакция от {doc.updated}</p>

          <div className="prose-legal mt-10">
            <p className="text-[15px] leading-relaxed text-muted">{doc.intro}</p>
            {doc.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-line pt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-dim">
              Другие документы
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/legal/${item.slug}`}
                    prefetch={false}
                    className="text-muted underline underline-offset-4 transition-colors hover:text-gold"
                  >
                    {item.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </article>
  );
}
