import { ReactElement } from "react";

<<<<<<< HEAD
import { CommunityPageContainer, Layout } from "@/components";

export default function CommunityPage() {
  return <CommunityPageContainer />;
=======
import { Layout } from "@/components";

export default function CommunityPage() {
  return <div>CommunityPage</div>;
>>>>>>> develop
}

CommunityPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
