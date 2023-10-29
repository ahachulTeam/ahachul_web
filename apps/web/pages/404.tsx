import Link from 'next/link'
import { ReactElement } from 'react'
import Layout from '@/components/public/Layout'

export default function NotFound() {
  return (
    <div>
      임시로 만든 404
      <Link href="/">Go Back</Link>
    </div>
  )
}

NotFound.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
