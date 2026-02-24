import { isBot } from 'next/dist/server/web/spec-extension/user-agent';
import { NextRequest, NextResponse } from 'next/server';

import { LEGACY_EXACT_REDIRECTS, LEGACY_PREFIX_REDIRECTS } from '@ahhachul/routes';

import {
  LOCALE_COOKIE_KEY,
  LOCALE_HEADER_KEY,
  localizePathname,
  resolvePathLocale,
  stripLocaleFromPathname,
  type SupportedLocale,
} from '@/i18n';
import { CookieKey } from '@/types';

function getLegacyRedirectPath(pathname: string) {
  const exactTarget = LEGACY_EXACT_REDIRECTS[pathname];
  if (exactTarget) return exactTarget;

  for (const rule of LEGACY_PREFIX_REDIRECTS) {
    if (pathname.startsWith(rule.from)) {
      return pathname.replace(rule.from, rule.to);
    }
  }

  return null;
}

function requiresAuth(pathname: string) {
  if (pathname === '/user' || pathname.startsWith('/user/')) {
    return true;
  }

  const guardedPatterns = [
    /^\/lost-found\/[^/]+\/edit(?:\/|$)/,
    /^\/community\/[^/]+\/edit(?:\/|$)/,
    /^\/complaint\/[^/]+\/edit(?:\/|$)/,
    /^\/comments\/[^/]+\/(?:edit|reply)(?:\/|$)/,
  ];

  if (guardedPatterns.some(pattern => pattern.test(pathname))) {
    return true;
  }

  return ['/me', '/messages', '/notifications', '/lost-found/new'].some(
    route => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function applyLocaleCookie(response: NextResponse, locale: SupportedLocale, currentCookie: string) {
  if (currentCookie === locale) return;

  response.cookies.set(LOCALE_COOKIE_KEY, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

function withLocalePath(pathname: string, locale: SupportedLocale) {
  return localizePathname(pathname, locale);
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const localeCookie = request.cookies.get(LOCALE_COOKIE_KEY)?.value ?? '';
  const locale = resolvePathLocale(pathname, localeCookie);
  const normalizedPathname = stripLocaleFromPathname(pathname);
  const hasLocalePrefix = normalizedPathname !== pathname;
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set(LOCALE_HEADER_KEY, locale);

  const redirectPath = getLegacyRedirectPath(normalizedPathname);
  if (redirectPath) {
    const localizedRedirectPath = withLocalePath(redirectPath, locale);
    const response = NextResponse.redirect(
      new URL(`${localizedRedirectPath}${search}`, request.nextUrl.origin),
      308,
    );

    applyLocaleCookie(response, locale, localeCookie);
    return response;
  }

  if (requiresAuth(normalizedPathname)) {
    const userAgent = request.headers.get('user-agent');
    if (!userAgent || isBot(userAgent)) {
      const response = hasLocalePrefix
        ? NextResponse.rewrite(
            (() => {
              const rewriteUrl = request.nextUrl.clone();
              rewriteUrl.pathname = normalizedPathname;
              return rewriteUrl;
            })(),
            { request: { headers: requestHeaders } },
          )
        : NextResponse.next({ request: { headers: requestHeaders } });

      applyLocaleCookie(response, locale, localeCookie);
      return response;
    }

    const accessToken = request.cookies.get(CookieKey.ACCESS_TOKEN);
    const refreshToken = request.cookies.get(CookieKey.REFRESH_TOKEN);

    if (!accessToken || !refreshToken) {
      const localizedPathname = withLocalePath(normalizedPathname, locale);
      const returnTo = `${localizedPathname}${search}`;
      const loginPathname = withLocalePath('/login', locale);
      const response = NextResponse.redirect(
        `${request.nextUrl.origin}${loginPathname}?returnTo=${encodeURIComponent(returnTo)}`,
      );

      applyLocaleCookie(response, locale, localeCookie);
      return response;
    }
  }

  const response = hasLocalePrefix
    ? NextResponse.rewrite(
        (() => {
          const rewriteUrl = request.nextUrl.clone();
          rewriteUrl.pathname = normalizedPathname;
          return rewriteUrl;
        })(),
        { request: { headers: requestHeaders } },
      )
    : NextResponse.next({ request: { headers: requestHeaders } });

  applyLocaleCookie(response, locale, localeCookie);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml).*)'],
};
