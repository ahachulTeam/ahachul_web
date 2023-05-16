import React from "react";

import type { TagVariant } from "@/types/common";

import * as S from "./styled";
<<<<<<< HEAD
import { CloseIcon } from "@/assets/icons";
=======
>>>>>>> develop

interface TagBtnProps {
  className?: string;
  label: string;
  variant?: TagVariant;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
<<<<<<< HEAD
  onDelete?: () => void;
=======
>>>>>>> develop
}

export default function TagBtn({
  className,
  label,
  variant = "primary",
  disabled = false,
  onClick,
<<<<<<< HEAD
  onDelete,
=======
>>>>>>> develop
}: TagBtnProps) {
  return (
    <S.TagBtn
      type="button"
      className={className}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{label}</span>
<<<<<<< HEAD
      {/* {variant === "outline" && (
        <S.IconBtn onClick={onDelete}>
          <CloseIcon />
        </S.IconBtn>
      )} */}
=======
>>>>>>> develop
    </S.TagBtn>
  );
}
