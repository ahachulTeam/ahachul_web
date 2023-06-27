import { ReactElement } from 'react'

import { Layout, LostGenerateContainer, LostGenerateHeader } from '@/components'

export default function Generate() {
  return <LostGenerateContainer />
}

Generate.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostGenerateHeader />}>{page}</Layout>
}
