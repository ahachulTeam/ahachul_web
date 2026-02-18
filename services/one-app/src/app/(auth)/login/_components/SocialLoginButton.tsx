'use client';

import React from 'react';

import type { SocialLoginOption } from '@/types';

interface SocialLoginButtonProps extends SocialLoginOption {
  label: string;
  onLoginAction: () => Promise<void>;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  bgColor,
  icon: Icon,
  label,
  onLoginAction,
}) => (
  <button
    onClick={onLoginAction}
    className={`flex items-center justify-center gap-2 w-full h-[50px] rounded-md ${bgColor}`}
  >
    <Icon />
    <span className="text-16sb">{label}</span>
  </button>
);
