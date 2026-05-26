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
import ExerciseModal from "./ExerciseModal";

type Props = {
  exercises: Exercise[];
};

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
  const [selected, setSelected] = useState<Exercise | null>(null);

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

  const reset = () => {
    setQuery("");
    setMuscle(null);
    setEquipment(null);
    setLevel(null);
    setCategory(null);
  };

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
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((e) => (
            <ExerciseCard key={e.id} exercise={e} onSelect={setSelected} />
          ))}
        </div>
      )}

      <ExerciseModal exercise={selected} onClose={() => setSelected(null)} />
    </>
  );
}
