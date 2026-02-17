/** @jsxImportSource react */
import type { CSSProperties, ReactNode } from 'react';

import { colors } from '@ahhachul/design-system';

export interface BottomNavItemProps {
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  buttonClassName?: string;
  buttonStyle?: CSSProperties;
  disabled?: boolean;
}

export const BottomNavItem = ({
  label,
  icon,
  activeIcon,
  isActive = false,
  onClick,
  className,
  style,
  buttonClassName,
  buttonStyle,
  disabled = false,
}: BottomNavItemProps) => {
  const color = isActive ? colors['key-color'] : colors.gray[70];

  return (
    <li
      className={className}
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        ...style,
      }}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={buttonClassName}
        aria-current={isActive ? 'page' : undefined}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          height: '60px',
          width: '100%',
          padding: '2px',
          border: 'none',
          background: 'transparent',
          color,
          fontSize: '12px',
          lineHeight: '18px',
          fontWeight: 500,
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...buttonStyle,
        }}
      >
        {isActive && activeIcon ? activeIcon : icon}
        <span>{label}</span>
      </button>
    </li>
  );
};
