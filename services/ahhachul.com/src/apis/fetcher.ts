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
import { TokenRefreshService, type ErrorResponse } from '@/utils';

import { BASE_URL } from './baseUrl';
import { API_PREFIX } from './endpointPrefix';

type AuthErrorCode = ValueOf<typeof AUTH_ALERT_MSG>;

interface ApiErrorResponse {
  message: AuthErrorCode;
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
      baseURL: BASE_URL.SERVER + API_PREFIX,
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

    const accessToken = this.tokenService.getAccessToken();
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  }

  private handleRequestError(error: AxiosError): Promise<never> {
    return Promise.reject(error);
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  /**
   * 응답 과정에서 발생한 에러를 처리하기 위한 인터셉터.
   * 토큰 만료나 중복 로그인 등의 인증 관련 에러를 처리합니다.
   * @param error - 발생한 axios 에러 객체입니다.
   */
  private async handleResponseError(error: AxiosError<ApiErrorResponse>): Promise<unknown> {
    const { response } = error;
    if (!response) return Promise.reject(error);

    const errorMessage = response.data?.message;

    if (errorMessage === AUTH_ALERT_MSG.INVALID_ACCESS_TOKEN) {
      return this.tokenService.handleTokenRefresh(error as AxiosError<ErrorResponse>);
    }

    if (errorMessage === AUTH_ALERT_MSG.DUPLICATE_SIGNIN_DETECTED) {
      if (authService.refreshToken) {
        alert(AUTH_ALERT_MSG.DUPLICATE_SIGNIN_DETECTED);
      }
      authService.logout();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient();
export const axiosInstance = apiClient.getInstance();

export default axiosInstance;
