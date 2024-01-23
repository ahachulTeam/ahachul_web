import { useRouter } from "next/router";
import { useSearchParams, usePathname } from "next/navigation";
import React, { useRef, useCallback } from "react";
import { useRecoilState } from "recoil";

import { modalCompoState } from "~/stores/common";
import { createHref, deleteQueryString } from "~/utils/navigation";
import { MODAL_SLUG } from "~/constants/modal";

const useModal = (queryPreset?: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

      if (queryPreset) {
        router.replace({
          pathname: router.pathname,
          query: { ...router.query, "m-slug": queryPreset },
        });
      }

      openModalComponent(compo);
    },
    [],
  );

  const handleModalClose = () => {
    if (queryPreset && router.query?.[MODAL_SLUG]) {
      const params = deleteQueryString(searchParams, MODAL_SLUG);

      router.replace(createHref(pathname, params));
    }

    const newModalList = [...modalCompo];
    newModalList.pop();
    setModalCompo(newModalList);

    if (newModalList.length === 0) {
      document.body.style.cssText = "overflow: overlay";
    }
  };

  return {
    modalCompo,
    modalRef,
    openModalComponent,
    handleModalOpen,
    handleModalClose,
  };
};

export default useModal;
