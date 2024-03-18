import { UseInputProps } from '@ahhachul/react-hooks-input';

type Size = 'lg' | 'md' | 'sm' | 'xs';

export type InputProps = UseInputProps & {
  color?: string;
  placeholderColor?: string;
  size?: Size;
  variant?: 'outline' | 'filled';
  errorBorderColor?: string;
  focusBorderColor?: string;
};

export type InputGroupProps = {
  color?: string;
  size?: Size;
  children: React.ReactNode[];
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

export type InputLeftAddonProps = {
  color?: string;
  size?: Size;
  children: React.ReactNode;
};
