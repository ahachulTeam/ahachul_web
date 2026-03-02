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
    className={`ah-motion-lift flex h-[54px] w-full items-center justify-center gap-2 rounded-xl border border-gray-30 px-4 transition ${bgColor} ${
      disabled ? 'cursor-not-allowed opacity-60' : 'hover:border-gray-50'
    }`}
  >
    <Icon />
    <span className="text-title-medium text-gray-100">{label}</span>
  </button>
);
