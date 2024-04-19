import { useRouter } from 'next/navigation';

import { useMutation } from '@/src/queries/query';

import { ISocialSignInParams } from '@/src/types';
import { AuthApi } from '@/src/api';
import { useAppDispatch } from '@/src/stores';
import { PATH } from '@/src/data/path';
import { setToken } from '@/src/stores/auth';

const useLoginMutation = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (providers: ISocialSignInParams) => AuthApi.login(providers),
    onSuccess: (data) => {
      const token = {
        accessToken: data.data.result.accessToken,
        refreshToken: data.data.result.refreshToken,
        accessTokenExpiresIn: data.data.result.accessTokenExpiresIn,
        refreshTokenExpiresIn: data.data.result.refreshTokenExpiresIn,
      };
      dispatch(setToken(token));

      if (data.data.result.isNeedAdditionalUserInfo) router.replace(PATH.settingNickname);
      else router.replace(PATH.home);
    },
  });
};

export default useLoginMutation;
