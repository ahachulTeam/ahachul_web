import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import * as trainAPI from '@/apis/train'
import { subwayStationsAtom } from '@/atoms/train'
import { StandardResponse, StationsClientModel, SubwayLineServerModel } from '@/types'
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

export const useGetSubwayList = (): UseQueryResult<StandardResponse<SubwayLineServerModel>> => {
  const setSubwayStations = useSetRecoilState(subwayStationsAtom)
  return useQuery({
    queryKey: subwayKeys.subwayList,
    queryFn: trainAPI.getSubwayLines,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    onSuccess: res => {
      const subwayResponse = res?.result?.subwayLines
      const possibleDuplicatedStations = subwayResponse?.reduce((acc, curr) => {
        curr?.stations?.forEach(station => {
          acc[station?.name] = {
            stationId: station?.id,
            parentStationLineIds: curr?.id,
            parentStationLineNames: curr?.name,
          }
        })
        return acc
      }, {} as StationsClientModel)

      // TODO: 서버에서 내려오는 response가 교대역일 경우 2호선, 3호선 둘 다에 해당하는데
      // 2호선에도 교대역이 들어가있고 3호선에도 교대역이 들어있음, 또한 그에 해당하는 id가 상이함.
      // 위 이슈를 해결하기 위해 duplicate된 부분들을 합쳐줄 필요가 있음.
      console.log('stations: ', possibleDuplicatedStations)
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
      const res = await trainAPI.fetchGetTrains(trainNumber)
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => null)
    },
    suspense: options?.suspense,
    staleTime: options?.staleTime,
    enabled: options?.enabled || false,
  })
}
