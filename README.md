# Fitness App

A single-page fitness exercise browser. The homepage will show a hero section, a filter/search area, and exercise cards with images and instructions.

## Planned Stack

- Astro v6
- React for interactive UI islands
- Tailwind CSS for styling
- pnpm for package management

This repository is currently documentation-only; the Astro app has not been scaffolded yet.

## Product Scope

- One homepage only.
- Hero section at the top.
- Filter exercises by name, muscle group, equipment, level, category, or related exercise metadata.
- Show exercise cards with the exercise name, muscle groups, equipment/level/category, instructions, and exercise images.

## Exercise Data

Use the public domain dataset from `yuhonas/free-exercise-db`:

- Repository: https://github.com/yuhonas/free-exercise-db
- Combined JSON: https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json
- Image base URL: `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/`
- License: Unlicense / public domain

Each exercise includes fields such as:

- `id` and `name`
- `force`, `level`, `mechanic`, `equipment`
- `primaryMuscles` and `secondaryMuscles`
- `instructions`
- `category`
- `images`

Some source fields can be `null`, especially `force`, `mechanic`, and `equipment`; UI and filters should handle that safely.

Image paths from the dataset are relative to the exercise folder. Build hosted image URLs by prefixing the source image path:

```ts
const imageUrl = `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${imagePath}`;
```

Example: `Air_Bike/0.jpg` becomes `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Air_Bike/0.jpg`.

## Development

No developer commands are verified yet because the Astro app has not been scaffolded and `package.json` does not exist. After scaffolding, use pnpm and update this section with the real scripts from `package.json`.
