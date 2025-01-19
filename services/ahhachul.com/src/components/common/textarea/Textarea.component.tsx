import React, { forwardRef, ForwardedRef } from 'react';

import * as S from './Textarea.styled';

interface TextareaProps {
  id?: string;
  className?: string;
  name: string;
  placeholder?: string;
  disabled: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}
const Textarea = (
  {
    className,
    id,
    name,
    placeholder,
    disabled,
    value,
    onChange,
    onBlur,
    ...restProps
  }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) => {
  return (
    <S.Textarea
      ref={ref}
      className={className}
      id={id}
      name={name}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      {...restProps}
    />
  );
};

export default forwardRef(Textarea);
