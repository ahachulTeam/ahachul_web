import * as React from 'react';
import { forwardRef, Ref } from 'react';
import { headingStyle } from './style.css';
import { HeadingProps } from './types';
import { clsx } from 'clsx';
import { BaseStyle, StyleSprinkles } from '../core/style.css';
import { extractSprinkleProps } from '../utils/properties';

const Heading = (props: HeadingProps, ref: Ref<HTMLElement>) => {
  const { as = 'h1', fontSize, background = 'inherit', color = 'gray', children } = props;

  return React.createElement(
    as,
    {
      ...props,
      ref,
      className: clsx([
        BaseStyle,
        StyleSprinkles(extractSprinkleProps(props, Array.from(StyleSprinkles.properties))),
        headingStyle({
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

const _Heading = forwardRef(Heading);
export { _Heading as Heading };
