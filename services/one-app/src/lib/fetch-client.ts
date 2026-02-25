import { createHttpClient, type HttpRequestOptions } from '@ahhachul/http';

import { API_BASE_URL } from '@/constants';
import type { ObjectQueryParams } from '@/types';

import { AuthService } from './auth-service';
import { reportClientError, toOneAppClientError } from './observability';

interface FetchOptions extends HttpRequestOptions {
  params?: ObjectQueryParams;
}

const request = createHttpClient({
  baseUrl: API_BASE_URL,
  getAccessToken: () => AuthService.accessToken,
  renewAccessToken: () => AuthService.renewAccessToken(),
});

export async function fetchClient<T = unknown>(endpoint: string, options: FetchOptions = {}) {
  try {
    return await request<T>(endpoint, options);
  } catch (error) {
    reportClientError(
      'fetch-client',
      error,
      {
        endpoint,
        method: options.method ?? 'GET',
      },
      '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    );
    throw toOneAppClientError(error);
  }
}
