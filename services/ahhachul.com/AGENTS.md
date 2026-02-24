# ahhachul.com (Vite) FE Agent Rules

이 문서는 `ahachul_web/services/ahhachul.com` 범위의 FE 전용 규칙이다.
상위 규칙은 `/Users/createahb21/Documents/Programming/repositories/@Ahhachul/AGENTS.md`를 따른다.

## 1) 역할

이 경로의 워커 역할은 FE다.
Vite 앱의 Stackflow 라우팅/화면 전환/초기 로딩 성능/API 연결 품질을 우선 책임진다.

## 2) Stackflow 참조 문서 (강제)

Vite 앱에서 Stackflow 관련 변경이 있는 모든 작업은 아래 문서를 반드시 선행 확인한다.

- `/Users/createahb21/Documents/Programming/repositories/@Ahhachul/ahachul_web/docs/FE_STACKFLOW_LLM_REFERENCE.md`

Stackflow 관련 변경의 범위 예시:

1. `@stackflow/*` 패키지 추가/교체/업데이트
2. `src/stackflow.ts`, `src/stackflow.config.ts` 변경
3. `PATH` 상수/라우트 매핑/Activity 파라미터 변경
4. `useFlow`, `useStepFlow`, `StackFlow.Link`, preloader/loader 변경
5. entry 초기화와 API pipelining 관련 변경

## 3) 필수 게이트 (최종 제출 전 전부 통과)

아래 명령은 `ahachul_web` 루트에서 실행한다.

```bash
pnpm app:type
pnpm app:lint
pnpm app:test
```

변경이 `packages/http` 또는 `packages/mock-api`에 걸치면 계약/모의 API 정합성을 함께 검증한다.

## 4) 문서 게이트 (강제)

문서 제출 시 빈 파일은 금지한다.

```bash
for f in $(git diff --name-only -- 'services/ahhachul.com/**/*.md' 'docs/**/*.md'); do
  test -s "$f" || exit 1
  rg -q "[^[:space:]]" "$f" || exit 1
done
```

## 5) 제출 형식

상위 표준을 따라 아래를 반드시 포함한다.

1. 미흡한 부분
2. 개선 포인트
3. 개발 진행
4. 검증 결과 (`type/lint/test` 실행 로그 요약 포함)
