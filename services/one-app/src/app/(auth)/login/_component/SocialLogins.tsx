'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { SocialLoginButton } from '@/app/(auth)/login/_component';
import { socialLoginOptions } from '@/constant';
import { APIResponseCode, type SocialSignInType } from '@/types';

import { getRedirectUrl } from '../_lib/getRedirectUrl';

type SocialLoginsProps = {
  continueWithProviderTemplate: string;
  unknownErrorMessage: string;
};

export const SocialLogins: React.FC<SocialLoginsProps> = ({
  continueWithProviderTemplate,
  unknownErrorMessage,
}) => {
  const router = useRouter();

  const handleLogin = async (socialType: SocialSignInType) => {
    try {
      const { code, result } = await getRedirectUrl(socialType);

      if (code !== APIResponseCode.SUCCESS) {
        alert(unknownErrorMessage);
        return;
      }
      router.push(result.redirectUrl);
    } catch {
      alert(unknownErrorMessage);
    }
  };

  return socialLoginOptions.map(option => (
    <SocialLoginButton
      key={option.social}
      {...option}
      label={continueWithProviderTemplate.replace('{provider}', option.social)}
      onLoginAction={() => handleLogin(option.providerType)}
    />
  ));
};
