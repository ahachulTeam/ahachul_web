import { vars } from "@ahhachul/design-system";
import { AsElementProps, StyleProps } from "../core/types";
import { CSSProperties } from "@vanilla-extract/css";
import { TextProps } from "../typography";

export type BoxProps = AsElementProps & StyleProps;

export type DividerProps = {
  orientation?: "horizontal" | "vertical";
  color?: keyof typeof vars.colors.$scale;
  size?: number;
  variant?: "solid" | "dashed";
} & React.HTMLAttributes<HTMLHRElement>;

export type FlexProps = {
  align?: CSSProperties["alignItems"];
  basis?: CSSProperties["flexBasis"];
  direction?: CSSProperties["flexDirection"];
  grow?: CSSProperties["flexGrow"];
  justify?: CSSProperties["justifyContent"];
  shrink?: CSSProperties["flexShrink"];
  wrap?: CSSProperties["flexWrap"];
  gap?: CSSProperties["gap"];
} & BoxProps;

export type GridProps = {
  autoColumns?: CSSProperties["gridAutoColumns"];
  autoFlow?: CSSProperties["gridAutoFlow"];
  autoRows?: CSSProperties["gridAutoRows"];
  column?: CSSProperties["gridColumn"];
  columnGap?: CSSProperties["columnGap"];
  gap?: CSSProperties["gap"];
  row?: CSSProperties["gridRow"];
  rowGap?: CSSProperties["rowGap"];
  templateAreas?: CSSProperties["gridTemplateAreas"];
  templateColumns?: CSSProperties["gridTemplateColumns"];
  templateRows?: CSSProperties["gridTemplateRows"];
} & BoxProps;

export type GridItemProps = {
  area?: CSSProperties["gridArea"];
  colEnd?: CSSProperties["gridColumnEnd"];
  colStart?: CSSProperties["gridColumnStart"];
  colSpan?: CSSProperties["gridColumn"];
  rowEnd?: CSSProperties["gridRowEnd"];
  rowStart?: CSSProperties["gridRowStart"];
  rowSpan?: CSSProperties["gridRow"];
} & BoxProps;

export type ListProps = {
  variant?: "ordered" | "unordered";
  spacing?: keyof typeof vars.box.spacing;
} & BoxProps;

export type OrderListProps = Omit<ListProps, "variant">;
export type ListItemProps = TextProps;

export type UnorderedListProps = Omit<ListProps, "variant"> & {
  listStyleType?: CSSProperties["listStyleType"];
};
