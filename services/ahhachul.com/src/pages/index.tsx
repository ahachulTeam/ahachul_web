import dynamic from "next/dynamic";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { Flex } from "@ahhachul/react-components-layout";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import ResetButton from "~/components/shared/ResetButton";
import FixedBottomButton from "~/components/shared/FixedBottomButton";

import useModal from "~/components/shared/modal/hooks/useModal";
import { useAlertContext } from "~/contexts/AlertContext";
import { useToast } from "~/components/shared/toast/hooks/useToast";
import { BellSVG, SearchSVG } from "~/assets/icons";

const SearchModal = dynamic(
  () => import("~/components/shared/modal/contents/search/SearchModal"),
  { ssr: false },
);

const AlarmModal = dynamic(
  () => import("~/components/shared/modal/contents/alarm/AlarmModal"),
  { ssr: false },
);

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
        right={<HeaderRightComponent />}
      />
      <main>
        <FixedBottomButton
          label={"민원접수"}
          onClick={handleBottomButtonClick}
        />
        <div>홈이에요</div>
      </main>
    </Layout>
  );
}

const HeaderRightComponent = () => {
  const { handleModalOpen } = useModal();

  const openSearchModal = () => {
    handleModalOpen(<SearchModal />)();
  };

  const openAlarmModal = () => {
    handleModalOpen(<AlarmModal />)();
  };

  return (
    <Flex align="center" gap="15px">
      <ResetButton ItemComponent={<SearchSVG />} onClick={openSearchModal} />
      <ResetButton ItemComponent={<BellSVG />} onClick={openAlarmModal} />
    </Flex>
  );
};
