import * as React from 'react';
import { GridItemProps } from './types';
import { clsx } from 'clsx';
import { BaseStyle, StyleSprinkles } from '../core/style.css';
import { extractSprinkleProps } from '../utils/properties';

const GridItem = (props: GridItemProps, ref: React.Ref<HTMLElement>) => {
  const { as = 'div', color, background, children, area, colEnd, colStart, colSpan, rowEnd, rowStart, rowSpan } = props;

  return React.createElement(
    as,
    {
      ...props,
      ref,
      className: clsx([
        BaseStyle,
        StyleSprinkles(extractSprinkleProps(props, Array.from(StyleSprinkles.properties))),
        props.className,
      ]),
      style: {
        gridArea: area,
        gridColumnEnd: colEnd,
        gridColumnStart: colStart,
        gridColumn: colSpan,
        gridRowEnd: rowEnd,
        gridRowStart: rowStart,
        gridRow: rowSpan,
        color,
        backgroundColor: background,
        ...props.style,
      },
    },
    children,
  );
};

const _GridItem = React.forwardRef(GridItem);
export { _GridItem as GridItem };
