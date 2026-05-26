import { useEffect, useRef } from "react";
import type { Exercise } from "../../lib/types";
import type { FacetGroup, Locale } from "../../i18n/utils";
import { formatFacet, t } from "../../i18n/utils";
import ExerciseImageCarousel from "./ExerciseImageCarousel";

type Props = {
  exercise: Exercise | null;
  onClose: () => void;
  locale: Locale;
};

type ModalTag = {
  label: string;
  group: FacetGroup;
  value: string;
};

export default function ExerciseModal({ exercise, onClose, locale }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (exercise && !dialog.open) dialog.showModal();
    if (!exercise && dialog.open) dialog.close();
  }, [exercise]);

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

  const tags: ModalTag[] = [];
  if (exercise) {
    tags.push({ label: t(locale, "modal.level"), group: "level", value: exercise.level });
    if (exercise.equipment) {
      tags.push({ label: t(locale, "modal.equipment"), group: "equipment", value: exercise.equipment });
    }
    tags.push({ label: t(locale, "modal.category"), group: "category", value: exercise.category });
    if (exercise.force) {
      tags.push({ label: t(locale, "modal.force"), group: "force", value: exercise.force });
    }
    if (exercise.mechanic) {
      tags.push({ label: t(locale, "modal.mechanic"), group: "mechanic", value: exercise.mechanic });
    }
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="exercise-modal-title"
      className="m-0 h-dvh w-screen md:h-auto md:w-auto"
    >
      {exercise && (
        <div
          className="no-scrollbar relative mx-auto h-dvh w-full max-w-5xl overflow-y-auto bg-[var(--color-surface)] md:my-10 md:h-auto md:max-h-[90vh] md:rounded-3xl md:border md:border-[var(--color-border)]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={t(locale, "modal.close")}
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)]/70 text-[var(--color-muted)] backdrop-blur transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <div className="grid grid-cols-1 gap-6 p-5 pt-16 md:p-8 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-8">
            <ExerciseImageCarousel images={exercise.images} name={exercise.name} locale={locale} />

            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  {formatFacet(locale, "category", exercise.category)}
                </span>
                <h2
                  id="exercise-modal-title"
                  className="mt-2 font-display text-3xl leading-[0.95] tracking-tight md:text-5xl"
                >
                  {exercise.name}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 text-xs"
                    >
                    <span className="text-[var(--color-muted)]">{tag.label}</span>
                    <span className="text-[var(--color-text)]">{formatFacet(locale, tag.group, tag.value)}</span>
                  </span>
                ))}
              </div>

              <MuscleGroup label={t(locale, "modal.primaryMuscles")} muscles={exercise.primaryMuscles} locale={locale} accent />
              {exercise.secondaryMuscles.length > 0 && (
                <MuscleGroup label={t(locale, "modal.secondaryMuscles")} muscles={exercise.secondaryMuscles} locale={locale} />
              )}
            </div>
          </div>

          <section className="px-5 pb-10 md:px-8 md:pb-12">
            <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
              {t(locale, "modal.instructions")}
            </h3>
            <ol className="space-y-3 md:max-w-3xl">
              {exercise.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text)] md:text-base">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[var(--color-border-strong)] font-display text-xs text-[var(--color-accent)]">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}
    </dialog>
  );
}

function MuscleGroup({
  label,
  muscles,
  locale,
  accent = false,
}: {
  label: string;
  muscles: string[];
  locale: Locale;
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
            {formatFacet(locale, "muscle", m)}
          </span>
        ))}
      </div>
    </div>
  );
}
