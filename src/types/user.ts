export interface UserModel {
  userId: number;
  name: string | null;
  nickname: string | null;
  oauthNickname: string;
  email: string | null;
  profileImage: string;
  ageGroup: string;
  gender: "NONE" | "MALE" | "FEMALE";
  authProvider: "KAKAO" | "APPLE";
}
