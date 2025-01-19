import type { AuthTokens, SocialSignInType } from './auth';

export interface SignInRequestDto {
  providerCode: string;
  providerType: SocialSignInType;
}

export interface SignInResponseDto extends AuthTokens {
  memberId: number;
  isNeedAdditionalUserInfo: boolean;
}

type Gender = 'MALE' | 'FEMALE';
type AgeRange = '1' | '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90';

export interface UserProfileResponseDto {
  memberId: number;
  nickname: string;
  email?: string;
  gender?: Gender;
  ageRange?: AgeRange;
}
