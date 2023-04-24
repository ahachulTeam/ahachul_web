import dynamic from "next/dynamic";

import { MainPageContainer } from "@/components";

const BottomSheetForApp = dynamic(() => import("@/components/cta/forApp/ForApp"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <MainPageContainer />
      <BottomSheetForApp />
    </>
  );
}
