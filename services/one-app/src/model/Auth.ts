export enum SocialSignInType {
  KAKAO = 'KAKAO',
  APPLE = 'APPLE',
  GOOGLE = 'GOOGLE',
}

export interface SocialLoginOption {
  social: string;
  icon: React.ElementType;
  bgColor: string;
  providerType: SocialSignInType;
}

<<<<<<< HEAD
export function isValidSocialSignInType(type: string | null): type is SocialSignInType {
  return type !== null && Object.values(SocialSignInType).includes(type as SocialSignInType);
=======
export function isValidSocialSignInType(
  type: string | null,
): type is SocialSignInType {
  return (
    type !== null &&
    Object.values(SocialSignInType).includes(type as SocialSignInType)
  );
>>>>>>> main
}

export enum CookieKey {
  ACCESS_TOKEN = 'AHAHCHUL_ACCESS_TOKEN',
  REFRESH_TOKEN = 'AHAHCHUL_REFRESH_TOKEN',
}
