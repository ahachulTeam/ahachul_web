import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getUserProfile } from '@/apis/users'
import { UserModel } from '@/types/user'

const useUserProfileQuery = (
  { memberId }: { memberId: UserModel['memberId'] },
  options?: UseQueryOptions<UserModel>
) => {
  return useQuery({
    queryKey: ['user', memberId],
    queryFn: () => getUserProfile({ memberId }),
    select: res => res.result,
    enabled: options?.enabled,
  })
}

export default useUserProfileQuery
