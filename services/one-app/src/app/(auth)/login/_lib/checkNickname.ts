import { z } from 'zod';

import { API_PATHS } from '@ahhachul/http';

import { RESPONSE_MESSAGES } from '@/constants';
import { fetchClient } from '@/lib/fetch-client';
import { APIResponseCode } from '@/types';

const CheckNicknameResponseSchema = z.object({
  code: z.literal(APIResponseCode.SUCCESS),
  message: z.literal(RESPONSE_MESSAGES[APIResponseCode.SUCCESS]),
  result: z.object({
    available: z.boolean(),
  }),
});

type CheckNicknameResponse = z.infer<typeof CheckNicknameResponseSchema>;

export async function checkNickname(nickname: string): Promise<CheckNicknameResponse> {
  const data = await fetchClient(API_PATHS.user.checkNickname, {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ nickname }),
  });

  return CheckNicknameResponseSchema.parse(data);
}
