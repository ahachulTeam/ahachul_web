import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useMemo } from 'react'

import { tokenService } from '@/apis/axios'
import lostAPI from '@/apis/lost'
import { FloatingButton } from '@/components'
import { LostContainer, LostHeader } from '@/components/domain'
import { Layout } from '@/components/layout'
import { PATH } from '@/constants'
import { lostKeys } from '@/queries/lost/keys'
import { LostTypes } from '@/types/lost'
import * as T from '@/utils/try'

export default function LostPage() {
  const router = useRouter()
  const { query } = router

  const buttonLabel = useMemo(() => (query?.tab === 'lost' ? '+ 분실물 작성' : '+ 습득물 작성'), [query?.tab])

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
      <FloatingButton label={buttonLabel} onClick={pushToArticleGeneratePage(query?.tab as string)} />
    </>
  )
}

LostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostHeader />}>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async context => {
  tokenService.setContext(context)
  const { query } = context
  const lostType = query?.tab === LostTypes.ACQUIRE ? LostTypes.ACQUIRE : LostTypes.LOST
  const subwayLineId = (query?.subwayLineId as string) || ''
  const origin = query?.origin || ''

  const lostFilter = {
    lostType,
    ...(subwayLineId && {
      subwayLineId: subwayLineId as string,
    }),
    ...(origin && { origin: origin as string }),
  } as const

  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery(lostKeys.list(lostFilter), async ({ pageParam }) => {
    const res = await lostAPI.fetchLostPosts({ ...lostFilter, page: pageParam, size: '12' })
    const parsedData = T.parseResponse(res)
    return T.getOrElse(parsedData, () => ({ posts: [], hasNext: false }))
  })

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}
