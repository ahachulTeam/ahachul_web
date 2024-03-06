import React, { useState, useEffect } from "react";

// import { SuccessIcon, WarningIcon } from "assets/icon";
import { useToast } from "./hooks/useToast";
import type { Toast } from "./core/types";
import * as S from "./ToastItem.styled";

interface ToastItemProps extends Toast {
  id: string;
}

const TRANSITION_DURATION = 1000;
const TOAST_DURATION = 3000;

const ToastItem = ({ type, id, content }: ToastItemProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const { removeToast } = useToast();

  useEffect(() => {
    const existTimeout = setTimeout(() => {
      setIsClosing(true);
    }, TOAST_DURATION);

    const expireToastTimeout = setTimeout(() => {
      removeToast(id);
    }, TOAST_DURATION + TRANSITION_DURATION);

    return () => {
      clearTimeout(existTimeout);
      clearTimeout(expireToastTimeout);
    };
  }, []);

  return (
    <S.ToastItem isClosing={isClosing}>
      <S.Item data-type={type}>
        <p>{content}</p>
      </S.Item>
    </S.ToastItem>
  );
};

export default ToastItem;
