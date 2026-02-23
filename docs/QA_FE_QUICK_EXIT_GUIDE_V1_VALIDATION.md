# QA 검수 리포트: FE 빠른하차/출구 추천 V1

- 검수일시: 2026-02-24
- 대상 커밋: 2dee31b5c47c43c43713f91b7907a172a25cb43d

## 1. 실행 결과

- FE 단위 테스트: PASS
- 기능 키워드 스캔: PASS

## 2. 테스트 로그 요약 (tail)

### FE

```

> @ahhachul/app@0.0.0 test /Users/createahb21/Documents/Programming/repositories/ahhachul-orchestration/runtime/worktrees/fe/task-46/services/ahhachul.com
> vitest run "src/apis/request/subway.quick-exits.v2.test.ts"


 RUN  v2.1.8 /Users/createahb21/Documents/Programming/repositories/ahhachul-orchestration/runtime/worktrees/fe/task-46/services/ahhachul.com

 ✓ src/apis/request/subway.quick-exits.v2.test.ts (2 tests) 7ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  00:13:14
   Duration  3.29s (transform 178ms, setup 272ms, collect 2.15s, tests 7ms, environment 473ms, prepare 93ms)
```

## 3. 스캔 결과

```
services/ahhachul.com/src/apis/request/subway.ts:178:export const fetchQuickExitsV2 = async (params: APIQuickExitsV2Params) => {
services/ahhachul.com/src/apis/request/subway.ts:180:    API_PATHS.subway.stationQuickExitsV2,
services/ahhachul.com/src/components/domain/home/stations/trainRealTimes/TrainRealTimes.component.tsx:274:        빠른하차/출구 추천 불러오는 중...
services/ahhachul.com/src/components/domain/home/stations/trainRealTimes/TrainRealTimes.component.tsx:480:            빠른하차/출구 추천
services/ahhachul.com/src/services/subway.ts:13:  fetchQuickExitsV2,
services/ahhachul.com/src/services/subway.ts:137:    queryFn: () => fetchQuickExitsV2(params),
packages/http/src/api-contract.ts:55:    stationQuickExitsV2: '/v2/stations/quick-exits',
```

## 4. 판정

- 최종: 통과
