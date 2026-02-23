# QA 검수 리포트: FE 주변 식사/편의시설 추천 V1

- 검수일시: 2026-02-24
- 대상 커밋: 3bfba8eb4dbfb467de807b7f3f9033d6f25f4199

## 1. 실행 결과

- FE 단위 테스트: PASS
- 기능 키워드 스캔: PASS

## 2. 테스트 로그 요약 (tail)

### FE

```

> @ahhachul/app@0.0.0 test /Users/createahb21/Documents/Programming/repositories/ahhachul-orchestration/runtime/worktrees/fe/task-53/services/ahhachul.com
> vitest run "src/apis/request/subway.nearby-places.v2.test.ts"


 RUN  v2.1.8 /Users/createahb21/Documents/Programming/repositories/ahhachul-orchestration/runtime/worktrees/fe/task-53/services/ahhachul.com

 ✓ src/apis/request/subway.nearby-places.v2.test.ts (2 tests) 4ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  00:22:17
   Duration  3.13s (transform 168ms, setup 283ms, collect 1.90s, tests 4ms, environment 540ms, prepare 113ms)
```

## 3. 스캔 결과

```
services/ahhachul.com/src/services/subway.ts:13:  fetchNearbyPlacesV2,
services/ahhachul.com/src/services/subway.ts:161:    queryFn: () => fetchNearbyPlacesV2(params),
packages/http/src/api-contract.ts:56:    stationNearbyPlacesV2: '/v2/stations/nearby-places',
services/ahhachul.com/src/apis/request/subway.ts:207:export const fetchNearbyPlacesV2 = async (params: APINearbyPlacesV2Params) => {
services/ahhachul.com/src/apis/request/subway.ts:209:    API_PATHS.subway.stationNearbyPlacesV2,
services/ahhachul.com/src/components/domain/home/stations/trainRealTimes/TrainRealTimes.component.tsx:592:            주변 간단 식사/편의시설
```

## 4. 판정

- 최종: 통과
