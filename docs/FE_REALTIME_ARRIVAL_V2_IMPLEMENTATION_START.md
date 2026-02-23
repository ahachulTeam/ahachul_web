# FE 실시간 도착정보 V2 구현 시작

- 작성일: 2026-02-23
- 기준 문서:
  - `docs/FE_REALTIME_ARRIVAL_V2_HANDOFF.md`
  - `docs/PM_FE_REALTIME_ARRIVAL_V2_FINAL_REVIEW.md`

## 1. 이번 착수 범위 (Phase A)
1. API 경로 추가: `/v2/trains/real-times`
2. V2 요청 함수 추가
3. 기능 플래그(`VITE_TRAIN_REALTIME_V2_ENABLED`) 기반 V2 우선 호출
4. V2 실패 시 V1 fallback

## 2. 다음 구현(Phase B)
1. `confidenceLevel/isStale/freshnessSec` UI 노출
2. 701/704 분기 UX 반영
3. LOW + eta=0 우선순위 규칙 반영
4. 자동/수동 새로고침 중복 방지

## 3. 리스크
- V2 필드 계약 변동 가능성
- fallback 경로에서 문구 일관성 깨질 가능성

## 4. 완료 정의
- 기능 플래그 ON/OFF 모두에서 열차 목록 조회 정상
- V2 실패 시 V1으로 자동 복귀
