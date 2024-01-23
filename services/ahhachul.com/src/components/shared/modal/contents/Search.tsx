import React from "react";
import styled from "@emotion/styled";
import { m } from "framer-motion";
import { InputGroup, Input } from "@ahhachul/react-components-input";

import { MODAL_PRESET_SLUGS } from "~/constants/modal";
import { HamburgerSVG } from "~/assets/icons";
import { defaultFadeInVariants } from "~/constants/motions";

import Header from "../../Header";
import ResetButton from "../../ResetButton";
import useModal from "../hooks/useModal";
import ServiceModal from "./Service";

interface SearchModalProps {
  className?: string;
}

const SearchModal = React.forwardRef(
  (
    { className }: SearchModalProps,
    ref: React.ForwardedRef<HTMLDialogElement>,
  ) => {
    const { handleModalOpen, handleModalClose } = useModal(
      MODAL_PRESET_SLUGS.search,
    );

    const handleHamburger = () => {
      handleModalOpen(<ServiceModal />)();
    };

    return (
      <Base
        ref={ref}
        className={className}
        aria-haspopup="true"
        aria-labelledby="modal"
        aria-modal="true"
        tabIndex={0}
        variants={defaultFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
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
        <InputGroup style={{ padding: "15px 20px" }}>
          {/* <InputLeftAddon>
            <ResetButton ItemComponent={<SearchSVG />} onClick={() => {}} />
          </InputLeftAddon> */}
          <Input variant="filled" placeholder="검색어를 입력해주세요." />
          <div />
        </InputGroup>
        {/* <HistoryGroup>
          <History />
        </HistoryGroup>
        <RankingHashTagGroup>
          <HashTag />
        </RankingHashTagGroup> */}
      </Base>
    );
  },
);

SearchModal.displayName = "SearchModal";

const Base = styled(m.dialog)`
  position: relative;
  display: block;
  padding: 0;
  border: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: var(--z-indexes-dialog);
`;

export default SearchModal;
