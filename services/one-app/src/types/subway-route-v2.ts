import type { ApiResponse } from './common';
import type { StationTimeWeekType } from './station-time-summary-v2';

export type SubwayRouteStrategy = 'BALANCED' | 'MIN_TRANSFER' | 'MIN_STOP';
export type SubwayRouteWalkingPreference = 'FAST' | 'LESS_STAIRS';
export type SubwayRouteAccessibilityMode =
  | 'BALANCED'
  | 'ELEVATOR_PRIORITY'
  | 'STAIRS_MINIMIZED'
  | 'WHEELCHAIR'
  | 'STROLLER';
export type SubwayRouteCrowdingPreference = 'BALANCED' | 'LESS_CROWDED';
export type SubwayRouteLuggageMode = 'NORMAL' | 'HEAVY_LUGGAGE' | 'AIRPORT_TRAVEL';
export type SubwayRouteTravelerContext = 'COMMUTE' | 'SCHOOL' | 'TRAVEL';
export type SubwayRouteQualityConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type SubwayRouteQualityBadge =
  | 'BEST_RECOMMENDED'
  | 'TRANSFER_HEAVY'
  | 'WALKING_HEAVY'
  | 'LAST_TRAIN_RISK'
  | 'DELAY_RISK'
  | 'DATA_LIMITED'
  | 'ACCESSIBILITY_RECOMMENDED'
  | 'CROWDING_AVOIDANCE'
  | 'AIRPORT_FRIENDLY'
  | 'TOURIST_FRIENDLY';

export type SubwayRouteInStationDifficultyLevel = 'EASY' | 'MODERATE' | 'HARD';
export type SubwayRouteBoardingGuideConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type SubwayRouteCrowdingLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
export type SubwayRouteNearbyEssentialType =
  | 'CONVENIENCE_STORE'
  | 'RESTROOM'
  | 'ATM'
  | 'LATE_NIGHT_FOOD';
export type SubwayRouteTravelModeTag =
  | 'AIRPORT_FRIENDLY'
  | 'TOURIST_FRIENDLY'
  | 'ACCESSIBILITY_PRIORITY'
  | 'LESS_CROWDED_RECOMMENDED';
export type SubwayRouteOneClickActionType =
  | 'CALL_EMERGENCY_112'
  | 'OPEN_LOST_REPORT'
  | 'OPEN_COMPLAINT_REPORT'
  | 'COPY_EMERGENCY_PHRASE';

export interface SubwayRouteSearchV2Query {
  sourceStationId: number;
  destinationStationId: number;
  strategy: SubwayRouteStrategy;
  alternatives?: number;
  walkingPreference?: SubwayRouteWalkingPreference;
  stationTimeWeekType?: StationTimeWeekType;
  accessibilityMode?: SubwayRouteAccessibilityMode;
  crowdingPreference?: SubwayRouteCrowdingPreference;
  luggageMode?: SubwayRouteLuggageMode;
  travelerContext?: SubwayRouteTravelerContext;
  locale?: 'ko' | 'en' | 'th' | 'cn';
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
    accessibilityScore: number;
    inStationDifficultyScore: number;
    crowdingComfortScore: number;
    delayProbabilityPercent: number;
    confidenceLevel: SubwayRouteQualityConfidenceLevel;
    badges: SubwayRouteQualityBadge[];
    reasons: string[];
  };
  accessibilityProfile?: {
    mode: SubwayRouteAccessibilityMode;
    elevatorFriendlyTransferCount: number;
    estimatedStairSections: number;
    inStationDifficultyLevel: SubwayRouteInStationDifficultyLevel;
    mobilityNote: string;
  };
  boardingGuide?: {
    primaryCarNo: string;
    transferOptimizedCarNo: string | null;
    recommendedDoorPosition: string;
    reason: string;
    confidenceLevel: SubwayRouteBoardingGuideConfidenceLevel;
  };
  crowdingGuide?: {
    predictedLevel: SubwayRouteCrowdingLevel;
    lessCrowdedCars: string[];
    recommendation: string;
    basedOn: string;
  };
  nearbyEssentials?: {
    stationId: number;
    stationName: string;
    items: Array<{
      essentialType: SubwayRouteNearbyEssentialType;
      name: string;
      walkingMinutes: number;
      openNow: boolean;
      operatingHours: string;
      crowdLevel: SubwayRouteCrowdingLevel;
      crowdUpdatedAt: string;
      poiAccuracyScore: number;
      poiAccuracyReason: string;
      reliabilityScore: number;
      reliabilityReason: string;
    }>;
  };
  travelModeTags?: SubwayRouteTravelModeTag[];
}

export interface SubwayRouteSearchV2Payload {
  modelVersion?: string;
  generatedAt: string;
  sourceStationId: number;
  destinationStationId: number;
  strategy: SubwayRouteStrategy;
  walkingPreference?: SubwayRouteWalkingPreference;
  stationTimeWeekType?: StationTimeWeekType;
  accessibilityMode?: SubwayRouteAccessibilityMode;
  crowdingPreference?: SubwayRouteCrowdingPreference;
  luggageMode?: SubwayRouteLuggageMode;
  travelerContext?: SubwayRouteTravelerContext;
  locale?: 'ko' | 'en' | 'th' | 'cn';
  oneClickActions?: Array<{
    actionType: SubwayRouteOneClickActionType;
    title: string;
    description: string;
    deepLink: string;
    payloadTemplate: string | null;
  }>;
  routes: SubwayRouteV2[];
}

export type SubwayRouteSearchV2Response = ApiResponse<SubwayRouteSearchV2Payload>;
