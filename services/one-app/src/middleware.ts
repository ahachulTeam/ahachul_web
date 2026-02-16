import { isBot } from 'next/dist/server/web/spec-extension/user-agent';
import { NextRequest, NextResponse } from 'next/server';

import { SITE_URL } from '@/constant';
import { CookieKey } from '@/types';

const exactLegacyRedirects: Record<string, string> = {
  '/auth/login': '/login',
  '/auth/callback': '/login/callback',
  '/auth/set-nickname': '/login/set-nickname',
  '/lostFound': '/lost-found',
  '/my': '/me',
  '/notification': '/notifications',
};

const prefixLegacyRedirects: Array<{ from: string; to: string }> = [
  { from: '/lostFound/', to: '/lost-found/' },
  { from: '/my/', to: '/me/' },
  { from: '/notification/', to: '/notifications/' },
];

function getLegacyRedirectPath(pathname: string) {
  const exactTarget = exactLegacyRedirects[pathname];
  if (exactTarget) return exactTarget;

  for (const rule of prefixLegacyRedirects) {
    if (pathname.startsWith(rule.from)) {
      return pathname.replace(rule.from, rule.to);
    }
  }

  return null;
}

function requiresAuth(pathname: string) {
  return pathname === '/me' || pathname.startsWith('/me/');
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
