import type { ApiResponse } from './common';
import type { RealtimeUpDownType } from './subway-realtime-v2';

export type StationTimeWeekType = 'WEEKDAY' | 'SATURDAY' | 'HOLIDAY';
export type StationSummaryAvailabilityStatus = 'AVAILABLE' | 'PARTIAL' | 'EMPTY';
export type StationSummaryDataSource = 'CACHE' | 'API' | 'FALLBACK_EMPTY';

export interface StationTimeSummaryItem {
  upDownType: RealtimeUpDownType;
  firstDepartureTime: string | null;
  lastDepartureTime: string | null;
  firstDestinationStationName: string | null;
  lastDestinationStationName: string | null;
}

export interface StationTimeSummarySourceDetail {
  upDownType: RealtimeUpDownType;
  dataSource: StationSummaryDataSource;
  stationTimesCount: number;
  fallbackReasonCode: string | null;
}

export interface StationTimeSummaryMeta {
  generatedAt: string;
  availabilityStatus: StationSummaryAvailabilityStatus;
  coveragePercent: number;
  guidanceMessage: string;
  sourceDetails: StationTimeSummarySourceDetail[];
}

export interface StationTimeSummaryV2Payload {
  stationTimeWeekType: StationTimeWeekType;
  summaries: StationTimeSummaryItem[];
  meta?: StationTimeSummaryMeta;
}

export interface StationTimeSummaryV2Query {
  stationId: number;
  subwayLineId: number;
  stationTimeWeekType: StationTimeWeekType;
}

export type StationTimeSummaryV2Response = ApiResponse<StationTimeSummaryV2Payload>;
