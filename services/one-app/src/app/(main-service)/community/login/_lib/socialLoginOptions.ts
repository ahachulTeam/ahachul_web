import { KakaoIcon, AppleIcon, GoogleIcon } from '@/asset/icon';
import { type SocialLoginOption, SocialSignInType } from '@/types';

export const socialLoginOptions: SocialLoginOption[] = [
  {
    social: 'Google',
    icon: GoogleIcon,
    bgColor: 'bg-white',
    providerType: SocialSignInType.GOOGLE,
  },
  {
    social: 'Apple',
    icon: AppleIcon,
    bgColor: 'bg-white',
    providerType: SocialSignInType.APPLE,
  },
  {
    social: 'Kakao',
    icon: KakaoIcon,
    bgColor: 'bg-[#fee500]',
    providerType: SocialSignInType.KAKAO,
  },
];
