import { ReactElement } from "react";

import { LostContainer } from "@/components/domain";
import { Layout } from "@/components/layout";

export default function LostPage() {
  return <LostContainer />;
}

LostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
