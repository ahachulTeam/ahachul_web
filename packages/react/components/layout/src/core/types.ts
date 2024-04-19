import { StyleSprinkles } from './style.css';

type AsProps = {
  as?: Exclude<keyof JSX.IntrinsicElements, keyof SVGElementTagNameMap>;
};

type ElementProps = Omit<React.HTMLAttributes<HTMLElement>, 'as'>;

export type AsElementProps = AsProps & ElementProps;

export type ColorProps = {
  color?: string;
  background?: string;
};

export type StyleProps = Parameters<typeof StyleSprinkles>[0] & ColorProps;
