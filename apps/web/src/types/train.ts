export interface Station {
  id: number
  name: string
}

export interface SubwayLine {
  id: number
  name: string
  phoneNumber: string
  stations: Station[]
}

export interface SubwayLineServerModel {
  subwayLines: SubwayLine[]
}

export interface TrainMetaData {
  id: number
  subwayLine: {
    id: number
    name: string
  }
  location: number
  organizationTrainNo: string
}
