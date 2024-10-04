import * as React from 'react';
import type { DividerProps } from './types';

const Divider = React.forwardRef<HTMLHRElement, DividerProps>((props, ref) => {
  const {
    color = 'gray',
    variant = 'solid',
    size = 1,
    orientation = 'horizontal',
    style,
    ...restProps
  } = props;

  const isHorizontal = orientation === 'horizontal';

  const dividerStyle: React.CSSProperties = {
    borderStyle: variant,
    borderColor: color,
    ...(isHorizontal
      ? {
          width: '100%',
          borderWidth: `0 0 ${size}px 0`,
        }
      : {
          height: '100%',
          borderWidth: `0 0 0 ${size}px`,
        }),
    ...style,
  };

  return (
    <hr
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      style={dividerStyle}
      {...restProps}
    />
  );
});

Divider.displayName = 'Divider';

export { Divider };
