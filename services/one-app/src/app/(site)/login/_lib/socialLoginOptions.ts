<<<<<<< HEAD
import { KakaoIcon, AppleIcon, GoogleIcon } from '@/common/assets/icons';
import { type SocialLoginOption, SocialSignInType } from '@/model';
=======
import { type SocialLoginOption, SocialSignInType } from '@/model';
import { KakaoIcon, AppleIcon, GoogleIcon } from '@/common/assets/icons';
>>>>>>> develop

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
