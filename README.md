# Fitness App

A single-page fitness exercise browser. The homepage has a dark hero, a sticky
filter/search bar, and a grid of exercise cards. Clicking a card opens a modal
with the full instructions and an auto-cycling image carousel.

## Stack

- **Astro v6** — page shell and static rendering
- **React 19** — single interactive island (filters + grid + modal)
- **Tailwind CSS v4** — styling via the `@tailwindcss/vite` plugin
- **pnpm** — package manager (do not add npm/yarn lockfiles)

## Product Scope

- One homepage only.
- Hero section at the top.
- Filter exercises by name, muscle group, equipment, level, or category.
- Show exercise cards with the exercise name, muscle groups,
  equipment/level/category, instructions, and exercise images.

## Exercise Data

- `src/data/exercises.json` — combined dataset (873 exercises)
- `public/exercises/` — image tree, served at `/exercises/<Slug>/<n>.jpg`

Each exercise has `id`, `name`, `force`, `level`, `mechanic`, `equipment`,
`primaryMuscles`, `secondaryMuscles`, `instructions`, `category`, and
`images`. `force`, `mechanic`, and `equipment` can be `null`; the UI and
filters handle that.

The collection is loaded with Astro's built-in
[`file()` loader](https://docs.astro.build/en/guides/content-collections/#the-file-loader)
in `src/content.config.ts`. Local image URLs are produced by
`src/lib/images.ts`:

```ts
export const imageUrl = (path: string) => `/exercises/${path}`;
```

## Development

```sh
pnpm install         # install dependencies
pnpm dev             # start the dev server on http://localhost:4321
pnpm build           # build the static site to ./dist
pnpm preview         # serve the production build locally
pnpm check           # type-check (astro check)
```
