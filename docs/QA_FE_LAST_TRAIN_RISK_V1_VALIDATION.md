# QA 검수 리포트: FE 막차 리스크 V1

- 검수일시: 2026-02-24
- 대상 커밋: 98669a81b902ad78c5b0dde744c0d5716ea77467

## 1. 실행 결과

- FE 단위 테스트: PASS
- 기능 키워드 스캔: PASS

## 2. 테스트 로그 요약 (tail)

### FE

```

> @ahhachul/app@0.0.0 test /Users/createahb21/Documents/Programming/repositories/ahhachul-orchestration/runtime/worktrees/fe/task-41/services/ahhachul.com
> vitest run "src/apis/request/subway.last-train-risk.v2.test.ts"


 RUN  v2.1.8 /Users/createahb21/Documents/Programming/repositories/ahhachul-orchestration/runtime/worktrees/fe/task-41/services/ahhachul.com

 ✓ src/apis/request/subway.last-train-risk.v2.test.ts (2 tests) 4ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  00:04:00
   Duration  3.21s (transform 180ms, setup 295ms, collect 2.10s, tests 4ms, environment 418ms, prepare 94ms)
```

## 3. 스캔 결과

```
services/ahhachul.com/src/apis/request/subway.ts:151:export const fetchLastTrainRiskV2 = async (params: APILastTrainRiskV2Params) => {
services/ahhachul.com/src/apis/request/subway.ts:153:    API_PATHS.subway.stationLastTrainRiskV2,
packages/http/src/api-contract.ts:54:    stationLastTrainRiskV2: '/v2/stations/times/last-train-risk',
services/ahhachul.com/src/services/subway.ts:12:  fetchLastTrainRiskV2,
services/ahhachul.com/src/services/subway.ts:115:    queryFn: () => fetchLastTrainRiskV2(params),
services/ahhachul.com/src/components/domain/home/stations/trainRealTimes/TrainRealTimes.component.tsx:197:        막차 리스크 계산 중...
services/ahhachul.com/src/components/domain/home/stations/trainRealTimes/TrainRealTimes.component.tsx:354:              막차 리스크
services/ahhachul.com/src/components/domain/home/stations/trainRealTimes/TrainRealTimes.component.tsx:357:              <span css={{ fontSize: '12px' }}>도보</span>
```

## 4. 판정

- 최종: 통과
