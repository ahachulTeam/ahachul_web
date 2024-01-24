import React from "react";

import { MODAL_PRESET_SLUGS } from "~/constants/modal";
import { HamburgerSVG } from "~/assets/icons";

import HistoryList from "./History";
import HashTagList from "./Hashtag";
import SearchGroup from "./SearchGroup";

import ServiceModal from "../Service";
import useModal from "../../hooks/useModal";

import Header from "../../../Header";
import ResetButton from "../../../ResetButton";

const SearchModal = () => {
  const { handleModalOpen, handleModalClose } = useModal(
    MODAL_PRESET_SLUGS.search,
  );

  const handleHamburger = () => {
    handleModalOpen(<ServiceModal />)();
  };

  return (
    <>
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={handleModalClose}
          />
        }
        centerTitle="검색"
        right={
          <ResetButton
            ItemComponent={<HamburgerSVG />}
            onClick={handleHamburger}
          />
        }
      />
      <SearchGroup />
      <HistoryList />
      <HashTagList />
    </>
  );
};

export default SearchModal;
