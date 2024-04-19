export type ButtonProps = {
  color?: string;
  enableColor?: string;
  hoverColor?: string;
  activeColor?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
