import { classes } from '@ahhachul/themes';
import { AsElementProps, StyleProps } from '../core/types';
import { CSSProperties } from '@vanilla-extract/css';

export type TextProps = AsElementProps &
  StyleProps & {
    fontSize: keyof typeof classes.typography.text;
    fontWeight?: CSSProperties['fontWeight'];
    align?: CSSProperties['textAlign'];
    casing?: CSSProperties['textTransform'];
    decoration?: CSSProperties['textDecoration'];
  };

export type HeadingProps = StyleProps &
  AsElementProps & {
    fontSize: keyof typeof classes.typography.heading;
  };
