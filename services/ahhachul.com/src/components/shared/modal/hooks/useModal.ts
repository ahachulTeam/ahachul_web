import React, { useRef, useCallback } from "react";
import { useRecoilState } from "recoil";

import { modalCompoState } from "~/stores/common";

const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const [modalCompo, setModalCompo] = useRecoilState(modalCompoState);

  const openModalComponent = useCallback((compo: React.ReactNode) => {
    document.body.style.cssText = "overflow-y: hidden";
    const newCompo = [...modalCompo, compo];
    setModalCompo(newCompo);
  }, []);

  const handleModalOpen = useCallback(
    (compo: React.ReactNode) => (e?: React.MouseEvent) => {
      e?.stopPropagation();

      openModalComponent(compo);
    },
    [],
  );

  const handleModalClose = () => {
    const newModalList = [...modalCompo];
    newModalList.pop();
    setModalCompo(newModalList);

    if (newModalList.length === 0) {
      document.body.style.cssText = "overflow: overlay";
    }
  };

  const handleResetModal = () => {
    setModalCompo([]);
    document.body.style.cssText = "overflow: overlay";
  };

  return {
    modalCompo,
    modalRef,
    openModalComponent,
    handleModalOpen,
    handleModalClose,
    handleResetModal,
  };
};

export default useModal;
