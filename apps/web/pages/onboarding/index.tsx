import { type ReactElement } from 'react'

import Layout from '@/components/public/layout/Layout'
import OnboardingMainScreen from '@/components/screens/MainOnboarding'

export default function OnBoardingPage() {
  return <OnboardingMainScreen />
}

OnBoardingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
