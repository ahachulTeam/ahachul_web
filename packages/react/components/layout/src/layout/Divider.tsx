import * as React from 'react';
import { DividerProps } from './types';

const Divider = (props: DividerProps, ref: React.Ref<HTMLHRElement>) => {
  const { color = 'gray', variant = 'solid', size = 1, orientation = 'horizontal' } = props;

  const borderStyle =
    orientation === 'horizontal'
      ? {
          width: '100%',
          borderWidth: `0 0 ${size}px 0`,
        }
      : {
          height: '100%',
          borderWidth: `0 0 0 ${size}px`,
        };

  return (
    <hr
      {...props}
      ref={ref}
      style={{
        borderStyle: variant,
        borderColor: color,
        ...borderStyle,
        ...props.style,
      }}
    />
  );
};

const _Divider = React.forwardRef(Divider);
export { _Divider as Divider };
