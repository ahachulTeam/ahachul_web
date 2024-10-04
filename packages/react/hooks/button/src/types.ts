import type { ComponentProps, HTMLAttributes } from 'react';

export type ButtonElementType = 'button' | 'div' | 'span';

export type BaseButtonProps<T extends ButtonElementType = 'button'> = {
  elementType?: T;
  role?: string;
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  isLoading?: boolean;
  tabIndex?: number;
} & ComponentProps<T>;

export type UseButtonReturn<T> = {
  buttonProps: HTMLAttributes<T> & {
    role?: string;
    type?: 'button' | 'submit' | 'reset';
    tabIndex?: number;
    disabled?: boolean;
    'data-loading': boolean;
  };
};

export type OverloadedButtonFunction = {
  (props: BaseButtonProps<'button'>): UseButtonReturn<HTMLButtonElement>;
  (props: BaseButtonProps<'div'>): UseButtonReturn<HTMLDivElement>;
  (props: BaseButtonProps<'span'>): UseButtonReturn<HTMLSpanElement>;
};

export type UseToggleButtonReturn<T> = UseButtonReturn<T> & {
  isSelected: boolean;
};

export type OverloadedToggleButtonFunction = {
  (
    props: BaseButtonProps<'button'>,
    isSelected?: boolean,
  ): UseToggleButtonReturn<HTMLButtonElement>;
  (
    props: BaseButtonProps<'div'>,
    isSelected?: boolean,
  ): UseToggleButtonReturn<HTMLDivElement>;
  (
    props: BaseButtonProps<'span'>,
    isSelected?: boolean,
  ): UseToggleButtonReturn<HTMLSpanElement>;
};
