import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { requestSignIn } from './requestSignIn';
import { CookieKey } from '@/model/Auth';
import { SocialSignInType } from '@/model/Auth';
import { SITE_URL } from '@/common/constants/env';
import { APIResponseCode } from '@/common/constants/api';

const SignInQuerySchema = z.object({
  providerType: z.nativeEnum(SocialSignInType),
  providerCode: z.string(),
});

export async function GET(req: NextRequest) {
  // api/login/callback?type=google&code=1234&returnTo=/
  // api/login/callback?type=kakao&code=1234&returnTo=/

  const { searchParams } = new URL(req.url);
  const providerType = searchParams.get('type');
  const providerCode = searchParams.get('code');
  const returnTo = searchParams.get('returnTo') || '';

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

    return NextResponse.redirect(`${SITE_URL}/${returnTo}`);
  } catch (error) {
    console.error('Error during sign in:', error);
    return NextResponse.redirect(`${SITE_URL}/login?error=true`);
  }
}
