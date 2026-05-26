import { useEffect, useState } from "react";
import { imageUrl } from "../lib/images";

type Props = {
  images: string[];
  name: string;
};

const INTERVAL_MS = 3000;

export default function ExerciseImageCarousel({ images, name }: Props) {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % images.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [images.length, paused]);

  if (images.length === 0) {
    return (
      <div className="grid aspect-square w-full place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] font-display text-7xl text-[var(--color-border-strong)]">
        {name[0]}
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-square w-full md:aspect-[4/3]">
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

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Frame ${i + 1}`}
              onClick={() => {
                setPaused(true);
                setFrame(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === frame ? "w-6 bg-[var(--color-accent)]" : "w-1.5 bg-[var(--color-muted)]/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
