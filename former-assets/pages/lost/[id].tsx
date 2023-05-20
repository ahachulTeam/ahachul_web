import { useRouter } from "next/navigation";
import { type ReactElement } from "react";

import { LostDetailContainer } from "@/components/domain";
import { Layout } from "@/components/layout";

export default function LostDetailPage() {
  return <LostDetailContainer />;
}

LostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
