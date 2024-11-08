'use client';

import { Suspense, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { requestLogin } from '../_lib/requestLogin';
import { useTemporaryAuthStore } from '@/store/auth';
import { isValidSocialSignInType } from '@/model/Auth';
import { AuthService } from '@/common/service/AuthService';

function LoginCallback() {
  const router = useRouter();
  const isLoadingRef = useRef(false);
  const { setTempAuth } = useTemporaryAuthStore();

  const searchParams = useSearchParams();
  const providerType = searchParams.get('type');
  const providerCode = searchParams.get('code');

  const handleLogin = async () => {
    if (isLoadingRef.current) {
      return;
    }

    if (
      !providerType ||
      !providerCode ||
      !isValidSocialSignInType(providerType)
    ) {
      return;
    }

    try {
      isLoadingRef.current = true;
      const { result } = await requestLogin({
        providerType,
        providerCode,
      });

      const { accessToken, refreshToken, isNeedAdditionalUserInfo } = result;

      if (!isNeedAdditionalUserInfo) {
        AuthService.setToken(accessToken, refreshToken);
        router.replace('/');
      } else {
        setTempAuth({ accessToken, refreshToken });
        router.replace('/login/nickname');
      }
    } catch (error) {
      console.error(error);
      router.back();
    } finally {
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return null;
}

export default function LoginCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginCallback />
    </Suspense>
  );
}
