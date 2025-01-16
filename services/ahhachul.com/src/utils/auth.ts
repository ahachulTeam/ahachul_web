import Cookies from 'js-cookie';

import type { IAuthState } from '@ahhachul/schemas';

export type UserCB = (user: IAuthState | null, error: any) => void;

export class Auth {
  private key;
  private user: IAuthState | null;
  private cb: UserCB | null;
  static isAuth: boolean;
  constructor() {
    this.key = 'KKE_ADMIN';
    this.user = null;
    this.cb = null;
  }

  get isAuth() {
    return !!this.user?.refreshToken;
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

  changeAccessToken(token: string) {
    const newUser = { ...this.user, accessToken: token };
    Cookies.set(this.key, JSON.stringify(newUser));
    this.setUser(newUser as IAuthState);
  }

  changeRefreshToken(token: string) {
    const newUser = { ...this.user, refreshToken: token };
    Cookies.set(this.key, JSON.stringify(newUser));
    this.setUser(newUser as IAuthState);
  }

  updatePasswordChanged(pwChanged: string) {
    const newUser = { ...this.user, passwordChanged: pwChanged };
    Cookies.set(this.key, JSON.stringify(newUser));
    this.setUser(newUser as IAuthState);
  }

  onAuthStateChanged(cb: UserCB) {
    this.cb = cb;

    this.onUserChange(this.user);

    return () => {
      this.cb = null;
    };
  }

  private onUserChange(user: IAuthState | null, error?: { message: string }) {
    this.cb && this.cb(user, error);
  }

  private setUser(user: IAuthState) {
    this.user = user;
  }

  signIn(data: IAuthState) {
    Cookies.set(this.key, JSON.stringify(data));
    this.onUserChange(data);
    this.resolveUser();
  }

  signOut() {
    Cookies.remove(this.key);
    this.onUserChange(null);
    this.user = null;
  }

  resolveUser() {
    if (window) {
      const signedInUser = Cookies.get(this.key);

      if (signedInUser) {
        this.setUser(JSON.parse(Cookies.get(this.key)!));
      }
    }

    return this;
  }
}
