import type { ApiResponse } from './common';

export type RealtimeConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type RealtimeArrivalCode =
  | 'ENTER'
  | 'ARRIVE'
  | 'DEPARTURE'
  | 'BEFORE_STATION_DEPARTURE'
  | 'BEFORE_STATION_ENTER'
  | 'BEFORE_STATION_ARRIVE'
  | 'RUNNING';

export type RealtimeUpDownType = 'UP' | 'DOWN';

export interface TrainRealtimeV2Item {
  trainNo: string;
  upDownType: RealtimeUpDownType;
  arrivalCode: RealtimeArrivalCode;
  etaSec: number;
  etaMinDisplay: number;
  destinationStationDirection: string;
  nextStationDirection: string;
}

export interface TrainRealtimeV2Payload {
  generatedAt: string;
  dataSource: 'API' | 'CACHE' | 'STALE_CACHE';
  isStale: boolean;
  lastExternalRecptnAt: string;
  freshnessSec: number;
  confidenceLevel: RealtimeConfidenceLevel;
  trainRealTimes: TrainRealtimeV2Item[];
}

export interface TrainRealtimeV2Query {
  stationId: number;
  subwayLineId: number;
  upDownType?: RealtimeUpDownType;
  limit?: number;
}

export type TrainRealtimeV2Response = ApiResponse<TrainRealtimeV2Payload>;

export interface TrainRealtimeV1Item {
  trainNum: string;
  upDownType: RealtimeUpDownType;
  nextStationDirection: string;
  destinationStationDirection: string;
  currentArrivalTime: number;
  currentTrainArrivalCode: RealtimeArrivalCode;
}

export type TrainRealtimeV1Response = ApiResponse<{
  trainRealTimes: TrainRealtimeV1Item[];
}>;
