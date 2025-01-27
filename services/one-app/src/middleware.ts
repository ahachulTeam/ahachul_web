import { isBot } from 'next/dist/server/web/spec-extension/user-agent';
import { NextRequest, NextResponse } from 'next/server';

import { SITE_URL } from '@/constant';
import { CookieKey } from '@/model';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');
  if (!userAgent || isBot(userAgent)) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const fullPath = `${pathname}${search}`;

  const accessToken = request.cookies.get(CookieKey.ACCESS_TOKEN);
  const refreshToken = request.cookies.get(CookieKey.REFRESH_TOKEN);

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(`${SITE_URL}/login?returnTo=${encodeURIComponent(fullPath)}`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/my'], // /my 경로에만 적용
};
