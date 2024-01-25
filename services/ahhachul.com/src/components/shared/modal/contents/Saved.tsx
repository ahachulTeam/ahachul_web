import SerchModal from "./search/SearchModal";
import Header from "../../Header";
import ResetButton from "../../ResetButton";

import useModal from "../hooks/useModal";
import { SearchSVG } from "~/assets/icons";

const SavedModal = () => {
  const { handleModalOpen, handleModalClose } = useModal();

  const handleHamburger = () => {
    handleModalOpen(<SerchModal />)();
  };

  return (
    <>
      <Header
        left={
          <Header.HeaderLeft contentsType="close" onClick={handleModalClose} />
        }
        centerTitle="저장"
        right={
          <ResetButton
            ItemComponent={<SearchSVG />}
            onClick={handleHamburger}
          />
        }
      />
    </>
  );
};

export default SavedModal;
