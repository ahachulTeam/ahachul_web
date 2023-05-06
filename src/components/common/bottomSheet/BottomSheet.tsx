"use client";

import { Portal } from "../portal";
import React, { ForwardedRef, forwardRef, PropsWithChildren, useEffect, useState } from "react";

import useOnClickOutside from "@/hooks/useOnClickOutside";

import { CloseIcon } from "@/assets/icons";

import * as S from "./styled";

import { BOTTOM_SHEET_DURATION } from "@/constants";

interface BottomSheetProps {
  title: string;
  isOpen: boolean;
  isHeaderHidden?: boolean;
  isTitleHidden?: boolean;
  hasCloseBtn?: boolean;
  className?: string;
  onClose: () => void;
}

function BottomSheet(
  {
    children,
    title,
    isOpen,
    isHeaderHidden = false,
    isTitleHidden = false,
    hasCloseBtn = false,
    className,
    onClose,
  }: PropsWithChildren<BottomSheetProps>,
  ref: ForwardedRef<HTMLDialogElement>
) {
  const [isShow, setIsShow] = useState<boolean>(false);

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
    <Portal containerId="modal-root" isMounted={isOpen}>
      <S.Dim>
        <S.BottomSheet ref={ref} open={isOpen} data-status={isShow} aria-modal="true" tabIndex={-1}>
          {!isHeaderHidden && (
            <S.Header>
              <h2>{title}</h2>
              {hasCloseBtn && (
                <S.CloseBtn type="button" aria-label="닫기 버튼" onClick={onClose}>
                  <CloseIcon />
                </S.CloseBtn>
              )}
            </S.Header>
          )}
          {!isTitleHidden && <h2 css={S.visuallyHidden}>{title}</h2>}
          <S.Content className={className}>{children}</S.Content>
        </S.BottomSheet>
      </S.Dim>
    </Portal>
  );
}

export default forwardRef(BottomSheet);
