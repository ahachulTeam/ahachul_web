export interface TrainMetaData {
  code: string
  message: string
  result: {
    id: number
    subwayLine: {
      id: number
      name: string
    }
    location: number
    organizationTrainNo: string
  }
}
