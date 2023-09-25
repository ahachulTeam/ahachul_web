import { TrainMetaData } from '@/types/train'
import { ax } from './axios'
import { StandardResponse } from '@/types/common'

const trainAPI = {
  fetchGetTrains: async (trainId: string) => {
    const { data } = await ax.get<StandardResponse<TrainMetaData>>(`/trains/${trainId}`)
    return data
  },
}

export default trainAPI
