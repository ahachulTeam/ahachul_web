import { useCallback } from "react";
import { useRouter } from "next/router";

import Header from "~/components/shared/Header";
import Layout from "~/components/shared/Layout";
import FixedBottomButton from "~/components/shared/FixedBottomButton";
import ResetButton from "~/components/shared/ResetButton";

import { useToast } from "~/components/shared/toast/hooks/useToast";
import { useAlertContext } from "~/contexts/AlertContext";
import useModal from "~/components/shared/modal/hooks/useModal";
import SearchModal from "~/components/shared/modal/contents/Search";
import { MODAL_PRESET_SLUGS } from "~/constants/modal";
import { SearchSVG } from "~/assets/icons";

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
      </main>
    </Layout>
  );
}

const HeaderRightComponent = () => {
  const { handleModalOpen } = useModal(MODAL_PRESET_SLUGS.search);

  const openSearchModal = () => {
    handleModalOpen(<SearchModal />)();
  };

  return (
    <ResetButton ItemComponent={<SearchSVG />} onClick={openSearchModal} />
  );
};
