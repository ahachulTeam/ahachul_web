import { useRouter } from 'next/router'
import { ReactElement, useCallback, useMemo } from 'react'

// import { FloatingButton } from '@/components'
import { LostContainer, LostHeader } from '@/components/domain'
import { Layout } from '@/components/layout'
import { PATH } from '@/constants'

export default function LostPage() {
  const router = useRouter()
  const { query } = router

  const buttonLabel = useMemo(() => (query?.tab !== 'found' ? '+ 습득물 작성' : '+ 분실물 작성'), [query?.tab])

  const pushToArticleGeneratePage = useCallback(
    (tab?: string) => () => {
      const routesUrl = tab ? `${PATH.LOST}/generate?tab=${tab}` : `${PATH.LOST}/generate`
      router.push(routesUrl, undefined, { shallow: true })
    },
    [router]
  )

  return (
    <>
      <LostContainer />
      {/* <FloatingButton label={buttonLabel} onClick={pushToArticleGeneratePage(query?.tab as string)} /> */}
    </>
  )
}

LostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostHeader />}>{page}</Layout>
}
