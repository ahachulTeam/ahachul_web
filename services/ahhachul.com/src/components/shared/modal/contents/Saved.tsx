import React from "react";
import styled from "@emotion/styled";
import { m } from "framer-motion";

import { defaultFadeInVariants } from "~/constants/motions";

import Header from "../../Header";
import useModal from "../hooks/useModal";
import { MODAL_PRESET_SLUGS } from "~/constants/modal";
import SerchModal from "./Search";
import ResetButton from "../../ResetButton";
import { SearchSVG } from "~/assets/icons";

interface SavedModalProps {
  className?: string;
}

const SavedModal = React.forwardRef(
  (
    { className }: SavedModalProps,
    ref: React.ForwardedRef<HTMLDialogElement>,
  ) => {
    const { handleModalOpen, handleModalClose } = useModal(
      MODAL_PRESET_SLUGS.search,
    );

    const handleHamburger = () => {
      handleModalOpen(<SerchModal />)();
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
              contentsType="close"
              onClick={handleModalClose}
            />
          }
          centerTitle="저장"
          right={
            <ResetButton
              ItemComponent={<SearchSVG />}
              onClick={handleHamburger}
            />
          }
        />
      </Base>
    );
  },
);

SavedModal.displayName = "SavedModal";

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

export default SavedModal;
