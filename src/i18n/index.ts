export { LANGS, DEFAULT_LANG, LANG_LABELS } from "./types";
export type { Lang } from "./types";
export type { I18nDictionary } from "./en";

import { EN } from "./en";
import { ES } from "./es";
import type { Lang } from "./types";
import type { I18nDictionary } from "./en";

export const I18N: Record<Lang, I18nDictionary> = {
  en: EN,
  es: ES,
};
