import { useEffect } from 'react';

import type { ActivityComponentType } from '@stackflow/react';

import * as api from '@/apis/request';
import { LayoutComponent, UiComponent } from '@/components';
import { useAuth } from '@/contexts';
import { useFlow } from '@/stackflow';
import { useTempAuth } from '@/stores';
import { useUserStationStore } from '@/stores/subway';
import type { SocialSignInType } from '@/types';

interface SignInCallbackPageProps {
  type: string;
  code: string;
}

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
        replace('SignInPage', {});
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
              stations: userStations.result.stationInfoList,
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          replace('HomePage', {}, { animate: false });
        }
      } catch (error) {
        console.error(error);
        replace('SignInPage', {});
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
