# PM 기능 명세: 역/호선 커뮤니티 신뢰 신호 고도화 (2026-02-26)

## 1. 미흡한 부분

1. 현재 역/호선 커뮤니티는 글 목록만 제공되어, "지금 지연 제보가 실제로 몰리는 상황인지"를 즉시 판단하기 어렵다.
2. 동일 시간대 다중 제보(군집) 여부가 UI에 드러나지 않아, 사용자가 지연 체감을 신뢰할 근거가 부족하다.
3. 지연/연착 키워드가 포함된 커뮤니티 데이터가 이미 존재함에도, 커뮤니티 화면에서 신뢰 신호로 재활용되지 않는다.

## 2. 개선 포인트

1. `GET /v2/community/delay-signals`를 역/호선 커뮤니티 화면에 직접 연결한다.
2. "동일 시간대 다중 제보"를 별도 배지로 노출한다.
3. 호선 기반 신호 + (선택 시) 역 범위 신호를 함께 지원한다.

## 3. 정책 및 규칙

### 3.1 API 계약

- Endpoint: `GET /v2/community/delay-signals`
- Query
  - `subwayLineId` (Long, required)
  - `stationId` (Long, optional)
  - `windowMinutes` (Int, optional, default 30, min 5, max 120)
  - `limit` (Int, optional, default 40, min 5, max 200)
- Response 핵심 필드
  - `generatedAt`
  - `subwayLineId`
  - `stationId` (nullable)
  - `windowMinutes`
  - `timeSlotMinutes` (고정 10)
  - `signalCount`
  - `distinctAuthors`
  - `medianReportedDelayMin`
  - `confidenceLevel` (`HIGH|MEDIUM|LOW`)
  - `reliabilityBadgeLevel` (`NONE|ELEVATED|SPIKE`)
  - `sameTimeSlotSignalCount`
  - `sameTimeSlotDistinctAuthors`
  - `signals[]`

### 3.2 동일 시간대 다중 제보 배지 규칙

- 시간 슬롯 단위: 10분
- `SPIKE`
  - 같은 10분 슬롯 내 제보 수 `>= 6`
  - 같은 슬롯 내 작성자 수 `>= 4`
- `ELEVATED`
  - 같은 10분 슬롯 내 제보 수 `>= 3`
  - 같은 슬롯 내 작성자 수 `>= 2`
- `NONE`
  - 그 외

### 3.3 화면 정책

1. 커뮤니티 메인

- 특정 호선 선택 시 신뢰 신호 카드 노출
- `전체 호선` 상태에서는 안내 문구 노출

2. 호선 커뮤니티

- 진입 즉시 신뢰 신호 카드 노출
- 배지(`SPIKE|ELEVATED|NONE`) + 집계 수치 표시

3. 역 커뮤니티

- `stationId + subwayLineId`가 확보되면 역 범위 신뢰 카드 노출
- 호선 미선택 시 "호선 선택 시 신뢰 신호 제공" 안내

## 4. 개발 진행(역할별)

1. BE

- `stationId` 필터 확장
- `timeSlotMinutes`, `reliabilityBadgeLevel`, `sameTimeSlot*` 메타 계산
- docs 테스트 갱신

2. FE(one-app)

- 커뮤니티 페이지(메인/호선/역) 신뢰 카드 컴포넌트 추가
- 로딩/에러/미선택/데이터없음 상태 분기

3. FE(vite)

- 커뮤니티 페이지(메인/호선/역) 신뢰 카드 추가
- 기존 필터 상태와 연동(ALL_LINES / ONLY_MY_LINE / 특정 호선)

## 5. 검증 결과 기준(완료조건)

1. BE

- `DelayProofControllerDocsTest`에서 신규 필드/쿼리 파라미터 검증 통과

2. FE

- one-app: `nextjs:type`, `nextjs:lint`, `nextjs:test` 통과
- vite: `app:type`, `app:lint`, `app:test` 통과

3. UX 확인

- 같은 호선에서 다중 제보 mock/실데이터 상황 시 배지 단계가 변화한다.
- 배지/수치/설명 문구가 역/호선 스코프에 맞게 노출된다.
