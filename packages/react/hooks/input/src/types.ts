import { ComponentPropsWithoutRef } from "react";

export type UseInputProps = {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  value?: string;
  onChange?: string;
} & Omit<ComponentPropsWithoutRef<"input">, "disabled" | "readOnly">;

export type UseInputResult = {
  inputProps: ComponentPropsWithoutRef<"input"> & {
    "data-disabled": boolean;
    "data-invalid": boolean;
    "aria-invalid": boolean;
    "aria-required": boolean;
  };
  valueCount: number;
};
