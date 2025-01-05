import { z } from 'zod';
import axios from 'axios';

import type { TemporaryUserAuthData } from '@/store';
import {
  API_BASE_URL,
  RESPONSE_MESSAGES,
  APIResponseCode,
} from '@/common/constants';

const GenderSchema = z.enum(['MALE', 'FEMALE']).nullable();

const AgeRangeSchema = z
  .enum(['1', '10', '20', '30', '40', '50', '60', '70', '80', '90'])
  .nullable();

const UpdateUserResponseSchema = z.object({
  code: z.literal(APIResponseCode.SUCCESS),
  message: z.literal(RESPONSE_MESSAGES[APIResponseCode.SUCCESS]),
  result: z.object({
    nickname: z.string(),
    gender: GenderSchema,
    ageRange: AgeRangeSchema,
  }),
});

type UpdateUserResponse = z.infer<typeof UpdateUserResponseSchema>;

export const updateUser = async (data: {
  nickname: string;
  auth: TemporaryUserAuthData;
}) => {
  try {
    const accessToken = data.auth.accessToken;
    const res = await axios.patch<UpdateUserResponse>(
      `${API_BASE_URL}/members`,
      { nickname: data.nickname },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return UpdateUserResponseSchema.parse(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Update user failed: ${error.response?.data?.message || error.message}`,
      );
    } else if (error instanceof z.ZodError) {
      throw new Error(
        `Validation failed: ${error.errors.map((e) => e.message).join(', ')}`,
      );
    } else {
      console.error('Unexpected error during user update:', error);
      throw new Error('An unexpected error occurred during user update.');
    }
  }
};
