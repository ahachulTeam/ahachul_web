import { DEFAULT_LOCALE, type SupportedLocale, isSupportedLocale, resolveLocale } from './config';

function ensurePathname(pathname: string) {
  if (!pathname || pathname === '/') return '/';
  if (pathname.startsWith('/')) return pathname;

  return `/${pathname}`;
}

export function extractLocaleFromPathname(pathname: string): {
  locale: SupportedLocale;
  pathnameWithoutLocale: string;
  hasLocalePrefix: boolean;
} {
  const normalizedPathname = ensurePathname(pathname);
  const segments = normalizedPathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (!isSupportedLocale(firstSegment)) {
    return {
      locale: DEFAULT_LOCALE,
      pathnameWithoutLocale: normalizedPathname,
      hasLocalePrefix: false,
    };
  }

  const rest = `/${segments.slice(1).join('/')}`.replace(/\/+/g, '/');

  return {
    locale: firstSegment,
    pathnameWithoutLocale: rest === '/' ? '/' : rest.replace(/\/$/, '') || '/',
    hasLocalePrefix: true,
  };
}

export function stripLocaleFromPathname(pathname: string) {
  return extractLocaleFromPathname(pathname).pathnameWithoutLocale;
}

export function localizePathname(pathname: string, locale: SupportedLocale) {
  const normalized = stripLocaleFromPathname(pathname);

  if (locale === DEFAULT_LOCALE) {
    return normalized;
  }

  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
}

export function resolvePathLocale(
  pathname: string,
  fallbackLocale: string | null | undefined,
): SupportedLocale {
  const { locale, hasLocalePrefix } = extractLocaleFromPathname(pathname);

  if (hasLocalePrefix) {
    return locale;
  }

  return resolveLocale(fallbackLocale);
}
