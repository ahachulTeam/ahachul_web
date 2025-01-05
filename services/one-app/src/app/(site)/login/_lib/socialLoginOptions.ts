import KakaoIcon from '@/common/assets/icons/kakao';
import AppleIcon from '@/common/assets/icons/apple';
import GoogleIcon from '@/common/assets/icons/google';
import { type SocialLoginOption, SocialSignInType } from '@/model/Auth';

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
