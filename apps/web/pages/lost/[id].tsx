import { GetServerSideProps } from 'next'
import { type ReactElement } from 'react'

import { LostDetailHeader } from '@/components/domain'
import Layout from '@/components/public/Layout'
import LostDetailScreen from '@/components/screens/ScreenLostDetail'
import { SEOProps } from '@/libs/SEO'

interface LostDetailPageProps {
  metaData?: Partial<SEOProps>
}
export default function LostDetailPage({ metaData }: LostDetailPageProps) {
  return <LostDetailScreen metaData={metaData} />
}

LostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostDetailHeader />}>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async context => {
  const postId = context?.params?.id as string

  try {
    // TODO: 백엔드 준비되면 구현
    // const metaData = await getLostDetailSEO(postId)

    return {
      props: {
        // metaData,
      },
    }
  } catch (err) {
    console.log(err)

    return {
      props: {},
    }
  }
}
