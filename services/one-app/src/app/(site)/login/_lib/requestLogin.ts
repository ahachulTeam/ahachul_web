import { z } from 'zod';
import axios from 'axios';

import { apiClient } from '@/app/api';
import { APIResponseCode, RESPONSE_MESSAGES } from '@/common/constants';
import type { SocialSignInType } from '@/model';

// TODO, 실패 케이스 추가
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

export async function requestLogin({
  providerType,
  providerCode,
}: {
  providerType: SocialSignInType;
  providerCode: string;
}) {
  try {
    const res = await apiClient.post(`/auth/login`, {
      providerType,
      providerCode,
    });

    return LoginResponseSchema.parse(res.data);
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
}
