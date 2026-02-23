import { APIResponseCode } from '@/types';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  'http://localhost:3000/api';

export const API_ORIGIN_URL = (() => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return API_BASE_URL;
  }
})();

export const TRAIN_REALTIME_V2_ENABLED =
  process.env.NEXT_PUBLIC_TRAIN_REALTIME_V2_ENABLED !== 'false';

export const RESPONSE_MESSAGES: Record<APIResponseCode, string> = {
  [APIResponseCode.SUCCESS]: 'SUCCESS',
  [APIResponseCode.BAD_REQUEST]: 'BAD REQUEST',
  [APIResponseCode.INTERNAL_SERVER_ERROR]: 'INTERNAL SERVER ERROR',
};
