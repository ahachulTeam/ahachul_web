# FE Playwright Mock Audit (2026-02-24)

## 1. 미흡한 부분

- Playwright 스모크에서 `실패`와 `미구현 라우트(패리티 갭)`이 구분되지 않아 one-app 404가 런타임 실패로 과대 집계되었다.
- mock API 경로 정규화가 과도해 Vite 모듈 요청(`/auth/index.ts`, `/common/form/index.ts`)을 API로 오인했다.
- `/api/common/presigned/*` 경로 정규화가 누락되면 mock API 테스트가 `ECONNREFUSED`로 실패한다.
- one-app은 서버 컴포넌트 fetch가 mock worker 대상이 아니어서, BE 미기동 시 `API_BASE_URL` 호출 실패 로그가 발생한다.

## 2. 개선 포인트

- 스모크 기준을 `failed`와 `parityGap`으로 분리해 실제 런타임 장애와 기능 격차를 독립 집계한다.
- `packages/mock-api` 경로 정규화에 정적 모듈 확장자 제외 규칙을 추가하고, `/common/presigned`는 정확 경로로 매칭한다.
- one-app 패리티 갭 19건은 기능 이행 백로그로 별도 관리한다(테스트 실패로 혼입 금지).
- one-app 서버측 mock 보강(후속):
  - 대안 A: Next 서버에서 `msw/node`로 fetch 인터셉트 부트스트랩
  - 대안 B: 로컬 mock BFF(8788) 프록시 후 `API_BASE_URL`을 프록시로 고정

## 3. 개발 진행

- `packages/mock-api/src/index.ts`
  - 정적 리소스/모듈 요청 제외(`.ts/.tsx/.js/.css/...`, `/@vite`, `/node_modules`)
  - `/common/presigned/*` 및 `/api/common/presigned/*` 정규화 처리
  - `common` 세그먼트 오탐 제거로 모듈 로딩 간섭 제거
- `services/ahhachul.com/tmp-playwright-mock-smoke.cjs`
  - one-app 미구현 라우트 19건을 `parityGap`으로 분리
  - 리포트/요약에 `parityGaps` 집계 추가
  - `failed` 판정 시 parity gap 제외

## 4. 검증 결과

- Playwright 스모크 최종:
  - 1차 안정화: `generatedAt=2026-02-24T12:49:01.516Z`
  - `checkedRoutes=71`
  - `failedRoutes=0`
  - `unhandledMockSignals=0`
  - `parityGaps=19` (one-app 미구현 라우트)
- Playwright 스모크 2차(패리티 갭 19개 개통 후):
  - `generatedAt=2026-02-24T13:06:42.348Z`
  - `checkedRoutes=71`
  - `failedRoutes=0`
  - `unhandledMockSignals=0`
  - `parityGaps=0`
- FE 게이트:
  - `NX_DAEMON=false pnpm app:type` 통과
  - `NX_DAEMON=false pnpm app:lint` 통과
  - `NX_DAEMON=false pnpm app:test` 통과
  - `NX_DAEMON=false pnpm nextjs:type` 통과
  - `NX_DAEMON=false pnpm nextjs:lint` 통과
  - `NX_DAEMON=false pnpm nextjs:test` 통과
- mock-api 게이트:
  - `pnpm --filter @ahhachul/mock-api lint` 통과
  - `pnpm --filter @ahhachul/mock-api test` 통과

## 5. 실제 API vs mock 정합성 메모

- 이번 스모크 범위에서 `Unhandled mock API endpoint`는 0건으로 수렴했다.
- 남은 이슈는 API 계약 미스매치가 아니라 one-app 미구현 페이지 라우트(19건)다.
- one-app 서버 컴포넌트 fetch는 여전히 로컬 BE 의존 로그가 발생하므로, 서버측 mock 전략을 후속 태스크로 분리해야 한다.

### one-app parity gap 라우트(19)

1. `/community/1001/edit`
2. `/complaint/2001/edit`
3. `/me/setting`
4. `/me/setting/account`
5. `/talk`
6. `/talk/1`
7. `/talk/settings`
8. `/setting`
9. `/hashtag`
10. `/subway`
11. `/subway/map`
12. `/subway/timeline`
13. `/news/1`
14. `/comments/7001/edit?returnTo=/community/1001`
15. `/comments/7001/reply?returnTo=/community/1001`
16. `/login/settings/subway`
17. `/login/settings/nickname`
18. `/user/%EC%95%84%EC%B0%A8%EC%B2%A0%EB%9F%AC/settings`
19. `/user/%EC%95%84%EC%B0%A8%EC%B2%A0%EB%9F%AC/preview`
