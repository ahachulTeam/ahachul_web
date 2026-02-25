import { createHttpClient, type HttpRequestOptions } from '@ahhachul/http';

import { API_BASE_URL } from '@/constants';
import type { ObjectQueryParams } from '@/types';

import { AuthService } from './auth-service';
import { createActionLogger, reportClientError, toOneAppClientError } from './observability';

interface FetchOptions extends HttpRequestOptions {
  params?: ObjectQueryParams;
}

const request = createHttpClient({
  baseUrl: API_BASE_URL,
  getAccessToken: () => AuthService.accessToken,
  renewAccessToken: () => AuthService.renewAccessToken(),
});
const fetchLogger = createActionLogger('fetch-client');

export async function fetchClient<T = unknown>(endpoint: string, options: FetchOptions = {}) {
  const startedAt = Date.now();
  fetchLogger.start('request', {
    endpoint,
    method: options.method ?? 'GET',
  });

  try {
    const result = await request<T>(endpoint, options);
    fetchLogger.success('request', {
      endpoint,
      method: options.method ?? 'GET',
      durationMs: Date.now() - startedAt,
    });
    return result;
  } catch (error) {
    reportClientError(
      'fetch-client',
      error,
      {
        endpoint,
        method: options.method ?? 'GET',
        durationMs: Date.now() - startedAt,
      },
      '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    );
    throw toOneAppClientError(error);
  }
}
