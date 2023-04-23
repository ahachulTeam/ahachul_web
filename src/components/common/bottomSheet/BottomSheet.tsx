"use client";

import { Portal } from "../portal";
<<<<<<< HEAD
import React, { ForwardedRef, forwardRef, PropsWithChildren, useEffect, useState } from "react";
=======
import { ForwardedRef, forwardRef, PropsWithChildren, useEffect, useState } from "react";
>>>>>>> develop

import useOnClickOutside from "@/hooks/useOnClickOutside";

import { CloseIcon } from "@/assets/icons";

import * as S from "./styled";

import { BOTTOM_SHEET_DURATION } from "@/constants";

interface BottomSheetProps {
  title: string;
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose: () => void;
}

function BottomSheet(
  { children, title, isOpen, hasCloseBtn = false, onClose }: PropsWithChildren<BottomSheetProps>,
  ref: ForwardedRef<HTMLDialogElement>
) {
<<<<<<< HEAD
  const [isShow, setIsShow] = useState<boolean>(false);
=======
  const [isShow, setIsShow] = useState(false);
>>>>>>> develop

  const handleClose = () => {
    setIsShow(false);
    setTimeout(() => {
      onClose();
    }, BOTTOM_SHEET_DURATION - 50);
  };

  useOnClickOutside(ref, handleClose);

  useEffect(() => {
    if (isOpen) {
      setIsShow(true);
    }
  }, [isOpen]);

  return (
<<<<<<< HEAD
    <Portal container="#modal-root" mounted={isOpen}>
      <S.Dim>
        <S.BottomSheet
          ref={ref}
          open={isOpen}
          aria-modal="true"
          data-isshow={!!isShow}
          tabIndex={-1}
        >
=======
    <Portal containerId="modal-root" isMounted={isOpen}>
      <S.Dim>
        <S.BottomSheet ref={ref} open={isOpen} isShow={isShow} aria-modal="true" tabIndex={-1}>
>>>>>>> develop
          <S.Header>
            <h2>{title}</h2>
            {hasCloseBtn && (
              <S.CloseBtn type="button" aria-label="닫기 버튼" onClick={onClose}>
                <CloseIcon />
              </S.CloseBtn>
            )}
          </S.Header>
          <S.Content>{children}</S.Content>
        </S.BottomSheet>
      </S.Dim>
    </Portal>
  );
}

export default forwardRef(BottomSheet);
