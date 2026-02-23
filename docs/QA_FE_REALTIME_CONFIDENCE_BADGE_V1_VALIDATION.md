# QA 검수 리포트: FE 실시간 confidence 배지 V1

- 검수일시: 2026-02-23
- 대상 커밋: 4ac1b07137e2fc4ae1aae64add3c682287205f4c

## 1. 실행 결과

- FE 단위 테스트: PASS
- 기능 키워드 스캔: PASS

## 2. 테스트 로그 요약 (tail)

### FE

```

> @ahhachul/app@0.0.0 test /Users/createahb21/Documents/Programming/repositories/ahhachul-orchestration/runtime/worktrees/fe/task-35/services/ahhachul.com
> vitest run "src/apis/request/subway.v2-normalize.test.ts"


 RUN  v2.1.8 /Users/createahb21/Documents/Programming/repositories/ahhachul-orchestration/runtime/worktrees/fe/task-35/services/ahhachul.com

 ✓ src/apis/request/subway.v2-normalize.test.ts (2 tests) 4ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  23:49:43
   Duration  4.02s (transform 1.24s, setup 264ms, collect 2.95s, tests 4ms, environment 440ms, prepare 62ms)
```

## 3. 스캔 결과

```
services/ahhachul.com/src/apis/request/subway.ts:79:export const normalizeTrainInfoV2Response = (
services/ahhachul.com/src/components/domain/home/stations/trainRealTimes/TrainRealTimes.component.tsx:53:    return '신뢰도 높음';
services/ahhachul.com/src/components/domain/home/stations/trainRealTimes/TrainRealTimes.component.tsx:56:    return '신뢰도 보통';
services/ahhachul.com/src/components/domain/home/stations/trainRealTimes/TrainRealTimes.component.tsx:59:    return '신뢰도 낮음';
```

## 4. 판정

- 최종: 통과
