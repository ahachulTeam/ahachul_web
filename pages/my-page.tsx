import React, { ReactElement } from "react";

<<<<<<< HEAD
import { Layout } from "@/components";

export default function MyPage() {
  return <span>MyPage</span>;
=======
import { Layout, MyPageContainer } from "@/components";

export default function MyPage() {
  return <MyPageContainer />;
>>>>>>> develop
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
