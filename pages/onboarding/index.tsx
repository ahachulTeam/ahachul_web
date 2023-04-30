import { ReactElement } from "react";

import { Layout, OnboardingPageContainer } from "@/components";

export default function OnBoardingPage() {
  return <OnboardingPageContainer />;
}

OnBoardingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
