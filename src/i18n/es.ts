import type { I18nDictionary } from "./en";

export const ES: I18nDictionary = {
  language: "Español",

  meta: {
    title: "Fitness - Biblioteca de ejercicios",
    description:
      "Explora una biblioteca de dominio público con ejercicios de fuerza, cardio y movilidad.",
  },

  nav: {
    changeLanguage: "Cambiar idioma",
    languageSwitcher: "Selector de idioma",
  },

  hero: {
    homeAria: "Inicio de FORGE",
    titleLead: "MUÉVETE CON",
    titleAccent: "PROPÓSITO.",
    description:
      "Una biblioteca de ejercicios enfocada. Filtra por músculo, equipo, nivel y categoría. Cada movimiento incluye instrucciones paso a paso e imágenes de referencia.",
    primaryCta: "Explorar ejercicios",
    secondaryCta: "Filtrar catálogo",
    established: "EST. 2026",
  },

  filters: {
    searchPlaceholder: "Buscar ejercicios...",
    searchAria: "Buscar ejercicios por nombre",
    reset: "Restablecer",
    muscle: {
      label: "Músculo",
      all: "Todos los músculos",
    },
    equipment: {
      label: "Equipo",
      all: "Todo el equipo",
    },
    level: {
      label: "Nivel",
      all: "Todos los niveles",
    },
    category: {
      label: "Categoría",
      all: "Todas las categorías",
    },
  },

  browser: {
    noResultsTitle: "Ningún ejercicio coincide con esos filtros.",
    noResultsBody: "Prueba quitando uno para ampliar la búsqueda.",
    loadMore: "Cargar más ejercicios",
    showing: "Mostrando {shown} de {total}",
  },

  modal: {
    close: "Cerrar",
    level: "Nivel",
    equipment: "Equipo",
    category: "Categoría",
    force: "Fuerza",
    mechanic: "Mecánica",
    primaryMuscles: "Músculos principales",
    secondaryMuscles: "Músculos secundarios",
    instructions: "Instrucciones",
    playAnimation: "Reproducir animación",
    pauseAnimation: "Pausar animación",
    frame: "Fotograma {number}",
    imageFrameAlt: "{name} - fotograma {number}",
  },

  footer: {
    developedBy: "Desarrollado por",
    copyright: "Copyright © 2026. Todos los derechos reservados.",
  },

  facets: {
    level: {
      beginner: "Principiante",
      intermediate: "Intermedio",
      expert: "Experto",
    },
    category: {
      cardio: "Cardio",
      "olympic weightlifting": "Halterofilia olímpica",
      plyometrics: "Pliometría",
      powerlifting: "Powerlifting",
      strength: "Fuerza",
      stretching: "Estiramientos",
      strongman: "Strongman",
    },
    equipment: {
      bands: "Bandas",
      barbell: "Barra",
      "body only": "Peso corporal",
      cable: "Cable",
      dumbbell: "Mancuerna",
      "e-z curl bar": "Barra Z",
      "exercise ball": "Pelota de ejercicio",
      "foam roll": "Rodillo de espuma",
      kettlebells: "Kettlebells",
      machine: "Máquina",
      "medicine ball": "Balón medicinal",
      other: "Otro",
    },
    force: {
      pull: "Tirón",
      push: "Empuje",
      static: "Estático",
    },
    mechanic: {
      compound: "Compuesto",
      isolation: "Aislamiento",
    },
    muscle: {
      abdominals: "Abdominales",
      abductors: "Abductores",
      adductors: "Aductores",
      biceps: "Bíceps",
      calves: "Pantorrillas",
      chest: "Pecho",
      forearms: "Antebrazos",
      glutes: "Glúteos",
      hamstrings: "Isquiotibiales",
      lats: "Dorsales",
      "lower back": "Zona lumbar",
      "middle back": "Espalda media",
      neck: "Cuello",
      quadriceps: "Cuádriceps",
      shoulders: "Hombros",
      traps: "Trapecios",
      triceps: "Tríceps",
    },
  },
};
