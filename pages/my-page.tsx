import React, { ReactElement } from "react";

import { Layout } from "@/components";

export default function MyPage() {
  return <span>MyPage</span>;
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
