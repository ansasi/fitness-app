import { useEffect, useState } from "react";
import { imageUrl } from "../lib/images";

type Props = {
  images: string[];
  name: string;
};

const INTERVAL_MS = 2000;

export default function ExerciseImageCarousel({ images, name }: Props) {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || images.length < 2) return;
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
    <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="relative aspect-[3/2] w-full">
        {images.map((src, i) => (
          <img
            key={src}
            src={imageUrl(src)}
            alt={`${name} — frame ${i + 1}`}
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
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause animation" : "Play animation"}
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)]/70 text-[var(--color-text)] backdrop-blur transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="3" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
                <rect x="8" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 2l9 5-9 5V2z" fill="currentColor" />
              </svg>
            )}
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Frame ${i + 1}`}
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
