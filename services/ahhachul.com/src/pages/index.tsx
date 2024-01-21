import { useCallback } from "react";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import FixedBottomButton from "~/components/shared/FixedBottomButton";

import { useToast } from "~/components/shared/toast/hooks/useToast";
import { useAlertContext } from "~/contexts/AlertContext";
import { BackSVG } from "~/assets/icons";

export default function Home() {
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
      <Header left={<BackSVG />} centerTitle="민원" />
      <main>
        <FixedBottomButton
          label={"민원접수"}
          onClick={handleBottomButtonClick}
        />
      </main>
    </Layout>
  );
}
