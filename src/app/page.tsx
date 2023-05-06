<<<<<<< HEAD
"use client";

import Link from "next/link";
=======
import dynamic from "next/dynamic";

import { MainPageContainer } from "@/components";

const BottomSheetForApp = dynamic(() => import("@/components/cta/forApp/ForApp"), {
  ssr: false,
});
>>>>>>> develop

export default function HomePage() {
  return (
    <>
<<<<<<< HEAD
      <Link href="/onboarding">
        <button type="button">onboarding</button>
      </Link>
      <Link href="/samplePage">
        <button type="button">samplePage</button>
      </Link>
=======
      <MainPageContainer />
      <BottomSheetForApp />
>>>>>>> develop
    </>
  );
}
