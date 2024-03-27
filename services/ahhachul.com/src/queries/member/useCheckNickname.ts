import { useMutation } from 'queries/query';
import { MemberApi } from 'api';

function useCheckNickName() {
  return useMutation({
    mutationFn: MemberApi.checkNickname,
  });
}

export default useCheckNickName;
