# FE Realtime Arrival V2 Handoff

## 1. Scope

- Target: `services/one-app` home realtime arrival section.
- This document defines FE rendering contract, component props, and query behavior for `GET /v2/trains/real-times`.
- Keep transport runtime app-local, but keep API/type/query contracts centralized.

## 2. Decision Table (for FE governance)

| Source                                                           | Rule Statement                                                                                  | Enforcement                                        | Migration Scope                               | Rollback                                                               |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| fe-system-design-playbook (`centralize contracts, not runtimes`) | API path/type/query key must be centralized. UI components must consume mapped view-model only. | PR checklist + type-check + lint                   | Home realtime section only (phase 1)          | Feature flag off (`trainRealtimeV2Enabled=false`), keep v1 render path |
| fe-system-design-playbook (`deterministic data ownership`)       | One query key factory for realtime v2. No ad-hoc inline query keys.                             | code review + `@ahhachul/domain` key factory usage | `useTrainRealtimeV2Query` and related widgets | switch query path back to `subwayQueryKeys.train(signature)`           |
| FE Rulebook Rule 9 (API contract layer)                          | endpoint literal 금지, `API_PATHS` or contract constant 사용                                    | `scan:api-endpoint-literals`                       | API layer only                                | revert to previous API module commit                                   |

## 3. Component Tree

- `RealtimeArrivalSection`
- `RealtimeArrivalHeader`
- `RealtimeArrivalCardList`
- `RealtimeArrivalCard`
- `ConfidenceBadge`
- `LastUpdatedLabel`
- `RealtimeArrivalStaleBanner`
- `RealtimeArrivalErrorPanel`
- `RealtimeArrivalEmptyPanel`

## 4. Type Contracts (copy/paste)

```ts
// services/one-app/src/types/subway-realtime-v2.ts

export type RealtimeConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type RealtimeArrivalCode =
  | 'ENTER'
  | 'ARRIVE'
  | 'DEPARTURE'
  | 'BEFORE_STATION_DEPARTURE'
  | 'BEFORE_STATION_ENTER'
  | 'BEFORE_STATION_ARRIVE'
  | 'RUNNING';

export type RealtimeUpDownType = 'UP' | 'DOWN';

export interface TrainRealtimeV2Item {
  trainNo: string;
  upDownType: RealtimeUpDownType;
  arrivalCode: RealtimeArrivalCode;
  etaSec: number;
  etaMinDisplay: number;
  destinationStationDirection: string;
  nextStationDirection: string;
}

export interface TrainRealtimeV2Payload {
  generatedAt: string; // ISO datetime
  dataSource: 'API' | 'CACHE' | 'STALE_CACHE';
  isStale: boolean;
  lastExternalRecptnAt: string; // ISO datetime
  freshnessSec: number;
  confidenceLevel: RealtimeConfidenceLevel;
  trainRealTimes: TrainRealtimeV2Item[];
}

export interface TrainRealtimeV2Response {
  result: TrainRealtimeV2Payload;
}

export interface TrainRealtimeV2Query {
  stationId: number;
  subwayLineId: number;
  upDownType?: RealtimeUpDownType;
  limit?: number; // default 2, max 4
}
```

```ts
// services/one-app/src/types/subway-realtime-v2-view.ts
import type {
  RealtimeArrivalCode,
  RealtimeConfidenceLevel,
  RealtimeUpDownType,
  TrainRealtimeV2Item,
  TrainRealtimeV2Payload,
} from './subway-realtime-v2';

export interface TrainRealtimeV2CardVM {
  id: string; // `${trainNo}-${upDownType}`
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
  updatedAtLabel: string; // e.g. "마지막 갱신: 14:40:12"
  staleMessage?: string; // e.g. "실시간 연결 지연 중"
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
```

## 5. Component Props (copy/paste)

```ts
// services/one-app/src/component/realtime-arrival-v2/types.ts
import type {
  RealtimeConfidenceLevel,
  RealtimeArrivalCode,
  RealtimeUpDownType,
} from '@/types/subway-realtime-v2';

export interface RealtimeArrivalSectionProps {
  stationId: number;
  subwayLineId: number;
  upDownType?: RealtimeUpDownType;
  limit?: number;
  className?: string;
}

export interface RealtimeArrivalHeaderProps {
  title: string;
  subtitle?: string;
  onRefreshClick?: () => void;
  isRefreshing?: boolean;
}

export interface RealtimeArrivalCardListProps {
  items: RealtimeArrivalCardProps[];
  empty: boolean;
  emptyText?: string;
}

export interface RealtimeArrivalCardProps {
  trainNo: string;
  upDownType: RealtimeUpDownType;
  arrivalCode: RealtimeArrivalCode;
  etaSec: number;
  etaMinDisplay: number;
  destinationText: string;
  nextStationText: string;
  countdownEnabled: boolean;
  onClick?: (trainNo: string) => void;
}

export interface ConfidenceBadgeProps {
  level: RealtimeConfidenceLevel;
  label: '실시간 높음' | '지연 가능' | '정확도 낮음';
}

export interface LastUpdatedLabelProps {
  updatedAtLabel: string;
  freshnessSec: number;
}

export interface RealtimeArrivalStaleBannerProps {
  show: boolean;
  message: string;
}

export interface RealtimeArrivalErrorPanelProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export interface RealtimeArrivalEmptyPanelProps {
  title?: string;
  description?: string;
}
```

## 6. Query Key + Hook Contract

```ts
// packages/domain/src/query.ts (append)
export const subwayRealtimeV2QueryKeys = {
  all: ['subway-realtime-v2'] as const,
  list: (signature = '') =>
    [...subwayRealtimeV2QueryKeys.all, normalizeQuerySignature(signature)] as const,
} as const;
```

```ts
// services/one-app/src/hook/useTrainRealtimeV2Query.ts
import { useQuery } from '@tanstack/react-query';

import {
  buildQuerySignature,
  QUERY_GC_TIME,
  QUERY_STALE_TIME,
  subwayRealtimeV2QueryKeys,
} from '@ahhachul/domain';

import type { TrainRealtimeV2Query, TrainRealtimeV2Response } from '@/types/subway-realtime-v2';

export function useTrainRealtimeV2Query(params: TrainRealtimeV2Query) {
  const signature = buildQuerySignature(params);

  return useQuery<TrainRealtimeV2Response>({
    queryKey: subwayRealtimeV2QueryKeys.list(signature),
    queryFn: async () => {
      // app-local transport 유지 (fetch/axios)
      throw new Error('implement queryFn');
    },
    staleTime: 20 * 1000,
    gcTime: QUERY_GC_TIME.feed,
    refetchInterval: 20 * 1000,
    refetchIntervalInBackground: false,
    retry: 1,
  });
}
```

## 7. Rendering Rules (must)

- `HIGH|MEDIUM` and `isStale=false`: 분 값 + 카운트다운 노출.
- `LOW` or `isStale=true`: 카운트다운 정지, 상태 문구 우선.
- 항상 `updatedAtLabel` 노출.
- `empty=true`: 빈 상태 패널 노출.
- API 실패 + 이전 데이터 있음: 이전 데이터 유지 + stale 배너.
- API 실패 + 이전 데이터 없음: 에러 패널 + 재시도 버튼.

## 8. Event Tracking Names

- `rt_home_impression`
- `rt_home_refresh_click`
- `rt_home_api_fail`
- `rt_home_stale_shown`
- `rt_home_confidence_shown`
- `rt_home_to_detail_click`

## 9. FE QA Acceptance

- confidence badge가 `freshness` 정책대로 바뀜.
- stale 상태에서 countdown이 멈춤.
- 20초 폴링은 foreground에서만 실행됨.
- 에러/빈상태/재시도 UI 정상.
- 타입체크 통과 (`pnpm nextjs:type`).
- endpoint literal 없이 contract 경유 확인 (`pnpm validate:api-contract`).

## 10. Recommended File Placement

- `services/one-app/src/types/subway-realtime-v2.ts`
- `services/one-app/src/types/subway-realtime-v2-view.ts`
- `services/one-app/src/component/realtime-arrival-v2/types.ts`
- `services/one-app/src/hook/useTrainRealtimeV2Query.ts`
- `packages/domain/src/query.ts` (query key factory append)
