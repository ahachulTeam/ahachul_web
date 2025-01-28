import { z } from 'zod';

import { RESPONSE_MESSAGES } from '@/constant';
import { fetchClient } from '@/lib/fetch-client';
import { APIResponseCode, type SocialSignInType } from '@/types';

const RedirectUrlResponseSchema = z.object({
  code: z.literal(APIResponseCode.SUCCESS),
  message: z.literal(RESPONSE_MESSAGES[APIResponseCode.SUCCESS]),
  result: z.object({
    redirectUrl: z.string(),
  }),
});

type RedirectUrlResponse = z.infer<typeof RedirectUrlResponseSchema>;

export async function getRedirectUrl(type: SocialSignInType): Promise<RedirectUrlResponse> {
  const { data } = await fetchClient('/auth/redirect-url', {
    method: 'GET',
    skipAuth: true,
    params: {
      providerType: type,
    },
  });

  return RedirectUrlResponseSchema.parse(data);
}
