import type { ApiResponse } from './common';
import type { RealtimeUpDownType } from './subway-realtime-v2';

export type StationTimeWeekType = 'WEEKDAY' | 'SATURDAY' | 'HOLIDAY';

export interface StationTimeSummaryItem {
  upDownType: RealtimeUpDownType;
  firstDepartureTime: string | null;
  lastDepartureTime: string | null;
  firstDestinationStationName: string | null;
  lastDestinationStationName: string | null;
}

export interface StationTimeSummaryV2Payload {
  stationTimeWeekType: StationTimeWeekType;
  summaries: StationTimeSummaryItem[];
}

export interface StationTimeSummaryV2Query {
  stationId: number;
  subwayLineId: number;
  stationTimeWeekType: StationTimeWeekType;
}

export type StationTimeSummaryV2Response = ApiResponse<StationTimeSummaryV2Payload>;
