import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import type { Founder } from "@/config/site";
import { cn } from "@/lib/utils";

function hasPhoto(src: string) {
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

/**
 * Карточка основателя. Фото подхватывается из /public/images/founders/,
 * пока файла нет — показывается монограмма, а не выдуманное лицо.
 */
export function FounderCard({
  founder,
  priority = false,
  className,
}: {
  founder: Founder;
  priority?: boolean;
  className?: string;
}) {
  const photo = hasPhoto(founder.photo);
  /** В статическом экспорте на GitHub Pages next/image не добавляет basePath сам. */
  const src = `${process.env.NEXT_BASE_PATH ?? ""}${founder.photo}`;

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[22px] border border-black/10 bg-[#e7dfd1] text-[#171410]",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#f3ede2,#ddd2c0)]">
        {photo ? (
          <Image
            src={src}
            alt={`${founder.name} — ${founder.role}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 280px, 45vw"
            /* Фото на белом фоне: multiply убирает белый прямоугольник на кремовой карточке. */
            className="object-cover object-top mix-blend-multiply"
          />
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="font-serif text-[clamp(3rem,7vw,5rem)] italic leading-none text-[#8a7350]"
            >
              {founder.monogram}
            </span>
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#171410]/45">
              Основатель
            </span>
          </div>
        )}
      </div>

      <figcaption className="px-4 pb-4 pt-3">
        <p className="text-[13px] font-semibold leading-tight">{founder.name}</p>
        <p className="mt-1 text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[#171410]/55">
          {founder.role}
        </p>
      </figcaption>
    </figure>
  );
}
