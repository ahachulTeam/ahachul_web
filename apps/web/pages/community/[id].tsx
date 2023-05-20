import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

import { ARTICLE_DETAIL_DUMMY_LIST } from '@/assets/dummy/community'
import { Layout } from '@/components'
import { CommunityDetailPageContainer } from '@/components/domain/community'
import { CommunityDetailModel } from '@/types/community'

interface CommunityDetailPageProps {
  data?: CommunityDetailModel
}

export default function CommunityDetailPage({ data = {} as CommunityDetailModel }: CommunityDetailPageProps) {
  return <CommunityDetailPageContainer data={data} />
}

CommunityDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      data: ARTICLE_DETAIL_DUMMY_LIST,
    },
  }
}
