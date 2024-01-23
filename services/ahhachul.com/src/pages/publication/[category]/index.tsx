import { useRouter } from "next/router";
import { Button } from "@ahhachul/react-components-button";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";

export default function PublicationPage() {
  const router = useRouter();

  const HeaderRightComponent = <Button size="xs">등록</Button>;

  return (
    <Layout>
      <Header
        left={
          <Header.HeaderLeft
            contentsType="close"
            onClick={() => router.back()}
          />
        }
        centerTitle="글 작성"
        right={HeaderRightComponent}
      />
    </Layout>
  );
}
