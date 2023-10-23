import { type ReactElement } from 'react'

import { OnboardingPageContainer } from '@/components'
import Layout from '@/components/public/layout/Layout'

export default function OnBoardingPage() {
  return <OnboardingPageContainer />
}

OnBoardingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
