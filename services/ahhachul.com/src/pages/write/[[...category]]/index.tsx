import { useRouter } from "next/router";
import { Button } from "@ahhachul/react-components-button";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import Editor from "~/components/shared/editor/Editor";

export default function PublicationPage() {
  const router = useRouter();
  console.log(router.query.category);

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
        right={<HeaderRightComponent />}
      />
      <Editor />
    </Layout>
  );
}

const HeaderRightComponent = () => (
  <Button size="xs" variant="solid" isDisabled>
    등록
  </Button>
);
