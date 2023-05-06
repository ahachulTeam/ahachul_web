import { ReactElement } from "react";

import { Layout } from "@/components";
import { GetStaticPaths, GetStaticProps } from "next";
import { ARTICLE_DETAIL_DUMMY_LIST } from "@/assets/dummy/community";
import CommunityDetailPageContainer from "@/components/domain/community/detail/container/CommunityDetailPageContainer";

interface CommunityDetailPageProps {
  data?: {
    _id: number;
    title: string;
    img_url: string;
    content: string;
    time: string;
    author: string;
    likeCnt: number;
    hateCnt: number;
    commentCnt: number;
    viewCnt: number;
    hashtags: string[];
  };
}

export default function CommunityDetailPage({ data }: CommunityDetailPageProps) {
  return <CommunityDetailPageContainer data={data} />;
}

CommunityDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

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
