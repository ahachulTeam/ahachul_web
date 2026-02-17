# Ahhachul Backend/DB/Infra Rulebook

Last Updated: 2026-02-18
Scope: `ahhachul_backend`, `ahachul_data`, `ahachul_secret`
Owner: Codex + createhb21

## 0. 계정/보안 최우선 규칙

- 금지: Ahhachul 작업에서 터미널 기본 `default` AWS 계정(회사 계정) 사용.
- 확인된 금지 계정: `Account 419547990266`, `ARN hb.lee@bodycodi.com`.
- 원칙: Ahhachul 전용 프로필/자격증명만 사용하고, 작업 시작 전에 항상 STS로 계정 확인.
- 실행 전 체크:
  - `aws sts get-caller-identity`
  - 필요 시 `AWS_PROFILE=<ahhachul-profile>`를 명시해 명령 실행.

## 1. ahhachul_backend 아키텍처/컨벤션

### 1.1 모듈 구조

- `core`: 도메인 엔티티/영속성/공통 유틸/에러 코드/Flyway.
- `application`: API Controller, Service, 인터셉터/인증, 외부 클라이언트.
- `scheduler`: 배치/스케줄링 작업.
- `consumer`: Redis Stream 기반 컨슈머.

### 1.2 패키지 구조(헥사고날)

- 도메인 기준 패키지 구성:
  - `<domain>/adapter/in`, `<domain>/adapter/out`
  - `<domain>/application/port/in`, `<domain>/application/port/out`
  - `<domain>/application/service`
  - `<domain>/domain`
- 신규 기능도 동일한 구조 유지.

### 1.3 API 계층 규칙

- API prefix는 `/v1/...` 유지.
- Controller 응답은 `CommonResponse.success(...)`/`CommonResponse.fail(...)` 패턴 사용.
- Request DTO는 `toCommand(...)`를 통해 UseCase 커맨드로 변환.
- 인증은 `@Authentication(required = true|false)` 기반 정책 사용.

### 1.4 에러/예외 규칙

- 에러 코드는 `ResponseCode` enum 단일 소스 사용.
- 예외 타입은 레이어별로 구분 유지:
  - `CommonException`
  - `AdapterException`
  - `PortException`
  - `DomainException`
  - `BusinessException`
- 전역 핸들러(`CommonExceptionHandler`)에서 `CommonResponse`로 변환.

### 1.5 페이지네이션/토큰

- 커서 기반 응답은 `PageInfoDto<T>` 패턴 유지.
- page token encode/decode 규칙은 기존 유틸 재사용, 임의 포맷 추가 금지.

### 1.6 DB/Flyway 규칙

- 마이그레이션 위치: `core/src/main/resources/db/migration`.
- 시드 데이터 위치: `core/src/main/resources/db/seed`.
- 버전 파일명 패턴: `VYYYYMMDDHHmm__description.sql`.
- 스키마 변경은 반드시 Flyway로만 반영(수동 DB 수정 후 미기록 금지).

### 1.7 빌드/런타임 규칙

- Java 17, Kotlin 1.7.22, Spring Boot 3.0.4 기반.
- `build.gradle.kts`의 `copySecret`/`copyTestSecret` 태스크로 `../ahachul_secret` 구성 파일 동기화.
- Secret은 코드 레포에 하드코딩 금지.

### 1.8 협업 규칙(기존 팀 룰)

- 브랜치 전략: `main` → `develop` → `feature/#issue`, `hotfix`.
- 이슈 템플릿 기반 작업(`bug`, `feature`, `refactor`, `discussion`).
- 기존 커밋 문화: gitmoji + 이슈 번호.

## 2. ahachul_data 아키텍처/컨벤션

### 2.1 역할

- Lost112/뉴스 크롤링 및 데이터 산출(JSON) + Redis Stream/S3 연계.

### 2.2 실행 규칙

- 진입점: `main.py`
- 옵션 규칙:
  - `-o ca`: 전체 크롤링
  - `-o un`: 신규 업데이트
  - `-o ad -d YYYYMMDD`: 특정 일자 이후

### 2.3 환경변수 기반 설정

- `config.py`에서 S3/Redis 값 로드.
- 대표 키: `access-key`, `secret-key`, `bucket-name`, `region`, `host`, `port`, `stream`, `password`.
- 원칙: 자격증명은 로컬 env 또는 안전한 시크릿 매니저에서만 주입.

### 2.4 산출물 규칙

- 산출 파일: `datas/all.json`, `datas/subway_news_data.json`.
- 스키마 변경 시 소비자(backend/consumer) 영향도 문서화 필수.

## 3. ahachul_secret 컨벤션

### 3.1 저장 구조

- 환경별 분리 파일 유지:
  - `application-local.yml`
  - `application-dev.yml`
  - `application-test.yml`

### 3.2 키 네임스페이스 규칙

- 상위 네임스페이스 일관 유지:
  - `spring.*`
  - `jwt.*`
  - `oauth.*`
  - `cloud.aws.*`
  - `public-data.*`
  - `resilience4j.*`
  - `socket-server.*`
  - `stream.*`

### 3.3 변경 규칙

- 시크릿 키명 변경 시 backend 코드/워크플로 영향 범위를 반드시 동시 검토.
- 민감값은 문서/PR 본문/로그에 노출 금지.

## 4. CI/CD/인프라 운영 규칙

- backend 워크플로는 모듈 분리 배포 체계 유지:
  - `dev-api-deploy.yml` (ECS/CodeDeploy)
  - `dev-batch-deploy.yml` (EC2+SSM)
  - `dev-consumer-deploy.yml` (EC2+SSM)
  - `dev-cron-deploy.yml` (EC2+SSM)
  - `pr-test.yml` (컴파일/테스트)
- 신규 파이프라인 추가 시에도 모듈 단위 책임 분리를 유지.
- 배포 스크립트 변경 시 롤백 경로와 실패 감지(health/command status)까지 포함.

## 5. Codex 작업 가드레일(향후 백엔드/DB/인프라 공통)

- 기존 동작을 바꾸는 리팩토링 금지(성능/안정성 중심).
- 과도한 추상화 금지, 기존 패턴 우선 준수.
- 변경하지 않은 코드의 주석/docstring/타입 어노테이션 임의 수정 금지.
- API 계약/응답 포맷/에러 코드 일관성 우선.
- 작업 전후 체크는 반드시 `BACKEND_DB_INFRA_EXECUTION_CHECKLIST.md`를 따른다.
