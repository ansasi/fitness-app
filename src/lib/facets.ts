import type { Exercise } from "./types";

const sortAlpha = (arr: string[]) => [...arr].sort((a, b) => a.localeCompare(b));

export const uniqueMuscles = (exercises: Exercise[]) => {
  const set = new Set<string>();
  for (const e of exercises) {
    for (const m of e.primaryMuscles) set.add(m);
    for (const m of e.secondaryMuscles) set.add(m);
  }
  return sortAlpha([...set]);
};

const uniqueNullable = (exercises: Exercise[], key: "equipment" | "force" | "mechanic") => {
  const set = new Set<string>();
  for (const e of exercises) {
    const v = e[key];
    if (v) set.add(v);
  }
  return sortAlpha([...set]);
};

export const uniqueEquipment = (exercises: Exercise[]) => uniqueNullable(exercises, "equipment");

export const uniqueLevels = (exercises: Exercise[]) => {
  const order = ["beginner", "intermediate", "expert"];
  const set = new Set<string>();
  for (const e of exercises) set.add(e.level);
  return [...set].sort((a, b) => order.indexOf(a) - order.indexOf(b));
};

export const uniqueCategories = (exercises: Exercise[]) => {
  const set = new Set<string>();
  for (const e of exercises) set.add(e.category);
  return sortAlpha([...set]);
};

export const titleCase = (s: string) =>
  s.replace(/\b\w/g, (c) => c.toUpperCase());
