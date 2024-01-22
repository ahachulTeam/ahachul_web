import { useCallback } from "react";
import { useRouter } from "next/router";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import FixedBottomButton from "~/components/shared/FixedBottomButton";

import { useToast } from "~/components/shared/toast/hooks/useToast";
import { useAlertContext } from "~/contexts/AlertContext";

export default function Home() {
  const router = useRouter();

  const { addToast } = useToast();
  const { open } = useAlertContext();

  const handleBottomButtonClick = useCallback(() => {
    open({
      title: "새로운 민원을 생성하시겠어요?",
      onButtonClick: () =>
        addToast({
          type: "success",
          content: "민원이 전송됐어요. 조금만 기달려주세요.",
        }),
    });
  }, [addToast, open]);

  return (
    <Layout>
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
        <FixedBottomButton
          label={"민원접수"}
          onClick={handleBottomButtonClick}
        />
      </main>
    </Layout>
  );
}
