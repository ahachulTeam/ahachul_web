import React from 'react';

import { SocialSignInType, type SocialLoginOption } from '@/model/Auth';

interface SocialLoginButtonProps extends SocialLoginOption {
  onLogin: (social: SocialSignInType) => Promise<void>;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  social,
  bgColor,
  icon: Icon,
  providerType: socialType,
  onLogin,
}) => (
  <button
    onClick={() => onLogin(socialType)}
    className={`flex items-center justify-center gap-2 w-full h-[50px] rounded-md text-black ${bgColor}`}
  >
    <Icon />
    <span className="text-base font-semibold">{`${social}로 계속하기`}</span>
  </button>
);
