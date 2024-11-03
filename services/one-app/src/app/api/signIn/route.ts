import { NextRequest, NextResponse } from 'next/server';
import { requestSignIn } from './requestSignIn';
import { APIResponseCode } from '@/constants/api';
import { CookieKey } from '@/constants';
import { z } from 'zod';
import { ProviderType } from '@/constants';

const SignInQuerySchema = z.object({
  providerType: z.nativeEnum(ProviderType),
  providerCode: z.string(),
});

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const providerType = searchParams.get('providerType');
  const providerCode = searchParams.get('providerCode');
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
