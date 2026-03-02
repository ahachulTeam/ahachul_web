'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { SocialLoginButton } from '@/app/(auth)/login/_components';
import { socialLoginOptions } from '@/constants';
import { APIResponseCode, type SocialSignInType } from '@/types';

import { getRedirectUrl } from '../_lib/getRedirectUrl';

type SocialLoginsProps = {
  continueWithProviderTemplate: string;
  initialErrorMessage: string | null;
  unknownErrorMessage: string;
};

export const SocialLogins: React.FC<SocialLoginsProps> = ({
  continueWithProviderTemplate,
  initialErrorMessage,
  unknownErrorMessage,
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(initialErrorMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setErrorMessage(initialErrorMessage);
  }, [initialErrorMessage]);

  const handleLogin = async (socialType: SocialSignInType) => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const { code, result } = await getRedirectUrl(socialType);

      if (code !== APIResponseCode.SUCCESS) {
        setErrorMessage(unknownErrorMessage);
        return;
      }
      router.push(result.redirectUrl);
    } catch {
      setErrorMessage(unknownErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {errorMessage ? (
        <p
          role="alert"
          className="mb-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-body-small leading-[1.5] text-destructive"
        >
          {errorMessage}
        </p>
      ) : null}
      {socialLoginOptions.map(option => (
        <SocialLoginButton
          key={option.social}
          {...option}
          disabled={isSubmitting}
          label={continueWithProviderTemplate.replace('{provider}', option.social)}
          onLoginAction={() => handleLogin(option.providerType)}
        />
      ))}
    </>
  );
};
