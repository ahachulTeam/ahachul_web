# PM_TO_FE_BE_SUBWAY_TIMELINE_UX_REDESIGN_HANDOFF_2026-03-03

## 1. 미흡한 부분

- 길찾기 화면이 긴 단일 화면 구조라 핵심 액션 탐색이 느림
- 추천 경로와 상세 이동 흐름이 분리되지 않아 사용자가 의사결정하기 어려움

## 2. 개선 포인트

- 탭 기반 2~3 뎁스 UX로 개편
- 추천 경로 카드에서 상세 타임라인으로 바로 진입
- 개인화/접근성 패널을 분리해 고급 기능 노출 강화

## 3. 개발 진행

### FE 전달

- one-app `/subway/timeline` 개편 구현
  - Hero + 4탭 IA
  - 경로 추천 카드 + 상세 진입
  - 타임라인 상세/개인화/시간표 분리
  - query prefill(`stationId`, `subwayLineId`) 반영
- 피그마 레퍼런스:
  - https://www.figma.com/integrations/claim/pnrFKGX8lZE4dBVQ5i8FAm

### BE 전달

- 신규 API 없음, 기존 계약 유지
- FE 개편 동안 기존 응답 필드 안정성 유지 점검

## 4. 검증 결과

- FE 게이트(type/lint/test) 통과
- 추천 경로/상세 전환/시간표 조회 정상
- query 진입 시 초기 선택 반영 정상
