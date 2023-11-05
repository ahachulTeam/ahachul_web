import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import * as trainAPI from '@/apis/train'
import * as T from '@/utils/try'

export const subwayKeys = {
  all: ['subway'] as const,
  subwayList: ['subway', 'list'] as const,
}

export const trainKeys = {
  all: ['train'] as const,
  metaDataList: () => [...trainKeys.all, 'metaData'] as const,
  metaData: (trainNumber: string) => [...trainKeys.metaDataList(), trainNumber] as const,
}

export const useGetSubwayList = () => {
  return useQuery({
    queryKey: subwayKeys.subwayList,
    queryFn: trainAPI.getSubwayLines,
  })
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
    suspense: options?.suspense,
    staleTime: options?.staleTime,
    enabled: options?.enabled || false,
  })
}
