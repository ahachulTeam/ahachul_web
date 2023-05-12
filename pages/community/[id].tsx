<<<<<<< HEAD
import { ReactElement } from "react";

import { Layout } from "@/components";
import { GetStaticPaths, GetStaticProps } from "next";
import { ARTICLE_DETAIL_DUMMY_LIST } from "@/assets/dummy/community";
import CommunityDetailPageContainer, {
  CommunityDetailModel,
} from "@/components/domain/community/detail/container/CommunityDetailPageContainer";

interface CommunityDetailPageProps {
  data?: CommunityDetailModel;
}

export default function CommunityDetailPage({
  data = {} as CommunityDetailModel,
}: CommunityDetailPageProps) {
  return <CommunityDetailPageContainer data={data} />;
=======
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Layout } from "@/components";

export default function CommunityDetailPage() {
  const { query } = useRouter();

  return <div>커뮤니티 {query?.id} 상세페이지</div>;
>>>>>>> develop
}

CommunityDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
<<<<<<< HEAD

const REVALIDATE_SECONDS = 1000 * 60 * 10; // 10분

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: ARTICLE_DETAIL_DUMMY_LIST,
    },
    revalidate: REVALIDATE_SECONDS,
  };
};
=======
>>>>>>> develop
