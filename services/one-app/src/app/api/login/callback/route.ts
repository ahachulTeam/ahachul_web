import { NextRequest, NextResponse } from 'next/server';
import { requestSignIn } from './requestSignIn';
import { APIResponseCode } from '@/common/constants/api';
import { CookieKey } from '@/common/constants';
import { z } from 'zod';
import { ProviderType } from '@/common/constants';

const SignInQuerySchema = z.object({
  providerType: z.nativeEnum(ProviderType),
  providerCode: z.string(),
});

export async function GET(req: NextRequest) {
  // api/login/callback?type=google&code=1234&returnTo=/
  // api/login/callback?type=kakao&code=1234&returnTo=/

  const { searchParams } = new URL(req.url);
  const providerType = searchParams.get('type');
  const providerCode = searchParams.get('code');
  const returnTo = searchParams.get('returnTo') || '/';

  try {
    const parsedParams = SignInQuerySchema.parse({
      providerType,
      providerCode,
    });

    const res = await requestSignIn(parsedParams);
    const response = NextResponse.json(res);

    if (res.code === APIResponseCode.SUCCESS) {
      const { accessToken, refreshToken } = res.result;

      response.cookies.set(CookieKey.ACCESS_TOKEN, accessToken, {
        sameSite: 'lax',
      });

      response.cookies.set(CookieKey.REFRESH_TOKEN, refreshToken, {
        sameSite: 'lax',
      });
    }
  } catch (error) {
    console.error('Parameter parsing failed:', error);
  }

  return NextResponse.redirect(returnTo);
}
