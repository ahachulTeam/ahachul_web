export const SUPPORTED_LOCALES = ['ko', 'en', 'th', 'cn'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = 'ko';
export const LOCALE_COOKIE_KEY = 'ahhachul_locale';
export const LOCALE_HEADER_KEY = 'x-ahhachul-locale';

export const HTML_LANG_BY_LOCALE: Record<SupportedLocale, string> = {
  ko: 'ko',
  en: 'en',
  th: 'th',
  cn: 'zh-CN',
};

export function isSupportedLocale(locale: string | null | undefined): locale is SupportedLocale {
  if (!locale) return false;

  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

export function resolveLocale(locale: string | null | undefined): SupportedLocale {
  if (!locale) return DEFAULT_LOCALE;

  return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}
