import type { Exercise } from "../lib/types";
import { imageUrl } from "../lib/images";
import { titleCase } from "../lib/facets";

type Props = {
  exercise: Exercise;
  onSelect: (e: Exercise) => void;
};

export default function ExerciseCard({ exercise, onSelect }: Props) {
  const first = exercise.images[0];
  const primary = exercise.primaryMuscles[0];

  return (
    <button
      type="button"
      onClick={() => onSelect(exercise)}
      className="group relative flex aspect-[4/5] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-left transition hover:border-[var(--color-accent)]/60 hover:shadow-[0_0_0_1px_rgba(195,255,54,0.18)] focus:outline-none focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40"
    >
      <div className="relative flex-1 overflow-hidden bg-[var(--color-surface-2)]">
        {first ? (
          <img
            src={imageUrl(first)}
            alt={exercise.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center font-display text-7xl text-[var(--color-border-strong)]">
            {exercise.name[0]}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/30 to-transparent"></div>

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-[var(--color-bg)]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] backdrop-blur">
            {titleCase(exercise.level)}
          </span>
          {exercise.equipment && (
            <span className="rounded-full bg-[var(--color-bg)]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] backdrop-blur">
              {titleCase(exercise.equipment)}
            </span>
          )}
        </div>
      </div>

      <div className="relative p-4">
        {primary && (
          <span className="mb-2 inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {titleCase(primary)}
          </span>
        )}
        <h3 className="font-display text-2xl leading-tight tracking-tight text-[var(--color-text)]">
          {exercise.name}
        </h3>
      </div>
    </button>
  );
}
