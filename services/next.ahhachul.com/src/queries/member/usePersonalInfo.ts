import { MemberApi } from '@/src/api';
import { useAuthQuery } from '@/src/queries/query';
import { PERSONAL_INFO_KEY } from './keys';

function usePersonalInfo() {
  const result = useAuthQuery(PERSONAL_INFO_KEY, () => MemberApi.getPersonalInfo(), {
    select: (data) => {
      return data.data.result;
    },
    staleTime: Infinity,
    // cacheTime: Infinity,
  });

  return result;
}

export default usePersonalInfo;
