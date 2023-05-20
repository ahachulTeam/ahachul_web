import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import userAPI from '@/apis/users'

type Options = Pick<UseQueryOptions<Awaited<ReturnType<typeof userAPI.getMyProfile>>['result']>, 'enabled'>

const useMyProfileQuery = (options?: Options) =>
  useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => userAPI.getMyProfile(),
    select: res => res.result,
    enabled: options?.enabled,
  })

export default useMyProfileQuery
