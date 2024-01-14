import { AxiosInstance } from 'axios'
import { ax } from './axios'
import { StandardResponse } from '@/types/global'
import { SubwayLineServerModel, TrainCongestionData, TrainMetaData, TrainRealTimeData } from '@/types/train'

export const getSubwayLines = async () => {
  const { data } = await ax.get<StandardResponse<SubwayLineServerModel>>('/subway-lines')
  return data
}

export const fetchGetTrains = async (trainId: string) => {
  const { data } = await ax.get<StandardResponse<TrainMetaData>>(`/trains/${trainId}`)
  return data
}

export const fetchGetTrainRealTimeData = async (stationInfo: { stationId?: number; subwayLineId?: number }) => {
  const { data } = await ax.get<StandardResponse<TrainRealTimeData>>(
    `/trains/real-times?stationId=${stationInfo?.stationId}&subwayLineId=${stationInfo?.subwayLineId}`
  )
  return data
}

export const getTrainRealTimeCongestionData = async (subwayLineId?: number, trainNo?: number) => {
  const { data } = await ax.get<StandardResponse<TrainCongestionData>>(
    `/trains/real-times/congestion?subwayLineId=${subwayLineId}&trainNo=${trainNo}`
  )
  return data
}

export const getSubwayLinesServerSide = async (_api: AxiosInstance) => {
  const res = await _api.get<Promise<StandardResponse<SubwayLineServerModel>>>('/subway-lines')
  return res.data
}
