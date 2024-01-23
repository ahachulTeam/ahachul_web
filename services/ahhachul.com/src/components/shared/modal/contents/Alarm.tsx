import React from "react";
import styled from "@emotion/styled";
import { m } from "framer-motion";

import { defaultFadeInVariants } from "~/constants/motions";

import Header from "../../Header";
import useModal from "../hooks/useModal";

interface AlarmModalProps {
  className?: string;
}

const AlarmModal = React.forwardRef(
  (
    { className }: AlarmModalProps,
    ref: React.ForwardedRef<HTMLDialogElement>,
  ) => {
    const { handleModalClose } = useModal();

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
          centerTitle="알림"
        />
      </Base>
    );
  },
);

AlarmModal.displayName = "AlarmModal";

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

export default AlarmModal;
