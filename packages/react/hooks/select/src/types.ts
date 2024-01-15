import { ComponentPropsWithoutRef } from "react";

export type UseSelectProps = {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
} & Omit<ComponentPropsWithoutRef<"select">, "disabled">;

export type UseSelectReturn = {
  selectProps: ComponentPropsWithoutRef<"select"> & {
    "data-disabled": boolean;
    "data-invalid": boolean;
    "aria-invalid": boolean;
    "aria-required": boolean;
  };
};

