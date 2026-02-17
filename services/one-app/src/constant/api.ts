import { APIResponseCode } from '@/types';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  'http://localhost:3000/api';

export const RESPONSE_MESSAGES: Record<APIResponseCode, string> = {
  [APIResponseCode.SUCCESS]: 'SUCCESS',
  [APIResponseCode.BAD_REQUEST]: 'BAD REQUEST',
  [APIResponseCode.INTERNAL_SERVER_ERROR]: 'INTERNAL SERVER ERROR',
};
