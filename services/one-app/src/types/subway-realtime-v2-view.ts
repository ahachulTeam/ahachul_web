import type {
  RealtimeArrivalCode,
  RealtimeConfidenceLevel,
  RealtimeUpDownType,
  TrainRealtimeV2Item,
  TrainRealtimeV2Payload,
} from './subway-realtime-v2';

export interface TrainRealtimeV2CardVM {
  id: string;
  trainNo: string;
  upDownType: RealtimeUpDownType;
  arrivalCode: RealtimeArrivalCode;
  etaSec: number;
  etaMinDisplay: number;
  destinationText: string;
  nextStationText: string;
  countdownEnabled: boolean;
}

export interface TrainRealtimeV2SectionVM {
  generatedAt: string;
  isStale: boolean;
  freshnessSec: number;
  confidenceLevel: RealtimeConfidenceLevel;
  confidenceLabel: '실시간 높음' | '지연 가능' | '정확도 낮음';
  updatedAtLabel: string;
  staleMessage?: string;
  cards: TrainRealtimeV2CardVM[];
  empty: boolean;
}

export function mapRealtimePayloadToSectionVM(
  payload: TrainRealtimeV2Payload,
): TrainRealtimeV2SectionVM {
  const confidenceLabelMap: Record<
    RealtimeConfidenceLevel,
    TrainRealtimeV2SectionVM['confidenceLabel']
  > = {
    HIGH: '실시간 높음',
    MEDIUM: '지연 가능',
    LOW: '정확도 낮음',
  };

  const countdownEnabled = !payload.isStale && payload.confidenceLevel !== 'LOW';

  const cards = payload.trainRealTimes.map((item: TrainRealtimeV2Item) => ({
    id: `${item.trainNo}-${item.upDownType}`,
    trainNo: item.trainNo,
    upDownType: item.upDownType,
    arrivalCode: item.arrivalCode,
    etaSec: Math.max(item.etaSec, 0),
    etaMinDisplay: Math.max(item.etaMinDisplay, 0),
    destinationText: item.destinationStationDirection,
    nextStationText: item.nextStationDirection,
    countdownEnabled,
  }));

  return {
    generatedAt: payload.generatedAt,
    isStale: payload.isStale,
    freshnessSec: payload.freshnessSec,
    confidenceLevel: payload.confidenceLevel,
    confidenceLabel: confidenceLabelMap[payload.confidenceLevel],
    updatedAtLabel: `마지막 갱신: ${payload.lastExternalRecptnAt}`,
    staleMessage: payload.isStale ? '실시간 연결 지연 중' : undefined,
    cards,
    empty: cards.length === 0,
  };
}
