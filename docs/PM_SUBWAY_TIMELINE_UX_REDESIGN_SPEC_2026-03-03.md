# PM_SUBWAY_TIMELINE_UX_REDESIGN_SPEC_2026-03-03

## 1. 미흡한 부분

- 기존 `/subway/timeline`은 입력 폼/결과/시간표가 1뎁스로 길게 연결되어 핵심 정보 파악이 느리다.
- 경로 추천과 상세 타임라인(어디서 타야 하는지, 환승 포인트)이 분리되지 않아 UX 집중도가 낮다.
- 접근성/혼잡/짐 모드 등 고급 기능이 “설정 항목”으로만 보이고, 실제 체감 가치가 드러나지 않는다.

## 2. 개선 포인트

- IA를 4개 탭으로 재구성한다.
  - `길찾기 허브`: 입력 + 추천 경로 카드
  - `타임라인 상세`: 선택 경로의 단계별 이동 흐름
  - `개인화/접근성`: 접근성·혼잡·짐·원클릭 액션
  - `역 전체 시간표`: 요일/상하행 시간표
- 상단 Hero 영역에서 현재 맥락(호선, 출발/도착, 추천 경로 수)을 즉시 표시한다.
- 추천 카드에서 `타임라인 상세 보기`로 2뎁스 이동을 제공해 읽기/실행 동선을 분리한다.
- URL query(`stationId`, `subwayLineId`)를 초기 입력값으로 반영해 진입 맥락을 유지한다.

## 3. 개발 진행

### FE(one-app)

- 대상: `services/one-app/src/app/(main-service)/subway/timeline/page.tsx`
- 반영 내용:
  1. 상단 Hero + 탭형 IA 추가
  2. 경로 추천 카드/품질 점수/배지 구조 재배치
  3. 선택 경로 중심 타임라인 상세 패널 추가
  4. 개인화/접근성 패널(접근성/혼잡/짐/이용맥락/언어 + 원클릭 액션) 정리
  5. 역 전체 시간표 패널 분리
  6. query 기반 초기값 prefill(`stationId`, `subwayLineId`) 추가

### BE

- 이번 스프린트에서는 신규 API 추가 없음.
- 기존 API 계약 유지:
  - `GET /v3/subway/routes/search`
  - `GET /v2/stations/times/full`
  - `GET /subway-lines`
- FE UX 개편에 따른 스펙 변경점 없음(호환 유지).

## 4. 검증 결과(완료 기준)

- one-app 타입/린트/테스트 게이트 통과
- 경로 추천 -> 타임라인 상세 전환 동작 확인
- query 진입(`stationId`, `subwayLineId`) 시 초기값 반영 확인
- 시간표 탭에서 요일 전환/상하행 목록 노출 확인

## 5. 피그마 기준

- 디자인 기준 파일(클레임 링크):
  - https://www.figma.com/integrations/claim/pnrFKGX8lZE4dBVQ5i8FAm
- 화면 구성:
  1. 길찾기 허브
  2. 타임라인 상세
  3. 개인화 설정
