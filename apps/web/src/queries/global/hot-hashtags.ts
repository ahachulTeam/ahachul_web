import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { getHottestHashtags } from '@/apis/gloabal'
import { HashTagsServerModel } from '@/types/global'
import * as T from '@/utils/try'

export const useGetHottestHashtagsQuery = (): UseQueryResult<HashTagsServerModel> => {
  return useQuery(
    ['global', 'hottest-hashtags'],
    async () => {
      const res = await getHottestHashtags()
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => ({ ranks: [{}] }))
    },
    {
      suspense: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  )
}
