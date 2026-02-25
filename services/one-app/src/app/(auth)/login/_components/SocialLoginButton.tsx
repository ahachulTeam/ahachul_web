'use client';

import React from 'react';

import type { SocialLoginOption } from '@/types';

interface SocialLoginButtonProps extends SocialLoginOption {
  label: string;
  onLoginAction: () => Promise<void>;
  disabled?: boolean;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  bgColor,
  disabled = false,
  icon: Icon,
  label,
  onLoginAction,
}) => (
  <button
    onClick={onLoginAction}
    disabled={disabled}
    className={`flex items-center justify-center gap-2 w-full h-[50px] rounded-md transition-opacity ${bgColor} ${
      disabled ? 'cursor-not-allowed opacity-60' : ''
    }`}
  >
    <Icon />
    <span className="text-16sb">{label}</span>
  </button>
);
