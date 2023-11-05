import { ax } from './axios'
import { StandardResponse } from '@/types/global'
import { SubwayLineServerModel, TrainMetaData } from '@/types/train'

export const getSubwayLines = async () => {
  const { data } = await ax.get<StandardResponse<SubwayLineServerModel>>('/subway-lines')
  return data
}

export const fetchGetTrains = async (trainId: string) => {
  const { data } = await ax.get<StandardResponse<TrainMetaData>>(`/trains/${trainId}`)
  return data
}

export const fetchGetTrainRealTimeData = async (stationId: string) => {
  const { data } = await ax.get<StandardResponse<TrainMetaData>>(`/trains/real-times?stationId=${stationId}`)
  return data
}

export const getTrainRealTimeCongestionData = async (stationId: string, upOrDown: 'UP' | 'DOWN') => {
  const { data } = await ax.get<StandardResponse<TrainMetaData>>(
    `/trains/real-times/congestion?stationId=${stationId}&upDownType=${upOrDown}`
  )
  return data
}
