import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'

import { getMyProfile } from '@/apis/users'
import { UserModel } from '@/types/user'

const useMyProfileQuery = (options?: UseQueryOptions<UserModel>): UseQueryResult<UserModel> =>
  useQuery({
    queryKey: ['user', 'me'],
    queryFn: getMyProfile,
    select: res => res.result,
    enabled: options?.enabled || false,
  })

export default useMyProfileQuery
