import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { trainKeys } from '../queryKeys/train'
import trainAPI from '@/apis/train'

import * as T from '@/utils/try'

export const useGetTrainMetaData = (
  trainNumber: string,
  options?: Pick<UseQueryOptions<Awaited<ReturnType<typeof trainAPI.fetchGetTrains>>>, 'enabled' | 'suspense'>
) => {
  return useQuery({
    queryKey: trainKeys.metaData(trainNumber),
    queryFn: async () => {
      const res = await trainAPI.fetchGetTrains(trainNumber)
      const parsedData = T.parseResponse(res)
      console.log(parsedData)
      return T.getOrElse(parsedData, () => null)
    },
    enabled: options?.enabled || false,
    suspense: options?.suspense,
  })
}
