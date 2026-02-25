# PM → FE/BE 핸드오프: 홈 날씨 안내 기능 (2026-02-25)

## 1. 미흡한 부분

- 홈 화면에 당일 날씨/주의점/친화 문구가 없어 사용자 맥락 정보가 부족하다.
- 외부 API 실패 시 빈 영역/오류 노출 가능성이 존재한다.

## 2. 개선 포인트

- 홈에서 즉시 확인 가능한 날씨 요약 카드 추가
- 외부 장애 시에도 `빈 화면 없이` fallback 문구 제공
- Vite/one-app 동일 계약으로 운영

## 3. 개발 진행

### 3.1 BE 작업 지시

- API 추가
  - `GET /v2/stations/weather/brief?stationId=<id>`
- 응답 계약

```json
{
  "result": {
    "stationId": 557,
    "stationName": "강남",
    "generatedAt": "2026-02-25T19:00:00+09:00",
    "dataSource": "API",
    "isStale": false,
    "summaryText": "현재 맑음, 9°C",
    "cautionText": "일교차가 커서 겉옷을 챙기세요.",
    "friendlyText": "오늘은 날씨가 화창합니다. 좋은 하루 되세요.",
    "temperatureC": 9.1,
    "apparentTemperatureC": 6.8,
    "precipitationMm": 0.0,
    "windSpeedMps": 2.1,
    "weatherCode": 1,
    "weatherLabel": "대체로 맑음"
  }
}
```

- 정책
  - Fresh cache(10m) → 없으면 외부 호출
  - 외부 실패 시 stale cache(3h) 반환
  - stale도 없으면 fallback payload 반환(`dataSource=FALLBACK`, `isStale=true`)
- 테스트
  - service unit test: fresh hit / api success / stale fallback / fallback payload
  - controller docs test: 쿼리/응답 필드 문서화

### 3.2 FE 작업 지시

- 공통 API 계약
  - `API_PATHS.subway.stationWeatherBriefV2` 추가
- Vite
  - `subway.ts` request/service/hook에 weather fetch 추가
  - 홈 `TrainRealTimes` 카드 상단에 날씨 섹션 렌더
- one-app
  - 날씨 타입/클라이언트 추가
  - `HomeViteParity.tsx`에 동일 카드 추가
- 표시 규칙
  - 로딩: `오늘 날씨를 불러오는 중입니다.`
  - 정상: `summaryText`, `cautionText`, `friendlyText` 순서 출력
  - 오류/대체: fallback 문구 + `정보 지연` 배지

### 3.3 QA 체크포인트

- 동일 역 선택 시 Vite/one-app 날씨 문구가 의미적으로 동일한지
- 외부 API 실패 강제 시 fallback이 빈 영역 없이 렌더되는지
- 20분 내 반복 진입 시 캐시 응답으로 성능이 유지되는지

## 4. 검증 결과

- 본 문서는 FE/BE 구현 시작용 핸드오프다.
- 구현 완료 후 아래를 PM 최종 점검 항목으로 제출
  - API 샘플 응답(정상/오류 대체)
  - 홈 화면 캡처(Vite/one-app)
  - FE/BE 게이트 실행 로그 요약
