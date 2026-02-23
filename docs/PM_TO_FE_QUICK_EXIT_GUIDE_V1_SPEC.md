# PM -> FE 기능명세서: 빠른하차/출구 추천 V1

- 작성일: 2026-02-24
- 기준 문서: `ahachul_data/docs/PM_SUBWAY_PUBLIC_DATA_DEEP_RESEARCH_2026-02-23.md`
- 목표: 홈 역 카드에서 빠른하차 칸/추천 출구를 한눈에 제공

## 1. 구현 범위
1. 홈 `TrainRealTimes` 카드에 `빠른하차/출구 추천` 섹션 추가
2. BE 신규 API `GET /v2/stations/quick-exits` 연동
3. 현재 상/하행 필터(`UP|DOWN`) 기준 추천 1~2건 표시
4. 추천 항목 표시 형식: `5-2칸 · 출구 3 · 약 2분 단축`

## 2. 표시 규칙
1. 로딩: `빠른하차/출구 추천 불러오는 중...`
2. 성공: 추천 리스트 노출
3. 실패/데이터 없음: `추천 정보 준비 중입니다.`
4. confidence 표시: `HIGH|MEDIUM|LOW`에 따라 배지 색상 구분

## 3. 요청 규칙
1. `stationId`, `subwayLineId`: 현재 선택 역/노선
2. `upDownType`: 현재 카드 상/하행 토글 값

## 4. 테스트 요구사항
1. 요청 단위 테스트 추가(`subway.quick-exits.v2.test.ts`)
2. 경로/파라미터(`stationId`, `subwayLineId`, `upDownType`) 검증
3. UI 키워드 스캔 가능 문구 포함

## 5. 완료 조건 (DoD)
1. 홈 카드에 섹션 노출
2. API 오류 시 UI 깨짐 없음
3. 테스트 PASS 증적 포함
4. 문서/코드 주석은 한국어 유지
