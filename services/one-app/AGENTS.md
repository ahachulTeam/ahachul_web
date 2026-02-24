# one-app FE Agent Rules

이 문서는 `ahachul_web/services/one-app` 범위의 FE 전용 규칙이다.
상위 규칙은 `/Users/createahb21/Documents/Programming/repositories/@Ahhachul/AGENTS.md`를 따른다.

## 1) 역할

이 경로의 워커 역할은 FE다.
UI/상태/클라이언트 API 계약/다국어/접근성/회귀 안정성을 우선 책임진다.

## 2) 필수 게이트 (최종 제출 전 전부 통과)

아래 명령은 `ahachul_web` 루트에서 실행한다.

```bash
pnpm nextjs:type
pnpm nextjs:lint
pnpm nextjs:test
```

변경이 `packages/http` 또는 `packages/mock-api`에 걸치면 계약/모의 API 정합성을 함께 검증한다.

## 3) 문서 게이트 (강제)

문서 제출 시 빈 파일은 금지한다.

```bash
for f in $(git diff --name-only -- 'services/one-app/**/*.md' 'docs/**/*.md'); do
  test -s "$f" || exit 1
  rg -q "[^[:space:]]" "$f" || exit 1
done
```

## 4) 제출 형식

상위 표준을 따라 아래를 반드시 포함한다.

1. 미흡한 부분
2. 개선 포인트
3. 개발 진행
4. 검증 결과 (`type/lint/test` 실행 로그 요약 포함)
