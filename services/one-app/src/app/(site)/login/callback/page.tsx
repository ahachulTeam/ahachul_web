'use client';

import { useRouter } from 'next/navigation';
import { requestLogin } from '../_lib/requestLogin';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { isValidSocialSignInType } from '@/model/Auth';
import { AuthService } from '@/common/service/AuthService';
import { useRef } from 'react';

export default function LoginCallbackPage() {
  const isLoadingRef = useRef(false);
  const router = useRouter();
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

      const { accessToken, refreshToken } = result;
      AuthService.setToken(accessToken, refreshToken);
      alert('로그인 성공');
      router.replace('/');

    } catch (error) {
      // console.error(error);
      alert(error);
      router.back();
    } finally {
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  // TODO, 렌더링단에 로딩 넣어주기
  return null;
}
