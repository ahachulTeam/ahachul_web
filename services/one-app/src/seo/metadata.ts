import { localizePathname, type SupportedLocale } from '@/i18n';

import { getAlternatesLanguages, getOpenGraphLocale } from './locale';

export function getLocalizedMetadataOptions(pathname: string, locale: SupportedLocale) {
  return {
    pathname: localizePathname(pathname, locale),
    locale: getOpenGraphLocale(locale),
    alternatesLanguages: getAlternatesLanguages(pathname),
  };
}
