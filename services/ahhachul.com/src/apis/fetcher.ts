import { RequestGetError } from '@/errors';
import type { Body, Method, ObjectQueryParams } from '@/types';
import { objectToQueryString } from '@/utils';

type ErrorInfo = {
  errorCode: string;
  message: string;
};

/**
 * fetch의 2번째 인자로 들어가는 데이터의 타입은 RequestInit으로 기본적으로 제공됩니다.
 * 다만 이 RequestInit의 타입이 method가 optional이라서 이를 반드시 받도록하기 위해 RequestInitWithMethod라는 타입으로 확장하게 되었습니다.
 */
type RequestInitWithMethod = Omit<RequestInit, 'method'> & { method: Method };

type HeadersType = [string, string][] | Record<string, string> | Headers;

type RequestProps = {
  baseUrl?: string;
  endpoint: string;
  headers?: HeadersType;
  body?: Body;
  queryParams?: ObjectQueryParams;
  method: Method;
};

type CreateRequestInitProps = {
  body?: Body;
  method: Method;
  headers?: HeadersType;
};

type RequestMethodProps = Omit<RequestProps, 'method'>;

type FetchType = {
  url: string;
  requestInit: RequestInitWithMethod;
};

const API_BASE_URL = '';

export const requestGet = async <T>({ headers = {}, ...args }: RequestMethodProps): Promise<T> => {
  const response = await request({
    ...args,
    method: 'GET',
    headers,
  });

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const data: T = await response!.json();
  return data;
};

const prepareRequest = ({
  baseUrl = API_BASE_URL,
  method,
  endpoint,
  headers,
  body,
  queryParams,
}: RequestProps) => {
  let url = `${baseUrl}${endpoint}`;

  // biome-ignore lint/style/useBlockStatements: <explanation>
  if (queryParams) url += `?${objectToQueryString(queryParams)}`;

  const requestInit = createRequestInit({ method, headers, body });

  return { url, requestInit };
};

const createRequestInit = ({ method, headers, body }: CreateRequestInitProps) => {
  const defaultHeaders = {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
  };

  const requestInit: RequestInitWithMethod = {
    credentials: 'include',
    method,
  };

  if (body instanceof FormData) {
    return { ...requestInit, body };
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    return {
      ...defaultHeaders,
      ...requestInit,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : null,
    };
  }
};

const executeRequest = async ({ url, requestInit }: FetchType) => {
  try {
    const response: Response = await fetch(url, requestInit);

    if (!response.ok) {
      throw await createError({
        response,
        body: requestInit.body ? JSON.stringify(requestInit.body) : null,
        requestInit,
      });
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw error;
  }
};

const request = async (props: RequestProps) => {
  const { url, requestInit } = prepareRequest(props);
  return executeRequest({
    url,
    requestInit,
  });
};

type CreateError = {
  response: Response;
  body: Body;
  requestInit: RequestInitWithMethod;
};

const createError = async ({ response, body, requestInit }: CreateError) => {
  const { errorCode, message }: ErrorInfo = await response.json();

  if (requestInit.method === 'GET') {
    return new RequestGetError({
      status: response.status,
      requestBody: body,
      endpoint: response.url,
      name: errorCode,
      method: requestInit.method,
      message,
      errorCode,
    });
  }
};
