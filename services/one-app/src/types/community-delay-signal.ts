import type { ApiResponse } from './common';
import type { DelayProofConfidenceLevel } from './delay-proof';

export type CommunityReliabilityBadgeLevel = 'NONE' | 'ELEVATED' | 'SPIKE';

export interface CommunityDelaySignalsQuery {
  subwayLineId: number;
  stationId?: number;
  windowMinutes?: number;
  limit?: number;
}

export interface CommunityDelaySignalItem {
  postId: number;
  createdAt: string;
  writer: string;
  matchedKeyword: string;
  reportedDelayMin: number | null;
  snippet: string;
}

export interface CommunityDelaySignalsPayload {
  generatedAt: string;
  subwayLineId: number;
  stationId: number | null;
  windowMinutes: number;
  timeSlotMinutes: number;
  signalCount: number;
  distinctAuthors: number;
  medianReportedDelayMin: number | null;
  confidenceLevel: DelayProofConfidenceLevel;
  reliabilityBadgeLevel: CommunityReliabilityBadgeLevel;
  sameTimeSlotSignalCount: number;
  sameTimeSlotDistinctAuthors: number;
  signals: CommunityDelaySignalItem[];
}

export type CommunityDelaySignalsResponse = ApiResponse<CommunityDelaySignalsPayload>;
