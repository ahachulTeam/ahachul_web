'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { SocialSignInType } from '@/model/Auth';
import { getRedirectUrl } from '../_lib/getRedirectUrl';
import { socialLoginOptions } from '../_lib/socialLoginOptions';
import { SocialLoginButton } from './SocialLoginButton';

export const SocialLogins: React.FC = () => {
  const createSocialLoginQuery = (socialType: SocialSignInType) =>
    useQuery({
      enabled: false,
      staleTime: Infinity,
      queryKey: ['oauth', socialType],
      select: (res) => res.result.redirectUrl,
      queryFn: () => getRedirectUrl(socialType),
    });

  const socialQueries = Object.values(SocialSignInType).reduce(
    (acc, socialType) => {
      acc[socialType] = createSocialLoginQuery(socialType);
      return acc;
    },
    {} as Record<SocialSignInType, ReturnType<typeof createSocialLoginQuery>>,
  );

  const router = useRouter();
  const handleLogin = async (socialType: SocialSignInType) => {
    const { data: redirectUrl, isError } =
      await socialQueries[socialType].refetch();

    if (isError || !redirectUrl) {
      alert('로그인 정보를 불러오는데 실패했어요.');
      return;
    }

    router.push(redirectUrl);
  };

  return socialLoginOptions.map((option) => (
    <SocialLoginButton key={option.social} {...option} onLogin={handleLogin} />
  ));
};
