import { ReactElement } from "react";

import { Layout } from "@/components";

export default function CommunityPage() {
  return <div>CommunityPage</div>;
}

CommunityPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
