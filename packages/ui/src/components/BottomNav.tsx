/** @jsxImportSource react */
import type { CSSProperties, ReactNode } from 'react';

import { colors } from '@ahhachul/design-system';

export interface BottomNavProps {
  itemCount: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  listClassName?: string;
  listStyle?: CSSProperties;
  bottomInset?: ReactNode;
  ariaLabel?: string;
}

export const BottomNav = ({
  itemCount,
  children,
  className,
  style,
  listClassName,
  listStyle,
  bottomInset,
  ariaLabel = '하단 내비게이션',
}: BottomNavProps) => {
  return (
    <nav
      className={className}
      aria-label={ariaLabel}
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: colors.white,
        borderTop: `1px solid ${colors.gray[20]}`,
        zIndex: 50,
        ...style,
      }}
    >
      <ul
        className={listClassName}
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: `repeat(${itemCount}, minmax(0, 1fr))`,
          width: '100%',
          ...listStyle,
        }}
      >
        {children}
      </ul>
      {bottomInset}
    </nav>
  );
};
