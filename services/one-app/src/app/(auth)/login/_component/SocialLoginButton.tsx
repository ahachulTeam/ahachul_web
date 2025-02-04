'use client';

import React from 'react';

import type { SocialLoginOption } from '@/types';

interface SocialLoginButtonProps extends SocialLoginOption {
  onLoginAction: () => Promise<void>;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  social,
  bgColor,
  icon: Icon,
  onLoginAction,
}) => (
  <button
    onClick={onLoginAction}
    className={`flex items-center justify-center gap-2 w-full h-[50px] rounded-md ${bgColor}`}
  >
    <Icon />
    <span className="text-16sb">{`${social}로 계속하기`}</span>
  </button>
);
