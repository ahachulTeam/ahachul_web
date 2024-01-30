import { useRouter } from "next/router";
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
      <main>MY 지하철</main>
    </Layout>
  );
}
