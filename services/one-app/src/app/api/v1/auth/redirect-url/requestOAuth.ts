import { z } from 'zod';
import { apiRequest } from '@/app/api/util/apiRequest';
import { APIResponseCode, RESPONSE_MESSAGES } from '@/app/api/contant';
import { HTTPMethod } from '@/app/api/contant';

export enum ProviderType {
  KAKAO = 'KAKAO',
  GOOGLE = 'GOOGLE',
}

export const RequestOAuthSchema = z.union([
  z.object({
    code: z.literal(APIResponseCode.SUCCESS),
    message: z.literal(RESPONSE_MESSAGES[APIResponseCode.SUCCESS]),
    result: z.object({
      redirectUrl: z.string(),
    }),
  }),
  z.object({
    // 실패하면 어떻게 주는지 확인
    code: z.literal(APIResponseCode.BAD_REQUEST),
    message: z.literal(RESPONSE_MESSAGES[APIResponseCode.BAD_REQUEST]),
    result: z.null(),
  }),
]);

export async function requestOAuth(providerType: ProviderType) {
  const res = await apiRequest(
    `/auth/redirect-url?providerType=${providerType}`,
    {
      method: HTTPMethod.POST,
    },
  );

  if (!res.ok) {
    // BaseError 만들기
    throw new Error('Failed to request OAuth');
  }

  const json = await res.json();

  return RequestOAuthSchema.parse(json);
}
