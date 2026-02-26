# PM -> FE/BE 핸드오프: 막차 리스크 자동화 (2026-02-27)

## 목적

- 사용자가 `도보 n분`을 직접 입력하지 않아도 막차 리스크를 정확하게 제공한다.
- 사용자 생활거점(집/회사/학교)과 역 데이터의 연결을 통해 개인화된 막차 리스크를 제공한다.

## BE 전달 사항

1. API 계약

- `GET /v2/stations/times/last-train-risk`
  - request: `walkingMinutes` optional
  - response: `walkingMinutesSource`, `walkingMinutesUpdatedAt` 추가

2. 저장 모델

- `favorite-stations`에 `locationMeta` 저장
  - `locationName`, `roadAddress`, `jibunAddress`, `latitude`, `longitude`, `walkingMinutes`, `walkingSource`

3. 계산 정책

- `walkingMinutes` 결정 순서
  - request 파라미터
  - 사용자 즐겨찾기 역 메타
  - 기본값 15분

4. 정책

- 익명 호출은 기본값으로 계산 허용
- 로그인 사용자는 역 기준으로 프로필 도보분 fallback

## FE 전달 사항

1. Vite 마이페이지

- 주소 검색(다음 Postcode) + 현재 위치 주변 역 탐색 UX 제공
- 저장 시 `stationId`, `locationMeta`를 함께 전송
- 주변 역 리스트에서 실시간/시간표 화면 이동 액션 제공

2. Vite 홈

- 막차 리스크 카드의 수동 입력 UI 제거
- 서버 계산 결과로 `도보 분`, `산출 소스(프로필/기본값)` 표시
- 기본값인 경우 “마이페이지에서 주소 설정 시 정확도 향상” 메시지 노출

3. one-app

- 즐겨찾기 역 read/write 타입에 `stationId`, `locationMeta` 동기화

## QA 체크포인트

- 로그인 사용자가 즐겨찾기 역에 도보분 저장 후 홈 리스크 카드에서 `USER_PROFILE` 소스를 받는지 확인
- 비로그인/미설정 사용자는 `DEFAULT` 소스와 15분 기준 리스크가 표시되는지 확인
- 현재 위치 탐색 후 주변 역 리스트에서 시간표 화면 진입이 가능한지 확인
