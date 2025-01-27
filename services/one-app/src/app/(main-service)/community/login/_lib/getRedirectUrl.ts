import axios from 'axios';
import { z } from 'zod';

import { axiosInstance } from '@/api/axios';
import { APIResponseCode, RESPONSE_MESSAGES } from '@/constant';
import type { SocialSignInType } from '@/model';

const RedirectUrlResponseSchema = z.object({
  code: z.literal(APIResponseCode.SUCCESS),
  message: z.literal(RESPONSE_MESSAGES[APIResponseCode.SUCCESS]),
  result: z.object({
    redirectUrl: z.string(),
  }),
});

type RedirectUrlResponse = z.infer<typeof RedirectUrlResponseSchema>;

export async function fetchRedirectUrl(params: SocialSignInType): Promise<RedirectUrlResponse> {
  try {
    const response = await axiosInstance.get<RedirectUrlResponse>(
      `/auth/redirect-url?providerType=${params}`,
    );

    return RedirectUrlResponseSchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server responded with error:', error.response.data);
    } else {
      console.error('Error during sign in:', error);
    }
    throw error;
  }
}
