import { z } from 'zod';

import { apiClient } from '@/app/api';
import { SocialSignInType } from '@/model/Auth';
import { APIResponseCode, RESPONSE_MESSAGES } from '@/common/constants/api';

const RedirectUrlResponseSchema = z.object({
  code: z.literal(APIResponseCode.SUCCESS),
  message: z.literal(RESPONSE_MESSAGES[APIResponseCode.SUCCESS]),
  result: z.object({
    redirectUrl: z.string(),
  }),
});

type RedirectUrlResponse = z.infer<typeof RedirectUrlResponseSchema>;

export async function getRedirectUrl(
  params: SocialSignInType,
): Promise<RedirectUrlResponse> {
  try {
    const response = await apiClient.get<RedirectUrlResponse>(
      `/auth/redirect-url?providerType=${params}`,
    );

    return RedirectUrlResponseSchema.parse(response.data);
  } catch (error) {
    console.error('Error fetching redirect URL:', error);
    throw error;
  }
}
