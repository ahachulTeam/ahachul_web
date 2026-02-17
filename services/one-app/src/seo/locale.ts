import { toAbsoluteUrl } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';
import { SUPPORTED_LOCALES, localizePathname, type SupportedLocale } from '@/i18n';

const OPEN_GRAPH_LOCALE_BY_LOCALE: Record<SupportedLocale, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  th: 'th_TH',
  cn: 'zh_CN',
};

const LANGUAGE_TAG_BY_LOCALE: Record<SupportedLocale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  th: 'th-TH',
  cn: 'zh-CN',
};

export function getOpenGraphLocale(locale: SupportedLocale) {
  return OPEN_GRAPH_LOCALE_BY_LOCALE[locale];
}

export function getSchemaLanguage(locale: SupportedLocale) {
  return LANGUAGE_TAG_BY_LOCALE[locale];
}

export function getAlternatesLanguages(pathname: string) {
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map(locale => {
      const localizedPath = localizePathname(pathname, locale);
      const languageTag = LANGUAGE_TAG_BY_LOCALE[locale];

      return [languageTag, toAbsoluteUrl(SITE_URL, localizedPath)];
    }),
  ) as Record<string, string>;

  return {
    ...languages,
    'x-default': toAbsoluteUrl(SITE_URL, localizePathname(pathname, 'ko')),
  };
}
