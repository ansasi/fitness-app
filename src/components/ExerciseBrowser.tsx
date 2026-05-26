import { useEffect, useMemo, useState } from "react";
import type { Exercise } from "../lib/types";
import {
  uniqueCategories,
  uniqueEquipment,
  uniqueLevels,
  uniqueMuscles,
} from "../lib/facets";
import FilterBar from "./FilterBar";
import ExerciseCard from "./ExerciseCard";

type Props = {
  exercises: Exercise[];
};

const PAGE_SIZE = 24;

const useDebounced = <T,>(value: T, ms: number) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), ms);
    return () => window.clearTimeout(id);
  }, [value, ms]);
  return debounced;
};

export default function ExerciseBrowser({ exercises }: Props) {
  const [query, setQuery] = useState("");
  const [muscle, setMuscle] = useState<string | null>(null);
  const [equipment, setEquipment] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const debouncedQuery = useDebounced(query, 150);

  const muscles = useMemo(() => uniqueMuscles(exercises), [exercises]);
  const equipmentOptions = useMemo(() => uniqueEquipment(exercises), [exercises]);
  const levels = useMemo(() => uniqueLevels(exercises), [exercises]);
  const categories = useMemo(() => uniqueCategories(exercises), [exercises]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return exercises.filter((e) => {
      if (q && !e.name.toLowerCase().includes(q)) return false;
      if (muscle && !e.primaryMuscles.includes(muscle) && !e.secondaryMuscles.includes(muscle)) {
        return false;
      }
      if (equipment && e.equipment !== equipment) return false;
      if (level && e.level !== level) return false;
      if (category && e.category !== category) return false;
      return true;
    });
  }, [exercises, debouncedQuery, muscle, equipment, level, category]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [debouncedQuery, muscle, equipment, level, category]);

  const reset = () => {
    setQuery("");
    setMuscle(null);
    setEquipment(null);
    setLevel(null);
    setCategory(null);
  };

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;

  return (
    <>
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        muscle={muscle}
        onMuscleChange={setMuscle}
        equipment={equipment}
        onEquipmentChange={setEquipment}
        level={level}
        onLevelChange={setLevel}
        category={category}
        onCategoryChange={setCategory}
        muscles={muscles}
        equipmentOptions={equipmentOptions}
        levels={levels}
        categories={categories}
        onReset={reset}
      />

      {filtered.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-[var(--color-border-strong)] py-16 text-center">
          <p className="font-display text-2xl tracking-tight">No exercises match those filters.</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Try clearing one to widen the search.</p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((e) => (
              <ExerciseCard key={e.id} exercise={e} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Load more exercises
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="text-xs tracking-wide text-[var(--color-muted)]">
                Showing {shown.length} of {filtered.length}
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
}
