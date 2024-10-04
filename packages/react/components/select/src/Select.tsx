import * as React from 'react';
import { vars } from '@ahhachul/themes';
import { SelectProps } from './types';

import { clsx } from 'clsx';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  colorVariant,
  errorBorderColorVariant,
  focusBorderColorVariant,
  selectStyle,
} from './style.css';
import { useSelect } from '@ahhachul/react-hooks-select';

const Select = (props: SelectProps, ref: React.Ref<HTMLSelectElement>) => {
  const {
    size = 'md',
    color = 'white',
    variant = 'outline',
    errorBorderColor = vars.colors.$scale.error[50],
    focusBorderColor = vars.colors.$static.foundation.blueGrayAlpha[50],
    className,
    style,
    ...rest
  } = props;

  const { selectProps } = useSelect(rest);

  return (
    <select
      {...selectProps}
      ref={ref}
      className={clsx([
        selectStyle({
          size,
          variant,
        }),
        className,
      ])}
      style={{
        ...assignInlineVars({
          [colorVariant]: color,
          [errorBorderColorVariant]: errorBorderColor,
          [focusBorderColorVariant]: focusBorderColor,
        }),
        ...style,
      }}
    />
  );
};

const _Select = React.forwardRef(Select);

export { _Select as Select };
