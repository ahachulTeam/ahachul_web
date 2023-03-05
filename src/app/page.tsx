import { Suspense } from "react";

import { SomeComponent } from "@/components/SomeComponent";

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<p>API 호출 로딩중..</p>}>
        <SomeComponent someProp="someProp" />
      </Suspense>
    </main>
  );
}
