export type SubwayLineType =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '12'
  | '15'
  | '18'
  | '13'
  | '16'
  | '11'
  | '20';

export type SubwayLineKrType =
  | '1호선'
  | '2호선'
  | '3호선'
  | '4호선'
  | '5호선'
  | '6호선'
  | '7호선'
  | '8호선'
  | '9호선'
  | '경강선'
  | '경춘선'
  | '서해선'
  | '신분당선'
  | '공항철도'
  | '수인분당선'
  | '경의중앙선'
  | '우이신설경전철';

export interface UserStation {
  label: string;
  stationId: number;
  stationName: string;
  subwayLineInfoList: {
    subwayLineId: number;
    subwayLineName: string;
  }[];
}

export type UserStationList = UserStation[];

export type UserFavoriteStations = {
  stationInfoList: UserStationList;
};

export type WithSubwayLineId = {
  subwayLineId: number;
};

export type WithSubwayStationId = {
  stationId: number;
};

export interface WithSubwayTrainId {
  trainNo: number;
}

export interface APITrainInfoParams extends WithSubwayLineId, WithSubwayStationId {}

/**
 * 열차의 현재 도착 상태를 나타내는 타입
 *
 * @value {'ENTER'} 진입
 * @value {'ARRIVE'} 도착
 * @value {'DEPARTURE'} 출발
 * @value {'BEFORE_STATION_DEPARTURE'} 전역출발
 * @value {'BEFORE_STATION_ARRIVE'} 전역도착
 * @value {'BEFORE_STATION_ENTER'} 전역진입
 * @value {'RUNNING'} 운행중
 */
export enum CurrentTrainArrivalType {
  ENTER = 'ENTER',
  ARRIVE = 'ARRIVE',
  DEPARTURE = 'DEPARTURE',
  BEFORE_STATION_DEPARTURE = 'BEFORE_STATION_DEPARTURE',
  BEFORE_STATION_ARRIVE = 'BEFORE_STATION_ARRIVE',
  BEFORE_STATION_ENTER = 'BEFORE_STATION_ENTER',
  RUNNING = 'RUNNING',
}

type UpDownType = 'UP' | 'DOWN';

/**
 * Train interface
 *
 * @property {string} trainNum - 열차 id
 * @property {UpDownType} upDownType - 상하행선구분 {@link UpDownType}
 * @property {string} nextStationDirection - 다음 정류장 방향
 * @property {string} destinationStationDirection - 목적지 방향
 * @property {number} currentArrivalTime - 열차 도착 시간
 * @property {CurrentTrainArrivalType} currentTrainArrivalCode - 해당 열차 현재 위치 코드 {@link CurrentTrainArrivalType}
 */
export interface ITrain {
  trainNum: number;
  upDownType: UpDownType;
  nextStationDirection: string;
  destinationStationDirection: string;
  currentArrivalTime: number;
  currentTrainArrivalCode: CurrentTrainArrivalType;
}

/**
 * 열차 칸의 현재 혼잡도 색상을 나타내는 타입
 *
 * @value {'SMOOTH'} 원활
 * @value {'MODERATE'} 보통
 * @value {'CONGESTED'} 혼잡
 * @value {'VERY_CONGESTED'} 매우 혼잡
 */
export type CongestionColorType = 'SMOOTH' | 'MODERATE' | 'CONGESTED' | 'VERY_CONGESTED';

/**
 * Congestion interface
 *
 * @property {string} sectionNo - 열차 칸 id
 * @property {CongestionColorType} congestionColor - 혼잡도 색상 타입 {@link CongestionColorType}
 */
export interface Congestion {
  sectionNo: number;
  congestionColor: CongestionColorType;
}

export interface StationServerModel {
  id: number;
  name: string;
}

export interface StationClientModel {
  stationId: number;
  parentLineNames: string;
  parentLineId: number;
}

export type Stations = { [key: string]: StationClientModel[] };

export interface SubwayLine {
  id: number;
  name: string;
  phoneNumber: string;
  stations: StationServerModel[];
}

export interface SubwayLineServerModel {
  subwayLines: SubwayLine[];
}
