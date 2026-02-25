import type { ApiResponse } from './common';
import type { StationTimeWeekType } from './station-time-summary-v2';
import type { RealtimeUpDownType } from './subway-realtime-v2';

export interface StationTimeItemV2 {
  arrivalTime: string;
  departureTime: string;
  arrivalStationName: string;
  departureStationName: string;
  trainType: string;
}

export interface StationTimesFullUpDownV2 {
  upDownType: RealtimeUpDownType;
  stationTimes: StationTimeItemV2[];
}

export interface StationTimesFullWeekV2 {
  stationTimeWeekType: StationTimeWeekType;
  upDownTimetables: StationTimesFullUpDownV2[];
}

export interface StationTimesFullV2Payload {
  generatedAt: string;
  stationId: number;
  subwayLineId: number;
  weeks: StationTimesFullWeekV2[];
}

export interface StationTimesFullV2Query {
  stationId: number;
  subwayLineId: number;
}

export type StationTimesFullV2Response = ApiResponse<StationTimesFullV2Payload>;
