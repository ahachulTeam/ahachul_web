import { isBot } from 'next/dist/server/web/spec-extension/user-agent';
import { NextRequest, NextResponse } from 'next/server';

import { LEGACY_EXACT_REDIRECTS, LEGACY_PREFIX_REDIRECTS } from '@ahhachul/routes';

import { SITE_URL } from '@/constant';
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

  return ['/me', '/messages', '/notifications'].some(
    route => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const redirectPath = getLegacyRedirectPath(pathname);
  if (redirectPath) {
    return NextResponse.redirect(new URL(`${redirectPath}${search}`, SITE_URL), 308);
  }

  if (!requiresAuth(pathname)) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get('user-agent');
  if (!userAgent || isBot(userAgent)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(CookieKey.ACCESS_TOKEN);
  const refreshToken = request.cookies.get(CookieKey.REFRESH_TOKEN);

  if (!accessToken || !refreshToken) {
    const returnTo = `${pathname}${search}`;
    return NextResponse.redirect(`${SITE_URL}/login?returnTo=${encodeURIComponent(returnTo)}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml).*)'],
};
