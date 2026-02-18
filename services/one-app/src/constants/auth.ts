import { KakaoIcon, AppleIcon, GoogleIcon } from '@/assets/icon';
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
    bgColor: 'bg-social-kakao',
    providerType: SocialSignInType.KAKAO,
  },
];
