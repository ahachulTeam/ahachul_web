import { useRouter } from "next/router";
import { Flex } from "@ahhachul/react-components-layout";
import { Button } from "@ahhachul/react-components-button";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import ResetButton from "~/components/shared/ResetButton";

export default function StationSettingPage() {
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
        centerTitle="MY 지하철"
        right={
          <ResetButton
            ItemComponent={
              <Button variant="ghost" isDisabled>
                완료
              </Button>
            }
            onClick={() => {}}
          />
        }
      />
      <main>
        <Flex style={{ padding: "24px 20px" }}>지하철 설정 페이지</Flex>
      </main>
    </Layout>
  );
}
