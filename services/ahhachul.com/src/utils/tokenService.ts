import axios, { AxiosError } from 'axios';

import * as api from '@/apis/request/token';
import { AUTH_ALERT_MSG, PATH } from '@/constants';
import type { ValueOf } from '@/types';

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
    if (!response) throw error;

    const refreshToken = this.authService.refreshToken;
    if (!refreshToken) {
      return this.handleSessionExpiration();
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
        const { result } = await this.refreshTokens(refreshToken);
        if (!result.accessToken) throw error;

        this.authService.updateToken('access', result.accessToken);
        this.authService.updateToken('refresh', result.refreshToken);
<<<<<<< HEAD

        this.notifySubscribers(result.accessToken);
      } catch (error) {
=======
        this.notifySubscribers(result.accessToken);
      } catch (error) {
        console.log('isAuthError ?', this.isAuthError(response?.data?.message));

>>>>>>> main
        this.handleSessionExpiration();
      } finally {
        this.isRefreshing = false;
      }
    }

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
    this.refreshSubscribers.forEach(callback => callback(accessToken));
    this.refreshSubscribers = [];
  }

  /**
   * 토큰 갱신 후 재시도할 요청을 등록하기 위한 메서드.
   * @param callback - 재시도할 요청을 처리할 콜백 함수입니다.
   */
  private addRetryRequest(callback: RetryRequestCallback): void {
    this.refreshSubscribers.push(callback);
  }

  /**
   * 세션 만료 시 처리를 위한 메서드.
   */
  private handleSessionExpiration(): void {
    if (this.authService.refreshToken) {
      alert(AUTH_ALERT_MSG.SESSION_EXPIRED);
    }
    this.authService.logout();
    window.location.replace(PATH.home);
  }
}
