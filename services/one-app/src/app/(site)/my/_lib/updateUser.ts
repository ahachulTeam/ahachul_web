import { z } from 'zod';
import axios from 'axios';

import { apiClient } from '@/app/api';
import { APIResponseCode, RESPONSE_MESSAGES } from '@/common/constants/api';

const GenderSchema = z.enum(['MALE', 'FEMALE']).nullable();

const AgeRangeSchema = z
  .enum(['1', '10', '20', '30', '40', '50', '60', '70', '80', '90'])
  .nullable();

type Gender = z.infer<typeof GenderSchema>;
type AgeRange = z.infer<typeof AgeRangeSchema>;

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

export const updateUser = async (
  nickname?: string,
  gender?: Gender,
  ageRange?: AgeRange,
) => {
  try {
    const res = await apiClient.patch<UpdateUserResponse>('members', {
      nickname,
      gender,
      ageRange,
    });

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
