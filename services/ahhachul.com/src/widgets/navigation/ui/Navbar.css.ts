import { CSSObject, Theme } from '@emotion/react';

export const navbar = ({
  dimensions: {
    zIndexes: { nav },
  },
}: Theme): CSSObject => ({
  padding: '12px 16px 14px',
  backdropFilter: 'blur(20px)',
  width: 'fit-content',
  borderRadius: '24px',
  position: 'fixed',
  bottom: '12px',
  left: 0,
  right: 0,
  margin: '16px auto',
  zIndex: nav,
  background: 'linear-gradient(91deg, rgba(35, 40, 52, 0.70) 0%, rgba(39, 40, 62, 0.70) 100%)',
  display: 'flex',
  alignItems: 'center',
});
