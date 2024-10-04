import * as React from 'react';
import { clsx } from 'clsx';
import { vars } from '@ahhachul/themes';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useButton } from '@ahhachul/react-hooks-button';
import type { ButtonProps } from './types';
import {
  colorVariant,
  radiusVariant,
  activeColorVariant,
  buttonStyle,
  enableColorVariant,
  hoverColorVariant,
  spanStyle,
  spinnerStyle,
} from './style.css';

const Button = (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  const { buttonProps } = useButton(props);
  const {
    variant = 'solid',
    size = 'md',
    color = 'white',
    borderRadius = vars.box.radii.lg,
    hoverColor = vars.colors.$static.foundation.skyPurpleAlpha[50],
    activeColor = vars.colors.$static.foundation.skyPurpleAlpha[50],
    enableColor = vars.colors.$static.foundation.blueGrayAlpha[100],
    leftIcon,
    rightIcon,
    isLoading,
    children,
    style,
  } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={clsx([
        buttonStyle({
          size,
          variant,
        }),
      ])}
      style={{
        ...assignInlineVars({
          [radiusVariant]: borderRadius,
          [colorVariant]: color,
          [enableColorVariant]: enableColor,
          [hoverColorVariant]: hoverColor,
          [activeColorVariant]: activeColor,
        }),
        ...style,
      }}
    >
      {isLoading && <div className={spinnerStyle({ size })} />}
      {leftIcon && <span className={spanStyle({ size })}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={spanStyle({ size })}>{rightIcon}</span>}
    </button>
  );
};

const _Button = React.forwardRef(Button);
export { _Button as Button };
