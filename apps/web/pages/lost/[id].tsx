import { QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { type ReactElement } from 'react'

import lostAPI from '@/apis/lost'
import { LostDetailContainer, LostDetailHeader } from '@/components/domain'
import { Layout } from '@/components/layout'
import { PATH } from '@/constants'
import { SEO } from '@/libs'
import { lostKeys } from '@/queries/lost/keys'
import * as T from '@/utils/try'

interface LostDetailPageProps {
  title: string
  content: string
  createdBy: string
  subwayLine: number
}
export default function LostDetailPage({ title, content, createdBy, subwayLine }: LostDetailPageProps) {
  return (
    <>
      <SEO title={title} description={content} />
      <LostDetailContainer createdBy={createdBy} subwayLine={subwayLine} />
    </>
  )
}

LostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostDetailHeader />}>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params } = context
  const lostId = params?.id as string

  if (!lostId) {
    return {
      redirect: {
        destination: PATH.HOME,
        permanent: true,
      },
    }
  }

  const queryClient = new QueryClient()

  const res = await queryClient.fetchQuery(lostKeys.detail(lostId), () => lostAPI.fetchLostDetail(lostId))
  const parseData = T.parseResponse(res)

  if (T.isFailed(parseData)) {
    return {
      redirect: {
        destination: PATH.HOME,
        permanent: true,
      },
    }
  }
  const { title, content, createdBy, subwayLine } = parseData.result

  return {
    props: {
      title,
      content,
      createdBy,
      subwayLine,
    },
  }
}
