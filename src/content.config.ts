import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const exercises = defineCollection({
  loader: file("src/data/exercises.json"),
  schema: z.object({
    name: z.string(),
    force: z.string().nullable(),
    level: z.string(),
    mechanic: z.string().nullable(),
    equipment: z.string().nullable(),
    primaryMuscles: z.array(z.string()),
    secondaryMuscles: z.array(z.string()),
    instructions: z.array(z.string()),
    category: z.string(),
    images: z.array(z.string()),
  }),
});

export const collections = { exercises };
