import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import userAPI from '@/apis/users'
import { UserModel } from '@/types/user'

type Options = Pick<UseQueryOptions<Awaited<ReturnType<typeof userAPI.getMyProfile>>['result']>, 'enabled'>

const useUserProfileQuery = ({ memberId }: { memberId: UserModel['memberId'] }, options?: Options) => {
  return useQuery({
    queryKey: ['user', memberId],
    queryFn: () => userAPI.getUserProfile({ memberId }),
    select: res => res.result,
    enabled: options?.enabled,
  })
}

export default useUserProfileQuery
