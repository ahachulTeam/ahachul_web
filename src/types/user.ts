import { APILoginUser } from "@/types/auth";

export interface UserModel extends APILoginUser {
  nickname?: string | null;
  email?: string | null;
  gender?: string;
  ageRange?: string;
}

export interface VerifyNicknameModel {
  available: boolean;
}
