import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { Header, Layout } from '@/components/layout'
import { notFoundHeader } from '@/constants/header'

export default function NotFound() {
  return (
    <div>
      임시로 만든 404
      <Link href="/">Go Back</Link>
    </div>
  )
}

NotFound.useLayout = function useLayout(page: ReactElement) {
  const router = useRouter()

  const pushShallowRouter = (path: string) => router.push(path, undefined, { shallow: true })

  const onGoBackBtnClick = () => pushShallowRouter('/')

  const getHeaderProps = () => ({
    onGoBackBtnClick,
  })

  return (
    <>
      <Header {...notFoundHeader({ ...getHeaderProps() })} />
      <Layout>{page}</Layout>
    </>
  )
}
