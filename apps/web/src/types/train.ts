export interface StationServerModel {
  id: number
  name: string
}

export interface StationClientModel {
  stationId: number
  parentLineNames: string
  parentLineIds: number
}

export type Stations = { [key: string]: StationClientModel[] }

export interface SubwayLine {
  id: number
  name: string
  phoneNumber: string
  stations: StationServerModel[]
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
