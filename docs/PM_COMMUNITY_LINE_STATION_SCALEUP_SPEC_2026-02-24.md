# PM 기능 명세: 커뮤니티 역/호선 확장 (2026-02-24)

## 1. 미흡한 부분

1. 현재 커뮤니티는 단일 목록 중심으로 운영되어, 사용자가 특정 역 기준으로 글을 모아보기가 어렵다.
2. 호선 커뮤니티와 역 커뮤니티의 탐색 경로가 분리되어 있지 않아, "호선 -> 역" 이동 동선이 약하다.
3. FE(one-app, vite) 필터 체계가 앱마다 다르게 운영되어 동일 기능 확장 시 회귀 리스크가 높다.
4. BE 검색 API는 역 단위 쿼리 파라미터를 공식 지원하지 않아 역 맥락 검색이 어렵다.

## 2. 개선 포인트

1. 커뮤니티 공통 필터를 `category + subwayLine + station` 구조로 확장한다.
2. `subwayLine` 선택 후 `station`을 선택할 수 있게 하여 호선별 커뮤니티에서 역별 커뮤니티로 진입 가능하게 만든다.
3. BE는 `stationId`를 검색 조건으로 수용하고, 역-노선 매핑을 통해 기존 게시글과 호환되는 결과를 반환한다.
4. FE one-app/vite 모두 동일 파라미터 규칙(`subwayLineIds`, `stationId`)을 사용한다.

## 3. 개발 진행

### 3.1 BE

1. `GET /v1/community-posts`, `GET /v1/community-hot-posts`에 `stationId`(optional) 추가
2. `stationId` 입력 시 역의 소속 노선 집합을 조회하고, 검색 노선 조건과 교집합을 계산해 조회 조건으로 사용
3. 기존 검색 기능(카테고리, 본문, 해시태그, 작성자, 정렬, 페이지네이션) 회귀 없음 보장

### 3.2 FE(one-app)

1. 커뮤니티 필터에 `stationId` 추가
2. `/subway-lines` 응답을 이용해 호선/역 옵션 동적 구성
3. 커뮤니티 목록 요청 시 `subwayLineIds`, `stationId`를 조건에 맞게 전달

### 3.3 FE(vite)

1. 커뮤니티 필터 상태에 `stationId` 추가
2. 호선/역 옵션 동적 구성 및 호선 선택 시 역 선택 가능
3. 목록 요청 파라미터를 `subwayLineIds`, `stationId` 체계로 정렬

## 4. 완료 조건(DoD)

1. one-app, vite 모두 커뮤니티에서 호선/역 필터가 동작한다.
2. 호선 선택 상태에서 역 선택이 가능하며, 역 변경 시 목록이 정상 갱신된다.
3. BE API가 `stationId`를 수용하고 기존 파라미터와 조합 시 정상 응답한다.
4. 기존 커뮤니티 목록/상세/댓글 흐름 회귀가 없다.

## 5. 검증 기준

1. FE(one-app): `pnpm nextjs:type`, `pnpm nextjs:lint`, `pnpm nextjs:test`
2. FE(vite): `pnpm app:type`, `pnpm app:lint`, `pnpm app:test`
3. BE: `./gradlew --no-daemon :application:compileKotlin :application:compileTestKotlin`, `./gradlew --no-daemon :application:test --tests "*CommunityPostControllerDocsTest"`

## 6. 리스크 및 대응

1. 역 필터는 기존 데이터가 노선 중심으로 저장된 구조를 고려해 역-노선 매핑 기반 조회를 사용한다.
2. `stationId`와 `subwayLineIds` 동시 입력 시 교집합이 비면 빈 목록을 반환한다.
3. 차기 단계에서 역 전용 게시글 분리를 원할 경우 `community_post.station_id` 스키마 확장으로 단계적 이행한다.
