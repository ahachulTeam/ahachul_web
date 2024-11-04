import { type SocialLoginOption, SocialSignInType } from '@/model/Auth';
import KakaoIcon from '@/common/assets/icons/kakao';
import AppleIcon from '@/common/assets/icons/apple';
import GoogleIcon from '@/common/assets/icons/google';

export const socialLoginOptions: SocialLoginOption[] = [
  {
    name: 'Google',
    icon: GoogleIcon,
    bgColor: 'bg-white',
    providerType: SocialSignInType.GOOGLE,
  },
  {
    name: 'Apple',
    icon: AppleIcon,
    bgColor: 'bg-white',
    providerType: SocialSignInType.APPLE,
  },
  {
    name: 'Kakao',
    icon: KakaoIcon,
    bgColor: 'bg-[#fee500]',
    providerType: SocialSignInType.KAKAO,
  },
];
