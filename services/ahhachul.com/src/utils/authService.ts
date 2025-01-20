import Cookies from 'js-cookie';

import { CRYPTO_SECRET_KEY } from '@/constants/auth';
import type { IAuthStore } from '@/types';

type AuthError = {
  message: string;
  code?: string;
};

type AuthStateChangeHandler = (user: IAuthStore | null, error?: AuthError) => void;

export class AuthService {
  private key;
  private user: IAuthStore | null;
  private authStateListener: AuthStateChangeHandler | null;

  constructor() {
    this.key = CRYPTO_SECRET_KEY;
    this.user = null;
    this.authStateListener = null;
  }

  get isAuthenticated() {
    return !!this.user?.accessToken;
  }

  get accessToken() {
    return this.user?.accessToken;
  }

  get refreshToken() {
    return this.user?.refreshToken;
  }

  get isAdmin() {
    return this.user?.level === 'admin';
  }

  get level() {
    return this.user?.level;
  }

  /**
   * 토큰 세트를 한 번에 업데이트하기 위한 메서드.
   * @param tokens - 업데이트할 액세스 토큰과 리프레시 토큰
   */
  signIn({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
    const newUser = {
      ...this.user,
      accessToken,
      refreshToken,
    };
    Cookies.set(this.key, JSON.stringify(newUser));
    this.setUser(newUser as IAuthStore);
  }

  /**
   * 사용자의 토큰을 업데이트하기 위한 메서드.
   * @param type - 업데이트할 토큰의 타입입니다.
   * @param token - 새로운 토큰 값입니다.
   */
  updateToken(type: 'access' | 'refresh', token: string) {
    const newUser = {
      ...this.user,
      [type === 'access' ? 'accessToken' : 'refreshToken']: token,
    };
    Cookies.set(this.key, JSON.stringify(newUser));
    this.setUser(newUser as IAuthStore);
  }

  /**
   * 인증 상태 변경을 구독하기 위한 메서드.
   * @param handler - 상태 변경 시 호출될 콜백 함수.
   */
  subscribeToAuthState(handler: AuthStateChangeHandler) {
    this.authStateListener = handler;
    this.notifyStateChange(this.user);

    return () => {
      this.authStateListener = null;
    };
  }

  private notifyStateChange(user: IAuthStore | null, error?: AuthError) {
    this.authStateListener?.(user, error);
  }

  private setUser(user: IAuthStore) {
    this.user = user;
    this.notifyStateChange(user);
  }

  /**
   * 사용자 로그인을 처리하기 위한 메서드.
   * @param data - 로그인할 사용자 정보.
   */
  login(data: IAuthStore) {
    Cookies.set(this.key, JSON.stringify(data));
    this.setUser(data);
  }

  logout() {
    Cookies.remove(this.key);
    this.user = null;
    this.notifyStateChange(null);
  }

  /**
   * 쿠키에서 사용자 정보를 불러오기 위한 메서드.
   * @returns 메서드 체이닝을 위해 현재 인스턴스를 반환합니다.
   */
  initializeUserFromCookie() {
    const signedInUser = Cookies.get(this.key);

    if (signedInUser) {
      this.setUser(JSON.parse(signedInUser));
    }

    return this;
  }
}
