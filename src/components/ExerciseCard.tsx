import type { Exercise } from "../lib/types";
import { imageUrl } from "../lib/images";
import { titleCase } from "../lib/facets";

type Props = {
  exercise: Exercise;
};

export default function ExerciseCard({ exercise }: Props) {
  const first = exercise.images[0];
  const primary = exercise.primaryMuscles[0];

  return (
    <a
      href={`/exercise/${exercise.id}`}
      className="group flex overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition hover:border-[var(--color-accent)]/60 hover:shadow-[0_0_0_1px_rgba(195,255,54,0.18)] focus:outline-none focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40 sm:aspect-[4/5] sm:flex-col"
    >
      <div className="relative h-32 w-32 shrink-0 overflow-hidden bg-[var(--color-surface-2)] sm:h-auto sm:w-full sm:flex-1">
        {first ? (
          <img
            src={imageUrl(first)}
            alt={exercise.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 sm:group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center font-display text-5xl text-[var(--color-border-strong)] sm:text-7xl">
            {exercise.name[0]}
          </div>
        )}
        <div className="absolute inset-0 hidden bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/30 to-transparent sm:block"></div>

        <div className="absolute left-2 top-2 hidden flex-wrap gap-1.5 sm:left-3 sm:top-3 sm:flex">
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

      <div className="relative flex flex-1 flex-col justify-center gap-1.5 p-4 sm:flex-none sm:justify-end">
        {primary && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {titleCase(primary)}
          </span>
        )}
        <h3 className="font-display text-xl leading-tight tracking-tight text-[var(--color-text)] sm:text-2xl">
          {exercise.name}
        </h3>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[var(--color-muted)] sm:hidden">
          <span>{titleCase(exercise.level)}</span>
          {exercise.equipment && (
            <>
              <span aria-hidden>·</span>
              <span>{titleCase(exercise.equipment)}</span>
            </>
          )}
        </div>
      </div>
    </a>
  );
}
