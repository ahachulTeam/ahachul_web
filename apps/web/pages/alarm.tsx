import React, { ReactElement } from 'react'

import { Layout } from '@/components/layout'

export default function Alarm() {
  return <div>alarm page</div>
}

Alarm.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
