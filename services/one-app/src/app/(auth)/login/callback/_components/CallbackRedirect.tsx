'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import { useAsyncCallback } from '@/hooks';
import { AuthService } from '@/lib/auth-service';
import { useTempAuthStore } from '@/stores/auth';
import { isValidSocialSignInType } from '@/utils/auth';

import { LOGIN_ERROR_QUERY, resolveLoginErrorQueryFromError } from '../../_lib/loginError';
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
        router.replace(`/login?error=${LOGIN_ERROR_QUERY.INVALID_CALLBACK_PARAMS}`);
        return;
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
        const errorQuery = resolveLoginErrorQueryFromError(error);
        router.replace(`/login?error=${errorQuery}`);
      },
    },
  );

  useEffect(() => {
    handleLogin.execute();
  }, [handleLogin]);

  return null;
}
