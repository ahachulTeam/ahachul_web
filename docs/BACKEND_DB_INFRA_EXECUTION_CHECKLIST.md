# Backend/DB/Infra Execution Checklist

Last Updated: 2026-02-18
Scope: Ahhachul backend stack

## A. 시작 전(Pre-flight)

- [ ] 현재 AWS 계정이 Ahhachul 계정인지 확인했다.
- [ ] 작업 대상 레포(`ahhachul_backend`, `ahachul_data`, `ahachul_secret`)와 영향 범위를 명확히 했다.
- [ ] API/DB/시크릿 변경 여부를 미리 분류했다.

## B. 설계/구현 체크

- [ ] `ahhachul_backend`는 헥사고날 구조(`adapter/port/service/domain`)를 유지했다.
- [ ] Controller는 `CommonResponse` 계약을 유지했다.
- [ ] Request DTO → `toCommand(...)` 변환 패턴을 유지했다.
- [ ] 예외는 `ResponseCode + *Exception` 계층 규칙을 따랐다.
- [ ] 페이지네이션은 `PageInfoDto` 규칙을 유지했다.
- [ ] DB 스키마 변경은 Flyway 마이그레이션 파일로 반영했다.
- [ ] 시크릿 값 하드코딩 없이 `ahachul_secret`/env 기반으로 처리했다.
- [ ] 데이터 크롤링 출력 스키마 변경 시 소비자 영향(consumer/backend) 분석을 남겼다.

## C. 검증(Validation Gate)

- [ ] backend 컴파일/테스트를 수행했다.
- [ ] 주요 API 흐름(인증, 게시글, 댓글, 신고 등) 회귀 영향이 없는지 확인했다.
- [ ] 시크릿 키명 변경 시 런타임 로딩 실패 가능성을 검토했다.
- [ ] 배포 워크플로 변경 시 롤백 절차를 함께 검증했다.

## D. PR/기록

- [ ] 변경 이유와 범위를 PR에 명확히 기록했다.
- [ ] 민감 정보(토큰/키/ARN 상세값)를 PR/로그에 노출하지 않았다.
- [ ] 관련 이슈/작업 단위를 연결했다.
- [ ] 본 체크리스트와 룰북 업데이트 필요 여부를 확인했다.

## E. 권장 명령

```bash
# AWS 계정 확인
aws sts get-caller-identity

# backend 기본 검증(레포 루트 기준)
./gradlew test

# data repo 기본 실행 예시
python main.py -o ca
python main.py -o un
python main.py -o ad -d 20260101
```

## F. 실패 시 중단 조건

- AWS 계정 불일치 상태에서 실제 리소스 접근이 필요한 명령을 실행하려는 경우 즉시 중단.
- 시크릿 값이 필요하지만 안전한 소스(ahachul_secret/env) 없이 하드코딩하려는 경우 즉시 중단.
- Flyway 없이 DB 수동 변경으로 진행하려는 경우 즉시 중단.
