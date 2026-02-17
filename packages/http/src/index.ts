export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export interface HttpRequestOptions extends Omit<RequestInit, 'headers'> {
  headers?: HeadersInit;
  params?: QueryParams;
  skipAuth?: boolean;
  retryOnAuthError?: boolean;
}

export interface HttpClientConfig {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
  getAccessToken?: () => string | undefined;
  renewAccessToken?: () => Promise<string | undefined>;
}

export interface HttpError extends Error {
  status?: number;
  data?: unknown;
}

function toError(message: string, status?: number, data?: unknown): HttpError {
  const error = new Error(message) as HttpError;
  error.status = status;
  error.data = data;
  return error;
}

function toUrl(baseUrl: string, endpoint: string, params?: QueryParams) {
  const url = new URL(endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw toError(data?.message ?? 'API request failed.', response.status, data);
  }

  return data as T;
}

export function createHttpClient(config: HttpClientConfig) {
  const { baseUrl, defaultHeaders, getAccessToken, renewAccessToken } = config;

  return async function request<T>(endpoint: string, options: HttpRequestOptions = {}) {
    const {
      skipAuth = false,
      retryOnAuthError = true,
      params,
      headers: requestHeaders,
      ...requestOptions
    } = options;

    const url = toUrl(baseUrl, endpoint, params);
    const headers = new Headers(defaultHeaders);
    const isFormDataBody =
      typeof FormData !== 'undefined' && requestOptions.body instanceof FormData;

    if (requestHeaders) {
      new Headers(requestHeaders).forEach((value, key) => {
        headers.set(key, value);
      });
    }

    if (!headers.has('Content-Type') && !isFormDataBody) {
      headers.set('Content-Type', 'application/json');
    }

    if (!skipAuth && getAccessToken) {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
    }

    const response = await fetch(url, {
      ...requestOptions,
      headers,
    });

    if (response.status === 401 && retryOnAuthError && renewAccessToken) {
      const newAccessToken = await renewAccessToken();
      if (newAccessToken) {
        headers.set('Authorization', `Bearer ${newAccessToken}`);
        const retryResponse = await fetch(url, {
          ...requestOptions,
          headers,
        });
        return parseResponse<T>(retryResponse);
      }
    }

    return parseResponse<T>(response);
  };
}

export type { ApiServicePath } from './api-contract';
export { API_PAGE_SIZE, API_PATHS, API_SERVICE_PATHS, API_SORT } from './api-contract';
