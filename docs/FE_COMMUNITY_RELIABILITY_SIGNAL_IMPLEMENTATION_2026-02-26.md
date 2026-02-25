# FE 구현 기록: 역/호선 커뮤니티 신뢰 신호 (2026-02-26)

## 1. 미흡한 부분

1. 커뮤니티 화면에서 지연 제보의 신뢰도를 즉시 해석할 수 있는 UI가 없었다.
2. 동일 시간대 다중 제보 급증 여부가 노출되지 않아 체감 지연 판단 근거가 약했다.

## 2. 개선 포인트

1. one-app/Vite 공통으로 커뮤니티 상단에 "지연 신뢰 신호 카드"를 추가한다.
2. `SPIKE|ELEVATED|NONE` 배지 + `HIGH|MEDIUM|LOW` 신뢰도 + 집계 수치를 같이 보여준다.
3. 호선 미선택/로딩/에러/데이터 없음 상태를 명시적으로 분기한다.

## 3. 개발 진행

### 3.1 one-app

1. 신규 타입/요청 유틸

- `src/types/community-delay-signal.ts`
- `src/lib/community-delay-signals.ts`
- `src/lib/community-delay-signals.spec.ts`

2. 신규 UI

- `src/app/(main-service)/community/_components/CommunityReliabilitySignal.tsx`

3. 페이지 연동

- `src/app/(main-service)/community/page.tsx`
- `src/app/(main-service)/community/line/[subwayLineId]/page.tsx`
- `src/app/(main-service)/community/station/[stationId]/page.tsx`

### 3.2 vite

1. API/타입/서비스 확장

- `src/types/subway.ts` (`CommunityDelaySignalsQuery/Payload`)
- `src/apis/request/subway.ts` (`fetchCommunityDelaySignalsV2`)
- `src/services/subway.ts` (`useFetchCommunityDelaySignals`)
- `src/apis/request/subway.delay-center-and-proof.v2.test.ts` 테스트 추가

2. 신규 UI

- `src/components/domain/community/searchResults/reliability/CommunityReliabilitySignal.component.tsx`
- `src/components/domain/community/searchResults/reliability/CommunityReliabilitySignal.styled.tsx`
- `src/components/domain/community/searchResults/index.ts` export 확장

3. 페이지 연동

- `src/pages/community/page.tsx`
- `src/pages/community/line.tsx`
- `src/pages/community/station.tsx`

### 3.3 mock-api 정합성

1. `packages/mock-api/src/index.ts`

- `/v2/community/delay-signals` 응답을 신규 계약 필드 포함 형태로 확장
- `stationId` 유무에 따라 배지/집계 샘플이 다르게 내려오도록 보강

## 4. 검증 결과

1. one-app

- `NX_DAEMON=false pnpm nextjs:type` 통과
- `NX_DAEMON=false pnpm nextjs:lint` 통과
- `NX_DAEMON=false pnpm nextjs:test` 통과

2. vite

- `NX_DAEMON=false pnpm app:type` 통과
- `NX_DAEMON=false pnpm app:lint` 통과
- `NX_DAEMON=false pnpm app:test` 통과

3. mock-api

- `pnpm --filter @ahhachul/mock-api lint` 통과
- `pnpm --filter @ahhachul/mock-api test` 통과
