import { z } from 'zod';
import { apiClient } from '../../index';
import { APIResponseCode, RESPONSE_MESSAGES } from '@/common/constants/api';
import { SocialSignInType } from '@/model/Auth';

// TODO, 실패 케이스 추가
export const SignInResponseSchema = z.object({
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

export async function requestSignIn({
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

    return SignInResponseSchema.parse(res.data);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
}
