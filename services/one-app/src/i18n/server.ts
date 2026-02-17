import { cookies, headers } from 'next/headers';

import {
  LOCALE_COOKIE_KEY,
  LOCALE_HEADER_KEY,
  type SupportedLocale,
  resolveLocale,
} from './config';

export async function getServerLocale(): Promise<SupportedLocale> {
  const [requestHeaders, requestCookies] = await Promise.all([headers(), cookies()]);
  const localeFromHeader = requestHeaders.get(LOCALE_HEADER_KEY);

  if (localeFromHeader) {
    return resolveLocale(localeFromHeader);
  }

  const localeFromCookie = requestCookies.get(LOCALE_COOKIE_KEY)?.value;

  return resolveLocale(localeFromCookie);
}
