'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { SocialLoginButton } from '@/app/(auth)/_component';
import { fetchRedirectUrl, socialLoginOptions } from '@/app/(main-service)/community/login/_lib';
import { APIResponseCode } from '@/constant';
import type { SocialSignInType } from '@/model';

export const SocialLogins: React.FC = () => {
  const router = useRouter();

  const handleLogin = async (socialType: SocialSignInType) => {
    try {
      const { code, result } = await fetchRedirectUrl(socialType);

      if (code !== APIResponseCode.SUCCESS) {
        // alert(RESPONSE_MESSAGES[code]);
        alert('로그인 정보를 불러오는데 실패했어요. (서버)');
        return;
      }
      router.push(result.redirectUrl);
    } catch (error) {
      alert('로그인 정보를 불러오는데 실패했어요. (unknown)');
    }
  };

  return socialLoginOptions.map(option => (
    <SocialLoginButton
      key={option.social}
      {...option}
      onLogin={() => handleLogin(option.providerType)}
    />
  ));
};
