import { getRelativeLocaleUrl } from "astro:i18n";
import type { Locale } from "../../i18n/utils";

export function localeRoot(locale: Locale) {
  return getRelativeLocaleUrl(locale, "");
}
