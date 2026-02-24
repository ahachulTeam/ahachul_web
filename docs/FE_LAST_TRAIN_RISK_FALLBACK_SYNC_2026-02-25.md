# FE 검증/동기화 리포트: 막차 리스크 Fallback (2026-02-25)

## 1. 미흡한 부분

- BE가 `last-train-risk` 외부 실패를 `500(code=802)`에서 `200(code=100, riskLevel=RISK)`로 바꾼 이후,
  FE에서 해당 분기 처리가 회귀되지 않음을 보장하는 전용 테스트가 없었습니다.

## 2. 개선 포인트

- `minutesToLastTrain=-1` 문구 처리 로직을 컴포넌트 내부에서 분리해 단위 테스트로 고정합니다.
- 실서버 스모크에서 `last-train-risk` 5xx 발생 여부를 재확인해 동기화 완료 증거를 남깁니다.

## 3. 개발 진행

- 코드 분리
  - `services/ahhachul.com/src/components/domain/home/stations/trainRealTimes/lastTrainRisk.ts`
  - `resolveMinutesToLastTrainText` 유틸 분리
- 테스트 추가
  - `services/ahhachul.com/src/components/domain/home/stations/trainRealTimes/lastTrainRisk.test.ts`
  - 케이스
    - `-1 -> "막차 시간 정보 없음"`
    - `7 -> "막차까지 7분"`
- 컴포넌트 동기화
  - `TrainRealTimes.component.tsx`에서 유틸을 사용하도록 변경

## 4. 검증 결과

- FE 게이트
  - `NX_DAEMON=false pnpm app:type` 통과
  - `NX_DAEMON=false pnpm app:lint` 통과
  - `NX_DAEMON=false pnpm app:test` 통과
- 실서버 스모크 (Vite + BE local)
  - 리포트: `/tmp/vite_real_smoke_report_after_be_last_train_fallback.json`
  - 결과: `checked=34`, `failed=1`, `api5xx=1`
  - 실패 라우트: `/login/callback?type=KAKAO&code=mock-provider-code` (mock social code)
  - `last-train-risk` 5xx: `0건`

## 5. 영향 범위

- `ahhachul.com`(Vite): 막차 리스크 fallback 처리 검증/고정 완료
- `one-app`(Next): 현재 `last-train-risk` 직접 사용 경로가 없어 코드 변경 없음
