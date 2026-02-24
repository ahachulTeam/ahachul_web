# 즐겨찾기 역 고도화 및 그래프 경로 기능 명세 (PM/Team Lead)

작성일: 2026-02-24
대상: FE, BE

## 1. 미흡한 부분

1. 현재 즐겨찾기 역 등록은 `역 이름 문자열` 기반이라 동명이역/띄어쓰기 차이로 오입력 위험이 있다.
2. 즐겨찾기 역 목록은 저장/조회 중심이며, 역 간 이동 맥락(경로/환승/소요 추정)을 제공하지 않는다.
3. 유저가 자주 이동하는 즐겨찾기 역 쌍을 직접 저장/관리할 수 있는 기능이 없다.
4. 마이페이지에서 즐겨찾기 역의 활용 가치가 낮고, 경로 관점의 재방문 동기가 약하다.

## 2. 개선 포인트

1. 즐겨찾기 입력 정밀화
- FE: 즐겨찾기 편집 시 `역 이름 + stationId`를 함께 전송
- BE: 기존 stationName 기반 호환 유지 + stationId 우선 처리

2. 그래프형 추천 경로 제공
- 즐겨찾기 역들을 기반으로 추천 경로를 산출
- 응답에 `nodes`, `edges`, `transferCount`, `estimatedMinutes` 포함
- FE는 노드-엣지 형태(텍스트/배지 조합)로 시각화

3. 사용자 지정 즐겨찾기 경로
- 유저가 즐겨찾기 역 사이의 경로를 직접 저장/삭제
- 저장 경로는 마이페이지에서 별도 목록 관리

4. 운영 안정성
- 추천/지정 경로 API를 `v2` 네임스페이스로 분리
- 경로 산출 실패 시 기존 즐겨찾기 조회 기능에는 영향이 없도록 분리 배포

## 3. 개발 진행

### 3.1 BE 구현 명세

#### 3.1.1 API

1. `POST /v1/members/bookmarks/stations` 개선
- Request 항목 확장(하위 호환):
  - `stations[].stationId` (Long, optional)
  - `stations[].stationName` (String, required)
  - `stations[].label` (String, optional)
- 처리 규칙:
  - `stationId`가 있으면 stationId 기준 조회
  - 없으면 기존 stationName 기준 조회

2. `GET /v2/members/bookmarks/stations/routes/recommendations`
- Query:
  - `limit` (Int, optional, default=3, max=6)
- 동작:
  - 즐겨찾기 역이 2개 이상일 때 추천 경로 반환
  - 기본 앵커: 즐겨찾기 첫 번째 역
  - 앵커 -> 나머지 즐겨찾기 역 경로를 우선순위로 산출

3. `GET /v2/members/bookmarks/stations/routes`
- 사용자 지정 즐겨찾기 경로 목록 조회

4. `POST /v2/members/bookmarks/stations/routes`
- Request:
  - `sourceStationId` (Long, required)
  - `destinationStationId` (Long, required)
  - `title` (String, optional, max=50)
- 제약:
  - source != destination
  - 두 역 모두 내 즐겨찾기 역이어야 함
  - 동일 쌍 중복 등록 금지

5. `DELETE /v2/members/bookmarks/stations/routes/{routeId}`
- 본인 소유 경로만 삭제 가능

#### 3.1.2 경로 산출 규칙

1. 그래프 구성
- 데이터 소스: `tb_subway_line_station`
- 같은 노선에서 인접한 역을 edge로 연결
- 정렬 기준: `(subway_line_id, subway_line_station_id)`

2. 추천 경로 계산
- 기본: 최소 정거장 수 우선
- tie-break: 환승 횟수 적은 경로 우선
- 산출 필드:
  - `totalStops`
  - `transferCount`
  - `estimatedMinutes` (규칙: `totalStops*2 + transferCount*4`)

3. 응답 구조(요약)
- `routeId` (지정 경로에서만)
- `sourceStation`, `destinationStation`
- `nodes[]` (stationId, stationName, order, isFavorite)
- `edges[]` (fromStationId, toStationId, subwayLineId, subwayLineName)
- `summary` (totalStops, transferCount, estimatedMinutes)

#### 3.1.3 DB

1. 신규 테이블: `tb_member_station_route`
- `member_station_route_id` BIGINT PK AI
- `member_id` BIGINT NOT NULL
- `source_station_id` BIGINT NOT NULL
- `destination_station_id` BIGINT NOT NULL
- `title` VARCHAR(50) NULL
- `created_at`, `created_by`, `updated_at`, `updated_by`
- Unique: `(member_id, source_station_id, destination_station_id)`

### 3.2 FE 구현 명세 (one-app)

1. 마이페이지(`me`)에 "즐겨찾기 경로" 섹션 추가
- 추천 경로 카드 리스트
- 사용자 지정 경로 저장 폼
- 지정 경로 목록 + 삭제 액션

2. 그래프형 UI 규칙
- 노드: 역명 원형 배지
- 엣지: `lineName` 라벨 배지 + 화살표
- 카드에 요약 수치(`정거장`, `환승`, `예상 소요`) 표시

3. 저장 폼 규칙
- source/destination은 내 즐겨찾기 역 드롭다운에서만 선택
- 동일 역 선택 차단
- 중복 경로 저장 시 서버 메시지 노출

4. 기존 즐겨찾기 편집 개선
- 가능한 경우 stationId 포함 전송
- 레거시 stationName-only 흐름과 호환

### 3.3 FE 구현 명세 (vite 앱)

1. 기존 마이 설정 페이지에도 동일 기능(추천/지정 경로) 반영
2. API 계약은 one-app과 동일
3. 최소 동등 수준의 validation 및 에러 메시지 처리

## 4. 검증 결과

### 4.1 기능 검증 기준 (DoD)

1. 즐겨찾기 역 2개 이상인 계정에서 추천 경로가 노출된다.
2. 사용자 지정 경로 생성/조회/삭제가 정상 동작한다.
3. 지정 경로는 즐겨찾기 역 외 stationId로 생성되지 않는다.
4. FE에서 그래프형 노드/엣지 UI와 요약 수치가 모두 렌더링된다.
5. BE 문서 테스트, FE 타입/린트/테스트 게이트를 모두 통과한다.

### 4.2 배포 순서

1. BE migration + API 배포
2. FE one-app 반영
3. FE vite 반영
4. QA 회귀 점검 후 전체 오픈
