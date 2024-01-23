import React from "react";
import styled from "@emotion/styled";
import useModal from "../hooks/useModal";
import { MODAL_PRESET_SLUGS } from "~/constants/modal";

interface AlarmModalProps {
  className?: string;
}

const AlarmModal = React.forwardRef(
  (
    { className }: AlarmModalProps,
    ref: React.ForwardedRef<HTMLDialogElement>,
  ) => {
    const { handleModalClose } = useModal(MODAL_PRESET_SLUGS.alarm);

    return (
      <Base
        ref={ref}
        className={className}
        aria-haspopup="true"
        aria-labelledby="modal"
        aria-modal="true"
        tabIndex={0}
      >
        <div>hello this is Alarm modal</div>
        <br />
        <br />
        <button onClick={handleModalClose}>close</button>
      </Base>
    );
  },
);

AlarmModal.displayName = "AlarmModal";

const Base = styled.dialog`
  position: relative;
  display: block;
  border: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: var(--z-indexes-dialog);
`;

export default AlarmModal;
