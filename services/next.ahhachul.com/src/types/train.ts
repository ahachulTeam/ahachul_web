export type UpDownType = 'UP' | 'DOWN';

/** ENTER:진입,
 *  ARRIVE:도착,
 *  DEPARTURE:출발,
 *  BEFORE_STATION_DEPARTURE:전역출발,
 *  BEFORE_STATION_ARRIVE:전역도착,
 *  BEFORE_STATION_ENTER:전역진입,
 *  RUNNING:운행중
 * */
export type CurrentTrainArrivalType =
  | 'ENTER'
  | 'ARRIVE'
  | 'DEPARTURE'
  | 'BEFORE_STATION_DEPARTURE'
  | 'BEFORE_STATION_ARRIVE'
  | 'BEFORE_STATION_ENTER'
  | 'RUNNING';

export interface ITrain {
  /** 상하행선구분 */
  upDownType: UpDownType;
  /** 다음 정류장 방향 */
  nextStationDirection: string;
  /** 목적지 방향 */
  destinationStationDirection: string;
  /** 해당 열차 ID */
  trainNum: string;
  /** 열차 도착 시간 (몇분 후) */
  currentArrivalTime: number;
  /** 해당 열차 현재 위치 코드 */
  currentTrainArrivalCode: CurrentTrainArrivalType;
}

export interface ITrainParams {
  /** 정류장 ID */
  stationId: string;
  /** 지하철 노선 ID */
  subwayLineId: string;
}

export type ITrainRealTimeInfo = {
  trainRealTimes: ITrain[];
};

/**
 * SMOOTH(원활),
 * MODERATE(보통),
 * CONGESTED(혼잡),
 * VERY_CONGESTED(매우 혼잡)
 */
export type CongestionColorType = 'SMOOTH' | 'MODERATE' | 'CONGESTED' | 'VERY_CONGESTED';

export interface ITrainCongestion {
  sectionNo: number;
  congestionColor: CongestionColorType;
}

export interface ITrainCongestionParams {
  /** 열차 번호 */
  trainNo: string;
  /** 지하철 노선 ID */
  subwayLineId: string;
}

export type ITrainCongestionInfo = {
  trainNo: string;
  congestions: ITrainCongestion[];
};
