import { useEffect } from 'react';

import type { ActivityComponentType } from '@stackflow/react';

import * as api from '@/apis/request';
import { LayoutComponent, UiComponent } from '@/components';
import { useAuth } from '@/contexts';
import { useFlow } from '@/stackflow';
import { useTempAuth } from '@/stores';
import { useUserStationStore } from '@/stores/subway';
import type { SocialSignInType } from '@/types';
import { resolveLoginErrorCodeFromError } from '@/utils/loginError';
import { createActionLogger } from '@/utils/observability';

interface SignInCallbackPageProps {
  type: string;
  code: string;
}

const callbackLogger = createActionLogger('auth-callback');

const SignInCallbackPage: ActivityComponentType<SignInCallbackPageProps> = ({
  params: { type, code },
}: {
  params: {
    type: string;
    code: string;
  };
}) => {
  const { replace } = useFlow();
  const { authService } = useAuth();
  const { setTempTokens } = useTempAuth();

  useEffect(() => {
    const handleSignIn = async () => {
      if (!type || !code) {
        replace('SignInPage', { loginErrorCode: 'invalid_callback_params' });
        return;
      }

      try {
        const response = await api.login({
          providerType: type as SocialSignInType,
          providerCode: code,
        });

        const { accessToken, refreshToken, isNeedAdditionalUserInfo } = response.result;

        if (isNeedAdditionalUserInfo) {
          setTempTokens({ accessToken, refreshToken });
          replace('SetNickNamePage', {});
          return;
        }

        authService.signIn({ accessToken, refreshToken });

        try {
          const userStations = await api.fetchUserFavoriteStations();
          if (userStations.result.stationInfoList.length > 0) {
            useUserStationStore.setState({
              userStations: userStations.result.stationInfoList,
            });
          }
        } catch (error) {
          callbackLogger.fail(
            'prefetch-user-stations',
            error,
            undefined,
            '즐겨찾는 역 정보를 불러오지 못했습니다.',
          );
        } finally {
          replace('HomePage', {}, { animate: false });
        }
      } catch (error) {
        callbackLogger.fail(
          'social-login',
          error,
          {
            providerType: type,
          },
          '소셜 로그인에 실패했습니다. 다시 시도해주세요.',
        );
        replace('SignInPage', { loginErrorCode: resolveLoginErrorCodeFromError(error) });
      }
    };

    handleSignIn();
  }, [type, code]);

  return (
    <LayoutComponent.Base>
      <UiComponent.LoadingSpinner isWhite />
    </LayoutComponent.Base>
  );
};

export default SignInCallbackPage;
