export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export const LANG_LABELS = {
  en: "English",
  es: "Español",
} satisfies Readonly<Record<Lang, string>>;
