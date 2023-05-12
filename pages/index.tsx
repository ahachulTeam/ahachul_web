<<<<<<< HEAD:pages/index.tsx
import dynamic from "next/dynamic";
import { ReactElement } from "react";

import { Layout, MainPageContainer } from "@/components";

const BottomSheetForApp = dynamic(() => import("@/components/cta/forApp/ForApp"), {
  ssr: false,
});
=======
"use client";

import Link from "next/link";
>>>>>>> develop:src/app/page.tsx

export default function HomePage() {
  return (
    <>
      <Link href="/onboarding">
        <button type="button">onboarding</button>
      </Link>
      <Link href="/samplePage">
        <button type="button">samplePage</button>
      </Link>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
