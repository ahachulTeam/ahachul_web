import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'
import { LostHeader } from '@/components/domain'
import Layout from '@/components/public/Layout'
import LostMainScreen from '@/components/screens/MainLost'
import { SEOProps } from '@/libs/SEO'

interface LostPageProps {
  lostPageSearchKeyword?: string
  metaData?: Partial<SEOProps>
}

export default function LostPage({ metaData }: LostPageProps) {
  return <LostMainScreen metaData={metaData} />
}

LostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostHeader />}>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async context => {
  const lostPageSearchKeyword = context?.query?.text ?? null

  try {
    // TODO: 백엔드 준비되면 구현
    // const metaData = await getLostListSEO(searchKeyword)

    return {
      props: {
        // metaData,
        lostPageSearchKeyword,
      },
    }
  } catch (err) {
    console.log(err)

    return {
      props: {},
    }
  }
}
