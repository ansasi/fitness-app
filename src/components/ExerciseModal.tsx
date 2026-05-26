import { useEffect, useRef, useState } from "react";
import type { Exercise } from "../lib/types";
import { imageUrl } from "../lib/images";
import { titleCase } from "../lib/facets";

type Props = {
  exercise: Exercise | null;
  onClose: () => void;
};

export default function ExerciseModal({ exercise, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (exercise && !dialog.open) dialog.showModal();
    if (!exercise && dialog.open) dialog.close();
    setFrame(0);
  }, [exercise]);

  useEffect(() => {
    if (!exercise || exercise.images.length < 2 || paused) return;
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % exercise.images.length);
    }, 650);
    return () => window.clearInterval(id);
  }, [exercise, paused]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    const handleBackdrop = (e: MouseEvent) => {
      if (e.target === dialog) onClose();
    };
    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("click", handleBackdrop);
    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("click", handleBackdrop);
    };
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="exercise-modal-title"
      className="m-0 h-dvh w-screen md:h-auto md:w-auto"
    >
      {exercise && (
        <div
          className="relative mx-auto flex h-dvh w-full max-w-5xl flex-col overflow-hidden bg-[var(--color-surface)] md:my-10 md:h-auto md:max-h-[90vh] md:rounded-3xl md:border md:border-[var(--color-border)]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)]/70 text-[var(--color-muted)] backdrop-blur transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <div className="grid flex-1 grid-cols-1 overflow-y-auto md:grid-cols-2 md:overflow-hidden">
            <div
              className="relative aspect-square bg-[var(--color-surface-2)] md:aspect-auto md:h-full"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {exercise.images.length > 0 ? (
                <>
                  <img
                    src={imageUrl(exercise.images[frame])}
                    alt={`${exercise.name} — frame ${frame + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {exercise.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {exercise.images.map((_, i) => (
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
                </>
              ) : (
                <div className="grid h-full place-items-center font-display text-7xl text-[var(--color-border-strong)]">
                  {exercise.name[0]}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto p-6 md:p-8">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  {titleCase(exercise.category)}
                </span>
                <h2
                  id="exercise-modal-title"
                  className="mt-2 font-display text-4xl leading-[0.95] tracking-tight md:text-5xl"
                >
                  {exercise.name}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <Tag label="Level" value={exercise.level} />
                {exercise.equipment && <Tag label="Equipment" value={exercise.equipment} />}
                {exercise.force && <Tag label="Force" value={exercise.force} />}
                {exercise.mechanic && <Tag label="Mechanic" value={exercise.mechanic} />}
              </div>

              <MuscleGroup label="Primary muscles" muscles={exercise.primaryMuscles} accent />
              {exercise.secondaryMuscles.length > 0 && (
                <MuscleGroup label="Secondary muscles" muscles={exercise.secondaryMuscles} />
              )}

              <div>
                <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  Instructions
                </h3>
                <ol className="space-y-3">
                  {exercise.instructions.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text)]">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[var(--color-border-strong)] font-display text-xs text-[var(--color-accent)]">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

function Tag({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 text-xs">
      <span className="text-[var(--color-muted)]">{label}</span>
      <span className="text-[var(--color-text)]">{titleCase(value)}</span>
    </span>
  );
}

function MuscleGroup({
  label,
  muscles,
  accent = false,
}: {
  label: string;
  muscles: string[];
  accent?: boolean;
}) {
  return (
    <div>
      <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
        {label}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {muscles.map((m) => (
          <span
            key={m}
            className={
              accent
                ? "rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-xs font-medium text-[var(--color-accent)]"
                : "rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text)]"
            }
          >
            {titleCase(m)}
          </span>
        ))}
      </div>
    </div>
  );
}
