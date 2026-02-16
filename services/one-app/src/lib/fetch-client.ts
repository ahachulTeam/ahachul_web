import { createHttpClient, type HttpRequestOptions } from '@ahhachul/http';

import type { ObjectQueryParams } from '@/types';

import { AuthService } from './auth-service';

interface FetchOptions extends HttpRequestOptions {
  params?: ObjectQueryParams;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  'http://localhost:3000/api';

const request = createHttpClient({
  baseUrl: BASE_URL,
  getAccessToken: () => AuthService.accessToken,
  renewAccessToken: () => AuthService.renewAccessToken(),
});

export async function fetchClient<T = unknown>(endpoint: string, options: FetchOptions = {}) {
  return request<T>(endpoint, options);
}
