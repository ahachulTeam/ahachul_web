import type { ApiResponse } from './common';
import type {
  DelayProofCommunitySignal,
  DelayProofConfidenceLevel,
  DelayProofOfficialIncident,
} from './delay-proof';
import type { RealtimeUpDownType } from './subway-realtime-v2';

export interface DelayCenterOverviewQuery {
  stationId: number;
  subwayLineId: number;
  upDownType?: RealtimeUpDownType;
  windowMinutes?: number;
  incidentLimit?: number;
  signalLimit?: number;
}

export interface DelayCenterRealtimeOverview {
  generatedAt: string;
  dataSource: string;
  isStale: boolean;
  freshnessSec: number;
  confidenceLevel: DelayProofConfidenceLevel;
  etaSec: number | null;
  etaMinDisplay: number | null;
  destinationStationDirection: string | null;
  nextStationDirection: string | null;
}

export interface DelayCenterOfficialOverview {
  dataSource: string;
  eventCount: number;
  activeEventCount: number;
  incidents: DelayProofOfficialIncident[];
}

export interface DelayCenterCommunityOverview {
  signalCount: number;
  distinctAuthors: number;
  medianReportedDelayMin: number | null;
  confidenceLevel: DelayProofConfidenceLevel;
  signals: DelayProofCommunitySignal[];
}

export interface DelayCenterRecommendation {
  gradePreview: 'A' | 'B' | 'C';
  confidenceLevel: DelayProofConfidenceLevel;
  estimatedDelayMin: number;
  recommendedExpectedArrivalAt: string;
  recommendedMessage: string;
}

export interface DelayCenterOverviewPayload {
  generatedAt: string;
  stationId: number;
  subwayLineId: number;
  upDownType: RealtimeUpDownType | null;
  realtime: DelayCenterRealtimeOverview;
  official: DelayCenterOfficialOverview;
  community: DelayCenterCommunityOverview;
  recommendation: DelayCenterRecommendation;
}

export type DelayCenterOverviewResponse = ApiResponse<DelayCenterOverviewPayload>;
