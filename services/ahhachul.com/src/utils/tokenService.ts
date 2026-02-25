import axios, { AxiosError } from 'axios';

import * as api from '@/apis/request/token';
import { AUTH_ALERT_MSG, PATH } from '@/constants';
import type { ValueOf } from '@/types';
import { createActionLogger } from '@/utils/observability';

import { AuthService } from './authService';

interface RetryRequestCallback {
  (accessToken: string): Promise<any>;
}

interface TokenRefreshResponse {
  result: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ErrorResponse {
  message: ValueOf<typeof AUTH_ALERT_MSG>;
}

export class TokenRefreshService {
  private isRefreshing = false;
  private refreshSubscribers: RetryRequestCallback[] = [];
  private authService: AuthService;
  private readonly logger = createActionLogger('token-refresh-service');

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * 토큰 만료 시 갱신 및 요청 재시도를 처리하기 위한 메서드.
   * @param error - 발생한 axios 에러 객체입니다.
   * @returns 재시도된 요청의 Promise를 반환합니다.
   */
  async handleTokenRefresh(error: AxiosError<ErrorResponse>) {
    const { response } = error;
    const requestContext = {
      url: response?.config?.url,
      method: response?.config?.method,
      status: response?.status,
    };
    this.logger.start('handle-token-refresh', requestContext);

    if (!response) {
      this.logger.fail(
        'missing-error-response',
        error,
        requestContext,
        '인증 처리 중 알 수 없는 오류가 발생했습니다.',
      );
      throw error;
    }

    const refreshToken = this.authService.refreshToken;
    if (!refreshToken) {
      this.logger.warn('missing-refresh-token', requestContext);
      return this.handleSessionExpiration('missing-refresh-token');
    }

    const retryOriginalRequest = new Promise<any>(resolve => {
      this.addRetryRequest(async (accessToken: string) => {
        const updatedConfig = {
          ...response.config,
          headers: {
            ...response.config.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };
        return resolve(axios(updatedConfig));
      });
    });

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      try {
        this.logger.start('refresh-token', requestContext);
        const { result } = await this.refreshTokens(refreshToken);
        if (!result.accessToken) throw error;

        this.authService.updateToken('access', result.accessToken);
        this.authService.updateToken('refresh', result.refreshToken);

        this.notifySubscribers(result.accessToken);
        this.logger.success('refresh-token', requestContext);
      } catch (error) {
        this.logger.fail(
          'refresh-token',
          error,
          requestContext,
          '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
        );
        this.handleSessionExpiration('refresh-failed');
      } finally {
        this.isRefreshing = false;
        this.logger.info('refresh-flow-finished', requestContext);
      }
    }

    this.logger.success('handle-token-refresh', requestContext);
    return retryOriginalRequest;
  }

  getAccessToken(): string | undefined {
    return this.authService.accessToken;
  }

  /**
   * 리프레시 토큰을 사용하여 새로운 토큰을 발급받기 위한 메서드.
   * @param refreshToken - 현재 리프레시 토큰입니다.
   */
  private async refreshTokens(refreshToken: string): Promise<TokenRefreshResponse> {
    return api.renewAccessToken(refreshToken);
  }

  /**
   * 토큰 갱신 후 대기 중인 요청들을 처리하기 위한 메서드.
   * @param accessToken - 새로 발급받은 액세스 토큰입니다.
   */
  private notifySubscribers(accessToken: string): void {
    this.logger.info('notify-subscribers', { queueSize: this.refreshSubscribers.length });
    this.refreshSubscribers.forEach(callback => callback(accessToken));
    this.refreshSubscribers = [];
  }

  /**
   * 토큰 갱신 후 재시도할 요청을 등록하기 위한 메서드.
   * @param callback - 재시도할 요청을 처리할 콜백 함수입니다.
   */
  private addRetryRequest(callback: RetryRequestCallback): void {
    this.logger.info('add-retry-request', { queueSize: this.refreshSubscribers.length + 1 });
    this.refreshSubscribers.push(callback);
  }

  /**
   * 세션 만료 시 처리를 위한 메서드.
   */
  private handleSessionExpiration(reason?: string): void {
    this.logger.warn('session-expiration', {
      reason,
      hasRefreshToken: Boolean(this.authService.refreshToken),
    });
    if (this.authService.refreshToken) {
      alert(AUTH_ALERT_MSG.SESSION_EXPIRED);
    }
    this.authService.logout();
    window.location.replace(PATH.home);
  }
}
