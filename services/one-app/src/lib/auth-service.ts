'use client';

import Cookies from 'js-cookie';

import { IS_DEV_ENV } from '@/constant';

export enum CookieKey {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

class _AuthService {
  private isRefreshing = false;
  private refreshPromise: Promise<string> | null = null;

  constructor() {}

  get accessToken() {
    return Cookies.get(CookieKey.ACCESS_TOKEN);
  }

  get refreshToken() {
    return Cookies.get(CookieKey.REFRESH_TOKEN);
  }

  setToken(accessToken: string, refreshToken: string) {
    const options = {
      path: '/',
      secure: !IS_DEV_ENV,
      sameSite: 'lax' as const,
    };

    Cookies.set(CookieKey.ACCESS_TOKEN, accessToken, options);
    Cookies.set(CookieKey.REFRESH_TOKEN, refreshToken, options);
  }

  expireSession() {
    Cookies.remove(CookieKey.ACCESS_TOKEN, { path: '/' });
    Cookies.remove(CookieKey.REFRESH_TOKEN, { path: '/' });
    window.location.replace('/login');
  }

  get isLoggedIn() {
    return !!this.accessToken && !!this.refreshToken;
  }

  async renewAccessToken(): Promise<string> {
    if (this.isRefreshing) {
      return this.refreshPromise!;
    }

    if (!this.refreshToken) {
      throw new Error('Refresh token이 없습니다.');
    }

    this.isRefreshing = true;

    try {
      this.refreshPromise = this.fetchRefreshToken();
      const newAccessToken = await this.refreshPromise;
      return newAccessToken;
    } catch (error) {
      this.expireSession();
      throw error;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private async fetchRefreshToken(): Promise<string> {
    const response = await fetch('/api/auth/token/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: this.refreshToken }),
    });

    if (!response.ok) {
      throw new Error('토큰 갱신에 실패했습니다.');
    }

    const data = await response.json();
    this.setToken(data.accessToken, data.refreshToken);
    return data.accessToken;
  }
}

export const AuthService = new _AuthService();
