import { Flex } from "@ahhachul/react-components-layout";
import { useRouter } from "next/router";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import ResetButton from "~/components/shared/ResetButton";
import { ShareSVG, EllipsisVerticalSVG } from "~/assets/icons";

export default function ComplaintRoomPage() {
  const router = useRouter();

  const HeaderRightComponent = (
    <Flex align="center" gap="15px">
      <ResetButton ItemComponent={<ShareSVG />} onClick={() => {}} />
      <ResetButton ItemComponent={<EllipsisVerticalSVG />} onClick={() => {}} />
    </Flex>
  );

  return (
    <Layout>
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={() => router.back()}
          />
        }
        right={HeaderRightComponent}
      />
    </Layout>
  );
}
