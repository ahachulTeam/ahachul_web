import { NextRequest, NextResponse } from 'next/server';
import { isBot } from 'next/dist/server/web/spec-extension/user-agent';
import { SITE_URL } from '@/common/constants/env';
import { AuthService } from '@/common/service/AuthService';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');
  if (!userAgent || isBot(userAgent)) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const fullPath = `${pathname}${search}`;

  if (!AuthService.accessToken || !AuthService.refreshToken) {
    return NextResponse.redirect(
      `${SITE_URL}/login?returnTo=${encodeURIComponent(fullPath)}`,
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/my'], // /my 경로에만 적용
};
