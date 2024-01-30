import { useRouter } from "next/router";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";

export default function EtcSettingPage() {
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
        centerTitle="설정"
      />
      <main>설정</main>
    </Layout>
  );
}
