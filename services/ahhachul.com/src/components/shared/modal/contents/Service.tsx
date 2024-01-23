import React from "react";
import styled from "@emotion/styled";
import { m } from "framer-motion";
import { InputGroup, Input } from "@ahhachul/react-components-input";

import { defaultFadeInVariants } from "~/constants/motions";

import Header from "../../Header";
import useModal from "../hooks/useModal";

interface ServiceModalProps {
  className?: string;
}

const ServiceModal = React.forwardRef(
  (
    { className }: ServiceModalProps,
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
          centerTitle="전체 서비스"
        />
        <InputGroup style={{ padding: "15px 20px" }}>
          <Input variant="filled" placeholder="검색어를 입력해주세요." />
          <div />
        </InputGroup>
      </Base>
    );
  },
);

ServiceModal.displayName = "ServiceModal";

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

export default ServiceModal;
