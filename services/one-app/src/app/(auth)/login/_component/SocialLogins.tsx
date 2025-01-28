'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { SocialLoginButton } from '@/app/(auth)/login/_component';
import { socialLoginOptions } from '@/constant';
import { APIResponseCode, type SocialSignInType } from '@/types';

import { getRedirectUrl } from '../_lib/getRedirectUrl';

export const SocialLogins: React.FC = () => {
  const router = useRouter();

  const handleLogin = async (socialType: SocialSignInType) => {
    try {
      const { code, result } = await getRedirectUrl(socialType);

      if (code !== APIResponseCode.SUCCESS) {
        alert('알 수 없는 오류가 발생했습니다.');
        return;
      }
      router.push(result.redirectUrl);
    } catch (error) {
      alert('알 수 없는 오류가 발생했습니다.');
    }
  };

  return socialLoginOptions.map(option => (
    <SocialLoginButton
      key={option.social}
      {...option}
      onLoginAction={() => handleLogin(option.providerType)}
    />
  ));
};
