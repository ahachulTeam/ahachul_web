import { API_URL } from '@/contants/env';

interface ApiRequestConfig {
  accessToken?: string;
}

export async function apiRequest(
  path: string,
  init: RequestInit = {},
  configs?: ApiRequestConfig,
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((init.headers as Record<string, string>) || {}),
  };

  if (configs?.accessToken) {
    headers['Authorization'] = `Bearer ${configs.accessToken}`;
  }

  const _init: RequestInit = {
    ...init,
    headers,
    next: { revalidate: 0 },
  };

  return fetch(API_URL + path, _init);
}
