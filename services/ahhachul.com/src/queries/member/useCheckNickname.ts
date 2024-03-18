import { useMutation } from '@tanstack/react-query';
import { MemberApi } from 'api';

function useCheckNickName() {
  return useMutation(MemberApi.checkNickname);
}

export default useCheckNickName;
