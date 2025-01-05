import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
<<<<<<< HEAD

import { CookieKey } from '@/model';
import { apiClient } from '@/app/api';
import { IS_DEV_ENV } from '@/common/constants';
=======
import { CookieKey } from '@/model/Auth';
import { apiClient } from '../../app/api';
import { IS_DEV_ENV } from '@/common/constants/env';
>>>>>>> main

class _AuthService {
  private isFetchingAccessToken = false;
  private tokenSubscribers: Array<(accessToken: string) => void> = [];

  constructor() {}

  get accessToken() {
    return Cookies.get(CookieKey.ACCESS_TOKEN);
  }

  get refreshToken() {
    return Cookies.get(CookieKey.REFRESH_TOKEN);
  }

  setToken(accessToken: string, refreshToken: string) {
    Cookies.set(CookieKey.ACCESS_TOKEN, accessToken, {
      sameSite: 'lax', // CSRF 방지
      secure: !IS_DEV_ENV,
      path: '/', // 모든 경로에서 접근 가능하도록 설정
    });
    Cookies.set(CookieKey.REFRESH_TOKEN, refreshToken, {
      sameSite: 'lax', // CSRF 방지
      secure: !IS_DEV_ENV,
      path: '/', // 모든 경로에서 접근 가능하도록 설정
    });
  }

  expireSession() {
    Cookies.remove(CookieKey.ACCESS_TOKEN);
    Cookies.remove(CookieKey.REFRESH_TOKEN);
    window.location.replace('/login'); // TODO, 리다이렉트 경로 설정
  }

  get isLoggedIn() {
    return !!this.accessToken && !!this.refreshToken;
  }

  async renewAccessToken() {
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
      this.setToken(accessToken, refreshToken);

      this.broadcastTokenUpdate(accessToken);
    } catch (error) {
      this.expireSession();
      throw error;
    } finally {
      this.isFetchingAccessToken = false;
    }
  }

  async resetTokenAndRetryRequest(error: AxiosError): Promise<unknown> {
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

  private broadcastTokenUpdate(newAccessToken: string) {
    this.tokenSubscribers.forEach((callback) => callback(newAccessToken));
    this.tokenSubscribers = [];
  }

  private addSubscriber(callback: (accessToken: string) => void) {
    this.tokenSubscribers.push(callback);
  }
}

export const AuthService = new _AuthService();
