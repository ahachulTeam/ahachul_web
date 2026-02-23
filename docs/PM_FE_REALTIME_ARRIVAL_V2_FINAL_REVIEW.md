# FE_REALTIME_ARRIVAL_V2_HANDOFF 최종 검수 (PM)

- 검수일시: 2026-02-23
- 대상 문서: `docs/FE_REALTIME_ARRIVAL_V2_HANDOFF.md`
- 검수자: PM

## 1. 최종 판정
- **조건부 승인**
- 사유: 핵심 정책(신뢰배지, fallback UX, 메시지 표준)은 방향이 타당하나, API stale 처리와 사용자 문구의 예외 일관성 정의가 추가로 필요함.

## 2. 반드시 수정할 항목 (Must)
1. `isStale=true`일 때 사용자 문구를 단일 문구로 고정하고, 페이지 내 복수 위치에서 동일 문구를 사용하도록 명시할 것.
2. `confidenceLevel=LOW` + `etaSec=0` 조합 시 표시 규칙을 명확히 정의할 것(도착/진입/정보지연 중 우선순위).
3. 새로고침 주기(3초)와 수동 새로고침 충돌 시 디바운스/중복 요청 방지 규칙을 명시할 것.
4. 빈 목록(`701`)과 장애(`704`)의 사용자 메시지/액션(재시도 버튼, 이전 데이터 유지 여부)을 분리해 정의할 것.

## 3. 권장 개선 항목 (Should)
1. 신뢰배지 문구를 LOW/MEDIUM/HIGH 별로 1줄 설명으로 고정해 QA 테스트케이스와 1:1 매칭할 것.
2. 역방향/상행·하행 혼동 방지를 위해 `destinationStationDirection`, `nextStationDirection`의 라벨 표준을 UI 컴포넌트 단에서 고정할 것.
3. 스켈레톤 로딩과 stale 표시가 동시에 노출되지 않도록 우선순위를 정의할 것.

## 4. FE/BE 협업 유의사항
1. FE는 `/v2/trains/real-times` 계약 필드 누락 시 graceful fallback(값 숨김 + 안내문구) 처리 필요.
2. BE는 `confidenceLevel`, `isStale`, `freshnessSec` 계산 규칙을 계약 테스트로 고정해야 함.
3. PM은 문구/배지 기준을 단일 소스로 관리하고 릴리즈 전 FE/QA와 최종 동결해야 함.

## 5. 승인 조건
- Must 4개 반영 완료 후 최종 승인 전환 가능.
