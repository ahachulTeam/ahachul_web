
### 폴더 구조

```
📦src
 ┣ 📂app
 ┃ ┣ 📂_component
 ┃ ┃ ┃ ┣ MSWComponent.tsx
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
 ┣ 📂mocks 
 ┣ 📂model 
 ┣ 📂store 
 ┣ 📂common
 ┃ ┣ 📂utils
 ┃ ┣ 📂assets
 ┃ ┣ 📂components
```

## 설명

| 폴더명        | 폴더 설명                                                                                                                             |
|------------|-----------------------------------------------------------------------------------------------------------------------------------|
| public        | 누구나 접근 가능한 서버이므로 모든 사람들이 접근 가능한 이미지 등을 넣어요.                                                                                                                      |
| src/app 구조 | app 폴더는 라우팅과 관련된 파일만 넣어 두고 그렇지 않은 파일(mocks, model 등)은 src에 넣어요.                                                               |
| private folder(_폴더)      | 해당 페이지에서만 사용하는 것들      
| mocks      | msw 설정 파일들                                                                                                   |
| model     | schema 타입 정의                                                                      |
| store      | zustand 이용한 전역 변수 관리                                                                                          |
| common | 전역적으로 사용되는 util, component, asset 등 

