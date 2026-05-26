# AGENTS.md

## Current State

- The repo currently has no Astro scaffold or `package.json`; only docs exist until the app is generated.
- Do not invent verified scripts. After scaffolding, use `package.json` as the source of truth for commands.

## Product Constraints

- Build a one-page exercise browser: hero first, then filters/search, then exercise cards.
- Do not add extra routes or app sections unless the user asks.
- Filters should cover exercise name and muscle group at minimum; equipment, level, category, force, and mechanic are valid dataset fields.

## Stack Decisions

- Target stack is Astro v6 with React islands and Tailwind CSS.
- Use `pnpm` only; do not add npm or Yarn lockfiles.
- Keep Astro responsible for the page shell; use React only where interactivity is needed, such as filtering and card state.

## Exercise Dataset

- The dataset is Unlicense/public domain, but keep attribution in project docs.
- `force`, `mechanic`, and `equipment` can be `null`; filters and card rendering must not assume strings.
- Muscles are split into `primaryMuscles` and `secondaryMuscles`; muscle filters should consider both if the UI says it filters by muscle.

## Verification

- Once the app exists, run the real `package.json` verification scripts before finishing changes.
- Until scripts exist, verification is limited to checking docs and repository status.
