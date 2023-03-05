import Suspense from "@/libs/Suspense";

import { SomeComponent } from "@/components/SomeComponent";

export default function HomePage() {
  return (
    <main>
      <Suspense fallback="API 호출 로딩중..">
        <SomeComponent someProp="someProp" />
      </Suspense>
    </main>
  );
}
