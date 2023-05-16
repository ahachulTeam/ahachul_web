import { ReactElement } from "react";

import { Layout } from "@/components";
import { ARTICLE_DETAIL_DUMMY_LIST } from "@/assets/dummy/community";
import { CommunityDetailModel } from "@/types/community";
import { CommunityDetailPageContainer } from "@/components/domain/community";
import { GetServerSideProps } from "next";

interface CommunityDetailPageProps {
  data?: CommunityDetailModel;
}

export default function CommunityDetailPage({
  data = {} as CommunityDetailModel,
}: CommunityDetailPageProps) {
  return <CommunityDetailPageContainer data={data} />;
}

CommunityDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      data: ARTICLE_DETAIL_DUMMY_LIST,
    },
  };
};
