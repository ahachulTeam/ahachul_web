import * as React from "react";
import { InputProps } from "./types";
import { useInput } from "@ahhachul/react-hooks-input";

import { clsx } from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  colorVariant,
  errorBorderColorVariant,
  focusBorderColorVariant,
  inputStyle,
} from "./style.css";
import { vars } from "@ahhachul/themes";

const Input = (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
  const {
    color = "gray",
    size = "lg",
    variant = "outline",
    errorBorderColor = "#E53E3E",
    focusBorderColor = "#3182CE",
    className,
    style,
    ...rest
  } = props;

  const { inputProps } = useInput(rest);

  return (
    <input
      {...inputProps}
      ref={ref}
      className={clsx([
        inputStyle({
          size,
          variant,
        }),
        className,
      ])}
      style={{
        ...assignInlineVars({
          [colorVariant]: vars.colors.$scale[color][900],
          [errorBorderColorVariant]: errorBorderColor,
          [focusBorderColorVariant]: focusBorderColor,
        }),
        ...style,
      }}
    />
  );
};

const _Input = React.forwardRef(Input);

_Input.displayName = "Input";

export { _Input as Input };
