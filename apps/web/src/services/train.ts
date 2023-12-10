import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import * as trainAPI from '@/apis/train'
import { subwayStationsAtom } from '@/atoms/train'
import { StandardResponse, Stations, SubwayLineServerModel, TrainCongestionData } from '@/types'
import * as T from '@/utils/try'

export const SUBWAY_KEYS = {
  all: ['subway'] as const,
  subwayList: ['subway', 'list'] as const,
}

export const trainKeys = {
  all: ['train'] as const,
  metaDataList: () => [...trainKeys.all, 'metaData'] as const,
  realTimeData: (stationId?: number, subwayLineId?: number) =>
    [...trainKeys.metaDataList(), stationId, subwayLineId] as const,
  congestionData: (subwayLineId?: number, trainNo?: number) =>
    [...trainKeys.metaDataList(), subwayLineId, trainNo] as const,
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

export const useGetTrainRealTimeData = (
  stationInfo: { stationId?: number; subwayLineId?: number },
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof trainAPI.fetchGetTrainRealTimeData>>>,
    'enabled' | 'suspense' | 'staleTime'
  >
) => {
  return useQuery({
    queryKey: trainKeys.realTimeData(stationInfo?.stationId, stationInfo?.subwayLineId),
    queryFn: async () => {
      const res = await trainAPI.fetchGetTrainRealTimeData(stationInfo)
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => ({ trainRealTimes: [] }))
    },
    suspense: options?.suspense || false,
    enabled: options?.enabled || false,
    select: v => {
      const selectedUpDownData = v.trainRealTimes?.reduce((acc, curr) => {
        if (!acc[curr?.nextStationDirection]) {
          acc[curr?.nextStationDirection] = curr?.nextStationDirection
        }

        return acc
      }, {} as Record<string, string>)
      v.upDownData = selectedUpDownData
      return v
    },
  })
}

export const useGetTrainCongestionData = (
  stationInfo: { subwayLineId?: number; trainNo?: number },
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof trainAPI.getTrainRealTimeCongestionData>>>,
    'enabled' | 'suspense' | 'staleTime'
  >
) => {
  return useQuery({
    queryKey: trainKeys.congestionData(stationInfo.subwayLineId, stationInfo.trainNo),
    queryFn: async () => {
      const res = await trainAPI.getTrainRealTimeCongestionData(stationInfo.subwayLineId, stationInfo.trainNo)
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => ({} as TrainCongestionData))
    },
    suspense: options?.suspense || false,
    enabled: options?.enabled || false,
  })
}
