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

export interface TrainInfo {
  upDownType: 'UP' | 'DOWN'
  nextStationDirection: string
  destinationStationDirection: string
  trainNum: string
  currentLocation: string
  currentTrainArrivalCode:
    | 'ENTER'
    | 'ARRIVE'
    | 'DEPARTURE'
    | 'BEFORE_STATION_DEPARTURE'
    | 'BEFORE_STATION_ENTER'
    | 'BEFORE_STATION_ARRIVE'
    | 'RUNNING'
}

export interface TrainRealTimeData {
  trainRealTimes: TrainInfo[]
  upDownData?: Record<string, string>
}

export interface TrainCongestionData {
  trainNo: number
  congestions: Array<{
    sectionNo: number
    congestionColor: 'SMOOTH' | 'MODERATE' | 'CONGESTED' | 'VERY_CONGESTED'
  }>
}
