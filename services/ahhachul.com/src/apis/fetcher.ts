import axios, {
  AxiosHeaders,
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import { AUTH_ALERT_MSG } from '@/constants';
import { authService } from '@/contexts';
import type { ValueOf } from '@/types';
import { TokenRefreshService } from '@/utils';
import {
  appLogger,
  createActionLogger,
  reportClientError,
  toViteClientError,
} from '@/utils/observability';

import { BASE_URL } from './baseUrl';
import { API_PREFIX } from './endpointPrefix';

type AuthErrorCode = ValueOf<typeof AUTH_ALERT_MSG>;

interface ApiErrorResponse {
  message: AuthErrorCode;
}

interface RequestTimingMeta {
  startedAt: number;
}

type TimedRequestConfig = InternalAxiosRequestConfig & {
  metadata?: RequestTimingMeta;
};

const axiosLogger = createActionLogger('axios-client');

function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function normalizePath(url: string): string {
  if (!url.startsWith('/')) {
    return `/${url}`;
  }

  return url;
}

function normalizePrefix(prefix: string): string {
  if (!prefix.length) {
    return '';
  }

  return prefix.endsWith('/') ? prefix.slice(0, -1) : prefix;
}

function isVersionedPath(path: string): boolean {
  return path.startsWith('/v1/') || path.startsWith('/v2/');
}

function resolveRequestPath(url: string | undefined): string | undefined {
  if (!url || isAbsoluteUrl(url)) {
    return url;
  }

  const normalizedPath = normalizePath(url);
  if (isVersionedPath(normalizedPath)) {
    return normalizedPath;
  }

  const prefix = normalizePrefix(API_PREFIX);
  if (!prefix.length) {
    return normalizedPath;
  }

  return `${prefix}${normalizedPath}`;
}

/**
 * HTTP 요청을 처리하고 인증을 관리하기 위한 클라이언트 클래스.
 */
class ApiClient {
  /** axios 인스턴스를 저장하기 위한 변수. */
  private instance: AxiosInstance;
  /** 토큰 갱신을 처리하기 위한 서비스 인스턴스. */
  private tokenService: TokenRefreshService;

  constructor() {
    this.tokenService = new TokenRefreshService(authService);
    this.instance = this.createAxiosInstance();
    this.setupInterceptors();
  }

  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: BASE_URL.SERVER,
    });
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      this.handleRequest.bind(this),
      this.handleRequestError.bind(this),
    );

    this.instance.interceptors.response.use(
      this.handleResponse.bind(this),
      this.handleResponseError.bind(this),
    );
  }

  /**
   * 요청을 보내기 전에 인증 헤더를 추가하기 위한 인터셉터.
   * @param config - axios 요청 설정 객체입니다.
   */
  private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    config.url = resolveRequestPath(config.url);
    (config as TimedRequestConfig).metadata = {
      startedAt: Date.now(),
    };

    const accessToken = this.tokenService.getAccessToken();
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    axiosLogger.start('request', {
      method: config.method?.toUpperCase() ?? 'GET',
      url: config.url,
      hasAccessToken: Boolean(accessToken),
    });

    return config;
  }

  private handleRequestError(error: AxiosError): Promise<never> {
    reportClientError(
      'axios:request',
      error,
      {
        method: error.config?.method,
        url: error.config?.url,
      },
      '요청을 전송하는 중 오류가 발생했습니다.',
    );
    return Promise.reject(toViteClientError(error));
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    const startedAt = (response.config as TimedRequestConfig).metadata?.startedAt ?? Date.now();
    axiosLogger.success('response', {
      method: response.config.method?.toUpperCase() ?? 'GET',
      url: response.config.url,
      status: response.status,
      durationMs: Date.now() - startedAt,
    });
    return response;
  }

  /**
   * 응답 과정에서 발생한 에러를 처리하기 위한 인터셉터.
   * 토큰 만료나 중복 로그인 등의 인증 관련 에러를 처리합니다.
   * @param error - 발생한 axios 에러 객체입니다.
   */
  private async handleResponseError(error: AxiosError<ApiErrorResponse>): Promise<unknown> {
    const { response } = error;
    const startedAt = (error.config as TimedRequestConfig | undefined)?.metadata?.startedAt;
    const durationMs = typeof startedAt === 'number' ? Date.now() - startedAt : undefined;

    if (!response) {
      reportClientError(
        'axios:response',
        error,
        {
          method: error.config?.method,
          url: error.config?.url,
          status: undefined,
          durationMs,
        },
        '네트워크 연결 상태를 확인해주세요.',
      );
      return Promise.reject(toViteClientError(error));
    }

    const errorMessage = response.data?.message;

    if (errorMessage === AUTH_ALERT_MSG.INVALID_ACCESS_TOKEN) {
      try {
        return await this.tokenService.handleTokenRefresh(error);
      } catch (refreshError) {
        reportClientError(
          'axios:refresh-token',
          refreshError,
          {
            method: error.config?.method,
            url: error.config?.url,
            status: response.status,
            durationMs,
          },
          '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
        );
        return Promise.reject(toViteClientError(refreshError));
      }
    }

    if (errorMessage === AUTH_ALERT_MSG.DUPLICATE_SIGNIN_DETECTED) {
      reportClientError(
        'axios:duplicate-signin',
        error,
        {
          method: error.config?.method,
          url: error.config?.url,
          status: response.status,
          durationMs,
        },
        AUTH_ALERT_MSG.DUPLICATE_SIGNIN_DETECTED,
      );

      if (authService.refreshToken) {
        alert(AUTH_ALERT_MSG.DUPLICATE_SIGNIN_DETECTED);
      }
      authService.logout();
      return Promise.reject(toViteClientError(error));
    }

    reportClientError(
      'axios:response',
      error,
      {
        method: error.config?.method,
        url: error.config?.url,
        status: response.status,
        durationMs,
      },
      '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    );

    if (response.status >= 500) {
      appLogger.warn('[axios] server error response detected', {
        method: error.config?.method,
        url: error.config?.url,
        status: response.status,
      });
    }

    return Promise.reject(toViteClientError(error));
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient();
export const axiosInstance = apiClient.getInstance();

export default axiosInstance;
