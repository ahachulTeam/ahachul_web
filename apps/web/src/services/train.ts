import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import * as trainAPI from '@/apis/train'
import { subwayStationsAtom } from '@/atoms/train'
import { StandardResponse, Stations, SubwayLineServerModel } from '@/types'
import * as T from '@/utils/try'

export const SUBWAY_KEYS = {
  all: ['subway'] as const,
  subwayList: ['subway', 'list'] as const,
}

export const trainKeys = {
  all: ['train'] as const,
  metaDataList: () => [...trainKeys.all, 'metaData'] as const,
  metaData: (trainNumber: string) => [...trainKeys.metaDataList(), trainNumber] as const,
}

export const useGetSubwayList = (): UseQueryResult<StandardResponse<SubwayLineServerModel>> => {
  const setSubwayStations = useSetRecoilState(subwayStationsAtom)
  return useQuery({
    queryKey: SUBWAY_KEYS.subwayList,
    queryFn: trainAPI.getSubwayLines,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    onSuccess: res => {
      const subwayResponse = res?.result?.subwayLines
      const possibleDuplicatedStations = subwayResponse?.reduce((acc, curr) => {
        curr?.stations?.forEach(station => {
          if (!acc[station?.name]) {
            acc[station?.name] = [
              {
                stationId: station?.id,
                parentLineIds: curr?.id,
                parentLineNames: curr?.name,
              },
            ]
          } else {
            acc[station?.name] = [
              ...acc[station?.name],
              {
                stationId: station?.id,
                parentLineIds: curr?.id,
                parentLineNames: curr?.name,
              },
            ]
          }
        })
        return acc
      }, {} as Stations)
      setSubwayStations(possibleDuplicatedStations)
    },
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
      const res = await trainAPI.fetchGetTrainRealTimeData(trainNumber)
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => null)
    },
    suspense: options?.suspense,
    staleTime: options?.staleTime,
    enabled: options?.enabled || false,
  })
}
