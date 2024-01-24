import React from "react";
import styled from "@emotion/styled";
import { m } from "framer-motion";

import { defaultFadeInVariants } from "~/constants/motions";

interface ModalBaseProps {
  children: React.ReactNode;
}

const ModalBase = React.forwardRef(
  (
    { children }: ModalBaseProps,
    ref: React.ForwardedRef<HTMLDialogElement>,
  ) => {
    return (
      <Base
        ref={ref}
        tabIndex={0}
        aria-haspopup="true"
        aria-labelledby="modal"
        aria-modal="true"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={defaultFadeInVariants}
      >
        {children}
      </Base>
    );
  },
);

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

export default ModalBase;
