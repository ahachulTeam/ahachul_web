import { z } from 'zod';
import axios from 'axios';

import { apiClient } from '@/app/api';
import { sleep } from '@/common/utils';
import { APIResponseCode, RESPONSE_MESSAGES } from '@/common/constants/api';

const CheckNicknameResponseSchema = z.object({
  code: z.literal(APIResponseCode.SUCCESS),
  message: z.literal(RESPONSE_MESSAGES[APIResponseCode.SUCCESS]),
  result: z.object({
    available: z.boolean(),
  }),
});

type CheckNicknameResponse = z.infer<typeof CheckNicknameResponseSchema>;

export const checkNickname = async (nickname: string) => {
  try {
    const [res] = await Promise.all([
      apiClient.post<CheckNicknameResponse>('members/check-nickname', {
        nickname,
      }),
      sleep(300),
    ]);

    return CheckNicknameResponseSchema.parse(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios 오류 처리
      throw new Error(
        `Sign in failed: ${error.response?.data?.message || error.message}`,
      );
    } else if (error instanceof z.ZodError) {
      // Zod 오류 처리
      throw new Error(
        `Validation failed: ${error.errors.map((e) => e.message).join(', ')}`,
      );
    } else {
      // 기타 오류 처리
      console.error('Unexpected error during sign in:', error);
      throw new Error('An unexpected error occurred during sign in.');
    }
  }
};
