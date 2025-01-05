import React from 'react';

<<<<<<< HEAD
import type { SocialLoginOption } from '@/model/Auth';
=======
import { type SocialSignInType } from '@/model/Auth';

export interface SocialLoginOption {
  social: string;
  icon: React.ElementType;
  bgColor: string;
  providerType: SocialSignInType;
}
>>>>>>> main

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
<<<<<<< HEAD
    className={`flex items-center justify-center gap-2 w-full h-[50px] rounded-md ${bgColor}`}
  >
    <Icon />
    <span className="text-16sb">{`${social}로 계속하기`}</span>
=======
    className={`flex items-center justify-center gap-2 w-full h-[50px] rounded-md text-black ${bgColor}`}
  >
    <Icon />
    <span className="text-base font-semibold">{`${social}로 계속하기`}</span>
>>>>>>> main
  </button>
);
