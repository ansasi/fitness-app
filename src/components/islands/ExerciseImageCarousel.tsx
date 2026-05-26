import { useEffect, useState } from "react";
import { imageUrl } from "../../lib/images";
import type { Locale } from "../../i18n/utils";
import { t } from "../../i18n/utils";

type Props = {
  images: string[];
  name: string;
  locale: Locale;
};

const INTERVAL_MS = 2000;

export default function ExerciseImageCarousel({ images, name, locale }: Props) {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || images.length < 2) return;
    setFrame((f) => (f + 1) % images.length);
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % images.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, images.length]);

  if (images.length === 0) {
    return (
      <div className="grid aspect-[3/2] w-full place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] font-display text-7xl text-[var(--color-border-strong)]">
        {name[0]}
      </div>
    );
  }

  const hasMultiple = images.length > 1;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="relative aspect-[3/2] w-full">
        {images.map((src, i) => (
          <img
            key={src}
            src={imageUrl(src)}
            alt={t(locale, "modal.imageFrameAlt", { name, number: i + 1 })}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === frame ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              setPlaying((p) => !p);
              e.currentTarget.blur();
            }}
            aria-label={playing ? t(locale, "modal.pauseAnimation") : t(locale, "modal.playAnimation")}
            className={`absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)]/70 text-[var(--color-text)] backdrop-blur transition duration-200 hover:scale-105 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:opacity-100 md:h-24 md:w-24 ${
              playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            {playing ? (
              <svg width="30" height="30" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="3" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
                <rect x="8" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
              </svg>
            ) : (
              <svg width="30" height="30" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 2l9 5-9 5V2z" fill="currentColor" />
              </svg>
            )}
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={t(locale, "modal.frame", { number: i + 1 })}
                onClick={() => {
                  setPlaying(false);
                  setFrame(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === frame ? "w-6 bg-[var(--color-accent)]" : "w-1.5 bg-[var(--color-muted)]/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
