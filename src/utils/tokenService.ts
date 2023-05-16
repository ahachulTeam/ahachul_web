/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
import type { GetServerSidePropsContext } from 'next';
import axios, { AxiosError } from 'axios';

import { PATH, COOKIE_KEY } from '@/constants';
import { Auth } from '@/utils/auth';
import { renewAccessToken } from '@/apis/common';

interface Fn {
  (accessToken: string): void;
}

export class TokenService {
  private _cookieKey = COOKIE_KEY;

  private _isAlreadyFetchingAccessToken = false;

  private _subscribers: Fn[] = [];

  private _auth;

  private _context = <GetServerSidePropsContext>{};

  constructor(auth: Auth) {
    this._auth = auth;
  }

  get context() {
    return this._context;
  }

  get cookieKey() {
    return this._cookieKey;
  }

  get hasCookie() {
    return !!this.context.req.cookies[this.cookieKey];
  }

  setContext = (context: GetServerSidePropsContext) => {
    this._context = context;
  };

  static isServer() {
    return typeof window === 'undefined';
  }

  async resetTokenAndReAttemptRequest(error: AxiosError): Promise<unknown> {
    try {
      const { response: errorResponse } = error;
      const refreshToken = TokenService.isServer()
        ? JSON.parse(this.context.req.cookies[this.cookieKey] ?? '')?.refreshToken
        : this._auth.refreshToken;
      if (!refreshToken && !TokenService.isServer()) {
        this.expireSession();
        return await Promise.reject(error);
      }
      const retryOriginalRequest = new Promise((resolve) => {
        this.addSubscriber((accessToken: string) => {
          errorResponse!.config.headers!.Authorization = `Bearer ${accessToken}`;
          resolve(axios(errorResponse!.config));
        });
      });

      if (!this._isAlreadyFetchingAccessToken) {
        try {
          this._isAlreadyFetchingAccessToken = true;
          const { result: { accessToken: newAccessToken, refreshToken: newRefreshToken }} =
            await renewAccessToken(refreshToken);
          if (!newAccessToken) {
            return await Promise.reject(error);
          }
          if (!TokenService.isServer()) {
            this._auth.changeAccessToken(newAccessToken);
            this._auth.changeRefreshToken(newRefreshToken);
          }
          this.onAccessTokenFetched(newAccessToken);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            this.expireSession();
            return await Promise.reject(err);
          }
        } finally {
          this._isAlreadyFetchingAccessToken = false;
        }
      }
      return await retryOriginalRequest;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  getAccessToken() {
    return this._auth.accessToken;
  }

  onAccessTokenFetched(accessToken: string) {
    this._subscribers.forEach((callback) => callback(accessToken));
    this._subscribers = [];
  }

  addSubscriber(callback: Fn) {
    this._subscribers.push(callback);
  }

  expireSession() {
    if (!TokenService.isServer()) {
      this._auth.signOut();
      window.location.replace(PATH.LOGIN);
    }
  }
}
