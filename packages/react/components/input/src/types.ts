import { UseInputProps } from "@ahhachul/react-hooks-input";
import { vars } from "@ahhachul/themes";

type Size = "lg" | "md" | "sm" | "xs";
type Color = keyof typeof vars.colors.$scale;

export type InputProps = UseInputProps & {
  color?: Color;
  size?: Size;
  variant?: "outline" | "filled";
  errorBorderColor?: string;
  focusBorderColor?: string;
};

export type InputGroupProps = {
  color?: Color;
  size?: Size;
  children: React.ReactNode[];
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

export type InputLeftAddonProps = {
  color?: Color;
  size?: Size;
  children: React.ReactNode;
};
