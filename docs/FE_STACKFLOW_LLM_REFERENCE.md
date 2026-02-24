# FE Vite Stackflow LLM 레퍼런스

이 문서는 `services/ahhachul.com`(Vite 앱) 개발 시 FE 에이전트가 Stackflow 관련 의사결정을 일관되게 하기 위한 기준 문서다.

## 1) 목적

- Stackflow 라우팅/내비게이션/로더/프리로드 관련 구현 품질을 일정하게 유지한다.
- LLM 에이전트가 Stackflow Future API 문맥을 이해한 상태로 작업하도록 강제한다.
- 기존 레거시 API(`@stackflow/react`) 기반 코드와 Future API 마이그레이션 방향을 함께 관리한다.

## 2) 원문 출처

- [Stackflow llms.txt](https://stackflow.so/llms.txt)
- [Stackflow llms-full.txt](https://stackflow.so/llms-full.txt)
- [Stackflow llms-changelog.txt](https://stackflow.so/llms-changelog.txt)
- [Future API 소개](https://stackflow.so/api-references/future-api/introduction)
- [API Pipelining](https://stackflow.so/api-references/future-api/api-pipelining)
- [Loader API](https://stackflow.so/api-references/future-api/loader-api)

## 3) 현재 코드베이스 상태 (2026-02-24 기준)

`services/ahhachul.com`는 현재 **레거시 Stackflow API**를 사용한다.

- `src/stackflow.ts`
  - `stackflow` from `@stackflow/react`
  - `createLinkComponent` from `@stackflow/link`
  - `createPreloader` from `@stackflow/plugin-preload`
- `src/stackflow.config.ts`
  - `historySyncPlugin` + `basicRendererPlugin` + `basicUIPlugin`
  - 라우트 매핑을 `routes` 객체에서 직접 선언

즉, 이 서비스에서 Stackflow 작업 시에는

1. 현재 레거시 구조를 깨지 않으면서 기능을 반영하거나,
2. 범위를 명확히 잡고 Future API로 마이그레이션해야 한다.

## 4) 개발 원칙 (Vite 앱)

### 4.1 라우트 단일 소스

- 화면 경로는 `src/constants/path.ts`를 기준으로 관리한다.
- Stackflow 라우트 매핑은 `src/stackflow.config.ts`에서 누락 없이 동기화한다.
- 새 Activity를 추가할 때:
  1. `PATH` 상수 추가
  2. Page 컴포넌트 및 `pages/index` export 연결
  3. `stackflow.config.ts`의 `routes` 반영
  4. 필요한 이동 링크(`StackFlow.Link`, `useFlow`) 반영

### 4.2 Future API 우선 검토

신규 구조 설계 또는 대규모 리팩토링에서는 아래 Future API 패턴을 우선 검토한다.

- `@stackflow/config`의 `defineConfig`
- `@stackflow/react/future`의 `stackflow`, `useFlow`, `useStepFlow`, `useLoaderData`
- `@stackflow/link/future`의 `Link`

단, 기존 레거시 코드 경로에서 범위를 벗어나는 전면 이관은 별도 태스크로 분리한다.

### 4.3 API Pipelining 권장

초기 렌더링 성능 최적화가 필요한 경우, entry 단계에서 아래 패턴을 따른다.

1. 현재 URL에 맞는 loader를 먼저 시작(비동기 요청 시작, await 하지 않음)
2. React 앱 번들을 동시 로드
3. `initialLoaderData`를 `Stack`에 주입

예시(개념):

```ts
// entry.ts (개념 예시)
async function main() {
  let initialLoaderData: unknown | null = null;

  // 1) loader 비동기 시작
  initialLoaderData = findMatchedLoaderAndStart();

  // 2) 앱 코드 동시 다운로드
  const { renderApp } = await import('./renderApp');

  // 3) 결합
  renderApp({ initialLoaderData });
}
```

```tsx
// renderApp.tsx (개념 예시)
export function renderApp({ initialLoaderData }: { initialLoaderData: unknown }) {
  return <Stack initialLoaderData={initialLoaderData} />;
}
```

### 4.4 코드 스플리팅 주의

Future API를 쓸 때 Activity lazy 로딩은 반드시 `@stackflow/react/future`의 `lazy`를 사용한다.

- 금지: React 기본 `lazy`만 사용한 Activity 등록
- 권장: `import { stackflow, lazy } from "@stackflow/react/future"`

### 4.5 Step Flow API 명명 차이

Future API에서는 메서드명이 다음으로 변경된다.

- `stepPush` -> `pushStep`
- `stepReplace` -> `replaceStep`
- `stepPop` -> `popStep`

레거시/퓨처 혼용 시 이름 혼동에 주의한다.

## 5) 타입 안정성 규칙

Future API 기준 Activity 파라미터 타입은 Config 기반으로 등록한다.

```ts
declare module '@stackflow/config' {
  interface Register {
    HomeActivity: {
      regionId: string;
      referrer?: string;
    };
  }
}
```

레거시 API를 유지하는 경우에도 Activity 파라미터 타입을 명시하고, `any` 캐스팅을 최소화한다.

## 6) FE 작업 체크리스트 (Stackflow 변경 시 필수)

1. 이 문서를 읽고 작업 범위가 레거시 유지인지, Future API 이관인지 명시한다.
2. `PATH`/`stackflow.config.ts`/페이지 export 누락 여부를 점검한다.
3. Activity 파라미터 타입 안정성을 확인한다.
4. 라우팅 변경 시 진입 경로(딥링크)와 fallback 동작을 확인한다.
5. 아래 게이트를 통과한다.

```bash
pnpm app:type
pnpm app:lint
pnpm app:test
```

## 7) 마이그레이션 권장 순서 (Future API)

1. `stackflow.config.ts`를 `defineConfig` 기반으로 분리
2. `@stackflow/react/future`로 Stack 생성부 교체
3. `historySyncPlugin` 설정을 Config 기반 route로 정리
4. Loader API 도입 (`loader` + `useLoaderData`)
5. entry API pipelining 적용
6. `@stackflow/link/future`로 Link 전환

## 8) 주의사항

- Future API는 프리뷰 성격이므로 버전 변경 영향을 받을 수 있다.
- 구현 전 패키지 최신 버전과 changelog를 확인한다.
- 기존 `plugin-preload` 기반 설계와 Future Loader API를 동시에 도입할 경우 중복 fetch가 생기지 않게 설계한다.
