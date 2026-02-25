# PM -> FE/BE 핸드오프: 역/호선 커뮤니티 신뢰 신호 (2026-02-26)

## 1. 목표

- 커뮤니티 글 목록 상단에서 "지연 제보 신뢰도"를 즉시 파악 가능하게 만든다.
- 동일 시간대 다중 제보가 발생하면 `신뢰 상승 배지`를 노출한다.

## 2. BE 전달 사항

### 2.1 구현 범위

1. `GET /v2/community/delay-signals` 확장

- Query에 `stationId` optional 추가
- Response에 아래 필드 추가
  - `stationId`
  - `timeSlotMinutes`
  - `reliabilityBadgeLevel`
  - `sameTimeSlotSignalCount`
  - `sameTimeSlotDistinctAuthors`

2. 배지 계산 로직

- 시간 슬롯: 10분
- `SPIKE`: count>=6 && authors>=4
- `ELEVATED`: count>=3 && authors>=2
- 그 외 `NONE`

3. docs 테스트 업데이트

- `DelayProofControllerDocsTest`에 신규 쿼리/응답 필드 반영

### 2.2 주의사항

- 기존 `confidenceLevel` 규칙은 유지한다.
- 신규 배지는 "동일 시간대 군집" 신호로 별도 제공한다.

## 3. FE 전달 사항

### 3.1 공통

- 커뮤니티 페이지 상단(필터 아래)에 `신뢰 신호 카드`를 추가한다.
- 카드 구성
  - 배지 텍스트: `급증`, `증가`, `일반`
  - 신뢰도 텍스트: `HIGH|MEDIUM|LOW`
  - 집계: `최근 N분 신호 수`, `작성자 수`, `동일 시간대 제보/작성자`

### 3.2 one-app

1. 적용 대상

- `/community`
- `/community/line/{subwayLineId}`
- `/community/station/{stationId}`

2. 상태 분기

- 호선 미선택: 안내 문구 노출
- 로딩: 스켈레톤
- API 실패: 오류 카드(재시도)
- 데이터 없음: 중립 카드

### 3.3 vite

1. 적용 대상

- `CommunityPage`
- `CommunityLinePage`
- `CommunityStationPage`

2. 필터 처리

- `ALL_LINES`면 API 호출하지 않고 안내 문구
- `ONLY_MY_LINE`이면 사용자 대표 호선으로 변환 후 호출
- 특정 호선이면 그대로 호출

## 4. 완료 조건

1. BE docs 테스트 통과
2. one-app/vite type/lint/test 통과
3. 메인/호선/역 커뮤니티 페이지에서 신뢰 카드 확인 가능
