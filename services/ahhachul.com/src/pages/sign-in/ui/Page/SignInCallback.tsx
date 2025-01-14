// 인가 코드 받는 페이지
import { useRef, useEffect } from 'react';

import { ActivityComponentType } from '@stackflow/react';
import { queryClient } from 'app/lib/react-query';
import { useFlow } from 'app/stackflow';
import { requestLogin } from 'entities/app-authentications/api';
import { ISocialSignInType } from 'entities/app-authentications/model';
import { useAuthStore, useTemporaryAuthStore } from 'entities/app-authentications/slice';
import { GET_USER_INFO_QUERY_KEY } from 'features/users/api';
import { Layout } from 'widgets';

export const SignInCallback: ActivityComponentType<{
  type: string;
  code: string;
  // eslint-disable-next-line react/prop-types
}> = ({ params: { type, code } }) => {
  const { replace } = useFlow();
  const isLoadingRef = useRef(false);
  const { setToken } = useAuthStore();
  const { setTempAuth } = useTemporaryAuthStore();

  const handleLogin = async () => {
    if (isLoadingRef.current) {
      return;
    }

    if (!type || !code) {
      return;
    }

    try {
      isLoadingRef.current = true;
      const result = await requestLogin({
        providerType: type as ISocialSignInType,
        providerCode: code,
      });

      const { accessToken, refreshToken, isNeedAdditionalUserInfo } = result.data.result;

      if (!isNeedAdditionalUserInfo) {
        // 아래 내용들 따로 모듈로 만들기
        setToken({
          accessToken,
          refreshToken,
        });
        queryClient.invalidateQueries({ queryKey: GET_USER_INFO_QUERY_KEY });
        window.alert('로그인 성공');
        replace('Home', {}, { animate: false });
      } else {
        setTempAuth({ accessToken, refreshToken });
        replace('SetupNickname', {});
      }
    } catch (error) {
      console.error(error);
      replace('SignIn', {});
    } finally {
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <Layout>
      <div></div>
    </Layout>
  );
};
