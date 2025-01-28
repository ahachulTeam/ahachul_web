import { SocialSignInType } from '@/types';

export function isValidSocialSignInType(type: string | null): type is SocialSignInType {
  return type !== null && Object.values(SocialSignInType).includes(type as SocialSignInType);
}
