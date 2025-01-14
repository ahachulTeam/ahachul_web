export interface WithSubwayTrainId {
  trainNo: number;
}

/**
 * 열차의 현재 도착 상태를 나타내는 타입
 *
 * @typedef {string} CurrentTrainArrivalType
 * @value {'ENTER'} 진입
 * @value {'ARRIVE'} 도착
 * @value {'DEPARTURE'} 출발
 * @value {'BEFORE_STATION_DEPARTURE'} 전역출발
 * @value {'BEFORE_STATION_ARRIVE'} 전역도착
 * @value {'BEFORE_STATION_ENTER'} 전역진입
 * @value {'RUNNING'} 운행중
 */
type CurrentTrainArrivalType =
  | 'ENTER'
  | 'ARRIVE'
  | 'DEPARTURE'
  | 'BEFORE_STATION_DEPARTURE'
  | 'BEFORE_STATION_ARRIVE'
  | 'BEFORE_STATION_ENTER'
  | 'RUNNING';

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
 * @typedef {string} CurrentTrainArrivalType
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
