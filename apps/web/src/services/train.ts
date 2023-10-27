import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import * as trainAPI from '@/apis/train'
import * as T from '@/utils/try'

export const trainKeys = {
  all: ['train'] as const,
  metaDataList: () => [...trainKeys.all, 'metaData'] as const,
  metaData: (trainNumber: string) => [...trainKeys.metaDataList(), trainNumber] as const,
}

export const useGetTrainMetaData = (
  trainNumber: string,
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof trainAPI.fetchGetTrains>>>,
    'enabled' | 'suspense' | 'staleTime'
  >
) => {
  return useQuery({
    queryKey: trainKeys.metaData(trainNumber),
    queryFn: async () => {
      const res = await trainAPI.fetchGetTrains(trainNumber)
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => null)
    },
    enabled: options?.enabled || false,
    suspense: options?.suspense,
    staleTime: options?.staleTime,
  })
}
