import Cookies from 'js-cookie';

import { IToken as UserModel } from '@/src/types/authentication';

import { COOKIE_KEY } from '@/src/data/cookie';

export type UserCB = (user: UserModel | null, error: any) => void;

export class Auth {
  private key;

  private user: UserModel | null;

  private cb: UserCB | null;

  constructor() {
    this.key = COOKIE_KEY as string;
    this.user = null;
    this.cb = null;
  }

  get isAuth() {
    return !!this.user?.accessToken;
  }

  get accessToken() {
    return this.user?.accessToken;
  }

  get refreshToken() {
    return this.user?.refreshToken;
  }

  changeAccessToken(token: string) {
    const newUser = { ...this.user, accessToken: token };
    Cookies.set(this.key, JSON.stringify(newUser));
    this.setUser(newUser as UserModel);
  }

  changeRefreshToken(token: string) {
    const newUser = { ...this.user, refreshToken: token };
    Cookies.set(this.key, JSON.stringify(newUser));
    this.setUser(newUser as UserModel);
  }

  onAuthStateChanged(cb: UserCB) {
    this.cb = cb;
    this.onUserChange(this.user);

    return () => {
      this.cb = null;
    };
  }

  private onUserChange(user: UserModel | null, error?: { message: string }) {
    if (this.cb) {
      this.cb(user, error);
    }
  }

  private setUser(user: UserModel) {
    this.user = user;
  }

  signIn(data: UserModel) {
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
