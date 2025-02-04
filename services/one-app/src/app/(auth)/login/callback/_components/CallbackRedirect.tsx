'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import { useAsyncCallback } from '@/hook';
import { AuthService } from '@/lib/auth-service';
import { useTempAuthStore } from '@/store/auth';
import { isValidSocialSignInType } from '@/util/auth';

import { login } from '../_lib/login';

interface CallbackRedirectProps {
  code: string;
  type: string;
}

export default function CallbackRedirect({ code, type }: CallbackRedirectProps) {
  const router = useRouter();
  const { setTempAuth } = useTempAuthStore(
    useShallow(state => ({
      setTempAuth: state.setTempAuth,
    })),
  );

  const handleLogin = useAsyncCallback(
    async () => {
      if (!isValidSocialSignInType(type) || !code) {
        throw new Error('Invalid callback parameters');
      }

      const { result } = await login({ code, type });
      const { accessToken, refreshToken, isNeedAdditionalUserInfo } = result;

      if (isNeedAdditionalUserInfo) {
        setTempAuth({ accessToken, refreshToken });
        router.replace('/login/set-nickname');
        return;
      }

      AuthService.setToken(accessToken, refreshToken);
      router.replace('/');
    },
    {
      onError: error => {
        console.error('Login failed:', error);
        router.replace('/login?error=from_callback');
      },
    },
  );

  useEffect(() => {
    handleLogin.execute();
  }, [handleLogin]);

  return null;
}
