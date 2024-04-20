import { useAuthMutation } from '@/src/queries/query';
import { MemberApi } from '@/src/api';

function useCheckNickName() {
  return useAuthMutation(MemberApi.checkNickname);
}

export default useCheckNickName;
