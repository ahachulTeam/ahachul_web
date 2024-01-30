import { useRouter } from "next/router";
import { Flex, Text } from "@ahhachul/react-components-layout";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import ResetButton from "~/components/shared/ResetButton";

export default function NicknameSettingPage() {
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
        right={
          <ResetButton
            ItemComponent={
              <Text fontSize="md" style={{ color: "#9EA1AA" }}>
                완료
              </Text>
            }
            onClick={() => {}}
          />
        }
      />
      <main>
        <Flex style={{ padding: "24px 20px" }}>닉네임 설정 페이지</Flex>
      </main>
    </Layout>
  );
}
