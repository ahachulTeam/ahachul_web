import { z } from 'zod';

import { RESPONSE_MESSAGES } from '@/constant';
import { fetchClient } from '@/lib/fetch-client';
import { APIResponseCode, type SocialSignInType } from '@/types';

export const LoginResponseSchema = z.object({
  code: z.literal(APIResponseCode.SUCCESS),
  message: z.literal(RESPONSE_MESSAGES[APIResponseCode.SUCCESS]),
  result: z.object({
    memberId: z.string(),
    isNeedAdditionalUserInfo: z.boolean(),
    accessToken: z.string(),
    accessTokenExpiresIn: z.number(),
    refreshToken: z.string(),
    refreshTokenExpiresIn: z.number(),
  }),
});

export async function login({ code, type }: { type: SocialSignInType; code: string }) {
  const { data } = await fetchClient(`/auth/login`, {
    skipAuth: true,
    params: {
      providerCode: code,
      providerType: type,
    },
  });

  return LoginResponseSchema.parse(data);
}
