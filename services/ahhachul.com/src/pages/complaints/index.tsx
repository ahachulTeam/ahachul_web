import { useRouter } from "next/router";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import ComplaintOverviewList from "~/components/complaints/lounge/OverviewList";

export default function ComplaintsLoungePage() {
  const router = useRouter();

  return (
    <Layout footer={false}>
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={() => router.back()}
          />
        }
        centerTitle="민원"
      />
      <main>
        <ComplaintOverviewList />
      </main>
    </Layout>
  );
}
