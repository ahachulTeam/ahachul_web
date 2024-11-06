'use client';

import { useRouter } from 'next/navigation';
import { requestLogin } from '../_lib/requestLogin';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { isValidSocialSignInType } from '@/model/Auth';
import { TokenService } from '@/app/api/util/TokenService';

export default function LoginCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const providerType = searchParams.get('type');
  const providerCode = searchParams.get('code');

  const handleLogin = async () => {
    if (
      !providerType ||
      !providerCode ||
      !isValidSocialSignInType(providerType)
    ) {
      return;
    }

    try {
      const { result } = await requestLogin({
        providerType,
        providerCode,
      });

      const { accessToken, refreshToken } = result;
      TokenService.setToken(accessToken, refreshToken);
      router.replace('/');

    } catch (error) {
      // console.error(error);
      alert(error);
      router.back();
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  // TODO, 렌더링단에 로딩 넣어주기
  return null;
}
