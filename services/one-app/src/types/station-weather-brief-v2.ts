import type { ApiResponse } from './common';

export type StationWeatherDataSource = 'API' | 'CACHE' | 'STALE_CACHE' | 'FALLBACK';

export interface StationWeatherBriefV2Payload {
  stationId: number;
  stationName: string;
  generatedAt: string;
  dataSource: StationWeatherDataSource;
  isStale: boolean;
  summaryText: string;
  cautionText: string;
  friendlyText: string;
  temperatureC: number | null;
  apparentTemperatureC: number | null;
  precipitationMm: number | null;
  windSpeedMps: number | null;
  weatherCode: number | null;
  weatherLabel: string;
}

export interface StationWeatherBriefV2Query {
  stationId: number;
}

export type StationWeatherBriefV2Response = ApiResponse<StationWeatherBriefV2Payload>;
