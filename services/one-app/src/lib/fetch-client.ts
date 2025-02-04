import type { ObjectQueryParams } from '@/types';

import { AuthService } from './auth-service';

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
  params?: ObjectQueryParams;
}

interface APIError extends Error {
  status?: number;
  data?: any;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchClient(endpoint: string, options: FetchOptions = {}) {
  const { skipAuth = false, params, ...fetchOptions } = options;

  const url = new URL(endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const headers = new Headers(fetchOptions.headers);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (!skipAuth && AuthService.accessToken) {
    headers.set('Authorization', `Bearer ${AuthService.accessToken}`);
  }

  const config: RequestInit = {
    ...fetchOptions,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // 401 에러 처리 (토큰 만료)
    if (response.status === 401) {
      const newToken = await AuthService.renewAccessToken();
      if (newToken) {
        headers.set('Authorization', `Bearer ${newToken}`);
        const retryResponse = await fetch(url, {
          ...config,
          headers,
        });
        return handleResponse(retryResponse);
      }
    }

    return handleResponse(response);
  } catch (error) {
    const apiError = new Error(
      error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    ) as APIError;

    if (error instanceof Response) {
      apiError.status = error.status;
      try {
        apiError.data = await error.json();
      } catch {
        apiError.data = null;
      }
    }

    console.error('Fetch error:', apiError);
    throw apiError;
  }
}

async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'API 요청 중 오류가 발생했습니다.') as APIError;
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
