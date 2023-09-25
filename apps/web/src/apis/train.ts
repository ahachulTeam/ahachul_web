import { ax } from './axios'
import { StandardResponse } from '@/types/common'
import { TrainMetaData } from '@/types/train'

const trainAPI = {
  fetchGetTrains: async (trainId: string) => {
    const { data } = await ax.get<StandardResponse<TrainMetaData>>(`/trains/${trainId}`)
    return data
  },
}

export default trainAPI
