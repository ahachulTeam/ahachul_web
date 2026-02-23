# QA 검수 리포트: 실시간 도착정보 V2 Phase A

- 검수일시: 2026-02-23
- 대상:
  - FE 테스트 커밋: 2153d722e92e075910612f64a0bb79ee917b8df5
  - BE 테스트 커밋: 9e2d060dfa5f290abc85d16abde4a5cd388fe9f9

## 1. 테스트 실행 결과

- FE 단위 테스트: PASS
- BE 컨트롤러 docs 테스트: PASS

## 2. 검수 항목

1. FE

- V2 요청 함수 테스트 파일 존재
- V2 엔드포인트 경로/파라미터 검증 테스트 통과

2. BE

- V2 전용 컨트롤러 docs 테스트 파일 존재
- /v2/trains/real-times 응답 필드 문서화 테스트 통과

## 3. 실행 로그 요약 (tail)

### FE

```

> @ahhachul/app@0.0.0 test /Users/createahb21/Documents/Programming/repositories/ahhachul-orchestration/runtime/worktrees/fe/task-17/services/ahhachul.com
> vitest run "src/apis/request/subway.v2.test.ts"


 RUN  v2.1.8 /Users/createahb21/Documents/Programming/repositories/ahhachul-orchestration/runtime/worktrees/fe/task-17/services/ahhachul.com

 ✓ src/apis/request/subway.v2.test.ts (2 tests) 4ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  23:09:25
   Duration  2.27s (transform 101ms, setup 212ms, collect 1.41s, tests 4ms, environment 368ms, prepare 59ms)

```

### BE

```
> Task :application:processResources
Execution optimizations have been disabled for task ':application:processResources' to ensure correctness due to the following reasons:
  - Gradle detected a problem with the following location: '/Users/createahb21/Documents/Programming/repositories/@Ahhachul/ahhachul_backend/application/src/main/resources'. Reason: Task ':application:processResources' uses this output of task ':application:copySecret' without declaring an explicit or implicit dependency. This can lead to incorrect results being produced, depending on what order the tasks are executed. Please refer to https://docs.gradle.org/7.6.1/userguide/validation_problems.html#implicit_dependency for more details about this problem.

> Task :application:classes
> Task :application:jar SKIPPED
> Task :application:inspectClassesForKotlinIC UP-TO-DATE
> Task :application:kaptGenerateStubsTestKotlin UP-TO-DATE
> Task :application:kaptTestKotlin UP-TO-DATE
> Task :application:compileTestKotlin UP-TO-DATE
> Task :application:compileTestJava NO-SOURCE

> Task :application:processTestResources
Execution optimizations have been disabled for task ':application:processTestResources' to ensure correctness due to the following reasons:
  - Gradle detected a problem with the following location: '/Users/createahb21/Documents/Programming/repositories/@Ahhachul/ahhachul_backend/application/src/test/resources'. Reason: Task ':application:processTestResources' uses this output of task ':application:copyTestSecret' without declaring an explicit or implicit dependency. This can lead to incorrect results being produced, depending on what order the tasks are executed. Please refer to https://docs.gradle.org/7.6.1/userguide/validation_problems.html#implicit_dependency for more details about this problem.

> Task :application:testClasses
> Task :application:test UP-TO-DATE

Deprecated Gradle features were used in this build, making it incompatible with Gradle 8.0.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

See https://docs.gradle.org/7.6.1/userguide/command_line_interface.html#sec:command_line_warnings

Execution optimizations have been disabled for 3 invalid unit(s) of work during this build to ensure correctness.
Please consult deprecation warnings for more details.

BUILD SUCCESSFUL in 1s
21 actionable tasks: 3 executed, 18 up-to-date
```

## 4. QA 판정

- FE: PASS
- BE: PASS
- 최종: 통과

## 5. 후속 권고

1. FE: confidence/isStale/701/704 UI 분기 테스트 추가
2. BE: freshness/eta 계산 규칙 단위 테스트 추가
3. 통합: FE-BE 계약 JSON fixture 기반 E2E 계약 테스트 추가
