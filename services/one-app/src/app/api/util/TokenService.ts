import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { CookieKey } from '@/common/constants';
import { apiClient } from '..';

export class _TokenService {
  private isFetchingAccessToken = false;
  private tokenSubscribers: Array<(accessToken: string) => void> = [];

  constructor() {}

  get isServer() {
    return typeof window === 'undefined';
  }

  get accessToken() {
    return Cookies.get(CookieKey.ACCESS_TOKEN);
  }

  get refreshToken() {
    return Cookies.get(CookieKey.REFRESH_TOKEN);
  }

  public expireSession() {
    Cookies.remove(CookieKey.ACCESS_TOKEN);
    Cookies.remove(CookieKey.REFRESH_TOKEN);
    window.location.replace('/login'); // TODO, 리다이렉트 경로 설정
  }

  public get isLoggedIn() {
    return !!this.accessToken && !!this.refreshToken;
  }

  public async renewAccessToken() {
    if (this.isFetchingAccessToken) return;

    if (!this.refreshToken) {
      throw new Error('Refresh token is missing');
    }

    try {
      this.isFetchingAccessToken = true;
      const response = await apiClient.post(`/auth/token/refresh`, {
        refreshToken: this.refreshToken,
      });
      const { accessToken, refreshToken } = response.data;

      Cookies.set(CookieKey.ACCESS_TOKEN, accessToken);
      Cookies.set(CookieKey.REFRESH_TOKEN, refreshToken);

      this.broadcastTokenUpdate(accessToken);
    } catch (error) {
      this.expireSession();
      throw error;
    } finally {
      this.isFetchingAccessToken = false;
    }
  }

  public async resetTokenAndRetryRequest(error: AxiosError): Promise<unknown> {
    if (!this.refreshToken) {
      this.expireSession();
      return Promise.reject(error);
    }

    const retryRequest = new Promise((resolve, reject) => {
      this.addSubscriber((newAccessToken: string) => {
        if (error.config) {
          error.config.headers = error.config.headers || {};
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // axios를 사용해 원래 요청을 다시 시도
          resolve(axios(error.config));
        } else {
          // config가 없으면 reject로 오류 반환
          reject(new Error('Request configuration is missing'));
        }
      });
    });

    if (!this.isFetchingAccessToken) {
      this.isFetchingAccessToken = true;
      try {
        await this.renewAccessToken();
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return retryRequest;
  }

  // 함수 주석 추가해놓기
  private broadcastTokenUpdate(newAccessToken: string) {
    this.tokenSubscribers.forEach((callback) => callback(newAccessToken));
    this.tokenSubscribers = [];
  }

  private addSubscriber(callback: (accessToken: string) => void) {
    this.tokenSubscribers.push(callback);
  }
}

export const TokenService = new _TokenService();
