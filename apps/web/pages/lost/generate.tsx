import React, { ReactElement } from 'react'

import { Layout } from '@/components'

export default function Generate() {
  return <div>this is generate page</div>
}

Generate.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
