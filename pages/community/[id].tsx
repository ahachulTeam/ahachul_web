import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Layout } from "@/components";

export default function CommunityDetailPage() {
  const { query } = useRouter();

  return <div>커뮤니티 {query?.id} 상세페이지</div>;
}

CommunityDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
