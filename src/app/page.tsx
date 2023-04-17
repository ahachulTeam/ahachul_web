import Suspense from "@/libs/Suspense";

import { SubwayBadge } from "@/components";
import { SomeComponent } from "@/components/SomeComponent";

export default function HomePage() {
  return (
    <Suspense fallback="API 호출 로딩중..">
      <SomeComponent someProp="someProp" />
      <SubwayBadge label="신분당" />
    </Suspense>
  );
}
