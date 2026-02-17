import { ChangeEvent } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { CheckboxIcon } from '@/assets/icons/system';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  value?: string;
  className?: string;
}

const CheckboxContainer = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
`;

const CheckboxControl = styled.div<{ checked?: boolean; disabled?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid var(--ah-color-legacy-border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background-color: var(--ah-color-white);
  cursor: pointer;

  ${({ checked, disabled }) => {
    if (checked && !disabled) {
      return css`
        background-color: var(--ah-color-key-color);
        border-color: var(--ah-color-key-color);
      `;
    }
    if (checked && disabled) {
      return css`
        background-color: var(--ah-color-legacy-surface-lime-muted);
        border-color: var(--ah-color-legacy-surface-lime-muted);
      `;
    }
    if (!checked && disabled) {
      return css`
        background-color: var(--ah-color-legacy-surface-lime-disabled);
        border-color: var(--ah-color-legacy-surface-lime-muted);
      `;
    }
    return '';
  }}

  svg {
    color: ${props =>
      props.disabled ? 'var(--ah-color-legacy-text-mint)' : 'var(--ah-color-white)'};
    opacity: ${props => (props.checked ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`;

const CheckboxLabel = styled.span<{ disabled?: boolean }>`
  color: ${props => (props.disabled ? 'var(--ah-color-gray-70)' : 'var(--ah-color-gray-90)')};
  font-size: 13px;
  cursor: pointer;
`;

export default function Checkbox({
  checked = false,
  disabled = false,
  onChange,
  label,
  name,
  value,
  className,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxContainer disabled={disabled} className={className}>
      <CheckboxInput
        type="checkbox"
        defaultChecked={checked}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        {...props}
      />
      <CheckboxControl checked={checked} disabled={disabled}>
        <CheckboxIcon />
      </CheckboxControl>
      {label && <CheckboxLabel disabled={disabled}>{label}</CheckboxLabel>}
    </CheckboxContainer>
  );
}
