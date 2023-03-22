/* eslint-disable react/require-default-props */
import React from "react";

import * as S from "./styled";

export type ButtonSize = "xs" | "sm" | "smd" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  size: ButtonSize;
  variant: ButtonVariant;
  label: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Button({
  type = "button",
  size,
  variant,
  label,
  disabled,
  onClick,
  ...restProps
}: ButtonProps) {
  return (
    <S.Button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      type={type}
      size={size}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </S.Button>
  );
}
