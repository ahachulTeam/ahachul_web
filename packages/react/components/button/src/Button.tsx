import * as React from 'react';
import { ButtonProps } from './types';
import { clsx } from 'clsx';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  activeColorVariant,
  buttonStyle,
  enableColorVariant,
  hoverColorVariant,
  spanStyle,
  spinnerStyle,
} from './style.css';
import { useButton } from '@ahhachul/react-hooks-button';

const Button = (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  const { buttonProps } = useButton(props);
  const {
    variant = 'solid',
    size = 'md',
    enableColor,
    hoverColor,
    activeColor,
    leftIcon,
    rightIcon,
    isLoading,
    children,
    style,
  } = props;

  return (
    <button
      {...buttonProps}
      // 기능 ^
      ref={ref}
      className={clsx([
        buttonStyle({
          size,
          variant,
        }),
      ])}
      style={{
        ...assignInlineVars({
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
