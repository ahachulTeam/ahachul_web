/** @jsxImportSource react */
import type { CSSProperties, ReactNode } from 'react';

import { colors } from '@ahhachul/design-system';

export interface SearchEmptyStateProps {
  title?: string;
  description?: string;
  illustration?: ReactNode;
  className?: string;
  style?: CSSProperties;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
}

export const SearchEmptyState = ({
  title = '검색 결과가 없어요.',
  description,
  illustration,
  className,
  style,
  titleStyle,
  descriptionStyle,
}: SearchEmptyStateProps) => {
  return (
    <section
      className={className}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        ...style,
      }}
    >
      {illustration}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            color: colors.gray[80],
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 500,
            ...titleStyle,
          }}
        >
          {title}
        </p>
        {description ? (
          <p
            style={{
              margin: 0,
              color: colors.gray[70],
              fontSize: '14px',
              lineHeight: '20px',
              ...descriptionStyle,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
};
