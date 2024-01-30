import { useRouter } from "next/router";
import { Flex } from "@ahhachul/react-components-layout";

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
      <main>
        <Flex style={{ padding: "24px 20px" }}>기타 설정 페이지</Flex>
      </main>
    </Layout>
  );
}
