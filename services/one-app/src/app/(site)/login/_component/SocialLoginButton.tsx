import React from 'react';

import { type SocialSignInType } from '@/model/Auth';

export interface SocialLoginOption {
  social: string;
  icon: React.ElementType;
  bgColor: string;
  providerType: SocialSignInType;
}

interface SocialLoginButtonProps extends SocialLoginOption {
  onLogin: () => Promise<void>;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  social,
  bgColor,
  icon: Icon,
  onLogin,
}) => (
  <button
    onClick={onLogin}
    className={`flex items-center justify-center gap-2 w-full h-[50px] rounded-md text-black ${bgColor}`}
  >
    <Icon />
    <span className="text-base font-semibold">{`${social}로 계속하기`}</span>
  </button>
);
