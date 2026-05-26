export const EN = {
  language: "English",

  meta: {
    title: "Fitness - Exercise Library",
    description:
      "Browse a public-domain library of strength, cardio, and mobility exercises.",
  },

  nav: {
    changeLanguage: "Change language",
    languageSwitcher: "Language switcher",
  },

  hero: {
    homeAria: "FORGE home",
    titleLead: "MOVE WITH",
    titleAccent: "PURPOSE.",
    description:
      "A focused exercise library. Filter by muscle, equipment, level, and category. Every movement comes with step-by-step instructions and reference imagery.",
    primaryCta: "Browse exercises",
    secondaryCta: "Filter the catalog",
    established: "EST. 2026",
  },

  filters: {
    searchPlaceholder: "Search exercises...",
    searchAria: "Search exercises by name",
    reset: "Reset",
    muscle: {
      label: "Muscle",
      all: "All muscles",
    },
    equipment: {
      label: "Equipment",
      all: "All equipment",
    },
    level: {
      label: "Level",
      all: "All levels",
    },
    category: {
      label: "Category",
      all: "All categories",
    },
  },

  browser: {
    noResultsTitle: "No exercises match those filters.",
    noResultsBody: "Try clearing one to widen the search.",
    loadMore: "Load more exercises",
    showing: "Showing {shown} of {total}",
  },

  modal: {
    close: "Close",
    level: "Level",
    equipment: "Equipment",
    category: "Category",
    force: "Force",
    mechanic: "Mechanic",
    primaryMuscles: "Primary muscles",
    secondaryMuscles: "Secondary muscles",
    instructions: "Instructions",
    playAnimation: "Play animation",
    pauseAnimation: "Pause animation",
    frame: "Frame {number}",
    imageFrameAlt: "{name} - frame {number}",
  },

  footer: {
    developedBy: "Developed by",
    copyright: "Copyright © 2026. All rights reserved.",
  },

  facets: {
    level: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      expert: "Expert",
    },
    category: {
      cardio: "Cardio",
      "olympic weightlifting": "Olympic weightlifting",
      plyometrics: "Plyometrics",
      powerlifting: "Powerlifting",
      strength: "Strength",
      stretching: "Stretching",
      strongman: "Strongman",
    },
    equipment: {
      bands: "Bands",
      barbell: "Barbell",
      "body only": "Body only",
      cable: "Cable",
      dumbbell: "Dumbbell",
      "e-z curl bar": "E-Z curl bar",
      "exercise ball": "Exercise ball",
      "foam roll": "Foam roll",
      kettlebells: "Kettlebells",
      machine: "Machine",
      "medicine ball": "Medicine ball",
      other: "Other",
    },
    force: {
      pull: "Pull",
      push: "Push",
      static: "Static",
    },
    mechanic: {
      compound: "Compound",
      isolation: "Isolation",
    },
    muscle: {
      abdominals: "Abdominals",
      abductors: "Abductors",
      adductors: "Adductors",
      biceps: "Biceps",
      calves: "Calves",
      chest: "Chest",
      forearms: "Forearms",
      glutes: "Glutes",
      hamstrings: "Hamstrings",
      lats: "Lats",
      "lower back": "Lower back",
      "middle back": "Middle back",
      neck: "Neck",
      quadriceps: "Quadriceps",
      shoulders: "Shoulders",
      traps: "Traps",
      triceps: "Triceps",
    },
  },
};

// EN is the source-of-truth shape for all locales. Other locales annotate
// themselves with `: I18nDictionary` so missing or misspelled keys are caught
// by astro check.
export type I18nDictionary = typeof EN;
