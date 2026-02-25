import type { ApiResponse } from './common';

export type SubwayRouteStrategy = 'BALANCED' | 'MIN_TRANSFER' | 'MIN_STOP';

export interface SubwayRouteSearchV2Query {
  sourceStationId: number;
  destinationStationId: number;
  strategy: SubwayRouteStrategy;
  alternatives?: number;
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
}

export interface SubwayRouteSearchV2Payload {
  generatedAt: string;
  sourceStationId: number;
  destinationStationId: number;
  strategy: SubwayRouteStrategy;
  routes: SubwayRouteV2[];
}

export type SubwayRouteSearchV2Response = ApiResponse<SubwayRouteSearchV2Payload>;
