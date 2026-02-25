import type { ApiResponse } from './common';
import type { StationTimeWeekType } from './station-time-summary-v2';

export type SubwayRouteStrategy = 'BALANCED' | 'MIN_TRANSFER' | 'MIN_STOP';
export type SubwayRouteWalkingPreference = 'FAST' | 'LESS_STAIRS';
export type SubwayRouteQualityConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type SubwayRouteQualityBadge =
  | 'BEST_RECOMMENDED'
  | 'TRANSFER_HEAVY'
  | 'WALKING_HEAVY'
  | 'LAST_TRAIN_RISK'
  | 'DELAY_RISK'
  | 'DATA_LIMITED';

export interface SubwayRouteSearchV2Query {
  sourceStationId: number;
  destinationStationId: number;
  strategy: SubwayRouteStrategy;
  alternatives?: number;
  walkingPreference?: SubwayRouteWalkingPreference;
  stationTimeWeekType?: StationTimeWeekType;
}

export interface SubwayRouteNodeV2 {
  stationId: number;
  stationName: string;
  order: number;
  isTransfer: boolean;
}

export interface SubwayRouteEdgeV2 {
  fromStationId: number;
  toStationId: number;
  subwayLineId: number;
  subwayLineName: string;
}

export interface SubwayRouteV2 {
  rank: number;
  nodes: SubwayRouteNodeV2[];
  edges: SubwayRouteEdgeV2[];
  summary: {
    totalStops: number;
    transferCount: number;
    estimatedMinutes: number;
  };
  quality?: {
    totalScore: number;
    transferRiskScore: number;
    walkingScore: number;
    lastTrainSafetyScore: number;
    delayResilienceScore: number;
    delayProbabilityPercent: number;
    confidenceLevel: SubwayRouteQualityConfidenceLevel;
    badges: SubwayRouteQualityBadge[];
    reasons: string[];
  };
}

export interface SubwayRouteSearchV2Payload {
  modelVersion?: string;
  generatedAt: string;
  sourceStationId: number;
  destinationStationId: number;
  strategy: SubwayRouteStrategy;
  walkingPreference?: SubwayRouteWalkingPreference;
  stationTimeWeekType?: StationTimeWeekType;
  routes: SubwayRouteV2[];
}

export type SubwayRouteSearchV2Response = ApiResponse<SubwayRouteSearchV2Payload>;
