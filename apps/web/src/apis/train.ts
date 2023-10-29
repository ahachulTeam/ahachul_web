import { ax } from './axios'
import { StandardResponse } from '@/types/global'
import { TrainMetaData } from '@/types/train'

export const fetchGetTrains = async (trainId: string) => {
  const { data } = await ax.get<StandardResponse<TrainMetaData>>(`/trains/${trainId}`)
  return data
}
