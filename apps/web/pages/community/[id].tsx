import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

import { CommunityDetailHeader } from '@/components/domain/community'
import Layout from '@/components/public/Layout'
import CommunityDetailScreen from '@/components/screens/ScreenCommunityDetail'
import { SEOProps } from '@/libs/SEO'

interface CommunityDetailPageProps {
  metaData?: Partial<SEOProps>
}

export default function CommunityDetailPage({ metaData }: CommunityDetailPageProps) {
  return <CommunityDetailScreen metaData={metaData} />
}

CommunityDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<CommunityDetailHeader />}>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async context => {
  const postId = context?.params?.id as string

  try {
    // TODO: 백엔드 준비되면 구현
    // const metaData = await getCommunityDetailSEO(postId)

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
