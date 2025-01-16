import axios from 'axios';

import * as api from '@/apis';
import { AUTH_ALERT_MSG } from '@/constants';
import type { KeyOf } from '@/types';

import { Auth } from './auth';

interface Fn {
  (accessToken: string): void;
}

export class TokenService {
  #isAlreadyFetchingAccessToken = false;
  #subscribers: Fn[] = [];
  #auth;
  constructor(auth: Auth) {
    this.#auth = auth;
  }

  async resetTokenAndReattemptRequest(error: any) {
    try {
      const { response: errorResponse } = error;

      const refreshToken = this.#auth.refreshToken;
      if (!refreshToken) {
        this.expireSession(errorResponse?.data.message);
        return Promise.reject(error);
      }
      const retryOriginalRequest = new Promise(resolve => {
        this.addSubscriber((accessToken: string) => {
          errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
          resolve(axios(errorResponse.config));
        });
      });
      if (!this.#isAlreadyFetchingAccessToken) {
        try {
          this.#isAlreadyFetchingAccessToken = true;
          const tokens = await api.renewAccessToken(refreshToken);
          if (!tokens.accessToken) {
            return Promise.reject(error);
          }

          this.#auth.changeAccessToken(tokens.accessToken);
          this.#auth.changeRefreshToken(tokens.refreshToken);

          this.onAccessTokenFetched(tokens.accessToken);
        } catch (err: any) {
          const { response: errorResponse } = err;

          const authErrorCode = ['INVALID_REFRESH_TOKEN', 'DUPLICATE_SIGNIN_DETECTED'];

          if (authErrorCode.includes(errorResponse?.data.message)) {
            this.expireSession(errorResponse?.data.message);
            return Promise.reject(err);
          }
        } finally {
          this.#isAlreadyFetchingAccessToken = false;
        }
      }
      return retryOriginalRequest;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  getAccessToken() {
    return this.#auth.accessToken;
  }

  onAccessTokenFetched(accessToken: string) {
    this.#subscribers.forEach(callback => callback(accessToken));
    this.#subscribers = [];
  }

  addSubscriber(callback: Fn) {
    this.#subscribers.push(callback);
  }

  expireSession(errMsg: KeyOf<typeof AUTH_ALERT_MSG>) {
    this.#auth.refreshToken && alert(AUTH_ALERT_MSG[errMsg]);
    this.#auth.signOut();
  }
}
