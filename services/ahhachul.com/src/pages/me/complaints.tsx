import { useRouter } from "next/router";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import ComplaintsCard from "~/components/me/ComplaintsCard";

export default function MeComplaintsPage() {
  const router = useRouter();

  return (
    <Layout>
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={() => router.back()}
          />
        }
        centerTitle="접수 민원"
      />
      <main>
        <ComplaintsCard />
        <ComplaintsCard />
        <ComplaintsCard />
        <ComplaintsCard />
        <ComplaintsCard />
        <ComplaintsCard />
      </main>
    </Layout>
  );
}
