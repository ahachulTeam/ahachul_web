'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQueries } from '@tanstack/react-query';

import { getRedirectUrl } from '../_lib/getRedirectUrl';
import { socialLoginOptions } from '../_lib/socialLoginOptions';
import {
  QueryStatus,
  SocialSignInType,
  type SocialLoginOption,
} from '@/model/Auth';

interface SocialLoginButtonProps extends SocialLoginOption {
  redirectUrl?: string;
  onRetry: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  name,
  icon: Icon,
  bgColor,
  redirectUrl,
  onRetry,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      // TODO
      // showSnackbar({
      //   type: 'error',
      //   message: '로그인 정보를 불러오는데 실패했어요.',
      //   actionLabel: '다시 시도하기',
      //   onAction: onRetry,
      // });
      alert('로그인 정보를 불러오는데 실패했어요.');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 w-full h-[50px] rounded-md text-black ${bgColor}`}
    >
      <Icon />
      <span className="text-base font-semibold">{`${name}로 계속하기`}</span>
    </button>
  );
};

interface SocialLoginsProps {
  queryStatuses: Record<SocialSignInType, QueryStatus>;
}

export const SocialLogins: React.FC<SocialLoginsProps> = ({
  queryStatuses,
}) => {
  const queries = useQueries({
    queries: socialLoginOptions.map((option) => ({
      queryKey: ['oauth', option.providerType],
      queryFn: () => getRedirectUrl(option.providerType),
      staleTime: Infinity,
      retry: queryStatuses?.[option.providerType] === QueryStatus.REJECTED,
    })),
  });

  const handleRetry = (providerType: SocialSignInType) => {
    const queryIndex = socialLoginOptions.findIndex(
      (option) => option.providerType === providerType,
    );
    if (queryIndex !== -1) {
      queries[queryIndex].refetch();
    }
  };

  return (
    <section className="fixed bottom-[34px] left-0 right-0 flex flex-col gap-2 px-[30px] pt-6">
      {socialLoginOptions.map((option, index) => (
        <SocialLoginButton
          key={option.name}
          {...option}
          redirectUrl={queries[index].data?.result?.redirectUrl}
          onRetry={() => handleRetry(option.providerType)}
        />
      ))}
    </section>
  );
};
