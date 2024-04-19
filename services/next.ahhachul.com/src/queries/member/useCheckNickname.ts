import { useMutation } from '@/src/queries/query';
import { MemberApi } from '@/src/api';

function useCheckNickName() {
  return useMutation({
    mutationFn: MemberApi.checkNickname,
  });
}

export default useCheckNickName;
