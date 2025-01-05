'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

<<<<<<< HEAD
import { SocialSignInType } from '@/model';
import { APIResponseCode } from '@/common/constants';
import { SocialLoginButton } from '@/app/(site)/login/_component';
import { getRedirectUrl, socialLoginOptions } from '@/app/(site)/login/_lib';
=======
import { SocialLoginButton } from './SocialLoginButton';
import { getRedirectUrl } from '../_lib/getRedirectUrl';
import { socialLoginOptions } from '../_lib/socialLoginOptions';
import { SocialSignInType } from '@/model/Auth';
import { APIResponseCode } from '@/common/constants/api';
>>>>>>> main

export const SocialLogins: React.FC = () => {
  const router = useRouter();

  const handleLogin = async (socialType: SocialSignInType) => {
    try {
      const { code, result } = await getRedirectUrl(socialType);

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

  return socialLoginOptions.map((option) => (
    <SocialLoginButton
      key={option.social}
      {...option}
      onLogin={() => handleLogin(option.providerType)}
    />
  ));
};
