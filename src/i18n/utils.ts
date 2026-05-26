/**
 * Thin i18n helpers.
 *
 * Routing, URL generation, and browser-language detection are handled by
 * Astro's built-in i18n integration (configured in astro.config.mjs).
 * This module only adds:
 *   - `isLocale()` -- type-guard for locale strings
 *   - `t()` -- UI-string translation lookup (Astro doesn't ship one)
 *
 * URL generation stays in Astro components using `astro:i18n` directly.
 *
 * @see https://docs.astro.build/en/guides/internationalization/
 * @see https://docs.astro.build/en/reference/modules/astro-i18n/
 */

import {
  I18N,
  LANGS,
  DEFAULT_LANG,
  LANG_LABELS,
  type Lang,
  type I18nDictionary,
} from "./index";

// Re-export for backward compatibility (Locale -> Lang alias)
export type Locale = Lang;
export type TranslationKey = string;
export type FacetGroup = keyof I18nDictionary["facets"];
export type TranslationParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export const defaultLang = DEFAULT_LANG;
export const locales = [...LANGS];
export const languages = LANG_LABELS;

function getNestedValue(source: unknown, key: string): unknown {
  if (!key) return source;

  return key.split(".").reduce<unknown>((value, segment) => {
    if (typeof value !== "object" || value === null) return undefined;
    return (value as Record<string, unknown>)[segment];
  }, source);
}

function getLocaleDictionary(locale: Lang): I18nDictionary {
  return I18N[locale];
}

/**
 * Type-guard: check whether an unknown value is one of our supported locales.
 */
export function isLocale(value: unknown): value is Lang {
  return typeof value === "string" && LANGS.includes(value as Lang);
}

export function resolveLocale(value: unknown, fallback: Lang = DEFAULT_LANG): Lang {
  return isLocale(value) ? value : fallback;
}

export function getLocaleFromPathname(
  pathname = "",
  fallback: Lang = DEFAULT_LANG,
): Lang {
  const segment = pathname.split("/").filter(Boolean)[0];
  return resolveLocale(segment, fallback);
}

export function interpolateTranslation(
  template: string,
  params?: TranslationParams,
): string {
  if (!params) return template;

  return template.replace(/\{([A-Za-z0-9_]+)\}/g, (match, key) => {
    if (!Object.prototype.hasOwnProperty.call(params, key)) {
      return match;
    }

    const value = params[key];
    return value == null ? match : String(value);
  });
}

export function getI18nValue(locale: Lang, key: string): unknown {
  const localizedValue = getNestedValue(getLocaleDictionary(locale), key);
  if (localizedValue !== undefined) return localizedValue;

  if (locale !== DEFAULT_LANG) {
    return getNestedValue(getLocaleDictionary(DEFAULT_LANG), key);
  }

  return undefined;
}

/**
 * Look up a UI translation string using dot-path notation.
 * e.g. t("en", "hero.primaryCta") -> I18N.en.hero.primaryCta
 * Falls back to the default language, then to the raw key.
 */
export function t(
  locale: Lang,
  key: string,
  params?: TranslationParams,
): string {
  const value = getI18nValue(locale, key);
  return typeof value === "string"
    ? interpolateTranslation(value, params)
    : key;
}

const titleCase = (value: string) =>
  value.replace(/\b\w/g, (char) => char.toUpperCase());

function getFacetTranslation(
  dictionary: I18nDictionary,
  group: FacetGroup,
  value: string,
): string | undefined {
  const translations = dictionary.facets[group] as Record<string, string>;
  return translations[value];
}

export function formatFacet(
  locale: Lang,
  group: FacetGroup,
  value: string | null | undefined,
): string {
  if (!value) return "";

  const localizedValue = getFacetTranslation(I18N[locale], group, value);
  if (localizedValue) return localizedValue;

  const fallbackValue = getFacetTranslation(I18N[DEFAULT_LANG], group, value);
  return fallbackValue ?? titleCase(value);
}
