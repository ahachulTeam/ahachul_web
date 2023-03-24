import React, { useRef } from "react";

import * as S from "./styled";

interface CheckboxProps {
  id: string;
  name?: string;
  label?: string;
  value?: string | number;
  checked: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({ id, className, name, label, checked, value, onChange }: CheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const uuid = `checkbox-${id}`;
  const onKeydown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    const { key } = e;
    if (key === " ") {
      e.preventDefault();
      if (checkboxRef.current) {
        checkboxRef.current.click();
      }
    }
  };

  return (
    <S.Checkbox checked={checked} className={className}>
      <input
        id={uuid}
        name={name}
        value={value}
        checked={checked}
        ref={checkboxRef}
        tabIndex={-1}
        aria-hidden
        aria-checked={checked ? "true" : "false"}
        type="checkbox"
        onChange={onChange}
      />
      <label htmlFor={uuid} tabIndex={0} onKeyDown={onKeydown}>
        {label}
      </label>
    </S.Checkbox>
  );
}

export default Checkbox;
