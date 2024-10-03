import * as React from 'react';
import { vars } from '@ahhachul/themes';
import { useInput } from '@ahhachul/react-hooks-input';

import { clsx } from 'clsx';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { InputProps } from './types';
import {
  colorVariant,
  placeholderColorVariant,
  errorBorderColorVariant,
  focusBorderColorVariant,
  inputStyle,
} from './style.css';

const Input = (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
  const {
    size = 'md',
    variant = 'outline',
    color = 'white',
    errorBorderColor = vars.colors.$scale.error[50],
    placeholderColor = vars.colors.$scale.blueDarkGray[300],
    focusBorderColor = vars.colors.$static.foundation.blueGrayAlpha[50],
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
          [colorVariant]: color,
          [placeholderColorVariant]: placeholderColor,
          [errorBorderColorVariant]: errorBorderColor,
          [focusBorderColorVariant]: focusBorderColor,
        }),
        ...style,
      }}
    />
  );
};

const _Input = React.forwardRef(Input);

_Input.displayName = 'Input';

export { _Input as Input };
