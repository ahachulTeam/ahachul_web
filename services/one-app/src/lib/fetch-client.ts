import { createHttpClient, type HttpRequestOptions } from '@ahhachul/http';

import { API_BASE_URL } from '@/constant';
import type { ObjectQueryParams } from '@/types';

import { AuthService } from './auth-service';

interface FetchOptions extends HttpRequestOptions {
  params?: ObjectQueryParams;
}

const request = createHttpClient({
  baseUrl: API_BASE_URL,
  getAccessToken: () => AuthService.accessToken,
  renewAccessToken: () => AuthService.renewAccessToken(),
});

export async function fetchClient<T = unknown>(endpoint: string, options: FetchOptions = {}) {
  return request<T>(endpoint, options);
}
