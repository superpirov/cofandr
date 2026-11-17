import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Портрет эксперта. Если site.expertPhoto задан — рендерится фото,
 * иначе — типографическая обложка с монограммой (честная заглушка без выдуманного лица).
 */
export function ExpertPortrait({
  className,
  priority = false,
  caption = true,
}: {
  className?: string;
  priority?: boolean;
  caption?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-line bg-bg-soft",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(199,165,107,0.16),transparent_55%),radial-gradient(90%_60%_at_90%_100%,rgba(199,165,107,0.08),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-3 rounded-[20px] border border-white/[0.06]"
      />
      <div aria-hidden="true" className="noise absolute inset-0" />

      {site.expertPhoto ? (
        <>
          <Image
            src={site.expertPhoto}
            alt={site.expertPhotoAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent"
          />
          {caption ? (
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <div className="h-px w-10 bg-gold" />
              <p className="mt-4 text-lg font-medium">{site.expertName}</p>
              <p className="text-sm text-muted">{site.expertRole}</p>
            </div>
          ) : null}
        </>
      ) : (
        <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-[10px]">Автор программы</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-dim">
              {site.name}
            </span>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <span
                aria-hidden="true"
                className="block bg-gradient-to-br from-gold/90 via-gold/45 to-transparent bg-clip-text font-serif text-[clamp(4.5rem,10vw,8.5rem)] italic leading-[0.8] text-transparent"
              >
                {site.monogram}
              </span>
              {caption ? (
                <div className="mt-8">
                  <div className="h-px w-10 bg-gold/70" />
                  <p className="mt-4 text-lg font-medium">{site.expertName}</p>
                  <p className="text-sm text-muted">{site.expertRole}</p>
                </div>
              ) : null}
            </div>
            <span
              aria-hidden="true"
              className="hidden shrink-0 pb-2 text-[10px] uppercase tracking-[0.32em] text-dim [writing-mode:vertical-rl] sm:block"
            >
              Portrait / 4:5
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
