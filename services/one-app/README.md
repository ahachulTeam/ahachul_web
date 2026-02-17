### 폴더 구조

```
📦src
 ┣ 📂app
 ┃ ┣ 📂(site)
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┣ 📂_component
 ┃ ┃ ┃ ┃ ┣ LoginButton.tsx
 ┃ ┃ ┃ ┣ 📂_lib
 ┃ ┃ ┃ ┃ ┣ getRedirectUrls.ts
 ┃ ┃ ┃ ┣ page.tsx
 ┃ ┃ ┃ ┣ loading.tsx
 ┃ ┃ ┣ page.tsx
 ┃ ┃ ┣ layout.tsx
 ┃ ┃ ┣ not-found.tsx
 ┃ ┣ favicon.ico
 ┃ ┣ globals.css
 ┣ 📂component
 ┃ ┣ MSWComponent.tsx
 ┣ instrumentation.ts
 ┣ 📂mocks
 ┣ 📂model
 ┣ 📂store
 ┣ 📂common
 ┃ ┣ 📂utils
 ┃ ┣ 📂assets
 ┃ ┣ 📂components
```

## 설명

| 폴더명                 | 폴더 설명                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| public                 | 누구나 접근 가능한 서버이므로 모든 사람들이 접근 가능한 이미지 등을 넣어요.                         |
| src/app 구조           | app 폴더는 라우팅과 관련된 파일만 넣어 두고 그렇지 않은 파일(mocks, model 등)은 src에 넣어요.       |
| private folder(\_폴더) | 해당 페이지에서만 사용하는 것들                                                                     |
| mocks                  | 공용 `@ahhachul/mock-api`를 구독하는 msw 브라우저/노드 런타임 부트스트랩 파일들                     |
| instrumentation.ts     | Next 서버 런타임에서 mock 모드(`NEXT_PUBLIC_API_MOCKING=enabled`)일 때 노드 msw를 초기화하는 진입점 |
| model                  | schema 타입 정의                                                                                    |
| store                  | zustand 이용한 전역 변수 관리                                                                       |
| common                 | 전역적으로 사용되는 util, component, asset 등                                                       |
