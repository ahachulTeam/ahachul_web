/** @jsxImportSource react */
import type { CSSProperties, ReactNode } from 'react';

import { colors } from '@ahhachul/design-system';

export interface CommentEmptyStateProps {
  primaryText?: string;
  secondaryText?: string;
  illustration?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const CommentEmptyState = ({
  primaryText = '댓글이 없어요.',
  secondaryText = '첫 댓글을 남겨주세요.',
  illustration,
  className,
  style,
}: CommentEmptyStateProps) => {
  return (
    <section
      className={className}
      style={{
        width: '100%',
        minHeight: '240px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        ...style,
      }}
    >
      {illustration}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            color: colors.gray[80],
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
          }}
        >
          {primaryText}
        </p>
        <p
          style={{
            margin: 0,
            color: colors.gray[80],
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
          }}
        >
          {secondaryText}
        </p>
      </div>
    </section>
  );
};
