import type { ApiResponse } from './common';
import type { RealtimeUpDownType } from './subway-realtime-v2';

export type DelayProofGrade = 'A' | 'B' | 'C';
export type DelayProofConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface DelayProofCreateRequest {
  stationId: number;
  subwayLineId: number;
  upDownType?: RealtimeUpDownType;
  expectedArrivalAt?: string;
  customMessage?: string;
}

export interface DelayProofOfficialIncident {
  eventId: string;
  occurredAt: string;
  resolvedAt: string | null;
  severity: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string | null;
}

export interface DelayProofCommunitySignal {
  postId: number;
  createdAt: string;
  writer: string;
  matchedKeyword: string;
  reportedDelayMin: number | null;
  snippet: string;
}

export interface DelayProofEvidenceSummary {
  official: {
    matched: boolean;
    eventCount: number;
    dataSource: string;
    incidents: DelayProofOfficialIncident[];
  };
  community: {
    signalCount: number;
    distinctAuthors: number;
    medianReportedDelayMin: number | null;
    confidenceLevel: DelayProofConfidenceLevel;
    signals: DelayProofCommunitySignal[];
  };
  realtime: {
    isStale: boolean;
    freshnessSec: number;
    confidenceLevel: DelayProofConfidenceLevel;
    generatedAt: string;
  };
}

export interface DelayProofPayload {
  proofId: string;
  issuedAt: string;
  expiresAt: string;
  grade: DelayProofGrade;
  confidenceLevel: DelayProofConfidenceLevel;
  evidenceSummary: DelayProofEvidenceSummary;
  text: string;
  shareUrl: string;
  signature: string;
}

export type DelayProofCreateResponse = ApiResponse<DelayProofPayload>;
export type DelayProofGetResponse = ApiResponse<DelayProofPayload>;
