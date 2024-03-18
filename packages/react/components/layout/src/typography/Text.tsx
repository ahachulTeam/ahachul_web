import * as React from 'react';
import { TextProps } from './types';
import { BaseStyle, StyleSprinkles } from '../core/style.css';
import { clsx } from 'clsx';
import { extractSprinkleProps } from '../utils/properties';
import { textStyle } from './style.css';

const Text = (props: TextProps, ref: React.Ref<HTMLElement>) => {
  const { as = 'p', color = 'gray', background = 'inherit', children, fontSize } = props;

  return React.createElement(
    as,
    {
      ...props,
      ref,
      className: clsx([
        BaseStyle,
        StyleSprinkles(extractSprinkleProps(props, Array.from(StyleSprinkles.properties))),
        textStyle({
          fontSize,
        }),
        props.className,
      ]),
      style: {
        color,
        backgroundColor: background,
        ...props.style,
      },
    },
    children,
  );
};

const _Text = React.forwardRef(Text);
export { _Text as Text };
