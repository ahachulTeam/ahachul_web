// import Cookies from "js-cookie";

// import { UserModel } from "@/types/user";

// import { COOKIE_KEY } from "@/constants";

// export type UserCB = (user: UserModel | null, error: any) => void;

// export class Auth {
//   private key;

//   private user: UserModel | null;

//   private cb: UserCB | null;

//   constructor() {
//     this.key = COOKIE_KEY;
//     this.user = null;
//     this.cb = null;
//   }

//   get isAuth() {
//     return !!this.user?.refreshToken;
//   }

//   get accessToken() {
//     return this.user?.accessToken;
//   }

//   get refreshToken() {
//     return this.user?.refreshToken;
//   }

//   get hasBusinessInfo() {
//     return this.user?.hasBusinessInfo;
//   }

//   changeProfile(
//     name: UserModel["name"],
//     profile: UserModel["profile"],
//     profileS3Url?: UserModel["profileS3Url"]
//   ) {
//     if (this.user) {
//       const newUser = { ...this.user, name, profile, ...(profileS3Url && { profileS3Url }) };
//       if (!profile) {
//         newUser.profileS3Url = undefined;
//       }
//       Cookies.set(this.key, JSON.stringify(newUser));
//       this.setUser(newUser);
//       this.onUserChange(newUser);
//     }
//   }

//   changeHasBusinessInfo() {
//     if (!this.user) return;

//     const newUser = { ...this.user, hasBusinessInfo: true };
//     Cookies.set(this.key, JSON.stringify(newUser));
//     this.setUser(newUser);
//     this.onUserChange(newUser);
//   }

//   changeAccessToken(token: string) {
//     const newUser = { ...this.user, accessToken: token };
//     Cookies.set(this.key, JSON.stringify(newUser));
//     this.setUser(newUser as UserModel);
//   }

//   changeRefreshToken(token: string) {
//     const newUser = { ...this.user, refreshToken: token };
//     Cookies.set(this.key, JSON.stringify(newUser));
//     this.setUser(newUser as UserModel);
//   }

//   onAuthStateChanged(cb: UserCB) {
//     this.cb = cb;
//     this.onUserChange(this.user);

//     return () => {
//       this.cb = null;
//     };
//   }

//   private onUserChange(user: UserModel | null, error?: { message: string }) {
//     if (this.cb) {
//       this.cb(user, error);
//     }
//   }

//   private setUser(user: UserModel) {
//     this.user = user;
//   }

//   signIn(data: UserModel, isKeepLogin: boolean) {
//     Cookies.set(this.key, JSON.stringify(data), {
//       ...(isKeepLogin && { expires: 14 }),
//     });
//     this.onUserChange(data);
//     this.resolveUser();
//   }

//   signOut() {
//     Cookies.remove(this.key);
//     this.onUserChange(null);
//     this.user = null;
//   }

//   resolveUser() {
//     if (window) {
//       const signedInUser = Cookies.get(this.key);

//       if (signedInUser) {
//         this.setUser(JSON.parse(Cookies.get(this.key)!));
//       }
//     }

//     return this;
//   }
// }

export {};
